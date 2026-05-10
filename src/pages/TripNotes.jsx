import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, ArrowUpDown, Layers, 
  ChevronDown, Pencil, Trash2, X, MoreHorizontal,
  Notebook
} from 'lucide-react';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../hooks/useNotes';
import { useTrips } from '../hooks/useTrips';
import toast from 'react-hot-toast';

export default function TripNotes() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { trips } = useTrips();

  // Determine which trip to use for notes
  const effectiveTripId = useMemo(() => {
    if (tripId) return tripId;
    if (trips && trips.length > 0) return trips[0].id;
    return null;
  }, [tripId, trips]);

  const { notes, loading, handleAdd, handleUpdate, handleDelete } = useNotes(effectiveTripId);

  const [currentTrip, setCurrentTrip] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewTab, setViewTab] = useState('All'); 
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemContent, setNewItemContent] = useState('');

  useEffect(() => {
    if (trips?.length > 0) {
      const found = trips.find(t => t.id === effectiveTripId) || trips[0];
      setCurrentTrip(found);
      
      // If we're on /notes without a tripId, navigate to the specific one for consistency
      if (!tripId && found.id) {
        navigate(`/trips/${found.id}/notes`, { replace: true });
      }
    }
  }, [trips, tripId, effectiveTripId, navigate]);

  const filteredNotes = useMemo(() => {
    return notes.filter(n => 
      n.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      n.content?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  const handleOpenAdd = () => {
    setEditingNote(null);
    setNewItemTitle('');
    setNewItemContent('');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (note) => {
    setEditingNote(note);
    setNewItemTitle(note.title);
    setNewItemContent(note.content);
    setIsEditorOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;
    
    if (editingNote) {
      handleUpdate(editingNote.id, { title: newItemTitle, content: newItemContent });
      toast.success('Note updated!');
    } else {
      handleAdd({ title: newItemTitle, content: newItemContent, date: new Date().toISOString() });
      toast.success('Note added!');
    }
    setIsEditorOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      <DashboardHeader user={user} logout={logout} />

      <div className="pt-20 px-6 max-w-2xl mx-auto">
        {/* Mockup Top Controls */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search bar ......"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
              />
            </div>
            <div className="flex gap-1.5">
              <ActionButton label="Group by" />
              <ActionButton label="Filter" />
              <ActionButton label="Sort by..." />
            </div>
          </div>
        </div>

        {/* Heading & Trip Selector */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-6">Trip notes</h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
              <div className="flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:border-amber-500 transition-colors">
                <span className="font-bold text-gray-700 text-sm">Trip: {currentTrip?.name || 'Paris & Rome Adventure'}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
              </div>
            </div>

            <button 
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 text-sm shadow-sm hover:border-amber-500 hover:bg-amber-50 transition-all"
            >
              + Add Note
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-2xl w-fit">
          {['All', 'by Day', 'by stop'].map(tab => (
            <button
              key={tab}
              onClick={() => setViewTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                viewTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all relative group"
                >
                  <div className="flex justify-between items-start pr-12">
                    <div>
                      <h3 className="font-black text-gray-900 text-lg mb-2">{note.title}</h3>
                      <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">
                        {note.content}
                      </p>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Day 3: June 14 2025
                      </div>
                    </div>
                  </div>

                  {/* Actions (Mock Icons matching wireframe) */}
                  <div className="absolute top-6 right-6 flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenEdit(note)}
                      className="p-2 text-gray-300 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm('Delete note?')) handleDelete(note.id);
                      }}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                <Notebook className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No notes found</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Note Editor Modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900">{editingNote ? 'Edit Note' : 'Add Note'}</h2>
                <button onClick={() => setIsEditorOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Title</label>
                  <input autoFocus type="text" value={newItemTitle} onChange={(e) => setNewItemTitle(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-amber-500 font-bold" placeholder="e.g. Hotel details" />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Content</label>
                  <textarea value={newItemContent} onChange={(e) => setNewItemContent(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-amber-500 font-medium min-h-[150px]" placeholder="Write something..." />
                </div>
                <button type="submit" className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg hover:bg-black transition-all">Save Note</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ label }) {
  return (
    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[11px] font-black text-gray-600 uppercase tracking-tighter hover:border-amber-500 hover:text-amber-500 transition-all shadow-sm">
      {label}
    </button>
  );
}
