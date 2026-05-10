import { useState } from 'react';
import { ArrowLeft, Plus, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNav from './BottomNav';

const notes = [
  {
    id: 1,
    preview: 'Best croissants at Boulangerie Patisserie near hotel',
    date: 'Jun 11, 2026 - 10:30 AM',
    trip: 'Summer Europe Tour',
    stop: 'Paris'
  },
  {
    id: 2,
    preview: 'Met a local guide who recommended visiting Montmartre at sunset',
    date: 'Jun 11, 2026 - 4:15 PM',
    trip: 'Summer Europe Tour',
    stop: 'Paris'
  },
  {
    id: 3,
    preview: 'Canal tour was amazing! Book the evening cruise next time',
    date: 'Jun 15, 2026 - 7:00 PM',
    trip: 'Summer Europe Tour',
    stop: 'Amsterdam'
  },
];

export default function TripNotesScreen() {
  const [showEditor, setShowEditor] = useState(false);
  const [noteText, setNoteText] = useState('');

  const handleSave = () => {
    setNoteText('');
    setShowEditor(false);
  };

  if (showEditor) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowEditor(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            <h2 className="text-xl text-[#1A1A1A]">New Note</h2>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors"
          >
            Save
          </button>
        </div>

        <div className="p-6">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your note here..."
            className="w-full h-[calc(100vh-200px)] px-4 py-3 bg-[#F8F8F8] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-[#1A1A1A] resize-none"
            autoFocus
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <Link to="/itinerary-view" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
        </Link>
        <h2 className="text-xl text-[#1A1A1A]">Trip Notes</h2>
      </div>

      <div className="p-6 space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-[#F8F8F8] rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-[#1A1A1A] mb-3">{note.preview}</p>
            <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
              <Calendar className="w-4 h-4" />
              <span>{note.date}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 bg-[#F5A623]/10 text-[#F5A623] text-xs rounded-full">
                {note.trip}
              </span>
              <span className="px-3 py-1 bg-gray-200 text-[#6B6B6B] text-xs rounded-full">
                {note.stop}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowEditor(true)}
        className="fixed bottom-20 right-6 bg-[#F5A623] text-white p-4 rounded-full shadow-lg hover:bg-[#E09612] transition-colors z-10"
      >
        <Plus className="w-6 h-6" />
      </button>

      <BottomNav />
    </div>
  );
}
