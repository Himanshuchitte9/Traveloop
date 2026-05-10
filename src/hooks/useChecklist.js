import { useState, useEffect, useCallback } from 'react';
import { getChecklist, addChecklistItem, toggleChecklistItem, deleteChecklistItem, resetChecklist } from '../api/checklistApi';
import toast from 'react-hot-toast';

export const useChecklist = (tripId) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChecklist = useCallback(async () => {
    if (!tripId) return;
    setLoading(true);
    try {
      const res = await getChecklist(tripId);
      setItems(res.data?.data || res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch checklist');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchChecklist();
  }, [fetchChecklist]);

  const handleAdd = async (data) => {
    try {
      await addChecklistItem({ ...data, tripId });
      toast.success('Item added');
      fetchChecklist();
    } catch (err) {
      toast.error('Failed to add item');
    }
  };

  const handleToggle = async (id) => {
    const previous = [...items];
    setItems(items.map(i => i.id === id ? { ...i, packed: !i.packed } : i));
    try {
      await toggleChecklistItem(id);
    } catch (err) {
      setItems(previous);
      toast.error('Failed to toggle item');
    }
  };

  const handleDelete = async (id) => {
    const previous = [...items];
    setItems(items.filter(i => i.id !== id));
    try {
      await deleteChecklistItem(id);
    } catch (err) {
      setItems(previous);
      toast.error('Failed to delete item');
    }
  };

  const handleReset = async () => {
    const previous = [...items];
    setItems(items.map(i => ({ ...i, packed: false })));
    try {
      await resetChecklist(tripId);
      toast.success('Checklist reset');
    } catch (err) {
      setItems(previous);
      toast.error('Failed to reset checklist');
    }
  };

  return {
    items,
    loading,
    error,
    handleAdd,
    handleToggle,
    handleDelete,
    handleReset
  };
};
