import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share, Calendar as CalendarIcon, List } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';

import PageHeader from '../components/shared/PageHeader';
import LoadingSkeleton from '../components/shared/LoadingSkeleton';
import EmptyState from '../components/shared/EmptyState';
import DayBlock from '../components/itinerary/DayBlock';
import TimelineView from '../components/itinerary/TimelineView';
import { useItinerary } from '../hooks/useItinerary';
import { useTrips } from '../hooks/useTrips';

export default function ItineraryView() {
  const { tripId } = useParams();
  const { trips } = useTrips();
  const { stops, loading } = useItinerary(tripId);

  const [trip, setTrip] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'timeline'

  useEffect(() => {
    if (trips && trips.length > 0) {
      setTrip(trips.find(t => t.id === tripId));
    }
  }, [trips, tripId]);

  const handleShare = () => {
    const url = `${window.location.origin}/share/${tripId}`;
    navigator.clipboard.writeText(url);
    toast.success('Public link copied to clipboard!');
  };

  const totalActivities = stops.reduce((acc, stop) => acc + (stop.activities?.length || 0), 0);
  const totalCost = stops.reduce((acc, stop) => acc + (stop.activities?.reduce((sum, act) => sum + (Number(act.cost) || 0), 0) || 0), 0);
  const tripDays = trip && trip.startDate && trip.endDate ? differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#FAFAFA] pb-32 pt-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title={trip?.name || 'Loading...'}
          subtitle="Itinerary View"
          backPath="/my-trips"
          actionButton={
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
                  <List className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('timeline')} className={`p-2 rounded-md transition-colors ${viewMode === 'timeline' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>
                  <CalendarIcon className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 border border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold py-2 px-4 rounded-xl transition-colors"
              >
                <Share className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          }
        />

        <div className="mt-8">
          {loading ? (
            <LoadingSkeleton type="text" count={5} />
          ) : stops.length === 0 ? (
            <EmptyState 
              title="Empty Itinerary"
              subtitle="No stops or activities added yet."
            />
          ) : (
            viewMode === 'list' ? (
              <div className="space-y-8">
                {stops.map((stop, i) => (
                  <div key={stop.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className={`p-4 ${['bg-amber-500', 'bg-teal-500', 'bg-purple-500', 'bg-rose-500'][i % 4]} text-white`}>
                      <h2 className="text-xl font-bold">{stop.city}, {stop.country}</h2>
                      <p className="text-white/80 text-sm">
                        {stop.startDate && stop.endDate ? `${format(new Date(stop.startDate), 'MMM d')} - ${format(new Date(stop.endDate), 'MMM d, yyyy')}` : 'Dates TBD'}
                      </p>
                    </div>
                    <div className="p-4 sm:p-6">
                      <DayBlock stop={stop} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <TimelineView stops={stops} />
            )
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex gap-4 sm:gap-8">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Days</p>
              <p className="font-bold text-gray-900">{tripDays}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Activities</p>
              <p className="font-bold text-gray-900">{totalActivities}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Est. Cost</p>
              <p className="font-bold text-gray-900">₹{totalCost.toLocaleString()}</p>
            </div>
          </div>
          <button 
            onClick={handleShare}
            className="bg-amber-500 text-white p-3 rounded-xl hover:bg-amber-600 transition-colors shadow-sm"
          >
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
