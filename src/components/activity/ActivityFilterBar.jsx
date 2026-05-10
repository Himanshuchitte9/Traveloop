import React from 'react';

const CHIPS = ['All', 'Sightseeing', 'Food', 'Adventure', 'Culture', 'Budget', 'Premium'];

export default function ActivityFilterBar({ activeFilters, toggleFilter }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
      {CHIPS.map(chip => {
        const isActive = activeFilters.includes(chip) || (chip === 'All' && activeFilters.length === 0);
        return (
          <button
            key={chip}
            onClick={() => toggleFilter(chip)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-amber-500 text-white shadow-sm border border-amber-500' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {chip}
          </button>
        );
      })}
    </div>
  );
}
