import React from 'react';
import { motion } from 'framer-motion';

const getTypeColor = (type) => {
  switch (type) {
    case 'SIGHTSEEING': return 'bg-teal-500';
    case 'FOOD': return 'bg-amber-500';
    case 'ADVENTURE': return 'bg-rose-500';
    case 'CULTURE': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

export default function DayBlock({ stop }) {
  if (!stop.activities || stop.activities.length === 0) {
    return <p className="text-sm text-gray-500 italic">No activities planned here yet.</p>;
  }

  return (
    <div className="relative pl-6 sm:pl-8 border-l-2 border-gray-100 space-y-6">
      {stop.activities.map((act, index) => (
        <motion.div 
          key={act.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className={`absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full ring-4 ring-white ${getTypeColor(act.type)}`} />
          
          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
            <div className="sm:w-24 shrink-0 text-sm font-bold text-gray-500 mt-0.5">
              {act.time || 'Anytime'}
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex justify-between items-start gap-4 mb-2">
                <h4 className="font-bold text-gray-900">{act.name}</h4>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full tracking-wider ${getTypeColor(act.type)} text-white`}>
                  {act.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{act.description}</p>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="text-gray-500">{act.duration}</span>
                <span className="text-gray-300">•</span>
                <span className="text-green-600">{act.cost ? `₹${act.cost}` : 'Free'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
