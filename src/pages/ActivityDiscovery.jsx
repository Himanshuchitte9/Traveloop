import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ListFilter, SlidersHorizontal, ArrowUpDown, 
  MapPin, Star, Plus, Bookmark, ChevronRight,
  Plane, Camera, Coffee, Mountain, Palette, Music, X
} from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { useActivities } from '../hooks/useActivities';
import toast from 'react-hot-toast';

const CATEGORY_ICONS = {
  SIGHTSEEING: <Camera className="w-5 h-5" />,
  FOOD: <Coffee className="w-5 h-5" />,
  ADVENTURE: <Mountain className="w-5 h-5" />,
  CULTURE: <Palette className="w-5 h-5" />,
  MUSIC: <Music className="w-5 h-5" />,
  TRAVEL: <Plane className="w-5 h-5" />,
};

export default function ActivityDiscovery() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { activities, loading } = useActivities();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [groupBy, setGroupBy] = useState('none');

  // Initialize from URL param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) setSearchQuery(q);
  }, [location]);

  const processedResults = useMemo(() => {
    let result = activities.map(a => ({
      ...a,
      type: a.type || 'SIGHTSEEING',
      priceRange: a.cost < 2000 ? '$' : a.cost < 5000 ? '$$' : '$$$'
    }));

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(q) || 
        a.city.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price') result.sort((a, b) => a.cost - b.cost);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [activities, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between z-50">
        <h1 className="text-xl font-bold text-teal-600 tracking-tight">Travelloop</h1>
        <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-white">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </nav>

      <div className="pt-20 px-4 max-w-[420px] mx-auto">
        {/* Wireframe Search & Filter Bar */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Paragliding"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <FilterPill label="Group by" onClick={() => setGroupBy('city')} active={groupBy !== 'none'} />
            <FilterPill label="Filter" />
            <FilterPill label="Sort by..." onClick={() => setSortBy('rating')} active={sortBy !== 'relevance'} />
          </div>
        </div>

        {/* Results Section Label */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-900 px-1">Results</h2>
        </div>

        {/* List of Result Cards */}
        <div className="space-y-4">
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          ) : processedResults.length > 0 ? (
            <AnimatePresence>
              {processedResults.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group text-center"
                >
                  <p className="text-gray-900 font-medium text-lg">
                    {item.name} and its details
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-4 text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.city}</span>
                    <span className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-amber-500" /> {item.rating}</span>
                    <span className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded">{item.priceRange}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 italic">No options found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, onClick, active }) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-2 rounded-lg border text-[11px] font-medium transition-all whitespace-nowrap ${
        active 
          ? 'bg-teal-50 border-teal-500 text-teal-700' 
          : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
      }`}
    >
      {label}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 animate-pulse">
      <div className="h-6 bg-gray-100 rounded-full w-3/4 mx-auto mb-4" />
      <div className="h-3 bg-gray-50 rounded-full w-1/2 mx-auto" />
    </div>
  );
}
