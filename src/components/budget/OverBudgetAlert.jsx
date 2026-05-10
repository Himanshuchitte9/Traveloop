import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OverBudgetAlert({ overBudgetDays, average }) {
  if (!overBudgetDays || overBudgetDays.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6"
    >
      <div className="flex items-start gap-3">
        <div className="bg-red-100 p-2 rounded-full shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h4 className="font-bold text-red-900 mb-1">Budget Alert</h4>
          <p className="text-sm text-red-800 mb-2">
            Some days are exceeding your average daily budget of ₹{average.toLocaleString()}.
          </p>
          <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
            {overBudgetDays.map(day => (
              <li key={day.day}>
                <span className="font-semibold">{day.day}</span> is over by ₹{(day.cost - average).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
