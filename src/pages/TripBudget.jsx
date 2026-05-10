import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import PageHeader from '../components/shared/PageHeader';
import LoadingSkeleton from '../components/shared/LoadingSkeleton';
import BudgetSummaryCard from '../components/budget/BudgetSummaryCard';
import BudgetPieChart from '../components/budget/BudgetPieChart';
import BudgetBarChart from '../components/budget/BudgetBarChart';
import OverBudgetAlert from '../components/budget/OverBudgetAlert';

import { useBudget } from '../hooks/useBudget';
import { useTrips } from '../hooks/useTrips';

export default function TripBudget() {
  const { tripId } = useParams();
  const { trips } = useTrips();
  const [trip, setTrip] = useState(null);
  
  const { budgetData, loading } = useBudget(tripId, trip);

  useEffect(() => {
    if (trips && trips.length > 0) {
      setTrip(trips.find(t => t.id === tripId));
    }
  }, [trips, tripId]);

  const overBudgetDays = budgetData?.dailyCosts?.filter(d => d.cost > budgetData.averagePerDay) || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#FAFAFA] pb-24 pt-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title="Trip Budget"
          subtitle={trip?.name || 'Loading...'}
          backPath="/my-trips"
        />

        {loading ? (
          <div className="space-y-6">
            <LoadingSkeleton type="card" count={1} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <LoadingSkeleton type="card" count={4} />
            </div>
          </div>
        ) : !budgetData ? (
          <div className="text-center py-12 text-gray-500">Failed to load budget data.</div>
        ) : (
          <div className="space-y-6">
            <OverBudgetAlert overBudgetDays={overBudgetDays} average={budgetData.averagePerDay} />

            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-amber-100 font-medium mb-1 tracking-wide uppercase text-sm">Estimated Total</p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-2">₹{budgetData.total.toLocaleString()}</h2>
                <p className="text-amber-50">
                  <span className="font-semibold">₹{budgetData.averagePerDay.toLocaleString()}</span> average per day
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl pointer-events-none" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {budgetData.categories.map(cat => (
                <BudgetSummaryCard key={cat.name} item={cat} total={budgetData.total} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BudgetPieChart data={budgetData.categories} total={budgetData.total} />
              <BudgetBarChart data={budgetData.dailyCosts} average={budgetData.averagePerDay} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
