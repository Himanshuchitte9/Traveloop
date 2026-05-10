import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function NoteEditor({ isOpen, onClose, note, onSave, stops }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    stopId: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        stopId: note.stopId || ''
      });
    } else {
      setFormData({ title: '', content: '', stopId: '' });
    }
  }, [note, isOpen]);

  const handleInput = (e) => {
    setFormData({ ...formData, content: e.target.value });
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;
    
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      // toast error handled in hook
    } finally {
      setIsSaving(false);
    }
  };

  const charCount = formData.content.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div 
          initial={{ opacity: 0, y: 100 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 100 }} 
          className="relative w-full max-w-[600px] bg-white rounded-t-[24px] sm:rounded-[24px] shadow-2xl z-10 flex flex-col max-h-[90vh] min-h-[50vh]"
        >
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">{note ? 'Edit Note' : 'Add Note'}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 bg-gray-50 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto">
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Note title (optional)" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                className="w-full px-4 py-3 text-lg font-bold rounded-xl border border-transparent hover:border-gray-200 focus:border-amber-400 focus:bg-white bg-gray-50 transition-colors outline-none" 
              />
            </div>
            
            {stops && stops.length > 0 && (
              <div className="mb-4">
                <select 
                  value={formData.stopId} 
                  onChange={(e) => setFormData({...formData, stopId: e.target.value})} 
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400 text-sm text-gray-700 bg-white"
                >
                  <option value="">Not linked to a stop</option>
                  {stops.map(s => (
                    <option key={s.id} value={s.id}>{s.city}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex-1 relative">
              <textarea 
                ref={textareaRef}
                autoFocus
                placeholder="Start typing your thoughts..." 
                value={formData.content} 
                onChange={handleInput} 
                className="w-full h-full min-h-[200px] p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none text-gray-700 leading-relaxed" 
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">
                {charCount} / 1000
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button 
                type="submit" 
                disabled={isSaving || !formData.content.trim()} 
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50 flex justify-center"
              >
                {isSaving ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Note'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
