import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import BannerSlider from '../components/dashboard/BannerSlider';
import SearchFilterBar from '../components/dashboard/SearchFilterBar';
import TopRegionalSelections from '../components/dashboard/TopRegionalSelections';
import PopularActivities from '../components/dashboard/PopularActivities';
import PreviousTrips from '../components/dashboard/PreviousTrips';
import PlanTripFAB from '../components/dashboard/PlanTripFAB';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState({});
  const [activeSort, setActiveSort] = useState('Newest First');
  const [activeGroup, setActiveGroup] = useState('none');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FDFDFD] pb-32"
    >
      <DashboardHeader user={user} logout={logout} />

      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Hi, {user?.name?.split(' ')[0] || 'Traveler'}! 👋
          </h1>
          <p className="text-gray-500 font-medium mt-1">Where do you want to explore next?</p>
        </motion.div>

        {/* Search & Main Controls */}
        <div className="mb-8">
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterChange={setActiveFilter}
            onSortChange={setActiveSort}
            onGroupChange={setActiveGroup}
          />
        </div>

        {/* Featured Banner */}
        <div className="mb-10 rounded-[32px] overflow-hidden shadow-2xl shadow-amber-100/50">
          <BannerSlider />
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Section 1: Regions */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Trending Regions</h2>
              <button className="text-amber-500 font-bold text-sm hover:underline">View all</button>
            </div>
            <div className="bg-white p-2 rounded-[32px] border border-gray-100 shadow-sm">
              <TopRegionalSelections searchQuery={searchQuery} />
            </div>
          </section>

          {/* Section 2: Popular Activities */}
          <section>
            <PopularActivities />
          </section>

          {/* Section 3: Recent Trips */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Your Adventures</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Recent
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm min-h-[300px]">
              <PreviousTrips
                searchQuery={searchQuery}
                activeFilter={activeFilter}
                activeSort={activeSort}
                activeGroup={activeGroup}
              />
            </div>
          </section>
        </div>
      </div>

      <PlanTripFAB />
    </motion.div>
  );
}
