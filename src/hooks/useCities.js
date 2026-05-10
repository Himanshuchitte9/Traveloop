import { useState, useEffect, useCallback } from 'react';
import { getCities, searchCities } from '../api/citiesApi';

const fallbackCities = [
  { id: 1, name: 'Paris', country: 'France', region: 'Europe', costIndex: '$$$', popularity: 4.9, emoji: '🇫🇷', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Tokyo', country: 'Japan', region: 'Asia', costIndex: '$$$', popularity: 4.8, emoji: '🇯🇵', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Bali', country: 'Indonesia', region: 'Asia', costIndex: '$', popularity: 4.7, emoji: '🇮🇩', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'New York', country: 'USA', region: 'Americas', costIndex: '$$$', popularity: 4.8, emoji: '🇺🇸', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600' },
  { id: 5, name: 'Rome', country: 'Italy', region: 'Europe', costIndex: '$$', popularity: 4.7, emoji: '🇮🇹', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=600' },
  { id: 6, name: 'Barcelona', country: 'Spain', region: 'Europe', costIndex: '$$', popularity: 4.6, emoji: '🇪🇸', image: 'https://images.unsplash.com/photo-1583997051654-820ca1bc3b84?auto=format&fit=crop&q=80&w=600' },
  { id: 7, name: 'Dubai', country: 'UAE', region: 'Asia', costIndex: '$$$', popularity: 4.5, emoji: '🇦🇪', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600' },
  { id: 8, name: 'Bangkok', country: 'Thailand', region: 'Asia', costIndex: '$', popularity: 4.6, emoji: '🇹🇭', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=600' },
  { id: 9, name: 'London', country: 'UK', region: 'Europe', costIndex: '$$$', popularity: 4.7, emoji: '🇬🇧', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600' },
  { id: 10, name: 'Sydney', country: 'Australia', region: 'Americas', costIndex: '$$$', popularity: 4.5, emoji: '🇦🇺', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600' },
  { id: 11, name: 'Istanbul', country: 'Turkey', region: 'Europe', costIndex: '$$', popularity: 4.6, emoji: '🇹🇷', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=600' },
  { id: 12, name: 'Amsterdam', country: 'Netherlands', region: 'Europe', costIndex: '$$', popularity: 4.5, emoji: '🇳🇱', image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80&w=600' },
  { id: 13, name: 'Prague', country: 'Czech Republic', region: 'Europe', costIndex: '$', popularity: 4.4, emoji: '🇨🇿', image: 'https://images.unsplash.com/photo-1519677100203-ad03822ef2c7?auto=format&fit=crop&q=80&w=600' },
  { id: 14, name: 'Lisbon', country: 'Portugal', region: 'Europe', costIndex: '$', popularity: 4.5, emoji: '🇵🇹', image: 'https://images.unsplash.com/photo-1548126032-079a0fb9a4c3?auto=format&fit=crop&q=80&w=600' },
  { id: 15, name: 'Singapore', country: 'Singapore', region: 'Asia', costIndex: '$$$', popularity: 4.7, emoji: '🇸🇬', image: 'https://images.unsplash.com/photo-1525625233344-a55f5142a0c6?auto=format&fit=crop&q=80&w=600' },
  { id: 16, name: 'Cape Town', country: 'South Africa', region: 'Africa', costIndex: '$$', popularity: 4.6, emoji: '🇿🇦', image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=600' },
  { id: 17, name: 'Maldives', country: 'Maldives', region: 'Asia', costIndex: '$$$', popularity: 4.9, emoji: '🇲🇻', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600' },
  { id: 18, name: 'Santorini', country: 'Greece', region: 'Europe', costIndex: '$$$', popularity: 4.8, emoji: '🇬🇷', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600' },
  { id: 19, name: 'Kyoto', country: 'Japan', region: 'Asia', costIndex: '$$', popularity: 4.8, emoji: '🇯🇵', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600' },
  { id: 20, name: 'Marrakech', country: 'Morocco', region: 'Africa', costIndex: '$', popularity: 4.5, emoji: '🇲🇦', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=600' },
];

export const useCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCities = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = query ? await searchCities(query) : await getCities();
      let fetched = response.data?.data || response.data || [];
      if (fetched.length === 0) {
        fetched = fallbackCities;
      }
      setCities(fetched);
    } catch (err) {
      setCities(fallbackCities);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return { cities, loading, error, fetchCities };
};
