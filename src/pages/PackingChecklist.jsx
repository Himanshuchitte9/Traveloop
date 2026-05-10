import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, Layers, ChevronDown, Plus, RefreshCcw, Share2, X, Check } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { useChecklist } from '../hooks/useChecklist';
import { useTrips } from '../hooks/useTrips';
import toast from 'react-hot-toast';

const CATEGORIES = ['Documents', 'Clothing', 'Electronics', 'Toiletries', 'Other'];

export default function PackingChecklist() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { trips } = useTrips();
  const { items, loading, handleAdd, handleToggle, handleDelete, handleReset } = useChecklist(tripId);

  const [currentTrip, setCurrentTrip] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Clothing');

  useEffect(() => {
    if (trips?.length > 0) {
      const found = trips.find(t => t.id === tripId) || trips[0];
      setCurrentTrip(found);
      if (!tripId) navigate(`/trips/${found.id}/packing`, { replace: true });
    }
  }, [trips, tripId, navigate]);

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const packedCount = filteredItems.filter(i => i.packed).length;
  const totalCount = filteredItems.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((packedCount / totalCount) * 100);

  const handleResetConfirm = () => {
    if (window.confirm('Are you sure you want to reset all items?')) {
      handleReset();
      toast.success('Checklist reset!');
    }
  };

  const handleShare = () => {
    toast.success('Checklist link copied to clipboard! 📋');
  };

  const submitAdd = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    handleAdd({ name: newItemName, category: newItemCategory, packed: false });
    setNewItemName('');
    setIsAddModalOpen(false);
    toast.success(`Added ${newItemName}!`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <DashboardHeader user={user} logout={logout} />

      <div className="pt-20 px-4 max-w-2xl mx-auto">
        {/* Mockup Header Row: Search & Action Buttons */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
              />
            </div>
            <div className="flex gap-1.5">
              <ActionButton icon={<Layers className="w-4 h-4" />} label="Group by" />
              <ActionButton icon={<Filter className="w-4 h-4" />} label="Filter" />
              <ActionButton icon={<ArrowUpDown className="w-4 h-4" />} label="Sort by..." />
            </div>
          </div>
        </div>

        {/* Packing Checklist Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900 mb-4">Packing checklist</h1>
          
          {/* Trip Selector Dropdown Style */}
          <div className="relative inline-block w-full max-w-sm">
            <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:border-amber-500 transition-colors">
              <span className="font-bold text-gray-700">Trip: {currentTrip?.name || 'Paris & Rome Adventure'}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mb-8 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-black text-gray-700 uppercase tracking-wider">
              Progress: {packedCount}/{totalCount} items packed
            </span>
            <span className="text-sm font-black text-amber-500">{progressPercent}%</span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              className="h-full bg-gray-900 rounded-full"
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Checklist Categories */}
        <div className="space-y-8 mb-12">
          {CATEGORIES.map(category => {
            const categoryItems = filteredItems.filter(i => i.category === category);
            const catPacked = categoryItems.filter(i => i.packed).length;
            const catTotal = categoryItems.length;
            
            if (catTotal === 0 && searchQuery) return null;

            return (
              <div key={category} className="group">
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-900 mb-4">
                  <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm">{category}</h3>
                  <span className="font-black text-gray-400 text-sm">{catPacked}/{catTotal}</span>
                </div>
                
                <div className="space-y-3 px-1">
                  {categoryItems.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => handleToggle(item.id)}
                      className="flex items-center gap-4 cursor-pointer group/item"
                    >
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${item.packed ? 'bg-gray-900 border-gray-900 shadow-sm' : 'border-gray-300 group-hover/item:border-amber-500'}`}>
                        {item.packed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                      </div>
                      <span className={`font-bold transition-all ${item.packed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                  {categoryItems.length === 0 && !searchQuery && (
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-widest italic py-2">No items listed</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-900 rounded-xl font-black text-gray-900 uppercase tracking-tighter hover:bg-gray-900 hover:text-white transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add item to checklist
          </button>
          <button 
            onClick={handleResetConfirm}
            className="px-6 py-3 bg-white border-2 border-gray-100 rounded-xl font-black text-gray-400 uppercase tracking-tighter hover:border-red-500 hover:text-red-500 transition-all"
          >
            Reset all
          </button>
          <button 
            onClick={handleShare}
            className="px-6 py-3 bg-white border-2 border-gray-100 rounded-xl font-black text-gray-400 uppercase tracking-tighter hover:border-amber-500 hover:text-amber-500 transition-all"
          >
            Share Checklist
          </button>
        </div>
      </div>

      {/* Simple Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900">Add Item</h2>
                <button onClick={() => setIsAddModalOpen(false)}><X className="w-6 h-6 text-gray-400" /></button>
              </div>
              <form onSubmit={submitAdd} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Item Name</label>
                  <input autoFocus type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-amber-500" placeholder="Passport, Socks, etc." />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Category</label>
                  <select value={newItemCategory} onChange={(e) => setNewItemCategory(e.target.value)} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-amber-500 appearance-none">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg hover:bg-black transition-all">Add to list</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-[11px] font-black text-gray-600 uppercase tracking-tighter hover:border-amber-500 hover:text-amber-500 transition-all shadow-sm">
      {icon}
      <span>{label}</span>
    </button>
  );
}
