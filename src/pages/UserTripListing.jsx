import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ListFilter, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, Map, Home, User, Settings, LogOut, Plane, Calendar, MapPin } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../hooks/useTrips';
import { isAfter, isBefore, startOfToday } from 'date-fns';

const tripsData = [
  { id: 1, name: 'Paris Getaway', status: 'Ongoing', overview: 'Short Over View of the Trip' },
  { id: 2, name: 'Bali Adventure', status: 'Upcoming', overview: 'Short Over View of the Trip' },
  { id: 3, name: 'Tokyo Explorer', status: 'Completed', overview: 'Short Over View of the Trip' },
  { id: 4, name: 'Rome Holiday', status: 'Completed', overview: 'Short Over View of the Trip' },
];

export default function UserTripListing() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { trips, loading } = useTrips('All');

  const processedTrips = trips.filter(trip => 
    trip.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatus = (trip) => {
    const today = startOfToday();
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    if (isBefore(end, today)) return 'Completed';
    if (isAfter(start, today)) return 'Upcoming';
    return 'Ongoing';
  };

  const renderSection = (title, status) => {
    const sectionTrips = processedTrips.filter(t => getStatus(t) === status);
    if (sectionTrips.length === 0 && searchQuery) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4 px-1">
          <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest">{title}</h2>
          <div className="flex-1 h-[1px] bg-gray-100" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {sectionTrips.map(trip => (
            <motion.div
              key={trip.id}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/trips/${trip.id}/view`)}
              className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm cursor-pointer group hover:border-teal-200 transition-all flex flex-col sm:flex-row h-48 sm:h-32"
            >
              {/* Trip Image */}
              <div className="w-full sm:w-32 h-24 sm:h-full shrink-0 relative overflow-hidden">
                {trip.coverPhoto ? (
                  <img src={trip.coverPhoto} alt={trip.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600" />
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>

              {/* Trip Content */}
              <div className="p-4 flex flex-col justify-center flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors truncate pr-2">
                    {trip.name}
                  </h3>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                    status === 'Ongoing' ? 'bg-amber-100 text-amber-600' :
                    status === 'Upcoming' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                  {trip.destination || "Exploring the world"}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(trip.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-teal-600">
                    <MapPin className="w-3 h-3" />
                    View Details
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {sectionTrips.length === 0 && !searchQuery && (
            <div className="bg-gray-50/50 rounded-[20px] p-8 border border-dashed border-gray-200 text-center">
              <p className="text-xs text-gray-400 italic">No {status.toLowerCase()} trips found</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 overflow-x-hidden">
      <DashboardHeader user={user} logout={logout} />

      {/* Side Drawer Tab */}
      <motion.button
        animate={{ left: isDrawerOpen ? 240 : 0 }}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="fixed top-1/2 -translate-y-1/2 left-0 bg-gray-900 text-white p-1.5 pr-1 rounded-r-lg shadow-lg z-[60] transition-colors hover:bg-teal-600"
      >
        {isDrawerOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </motion.button>

      {/* Side Navigation Panel */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-y-0 left-0 w-60 bg-white shadow-2xl z-[55] p-6 pt-24"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Navigation</p>
                  <NavItem icon={<Home className="w-5 h-5" />} label="Home" onClick={() => navigate('/dashboard')} />
                  <NavItem icon={<Map className="w-5 h-5" />} label="My Trips" active />
                  <NavItem icon={<Plane className="w-5 h-5" />} label="Discover" onClick={() => navigate('/discover/cities')} />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Account</p>
                  <NavItem icon={<User className="w-5 h-5" />} label="Profile" onClick={() => navigate('/profile')} />
                  <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
                </div>
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-colors mt-12"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
          </>
        )}
      </AnimatePresence>

      <div className="pt-20 px-4 max-w-md mx-auto relative">
        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bar ......"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-full shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
          </div>
          <div className="flex justify-between gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <FilterButton icon={<ListFilter className="w-3.5 h-3.5" />} label="Group by" />
            <FilterButton icon={<SlidersHorizontal className="w-3.5 h-3.5" />} label="Filter" />
            <FilterButton icon={<ArrowUpDown className="w-3.5 h-3.5" />} label="Sort by..." />
          </div>
        </div>

        {/* Trip Sections */}
        <div className="space-y-2">
          {renderSection("Ongoing", "Ongoing")}
          {renderSection("Up-coming", "Upcoming")}
          {renderSection("Completed", "Completed")}
        </div>
      </div>
    </div>
  );
}

function FilterButton({ icon, label }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-[11px] font-bold text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-all whitespace-nowrap">
      {icon}
      {label}
    </button>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
        active 
          ? 'bg-teal-500 text-white shadow-lg shadow-teal-100' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
