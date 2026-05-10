import React from 'react';
import { motion } from 'framer-motion';
import { Plane, CalendarX, ArchiveX } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TripEmptyState({ activeTab }) {
  let title = "No trips yet! Start planning your first adventure.";
  let Icon = Plane;

  if (activeTab === 'Upcoming') {
    title = "No upcoming trips. Time to plan something exciting!";
    Icon = CalendarX;
  } else if (activeTab === 'Past') {
    title = "No past trips found.";
    Icon = ArchiveX;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-32 h-32 bg-amber-50 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-16 h-16 text-amber-500" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-6 max-w-sm">{title}</h3>
      {activeTab !== 'Past' && (
        <Link 
          to="/create-trip" 
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm"
        >
          Plan New Trip
        </Link>
      )}
    </motion.div>
  );
}
