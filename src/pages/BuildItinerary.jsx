import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, IndianRupee, Edit3, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';

const initialSections = [
  { id: 1, title: 'Flight to Paris', description: 'Air France AF257, Terminal 2E. Remember to check-in 24h before.', dateRange: 'May 10 - May 11', budget: '₹45,000' },
  { id: 2, title: 'Hotel Stay', description: 'Le Bristol Paris. 112 Rue du Faubourg Saint-Honoré, 75008 Paris.', dateRange: 'May 11 - May 15', budget: '₹1,20,000' },
  { id: 3, title: 'Museum Tour', description: 'Louvre Museum and Musée d\'Orsay guided tours. Book skip-the-line tickets.', dateRange: 'May 12 - May 12', budget: '₹8,500' },
];

export default function BuildItinerary() {
  const { user, logout } = useAuth();
  const { tripId } = useParams();
  const [sections, setSections] = useState(initialSections);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const addSection = () => {
    const newId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 1;
    const newSection = {
      id: newId,
      title: `Section ${newId}:`,
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
      dateRange: 'xxx to yyy',
      budget: '₹0'
    };
    setSections([...sections, newSection]);
    toast.success('New section added!');
  };

  const deleteSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
    toast.error('Section removed');
  };

  const startEditing = (section) => {
    setEditingId(section.id);
    setEditValues({ ...section });
  };

  const saveEdit = () => {
    setSections(sections.map(s => s.id === editingId ? editValues : s));
    setEditingId(null);
    toast.success('Section updated');
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <DashboardHeader user={user} logout={logout} />

      <div className="pt-20 px-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8 px-1">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-500 text-white rounded-2xl shadow-lg shadow-teal-100">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Build Itinerary</h1>
              <p className="text-xs text-gray-500">Plan your trip step by step</p>
            </div>
          </div>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
            {sections.length} Sections
          </span>
        </div>

        <div className="space-y-4 mb-8">
          <AnimatePresence initial={false}>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-5">
                  {editingId === section.id ? (
                    <div className="space-y-3">
                      <input 
                        className="w-full text-lg font-bold text-gray-900 border-b border-teal-200 outline-none pb-1"
                        value={editValues.title}
                        onChange={(e) => setEditValues({...editValues, title: e.target.value})}
                      />
                      <textarea 
                        className="w-full text-sm text-gray-500 border rounded-lg p-2 outline-none focus:border-teal-500 h-20 resize-none"
                        value={editValues.description}
                        onChange={(e) => setEditValues({...editValues, description: e.target.value})}
                      />
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-teal-500" />
                          <input 
                            className="w-full pl-6 pr-2 py-1.5 text-xs border rounded-full outline-none"
                            value={editValues.dateRange}
                            onChange={(e) => setEditValues({...editValues, dateRange: e.target.value})}
                          />
                        </div>
                        <div className="flex-1 relative">
                          <IndianRupee className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-teal-500" />
                          <input 
                            className="w-full pl-6 pr-2 py-1.5 text-xs border rounded-full outline-none"
                            value={editValues.budget}
                            onChange={(e) => setEditValues({...editValues, budget: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button onClick={cancelEdit} className="p-2 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                        <button onClick={saveEdit} className="p-2 text-teal-500 hover:text-teal-600"><Check className="w-5 h-5" /></button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {section.title.startsWith('Section') ? section.title : `Section ${index + 1}: ${section.title}`}
                        </h3>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => startEditing(section)}
                            className="p-1.5 text-gray-400 hover:text-teal-500 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteSection(section.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {section.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-teal-100 text-[11px] font-semibold text-teal-700 bg-teal-50/30">
                          <Calendar className="w-3 h-3" />
                          Date Range: {section.dateRange}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-teal-100 text-[11px] font-semibold text-teal-700 bg-teal-50/30">
                          <IndianRupee className="w-3 h-3" />
                          Budget: {section.budget}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addSection}
          className="w-full flex items-center justify-center gap-2 py-4 bg-white border-2 border-dashed border-teal-200 text-teal-600 font-bold rounded-[24px] hover:border-teal-500 hover:bg-teal-50 transition-all group"
        >
          <div className="p-1 bg-teal-100 rounded-full group-hover:bg-teal-200 transition-colors">
            <Plus className="w-5 h-5" />
          </div>
          Add another Section
        </motion.button>
      </div>
    </div>
  );
}
