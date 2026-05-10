import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ListFilter, SlidersHorizontal, ArrowUpDown, 
  MapPin, Star, Plus, Bookmark, ChevronRight,
  Plane, Camera, Coffee, Mountain, Palette, Music
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

export default function UniversalSearch() {
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

  const handleBookmark = (e, activity) => {
    e.stopPropagation();
    toast.success(`Saved ${activity.name} to bookmarks! ✨`);
  };

  const handleAdd = (e, activity) => {
    e.stopPropagation();
    toast.success(`Added ${activity.name} to itinerary! ✈️`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <DashboardHeader user={user} logout={logout} />

      <div className="pt-20 px-4 max-w-[420px] mx-auto">
        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities, places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <FilterButton 
              active={groupBy !== 'none'}
              icon={<ListFilter className="w-3.5 h-3.5" />} 
              label="Group by" 
              onClick={() => setGroupBy(groupBy === 'city' ? 'none' : 'city')}
            />
            <FilterButton 
              icon={<SlidersHorizontal className="w-3.5 h-3.5" />} 
              label="Filter" 
            />
            <FilterButton 
              active={sortBy !== 'relevance'}
              icon={<ArrowUpDown className="w-3.5 h-3.5" />} 
              label={`Sort: ${sortBy}`} 
              onClick={() => setSortBy(sortBy === 'relevance' ? 'rating' : sortBy === 'rating' ? 'price' : 'relevance')}
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Results</p>
          <p className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
            {processedResults.length} found
          </p>
        </div>

        {/* Results List */}
        <div className="space-y-3">
          {loading ? (
            [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
          ) : processedResults.length > 0 ? (
            <AnimatePresence>
              {processedResults.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(`/discover/activities?id=${item.id}`)}
                  className="bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm hover:border-teal-200 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    {/* Category Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-500 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                      {CATEGORY_ICONS[item.type] || <Camera className="w-5 h-5" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {item.city}
                        </span>
                        <span className="text-[10px] font-bold text-amber-500 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-500" /> {item.rating}
                        </span>
                        <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 rounded">
                          {item.priceRange}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={(e) => handleBookmark(e, item)}
                        className="p-2 text-gray-300 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => handleAdd(e, item)}
                        className="p-2 text-gray-300 hover:text-teal-500 hover:bg-teal-50 rounded-xl transition-all"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 transition-colors ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="text-center py-12 bg-white rounded-[32px] border border-dashed border-gray-200">
              <Search className="w-12 h-12 text-gray-100 mx-auto mb-3" />
              <p className="text-sm text-gray-400 font-medium">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterButton({ icon, label, onClick, active }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold transition-all whitespace-nowrap ${
        active 
          ? 'bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-100' 
          : 'bg-white border-gray-200 text-gray-600 hover:border-teal-500 hover:text-teal-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white p-4 rounded-[24px] border border-gray-50 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-gray-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}
