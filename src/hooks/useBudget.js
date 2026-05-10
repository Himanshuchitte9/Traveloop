import { useState, useEffect, useCallback } from 'react';
import { getTripBudget } from '../api/budgetApi';
import { useItinerary } from './useItinerary';
import { differenceInDays } from 'date-fns';

export const useBudget = (tripId, trip) => {
  const [budgetData, setBudgetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { stops } = useItinerary(tripId);

  const fetchBudget = useCallback(async () => {
    if (!tripId) return;
    setLoading(true);
    try {
      try {
        const res = await getTripBudget(tripId);
        if (res.data) {
          setBudgetData(res.data);
          setLoading(false);
          return;
        }
      } catch (e) {
        // Fallback to client side calculation if API endpoint doesn't exist
      }

      const allActivities = stops.flatMap(s => s.activities || []);
      
      let activitiesCost = 0;
      let foodCost = 0;
      let transportCost = 15000; // Mock base transport
      let stayCost = 20000; // Mock base stay
      
      allActivities.forEach(act => {
        const cost = Number(act.cost) || 0;
        if (act.type === 'FOOD') foodCost += cost;
        else activitiesCost += cost;
      });

      const total = activitiesCost + foodCost + transportCost + stayCost;
      const tripDays = trip?.startDate && trip?.endDate ? differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1 : 5;
      
      const dailyCosts = [];
      const baseDaily = Math.floor(total / tripDays);
      for(let i=0; i<tripDays; i++) {
        dailyCosts.push({
          day: `Day ${i+1}`,
          cost: baseDaily + Math.floor(Math.random() * 2000) - 1000
        });
      }

      setBudgetData({
        total,
        categories: [
          { name: 'Transport', amount: transportCost, color: '#3B82F6', icon: 'Car' },
          { name: 'Stay', amount: stayCost, color: '#8B5CF6', icon: 'Home' },
          { name: 'Activities', amount: activitiesCost, color: '#14B8A6', icon: 'Camera' },
          { name: 'Meals', amount: foodCost, color: '#F5A623', icon: 'Coffee' }
        ],
        dailyCosts,
        averagePerDay: Math.floor(total / tripDays)
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tripId, stops, trip]);

  useEffect(() => {
    if (trip) fetchBudget();
  }, [fetchBudget, trip]);

  return { budgetData, loading, error, refetch: fetchBudget };
};
