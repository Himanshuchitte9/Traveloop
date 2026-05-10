import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Check } from 'lucide-react';

export default function ChecklistItem({ item, onToggle, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center justify-between group py-3 px-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
    >
      <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => onToggle(item.id)}>
        <motion.div 
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
            item.packed ? 'bg-amber-500 border-amber-500' : 'border-gray-300 bg-transparent'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {item.packed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </motion.div>
        
        <span className={`text-sm font-medium transition-colors ${item.packed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
          {item.name}
        </span>
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} 
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
