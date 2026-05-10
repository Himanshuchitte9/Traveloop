import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ChevronDown } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import ActivityFilterBar from '../components/activity/ActivityFilterBar';
import ActivitySearchCard from '../components/activity/ActivitySearchCard';
import LoadingSkeleton from '../components/shared/LoadingSkeleton';
import EmptyState from '../components/shared/EmptyState';
import { useActivities } from '../hooks/useActivities';

export default function ActivitySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('Popularity');
  const [sortOpen, setSortOpen] = useState(false);
  const { activities, loading } = useActivities();

  const toggleFilter = (filter) => {
    if (filter === 'All') {
      setActiveFilters([]);
      return;
    }
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const filteredActivities = useMemo(() => {
    let result = activities;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(q) || 
        a.city.toLowerCase().includes(q)
      );
    }

    if (activeFilters.length > 0) {
      result = result.filter(a => {
        let match = true;
        activeFilters.forEach(filter => {
          if (['Sightseeing', 'Food', 'Adventure', 'Culture'].includes(filter)) {
            if (a.type !== filter.toUpperCase()) match = false;
          }
          if (filter === 'Budget' && a.cost > 2000) match = false;
          if (filter === 'Premium' && a.cost <= 2000) match = false;
        });
        return match;
      });
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'Popularity') return b.rating - a.rating;
      if (sortBy === 'Cost Low-High') return a.cost - b.cost;
      if (sortBy === 'Cost High-Low') return b.cost - a.cost;
      return 0;
    });

    return result;
  }, [activities, searchQuery, activeFilters, sortBy]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#FAFAFA] pb-24 pt-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title="Explore Activities"
          subtitle="Find things to do at your destinations"
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search activities by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Sort: {sortBy} <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                {['Popularity', 'Cost Low-High', 'Cost High-Low'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm ${sortBy === opt ? 'bg-amber-50 text-amber-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <ActivityFilterBar activeFilters={activeFilters} toggleFilter={toggleFilter} />

        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <LoadingSkeleton type="card" count={8} />
            </div>
          ) : filteredActivities.length === 0 ? (
            <EmptyState 
              title="No activities found"
              subtitle="Try adjusting your search or filters"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredActivities.map(activity => (
                <ActivitySearchCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
