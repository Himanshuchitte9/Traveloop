import React from 'react';

export default function TimelineView({ stops }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-x-auto hide-scrollbar">
      <div className="min-w-[600px] flex gap-4 pb-4">
        {stops.map((stop, i) => (
          <div key={stop.id} className="flex-1 min-w-[250px]">
            <div className="relative mb-6">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
              <div className={`relative z-10 w-4 h-4 rounded-full mx-auto ring-4 ring-white ${['bg-amber-500', 'bg-teal-500', 'bg-purple-500', 'bg-rose-500'][i % 4]}`} />
            </div>
            
            <div className="text-center mb-4">
              <h4 className="font-bold text-gray-900">{stop.city}</h4>
              <p className="text-xs text-gray-500">{stop.activities?.length || 0} activities</p>
            </div>

            <div className="space-y-3">
              {stop.activities?.map(act => (
                <div key={act.id} className="bg-gray-50 rounded-lg p-3 text-sm border border-gray-100">
                  <div className="font-semibold text-gray-800 truncate">{act.name}</div>
                  <div className="text-xs text-gray-500">{act.time || 'Anytime'} • {act.duration}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
