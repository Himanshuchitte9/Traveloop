import React from 'react';

export default function TripCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse border border-gray-100">
      <div className="h-40 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-full mt-2" />
      </div>
      <div className="px-4 py-3 border-t border-gray-100 flex gap-3">
        <div className="h-8 bg-gray-200 rounded-lg flex-1" />
        <div className="h-8 bg-gray-200 rounded-lg flex-1" />
        <div className="h-8 bg-gray-200 rounded-lg flex-1" />
      </div>
    </div>
  );
}
