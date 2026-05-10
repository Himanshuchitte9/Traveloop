import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';
import { MapPin, Calendar, MoreVertical, Eye, Edit2, Trash2 } from 'lucide-react';

const gradients = [
  'from-amber-400 to-orange-500',
  'from-rose-400 to-red-500',
  'from-teal-400 to-emerald-500',
  'from-indigo-400 to-purple-500',
  'from-blue-400 to-cyan-500',
  'from-lime-400 to-green-500'
];

export default function TripCard({ trip, onEditClick, onDeleteClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine status
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const today = new Date();
  
  let status = 'Upcoming';
  let statusColor = 'text-green-700 bg-green-100';
  
  if (today > end) {
    status = 'Past';
    statusColor = 'text-gray-700 bg-gray-100';
  } else if (today >= start && today <= end) {
    status = 'Ongoing';
    statusColor = 'text-amber-700 bg-amber-100';
  }

  // Calculate days
  const days = differenceInDays(end, start) + 1;
  const dateString = `${format(start, 'MMM d')} — ${format(end, 'MMM d, yyyy')}`;

  // Gradient fallback
  const charCode = trip.name ? trip.name.charCodeAt(0) : 0;
  const gradient = gradients[charCode % gradients.length];

  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative group border border-gray-100">
      {/* Top Cover Section */}
      <div className={`h-[160px] relative ${!trip.coverPhoto ? `bg-gradient-to-br ${gradient}` : ''}`}>
        {trip.coverPhoto && (
          <img src={trip.coverPhoto} alt={trip.name} className="w-full h-full object-cover" />
        )}
        
        {/* Badges */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${statusColor}`}>
            {status}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-500" />
            {trip.stops?.length || 0} stops
          </span>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-4 relative">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-[18px] text-gray-900 truncate" title={trip.name}>{trip.name}</h3>
          
          {/* 3 Dot Menu */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                <Link to={`/trips/${trip.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                  <Eye className="w-4 h-4" /> View
                </Link>
                <button onClick={() => { setMenuOpen(false); onEditClick(trip); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => { setMenuOpen(false); onDeleteClick(trip); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-1 mb-2">
          <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{dateString}</span>
          </div>
          <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {days > 0 ? `${days} days` : '1 day'}
          </span>
        </div>

        <p className="text-[13px] text-gray-500 line-clamp-2 mt-2 min-h-[38px]">
          {trip.description || "No description provided."}
        </p>
      </div>

      {/* Bottom Action Row */}
      <div className="border-t border-gray-100 p-3 flex gap-2">
        <Link 
          to={`/trips/${trip.id}`}
          className="flex-1 flex justify-center items-center gap-1.5 py-2 rounded-lg text-teal-600 hover:bg-teal-50 text-sm font-semibold transition-colors"
        >
          <Eye className="w-4 h-4" /> View
        </Link>
        <button 
          onClick={() => onEditClick(trip)}
          className="flex-1 flex justify-center items-center gap-1.5 py-2 rounded-lg text-amber-500 hover:bg-amber-50 text-sm font-semibold transition-colors"
        >
          <Edit2 className="w-4 h-4" /> Edit
        </button>
        <button 
          onClick={() => onDeleteClick(trip)}
          className="flex-1 flex justify-center items-center gap-1.5 py-2 rounded-lg text-red-500 hover:bg-red-50 text-sm font-semibold transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
}
