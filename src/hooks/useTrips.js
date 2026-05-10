import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllTrips, deleteTrip, updateTrip } from '../api/tripsApi';
import { isAfter, isBefore, startOfToday, startOfDay } from 'date-fns';
import toast from 'react-hot-toast';

export const useTrips = (activeTab = 'All') => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllTrips();
      if (response.data && response.data.success) {
        setTrips(response.data.data || []);
      } else if (Array.isArray(response.data)) {
        setTrips(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDelete = async (id) => {
    // Optimistic UI update
    const previousTrips = [...trips];
    setTrips(trips.filter(t => t.id !== id));
    
    try {
      await deleteTrip(id);
      toast.success('✈️ Trip deleted successfully');
    } catch (err) {
      setTrips(previousTrips); // Revert on failure
      toast.error('Something went wrong. Please try again.');
      throw err;
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateTrip(id, data);
      toast.success('Trip updated successfully');
      fetchTrips();
    } catch (err) {
      toast.error('Failed to update trip.');
      throw err;
    }
  };

  const filteredTrips = useMemo(() => {
    const today = startOfToday();
    return trips.filter(trip => {
      if (activeTab === 'All') return true;
      
      const start = startOfDay(new Date(trip.startDate));
      const end = startOfDay(new Date(trip.endDate));
      
      if (activeTab === 'Upcoming') {
        return isAfter(start, today) || start.getTime() === today.getTime();
      }
      if (activeTab === 'Past') {
        return isBefore(end, today) && end.getTime() < today.getTime();
      }
      return true;
    });
  }, [trips, activeTab]);

  return {
    trips,
    filteredTrips,
    loading,
    error,
    refetch: fetchTrips,
    handleDelete,
    handleUpdate
  };
};
