import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ChecklistItem from './ChecklistItem';

const categoryIcons = {
  Clothing: '👔',
  Documents: '📄',
  Electronics: '💻',
  Toiletries: '🧴',
  Other: '📦'
};

export default function ChecklistSection({ category, items, onToggle, onDelete, onAddClick }) {
  const [expanded, setExpanded] = useState(true);
  
  const packedCount = items.filter(i => i.packed).length;
  const totalCount = items.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{categoryIcons[category] || '📦'}</span>
          <h3 className="font-bold text-gray-900 text-lg">{category}</h3>
          <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
            {packedCount}/{totalCount}
          </span>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            {items.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-gray-500 mb-2">No items in this category yet</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddClick(category); }}
                  className="text-sm font-semibold text-amber-500 hover:text-amber-600"
                >
                  + Add Item
                </button>
              </div>
            ) : (
              <div>
                <AnimatePresence>
                  {items.map(item => (
                    <ChecklistItem 
                      key={item.id} 
                      item={item} 
                      onToggle={onToggle} 
                      onDelete={onDelete} 
                    />
                  ))}
                </AnimatePresence>
                <div className="p-3 border-t border-gray-100 bg-gray-50/30">
                  <button 
                    onClick={() => onAddClick(category)}
                    className="text-sm font-semibold text-amber-500 hover:text-amber-600 w-full text-left px-2"
                  >
                    + Add Item to {category}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
