import React, { useState } from 'react';
import { Star, MapPin, Clock, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useTrips } from '../../hooks/useTrips';
import { addActivity } from '../../api/activitiesApi';
import toast from 'react-hot-toast';

const getTypeColor = (type) => {
  switch (type) {
    case 'SIGHTSEEING': return 'bg-teal-100 text-teal-700';
    case 'FOOD': return 'bg-amber-100 text-amber-700';
    case 'ADVENTURE': return 'bg-rose-100 text-rose-700';
    case 'CULTURE': return 'bg-purple-100 text-purple-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getGradient = (type) => {
  switch (type) {
    case 'SIGHTSEEING': return 'from-teal-400 to-emerald-500';
    case 'FOOD': return 'from-amber-400 to-orange-500';
    case 'ADVENTURE': return 'from-rose-400 to-red-500';
    case 'CULTURE': return 'from-indigo-400 to-purple-500';
    default: return 'from-gray-400 to-gray-500';
  }
};

export default function ActivitySearchCard({ activity }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addedStopId, setAddedStopId] = useState(null);

  const { trips, loading } = useTrips();

  const handleAdd = async (stopId) => {
    setIsAdding(true);
    try {
      await addActivity({
        stopId,
        name: activity.name,
        type: activity.type,
        cost: activity.cost,
        duration: activity.duration,
        description: activity.description || 'Discovered via Traveloop'
      });
      toast.success(`${activity.name} added to your itinerary!`);
      setAddedStopId(stopId);
    } catch (err) {
      toast.error('Failed to add activity');
    } finally {
      setIsAdding(false);
      setShowDropdown(false);
      setSelectedTrip(null);
    }
  };

  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full relative">
      <div className={`h-[120px] bg-gradient-to-br ${getGradient(activity.type)} p-3 flex flex-col justify-between`}>
        <div className="flex justify-start">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm ${getTypeColor(activity.type)}`}>
            {activity.type}
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 leading-tight mb-2 text-[16px]">{activity.name}</h3>
        
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{activity.city}</span>
        </div>

        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{activity.duration}</span>
          </div>
          <div className="font-semibold text-gray-900">
            ₹{activity.cost?.toLocaleString() || 0}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-3">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          {activity.rating}
        </div>

        <p className={`text-xs text-gray-500 ${expanded ? '' : 'line-clamp-2'}`}>
          {activity.description || "Experience the best of " + activity.city + " with this highly rated activity. Perfect for travelers looking to explore."}
        </p>
        
        <button onClick={() => setExpanded(!expanded)} className="text-xs text-amber-500 font-medium mt-1 mb-4 flex items-center self-start">
          {expanded ? <>Show less <ChevronUp className="w-3 h-3 ml-1" /></> : <>Read more <ChevronDown className="w-3 h-3 ml-1" /></>}
        </button>

        <div className="relative mt-auto">
          {addedStopId ? (
            <button disabled className="w-full bg-green-50 text-green-600 font-semibold py-2.5 rounded-xl text-sm flex justify-center items-center gap-2">
              <Check className="w-4 h-4" /> Added
            </button>
          ) : (
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
            >
              Add to Trip
            </button>
          )}

          {showDropdown && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20">
              <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase">
                  {selectedTrip ? 'Select Stop' : 'Select Trip'}
                </span>
                {selectedTrip && (
                  <button onClick={() => setSelectedTrip(null)} className="text-[10px] text-amber-500 hover:underline">Back</button>
                )}
              </div>
              
              <div className="max-h-40 overflow-y-auto">
                {loading ? (
                  <div className="p-2 text-xs text-gray-500 text-center">Loading...</div>
                ) : !selectedTrip ? (
                  trips.length === 0 ? (
                    <div className="p-2 text-xs text-gray-500 text-center">No active trips</div>
                  ) : (
                    trips.map(trip => (
                      <button key={trip.id} onClick={() => setSelectedTrip(trip)} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg truncate">
                        {trip.name}
                      </button>
                    ))
                  )
                ) : (
                  selectedTrip.stops?.length === 0 ? (
                    <div className="p-2 text-xs text-gray-500 text-center">No stops in this trip</div>
                  ) : (
                    selectedTrip.stops?.map(stop => (
                      <button key={stop.id} disabled={isAdding} onClick={() => handleAdd(stop.id)} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg truncate">
                        {stop.city}
                      </button>
                    ))
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
