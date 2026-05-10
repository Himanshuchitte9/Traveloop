import React from 'react';
import { motion } from 'framer-motion';

const tabs = ['All', 'Upcoming', 'Past'];

export default function TripFilterTabs({ activeTab, setActiveTab, counts }) {
  return (
    <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto hide-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-3 text-sm font-medium transition-colors whitespace-nowrap ${
              isActive ? 'text-amber-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              {tab}
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                isActive ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'
              }`}>
                {counts[tab] || 0}
              </span>
            </div>
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-t-full"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
