import React from 'react';
import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, subtitle, actionLabel, onAction }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {Icon && (
        <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6">
          <Icon className="w-12 h-12 text-amber-500" strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      {subtitle && <p className="text-gray-500 mb-6 max-w-sm">{subtitle}</p>}
      
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
