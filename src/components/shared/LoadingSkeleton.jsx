import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 1 }) {
  const renderSkeleton = (key) => {
    switch (type) {
      case 'card':
        return (
          <div key={key} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse border border-gray-100">
            <div className="h-40 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-full mt-2" />
            </div>
            <div className="px-4 py-3 border-t border-gray-100 flex gap-3">
              <div className="h-8 bg-gray-200 rounded-lg flex-1" />
              <div className="h-8 bg-gray-200 rounded-lg flex-1" />
            </div>
          </div>
        );
      case 'list':
        return (
          <div key={key} className="bg-white rounded-xl p-4 shadow-sm animate-pulse border border-gray-100 flex gap-4 items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
          </div>
        );
      case 'text':
      default:
        return (
          <div key={key} className="animate-pulse space-y-2 w-full mb-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        );
    }
  };

  return (
    <>
      {[...Array(count)].map((_, i) => renderSkeleton(i))}
    </>
  );
}
