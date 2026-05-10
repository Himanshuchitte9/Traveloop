import { useState, useEffect, useCallback } from 'react';
import { getStops, addStop, updateStop, deleteStop, reorderStops } from '../api/stopsApi';
import { getActivities, addActivity, updateActivity, deleteActivity } from '../api/activitiesApi';
import toast from 'react-hot-toast';

export const useItinerary = (tripId) => {
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStops = useCallback(async () => {
    if (!tripId) return;
    setLoading(true);
    try {
      const res = await getStops(tripId);
      let stopsData = res.data?.data || res.data || [];
      // sort stops by order index if available
      stopsData = stopsData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setStops(stopsData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch itinerary');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchStops();
  }, [fetchStops]);

  const handleReorder = async (newOrderIds) => {
    const previous = [...stops];
    const sorted = [...stops].sort((a, b) => newOrderIds.indexOf(a.id) - newOrderIds.indexOf(b.id));
    setStops(sorted);

    try {
      const payload = newOrderIds.map((id, index) => ({ id, order: index }));
      await reorderStops({ stops: payload });
    } catch (err) {
      setStops(previous);
      toast.error('Failed to reorder stops');
    }
  };

  const handleAddStop = async (data) => {
    try {
      await addStop({ ...data, tripId, order: stops.length });
      toast.success('Stop added');
      fetchStops();
    } catch (err) {
      toast.error('Failed to add stop');
    }
  };

  const handleUpdateStop = async (id, data) => {
    try {
      await updateStop(id, data);
      toast.success('Stop updated');
      fetchStops();
    } catch (err) {
      toast.error('Failed to update stop');
    }
  };

  const handleDeleteStop = async (id) => {
    const previous = [...stops];
    setStops(stops.filter(s => s.id !== id));
    try {
      await deleteStop(id);
      toast.success('Stop deleted');
    } catch (err) {
      setStops(previous);
      toast.error('Failed to delete stop');
    }
  };

  const handleAddActivity = async (data) => {
    try {
      await addActivity(data);
      toast.success('Activity added');
      fetchStops();
    } catch (err) {
      toast.error('Failed to add activity');
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      await deleteActivity(id);
      toast.success('Activity deleted');
      fetchStops();
    } catch (err) {
      toast.error('Failed to delete activity');
    }
  };

  return {
    stops,
    loading,
    error,
    refetch: fetchStops,
    handleReorder,
    handleAddStop,
    handleUpdateStop,
    handleDeleteStop,
    handleAddActivity,
    handleDeleteActivity
  };
};
