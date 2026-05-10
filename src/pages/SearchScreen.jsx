import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, Layers, MapPin, Star, ChevronRight, Bookmark, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { useActivities } from '../hooks/useActivities';
import { useTrips } from '../hooks/useTrips';
import toast from 'react-hot-toast';

export default function SearchScreen() {
  const { user, logout } = useAuth();
  const { activities, loading } = useActivities();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [groupBy, setGroupBy] = useState('none');

  const filteredResults = useMemo(() => {
    let result = activities.map(a => ({
      ...a,
      priceRange: a.cost < 2000 ? '$' : a.cost < 5000 ? '$$' : '$$$'
    }));

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(q) || 
        a.city.toLowerCase().includes(q) ||
        (a.type && a.type.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price') result.sort((a, b) => a.cost - b.cost);
    if (sortBy === 'popular') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [activities, searchQuery, sortBy]);

  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { trips } = useTrips();

  const handleBookmark = (e, item) => {
    e.stopPropagation();
    toast.success(`Saved ${item.name}! ✨`);
  };

  const handleAddClick = (e, item) => {
    e.stopPropagation();
    setSelectedItem(item);
    setIsTripModalOpen(true);
  };

  const confirmAddToTrip = (trip) => {
    toast.success(`Added ${selectedItem.name} to ${trip.name}! ✈️`);
    setIsTripModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <DashboardHeader user={user} logout={logout} />

      <div className="pt-20 px-4 max-w-2xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search activities (e.g. Paragliding)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-gray-700"
          />
        </div>

        {/* Action Buttons Row */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <ActionButton 
            icon={<Layers className="w-4 h-4" />} 
            label="Group by" 
            onClick={() => setGroupBy(groupBy === 'city' ? 'none' : 'city')}
            active={groupBy !== 'none'}
          />
          <ActionButton 
            icon={<Filter className="w-4 h-4" />} 
            label="Filter" 
          />
          <ActionButton 
            icon={<ArrowUpDown className="w-4 h-4" />} 
            label={`Sort: ${sortBy}`} 
            onClick={() => setSortBy(sortBy === 'popular' ? 'price' : 'popular')}
            active={sortBy !== 'popular'}
          />
        </div>

        {/* Results Heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Results</h2>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {filteredResults.length} options found
          </span>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <AnimatePresence>
              {filteredResults.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer"
                  onClick={() => navigate(`/discover/activities?id=${item.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 truncate text-lg">{item.name}</h3>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          {item.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {item.city}
                        </span>
                        <span>•</span>
                        <span className="text-amber-600">{item.priceRange}</span>
                        <span>•</span>
                        <span className="capitalize">{item.type?.toLowerCase() || 'Activity'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => handleBookmark(e, item)}
                        className="p-2.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => handleAddClick(e, item)}
                        className="p-2.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {!loading && filteredResults.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
              <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No results found for your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Trip Selection Modal */}
      <AnimatePresence>
        {isTripModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl">
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-900">Add to Trip</h3>
                  <button onClick={() => setIsTripModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Select which trip to add this activity to.</p>
              </div>
              <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
                {trips?.map(trip => (
                  <button 
                    key={trip.id}
                    onClick={() => confirmAddToTrip(trip)}
                    className="w-full flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl hover:border-amber-500 hover:bg-amber-50 transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-bold">{trip.name[0]}</div>
                    <div>
                      <p className="font-bold text-gray-900">{trip.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{trip.destination}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-6 border-t border-gray-100">
                <button 
                  onClick={() => navigate('/create-trip')}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
                >
                  Create New Trip
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ icon, label, onClick, active }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold transition-all whitespace-nowrap ${
        active 
          ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-100' 
          : 'bg-white border-gray-200 text-gray-600 hover:border-amber-500 hover:text-amber-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
