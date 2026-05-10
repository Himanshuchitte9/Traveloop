import React, { useState } from 'react';
import { Star, Check } from 'lucide-react';
import { useTrips } from '../../hooks/useTrips';
import { addStop } from '../../api/stopsApi';
import toast from 'react-hot-toast';

const gradients = [
  'from-amber-400 to-orange-500',
  'from-rose-400 to-red-500',
  'from-teal-400 to-emerald-500',
  'from-indigo-400 to-purple-500',
  'from-blue-400 to-cyan-500'
];

export default function CityCard({ city }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addedTrips, setAddedTrips] = useState(new Set());
  
  const { trips, loading } = useTrips();

  const handleAdd = async (tripId) => {
    setIsAdding(true);
    try {
      await addStop({
        tripId,
        city: city.name,
        country: city.country,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000).toISOString()
      });
      toast.success(`${city.name} added to your trip!`);
      setAddedTrips(new Set([...addedTrips, tripId]));
    } catch (err) {
      toast.error('Failed to add stop');
    } finally {
      setIsAdding(false);
      setShowDropdown(false);
    }
  };

  const charCode = city.name.charCodeAt(0) || 0;
  const gradient = gradients[charCode % gradients.length];

  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full relative group">
      <div className={`h-[140px] relative overflow-hidden ${!city.image ? `bg-gradient-to-br ${gradient}` : ''}`}>
        {city.image && (
          <img src={city.image} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
            {city.region}
          </span>
        </div>
        <div className="absolute bottom-3 left-4">
          <h3 className="text-xl font-bold text-white drop-shadow-md">{city.name}</h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{city.emoji}</span>
          <span className="text-gray-600 font-medium text-sm">{city.country}</span>
        </div>

        <div className="flex items-center justify-between mb-4 mt-auto pt-2">
          <div className="flex gap-1 text-amber-500 font-bold text-sm">
            {city.costIndex}
          </div>
          <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            {city.popularity}
          </div>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            Add to Trip
          </button>

          {showDropdown && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 max-h-48 overflow-y-auto">
              <div className="px-3 pb-2 mb-2 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Select a trip
              </div>
              {loading ? (
                <div className="p-3 text-sm text-gray-500 text-center">Loading trips...</div>
              ) : trips.length === 0 ? (
                <div className="p-3 text-sm text-gray-500 text-center">No active trips</div>
              ) : (
                trips.map(trip => {
                  const isAdded = addedTrips.has(trip.id);
                  return (
                    <button
                      key={trip.id}
                      disabled={isAdded || isAdding}
                      onClick={() => handleAdd(trip.id)}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                        isAdded ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="truncate pr-2">{trip.name}</span>
                      {isAdded && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
