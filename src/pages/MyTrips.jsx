import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTrips } from '../hooks/useTrips';
import TripCard from '../components/trips/TripCard';
import TripCardSkeleton from '../components/trips/TripCardSkeleton';
import TripEmptyState from '../components/trips/TripEmptyState';
import TripFilterTabs from '../components/trips/TripFilterTabs';
import TripDeleteModal from '../components/trips/TripDeleteModal';
import TripEditModal from '../components/trips/TripEditModal';

export default function MyTrips() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['All', 'Upcoming', 'Past'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location]);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('Newest'); // Newest, Oldest, A-Z, Upcoming first
  const [sortOpen, setSortOpen] = useState(false);

  const { trips, filteredTrips, loading, error, refetch, handleDelete, handleUpdate } = useTrips(activeTab);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tripToEdit, setTripToEdit] = useState(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Tab Counts
  const counts = useMemo(() => {
    const now = new Date();
    let upcoming = 0;
    let past = 0;
    trips.forEach(t => {
      const start = new Date(t.startDate);
      const end = new Date(t.endDate);
      if (now > end) past++;
      else upcoming++;
    });
    return {
      All: trips.length,
      Upcoming: upcoming,
      Past: past
    };
  }, [trips]);

  // Final processed trips
  const processedTrips = useMemo(() => {
    let result = filteredTrips;

    // Apply Search
    if (debouncedSearch) {
      const lowerQuery = debouncedSearch.toLowerCase();
      result = result.filter(t => t.name?.toLowerCase().includes(lowerQuery));
    }

    // Apply Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'Newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'Oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'A-Z':
          return (a.name || '').localeCompare(b.name || '');
        case 'Upcoming first':
          return new Date(a.startDate) - new Date(b.startDate);
        default:
          return 0;
      }
    });

    return result;
  }, [filteredTrips, debouncedSearch, sortBy]);

  const openDeleteModal = (trip) => {
    setTripToDelete(trip);
    setDeleteModalOpen(true);
  };

  const openEditModal = (trip) => {
    setTripToEdit(trip);
    setEditModalOpen(true);
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#FAFAFA] pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-gray-900 mb-1">My Trips</h1>
            <p className="text-gray-500">Manage and explore your travel plans</p>
          </div>
          <Link 
            to="/create-trip"
            className="inline-flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#E09610] text-white px-5 py-2.5 rounded-[12px] font-semibold shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5" />
            Plan New Trip
          </Link>
        </div>

        {/* Tabs & Search Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TripFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />
          
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search your trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F5A623]/20 focus:border-[#F5A623] transition-all text-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sort: {sortBy} <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                  {['Newest', 'Oldest', 'A-Z', 'Upcoming first'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm ${sortBy === opt ? 'bg-amber-50 text-[#F5A623]' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {[...Array(6)].map((_, i) => <TripCardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
            <button onClick={refetch} className="mt-4 text-[#F5A623] underline">Try again</button>
          </div>
        ) : processedTrips.length === 0 ? (
          <TripEmptyState activeTab={activeTab} />
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]"
          >
            <AnimatePresence>
              {processedTrips.map(trip => (
                <motion.div key={trip.id} variants={itemVariants} layout exit={{ opacity: 0, scale: 0.9 }}>
                  <TripCard 
                    trip={trip} 
                    onEditClick={openEditModal}
                    onDeleteClick={openDeleteModal}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <TripDeleteModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        trip={tripToDelete}
        onDelete={handleDelete}
      />

      <TripEditModal 
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        trip={tripToEdit}
        onUpdate={handleUpdate}
      />
    </motion.div>
  );
}
