import React, { useState } from 'react';
import { Search, X, Sliders, ChevronDown, ListFilter, ArrowUpDown, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function SearchFilterBar({ 
  searchQuery, 
  onSearchChange, 
  onFilterChange, 
  onSortChange, 
  onGroupChange 
}) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null); // 'group', 'filter', 'sort'
  const [activeGroup, setActiveGroup] = useState('none');
  const [activeSort, setActiveSort] = useState('Newest First');
  const [filterCount, setFilterCount] = useState(0);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleGroupSelect = (val) => {
    setActiveGroup(val);
    onGroupChange(val.toLowerCase());
    setOpenDropdown(null);
  };

  const handleSortSelect = (val) => {
    setActiveSort(val);
    onSortChange(val);
    setOpenDropdown(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 px-3 py-2">
      {/* Search Bar */}
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search destinations, activities..."
          className="w-full pl-10 pr-24 py-2.5 bg-white border-1.5 border-gray-200 rounded-[10px] focus:outline-none focus:border-teal-500 transition-colors shadow-sm"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => navigate('/activity-discovery')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-teal-50 text-teal-600 rounded-lg font-bold text-[10px] hover:bg-teal-100 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            DISCOVER
          </button>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2">
        {/* Group By */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('group')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium transition-all ${
              activeGroup !== 'none' ? 'text-amber-500 border-amber-200 bg-amber-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Group by</span>
            <span className="sm:hidden">{activeGroup === 'none' ? 'Group' : activeGroup}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'group' ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {openDropdown === 'group' && (
              <DropdownMenu 
                items={['None', 'City', 'Date', 'Budget', 'Duration']} 
                onSelect={handleGroupSelect}
                activeItem={activeGroup}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Filter */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('filter')}
            className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium transition-all ${
              filterCount > 0 ? 'text-amber-500 border-amber-200 bg-amber-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Filter</span>
            {filterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                {filterCount}
              </span>
            )}
          </button>
          
          {/* Simple Dropdown for now, could be a panel */}
          <AnimatePresence>
            {openDropdown === 'filter' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-40"
              >
                <h4 className="font-bold text-gray-900 mb-3">Filter Options</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Region</label>
                    <select className="w-full p-2 text-sm border rounded-lg outline-none focus:border-amber-400">
                      <option>All Regions</option>
                      <option>Europe</option>
                      <option>Asia</option>
                      <option>Americas</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Status</label>
                    <div className="space-y-2">
                      {['Upcoming', 'Past', 'Ongoing'].map(s => (
                        <label key={s} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                          <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500" />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => { setFilterCount(1); setOpenDropdown(null); }}
                    className="w-full py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors mt-2"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sort */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('sort')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition-all"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="hidden sm:inline">Sort by</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'sort' ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {openDropdown === 'sort' && (
              <DropdownMenu 
                items={['Newest First', 'Oldest First', 'A-Z', 'Budget: Low to High', 'Budget: High to Low']} 
                onSelect={handleSortSelect}
                activeItem={activeSort}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function DropdownMenu({ items, onSelect, activeItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-40 overflow-hidden"
    >
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
            activeItem === item ? 'bg-amber-50 text-amber-600 font-bold' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {item}
        </button>
      ))}
    </motion.div>
  );
}
