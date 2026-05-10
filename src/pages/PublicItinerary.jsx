import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, Lock, ArrowLeft } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import toast from 'react-hot-toast';

import DayBlock from '../components/itinerary/DayBlock';
import { useAuth } from '../context/AuthContext';

export default function PublicItinerary() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTrip({
        id: tripId,
        name: 'Shared Adventure',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000 * 5).toISOString(),
        creatorName: 'Alex Traveler',
        stops: [
          {
            id: '1', city: 'Paris', country: 'France',
            activities: [{ id: 'a1', name: 'Eiffel Tower', type: 'SIGHTSEEING', duration: '2h', cost: 2500, time: '10:00 AM', description: 'Visit the iconic tower.' }]
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [tripId]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  const handleDuplicate = () => {
    if (!user) {
      toast('Please log in to save this trip.', { icon: '🔒' });
      navigate('/login');
    } else {
      toast.success('Trip copied to your account!');
      navigate('/my-trips');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
        <Lock className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">This itinerary is private or does not exist.</h2>
        <p className="text-gray-500 mb-8 max-w-md">The creator may have removed it or changed its visibility settings.</p>
        <button onClick={() => navigate('/')} className="bg-amber-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors">
          Back to Home
        </button>
      </div>
    );
  }

  const dateString = trip.startDate && trip.endDate ? `${format(new Date(trip.startDate), 'MMM d, yyyy')} - ${format(new Date(trip.endDate), 'MMM d, yyyy')}` : 'Dates TBD';
  const tripDays = trip.startDate && trip.endDate ? differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1 : 0;
  const totalActivities = trip.stops.reduce((acc, stop) => acc + (stop.activities?.length || 0), 0);
  const totalCost = trip.stops.reduce((acc, stop) => acc + (stop.activities?.reduce((sum, act) => sum + (act.cost || 0), 0) || 0), 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 pt-12 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white mb-6 flex items-center gap-2 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            ✈️ Shared Itinerary
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{trip.name}</h1>
          <p className="text-amber-50 text-lg mb-2">{dateString}</p>
          <p className="text-amber-100 text-sm">Created by {trip.creatorName}</p>
        </div>
        <div className="absolute right-0 top-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Public Link</label>
            <div className="flex bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              <input type="text" readOnly value={window.location.href} className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-600 outline-none" />
              <button onClick={copyLink} className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 border-l border-gray-200 transition-colors font-medium text-sm flex items-center gap-2">
                <Copy className="w-4 h-4" /> Copy
              </button>
            </div>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <button onClick={handleDuplicate} className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white px-6 py-3.5 rounded-xl font-bold transition-colors shadow-sm">
              Copy to My Account
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {trip.stops.map((stop, i) => (
            <div key={stop.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className={`p-4 ${['bg-amber-500', 'bg-teal-500', 'bg-purple-500', 'bg-rose-500'][i % 4]} text-white`}>
                <h2 className="text-xl font-bold">{stop.city}, {stop.country}</h2>
              </div>
              <div className="p-4 sm:p-6">
                <DayBlock stop={stop} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe z-30 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between overflow-x-auto hide-scrollbar gap-4">
          <div className="shrink-0">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Destinations</p>
            <p className="font-bold text-gray-900">{trip.stops.length}</p>
          </div>
          <div className="shrink-0">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Days</p>
            <p className="font-bold text-gray-900">{tripDays}</p>
          </div>
          <div className="shrink-0">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Activities</p>
            <p className="font-bold text-gray-900">{totalActivities}</p>
          </div>
          <div className="shrink-0">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Est. Cost</p>
            <p className="font-bold text-gray-900">₹{totalCost.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
