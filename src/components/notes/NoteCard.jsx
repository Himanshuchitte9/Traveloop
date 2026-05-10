import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function NoteCard({ note, onEdit, onDelete, stopName }) {
  const timeAgo = note.createdAt ? formatDistanceToNow(new Date(note.createdAt), { addSuffix: true }) : 'Just now';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-5 group relative"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-2">
          {note.title && <h3 className="font-bold text-gray-900">{note.title}</h3>}
          {stopName && (
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-full self-start">
              {stopName}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400 shrink-0 ml-2">{timeAgo}</span>
      </div>
      
      <p className="text-gray-600 text-sm whitespace-pre-wrap">{note.content}</p>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onEdit(note)}
          className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onDelete(note.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
