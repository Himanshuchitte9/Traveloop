import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Calendar, ChevronDown, ChevronUp, Plus, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import ActivityCard from './ActivityCard';

const colors = ['bg-amber-500', 'bg-teal-500', 'bg-purple-500', 'bg-rose-500'];

export default function StopCard({ stop, index, onAddActivity, onEdit, onDelete, onDeleteActivity }) {
  const [expanded, setExpanded] = useState(false);
  
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: stop.id });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : 1 };
  
  const barColor = colors[index % colors.length];
  const dateString = stop.startDate && stop.endDate 
    ? `${format(new Date(stop.startDate), 'MMM d')} - ${format(new Date(stop.endDate), 'MMM d, yyyy')}`
    : 'Dates TBD';

  return (
    <div ref={setNodeRef} style={style} className={`bg-white rounded-2xl shadow-sm border border-gray-100 flex overflow-hidden mb-4 ${isDragging ? 'shadow-xl ring-2 ring-amber-500 opacity-90' : ''}`}>
      {/* Drag handle & color bar */}
      <div 
        {...attributes} 
        {...listeners} 
        className={`w-12 flex-shrink-0 ${barColor} flex items-center justify-center cursor-grab active:cursor-grabbing text-white/50 hover:text-white transition-colors`}
      >
        <GripVertical className="w-6 h-6" />
      </div>

      <div className="flex-1 p-4 overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Stop {index + 1}</span>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs font-bold rounded-full whitespace-nowrap">
                {stop.activities?.length || 0} activities
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight truncate">{stop.city}</h3>
            <p className="text-sm text-gray-500 truncate">{stop.country}</p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => onAddActivity(stop.id)} className="p-2 text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors" title="Add Activity">
              <Plus className="w-5 h-5" />
            </button>
            <button onClick={() => onEdit(stop)} className="p-2 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors" title="Edit Stop">
              <Edit2 className="w-5 h-5" />
            </button>
            <button onClick={() => onDelete(stop.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors" title="Delete Stop">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Date Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">{dateString}</span>
          </div>
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            {expanded ? 'Hide Activities' : 'Show Activities'}
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Collapsed Activities Area */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-2">
                {stop.activities?.length > 0 ? (
                  stop.activities.map(act => (
                    <ActivityCard key={act.id} activity={act} onDelete={onDeleteActivity} />
                  ))
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                    <p className="text-sm text-gray-500 mb-2">No activities planned yet.</p>
                    <button onClick={() => onAddActivity(stop.id)} className="text-sm text-amber-500 font-semibold hover:underline">
                      + Add your first activity
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
