import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { format, isBefore, startOfDay } from 'date-fns';
import { getDashboardTrips } from '../../api/dashboardApi';
import EmptyState from '../shared/EmptyState';
import LoadingSkeleton from '../shared/LoadingSkeleton';

export default function PreviousTrips({ searchQuery = '', activeFilter = {}, activeSort = 'Newest First', activeGroup = 'none' }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await getDashboardTrips();
        const allTrips = res.data?.data || res.data || [];
        
        // Filter for past trips only (endDate before today)
        const pastTrips = allTrips.filter(trip => {
          if (!trip.endDate) return false;
          return isBefore(new Date(trip.endDate), startOfDay(new Date()));
        });
        
        setTrips(pastTrips);
      } catch (err) {
        console.error("Failed to fetch dashboard trips", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const filteredTrips = trips.filter(trip => {
    const query = searchQuery.toLowerCase();
    const matchSearch = trip.name.toLowerCase().includes(query) || 
                       trip.destination?.toLowerCase().includes(query);
    return matchSearch;
  }).sort((a, b) => {
    if (activeSort === 'Newest First') return new Date(b.startDate) - new Date(a.startDate);
    if (activeSort === 'Oldest First') return new Date(a.startDate) - new Date(b.startDate);
    if (activeSort === 'A-Z') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="text-base font-bold text-gray-900 whitespace-nowrap">Previous Trips</h2>
        <div className="flex-1 h-[1px] bg-gray-200 mt-0.5" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LoadingSkeleton type="card" count={3} />
        </div>
      ) : filteredTrips.length === 0 ? (
        searchQuery ? (
          <p className="text-sm text-gray-400 py-8 italic text-center">No previous trips matching "{searchQuery}"</p>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
            <p className="text-gray-500 mb-4">No previous trips. Your completed trips will appear here.</p>
            {/* Optional: Plan trip button could go here if zero trips at all */}
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredTrips.map((trip) => (
            <PreviousTripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}

function PreviousTripCard({ trip }) {
  const navigate = useNavigate();
  
  const defaultImages = [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600', // Paris
    'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=600', // Venice
    'https://images.unsplash.com/photo-1512453979798-5eaad0df3b03?auto=format&fit=crop&q=80&w=600', // Dubai
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600', // Bali
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600', // Japan
  ];

  const getTripImage = (name) => {
    const charCode = name.charCodeAt(0) || 0;
    return defaultImages[charCode % defaultImages.length];
  };

  const dateString = trip.startDate && trip.endDate 
    ? `${format(new Date(trip.startDate), 'MMM d')} - ${format(new Date(trip.endDate), 'MMM d, yyyy')}`
    : 'Completed Adventure';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/trips/${trip.id}/view`)}
      className="group bg-white rounded-[32px] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden cursor-pointer h-[320px] flex flex-col transition-all"
    >
      {/* Image Area */}
      <div className="relative h-[200px] shrink-0 overflow-hidden">
        <img 
          src={trip.coverPhoto || getTripImage(trip.name)} 
          alt={trip.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[9px] font-black text-white uppercase tracking-[0.2em]">
          PAST ADVENTURE
        </div>

        <div className="absolute bottom-4 left-6 right-6">
          <h3 className="text-white font-black text-xl leading-tight truncate tracking-tight">{trip.name}</h3>
          <div className="flex items-center gap-1.5 text-white/70 text-[10px] font-bold uppercase tracking-wider mt-1">
             <MapPin className="w-3 h-3" /> {trip.destination || 'Global'}
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {dateString}
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-500 font-bold">
            <MapPin className="w-3.5 h-3.5" />
            {trip.stopsCount || 0} cities
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm font-bold text-gray-900">
            {trip.estimatedBudget ? `₹${trip.estimatedBudget.toLocaleString()}` : 'Free'}
          </div>
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold transition-all group-hover:gap-2">
            View Trip <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
