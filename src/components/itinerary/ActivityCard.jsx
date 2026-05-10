import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const getTypeColor = (type) => {
  switch (type) {
    case 'SIGHTSEEING': return 'bg-teal-500';
    case 'FOOD': return 'bg-amber-500';
    case 'ADVENTURE': return 'bg-rose-500';
    case 'CULTURE': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

export default function ActivityCard({ activity, onDelete }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-3 h-3 rounded-full shrink-0 ${getTypeColor(activity.type || 'OTHER')}`} />
      
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 text-sm">{activity.name}</h4>
        <p className="text-xs text-gray-500">{activity.time || 'Anytime'} • {activity.duration}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg whitespace-nowrap">
          {activity.cost ? `₹${activity.cost}` : 'Free'}
        </span>
        
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(activity.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
