import { useState, useEffect, useCallback } from 'react';
import { getNotes, addNote, updateNote, deleteNote } from '../api/notesApi';
import toast from 'react-hot-toast';

export const useNotes = (tripId) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = useCallback(async () => {
    if (!tripId) return;
    setLoading(true);
    try {
      const res = await getNotes(tripId);
      // Sort by createdAt desc
      let data = res.data?.data || res.data || [];
      data = data.sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()));
      setNotes(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAdd = async (data) => {
    try {
      await addNote({ ...data, tripId });
      toast.success('Note added');
      fetchNotes();
    } catch (err) {
      toast.error('Failed to add note');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateNote(id, data);
      toast.success('Note updated');
      fetchNotes();
    } catch (err) {
      toast.error('Failed to update note');
    }
  };

  const handleDelete = async (id) => {
    const previous = [...notes];
    setNotes(notes.filter(n => n.id !== id));
    
    // Setup undo logic
    let undoClicked = false;
    
    toast((t) => (
      <div className="flex items-center gap-3">
        <span>Note deleted.</span>
        <button 
          onClick={() => {
            undoClicked = true;
            toast.dismiss(t.id);
            setNotes(previous); // Restore in UI
          }}
          className="text-amber-500 font-bold text-sm"
        >
          Undo
        </button>
      </div>
    ), { duration: 4000 });

    setTimeout(async () => {
      if (!undoClicked) {
        try {
          await deleteNote(id);
        } catch (err) {
          setNotes(previous);
          toast.error('Failed to delete note');
        }
      }
    }, 4000);
  };

  return { notes, loading, error, handleAdd, handleUpdate, handleDelete };
};
