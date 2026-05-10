import { useState, useEffect, useCallback } from 'react';
import { getActivities, searchActivities } from '../api/activitiesApi';

const hardcodedActivities = [
  { id: 1, name: 'Eiffel Tower Visit', city: 'Paris', type: 'SIGHTSEEING', cost: 2500, duration: '3 hours', rating: 4.9 },
  { id: 2, name: 'Sushi Making Class', city: 'Tokyo', type: 'FOOD', duration: '2 hours', cost: 4500, rating: 4.8 },
  { id: 3, name: 'Bali Surfing Lesson', city: 'Bali', type: 'ADVENTURE', cost: 1800, duration: '2 hours', rating: 4.7 },
  { id: 4, name: 'Colosseum Tour', city: 'Rome', type: 'CULTURE', cost: 2000, duration: '2 hours', rating: 4.8 },
  { id: 5, name: 'Louvre Museum Entry', city: 'Paris', type: 'CULTURE', cost: 1500, duration: '4 hours', rating: 4.8 },
  { id: 6, name: 'Sagrada Familia Tour', city: 'Barcelona', type: 'SIGHTSEEING', cost: 2200, duration: '2 hours', rating: 4.9 },
  { id: 7, name: 'Desert Safari', city: 'Dubai', type: 'ADVENTURE', cost: 5000, duration: 'Half day', rating: 4.7 },
  { id: 8, name: 'Pad Thai Cooking', city: 'Bangkok', type: 'FOOD', cost: 1200, duration: '3 hours', rating: 4.6 },
  { id: 9, name: 'London Eye Experience', city: 'London', type: 'SIGHTSEEING', cost: 3000, duration: '1 hour', rating: 4.5 },
  { id: 10, name: 'Sydney Bridge Climb', city: 'Sydney', type: 'ADVENTURE', cost: 15000, duration: '3 hours', rating: 4.9 },
  { id: 11, name: 'Bosphorus Cruise', city: 'Istanbul', type: 'SIGHTSEEING', cost: 1800, duration: '2 hours', rating: 4.6 },
  { id: 12, name: 'Canal Boat Tour', city: 'Amsterdam', type: 'SIGHTSEEING', cost: 1600, duration: '1.5 hours', rating: 4.7 },
  { id: 13, name: 'Prague Castle Walk', city: 'Prague', type: 'CULTURE', cost: 1200, duration: '3 hours', rating: 4.8 },
  { id: 14, name: 'Pastel de Nata Tasting', city: 'Lisbon', type: 'FOOD', cost: 800, duration: '1 hour', rating: 4.9 },
  { id: 15, name: 'Gardens by the Bay', city: 'Singapore', type: 'SIGHTSEEING', cost: 2400, duration: '2.5 hours', rating: 4.8 },
  { id: 16, name: 'Table Mountain Cable Car', city: 'Cape Town', type: 'ADVENTURE', cost: 2000, duration: '2 hours', rating: 4.7 },
  { id: 17, name: 'Snorkeling Excursion', city: 'Maldives', type: 'ADVENTURE', cost: 4000, duration: 'Half day', rating: 4.9 },
  { id: 18, name: 'Oia Sunset Tour', city: 'Santorini', type: 'SIGHTSEEING', cost: 3500, duration: '3 hours', rating: 4.8 },
  { id: 19, name: 'Matcha Tea Ceremony', city: 'Kyoto', type: 'CULTURE', cost: 2500, duration: '1.5 hours', rating: 4.8 },
  { id: 20, name: 'Medina Walking Tour', city: 'Marrakech', type: 'CULTURE', cost: 1000, duration: '2 hours', rating: 4.5 },
];

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActivities = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = query ? await searchActivities(query) : { data: [] };
      let fetched = response.data?.data || response.data || [];
      if (fetched.length === 0) {
        fetched = hardcodedActivities;
      }
      setActivities(fetched);
    } catch (err) {
      setActivities(hardcodedActivities);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, loading, error, fetchActivities };
};
