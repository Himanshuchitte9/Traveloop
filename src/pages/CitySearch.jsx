import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import CityFilterBar from '../components/city/CityFilterBar';
import CityCard from '../components/city/CityCard';
import LoadingSkeleton from '../components/shared/LoadingSkeleton';
import EmptyState from '../components/shared/EmptyState';
import { useCities } from '../hooks/useCities';

export default function CitySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const { cities, loading } = useCities();

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

  const filteredCities = useMemo(() => {
    let result = cities;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.country.toLowerCase().includes(q)
      );
    }

    if (activeFilters.length > 0) {
      result = result.filter(c => {
        let match = true;
        activeFilters.forEach(filter => {
          if (['Europe', 'Asia', 'Americas', 'Africa'].includes(filter)) {
            if (c.region !== filter) match = false;
          }
          if (filter === 'Budget' && c.costIndex === '$$$') match = false;
          if (filter === 'Popular' && c.popularity < 4.7) match = false;
          if (filter === 'Luxury' && c.costIndex !== '$$$') match = false;
        });
        return match;
      });
    }

    return result;
  }, [cities, searchQuery, activeFilters]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#FAFAFA] pb-24 pt-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title="Discover Cities"
          subtitle="Find your next destination"
        />

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search cities, countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <CityFilterBar activeFilters={activeFilters} toggleFilter={toggleFilter} />

        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <LoadingSkeleton type="card" count={8} />
            </div>
          ) : filteredCities.length === 0 ? (
            <EmptyState 
              title="No cities found"
              subtitle="Try adjusting your search or filters"
            />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCities.map(city => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
