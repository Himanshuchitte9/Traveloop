import React from 'react';
import { Car, Home, Camera, Coffee } from 'lucide-react';

const icons = {
  Car: <Car className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  Coffee: <Coffee className="w-5 h-5" />
};

export default function BudgetSummaryCard({ item, total }) {
  const percentage = total > 0 ? Math.round((item.amount / total) * 100) : 0;
  
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
            {icons[item.icon] || <Camera className="w-5 h-5" />}
          </div>
          <span className="font-semibold text-gray-700">{item.name}</span>
        </div>
        <span className="text-sm font-bold text-gray-400">{percentage}%</span>
      </div>
      
      <div className="mb-2">
        <span className="text-xl font-bold text-gray-900">₹{item.amount.toLocaleString()}</span>
      </div>
      
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%`, backgroundColor: item.color }} 
        />
      </div>
    </div>
  );
}
