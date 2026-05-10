import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useCities } from '../../hooks/useCities';

export default function StopForm({ isOpen, onClose, stop, onSave }) {
  const { cities } = useCities();
  const [formData, setFormData] = useState({
    city: '',
    country: '',
    startDate: '',
    endDate: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  useEffect(() => {
    if (stop) {
      setFormData({
        city: stop.city || '',
        country: stop.country || '',
        startDate: stop.startDate ? new Date(stop.startDate).toISOString().split('T')[0] : '',
        endDate: stop.endDate ? new Date(stop.endDate).toISOString().split('T')[0] : '',
      });
      setCitySearch(stop.city || '');
    } else {
      setFormData({ city: '', country: '', startDate: '', endDate: '' });
      setCitySearch('');
    }
  }, [stop, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.city || !formData.startDate || !formData.endDate) {
      setError('City, start date, and end date are required');
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError('End date must be after start date');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      });
      onClose();
    } catch (err) {
      setError('Failed to save stop');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredCities = cities.filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase()));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-[500px] bg-white rounded-[20px] shadow-2xl z-10 flex flex-col max-h-[90vh]">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">{stop ? 'Edit Stop' : 'Add New Stop'}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 bg-gray-50 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={citySearch}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCitySearch(val);
                    setFormData(prev => ({ ...prev, city: val }));
                    setShowCityDropdown(true);
                  }}
                  onFocus={() => setShowCityDropdown(true)}
                  placeholder="Search city..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>
              
              {showCityDropdown && citySearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-48 overflow-y-auto z-20">
                  {filteredCities.length > 0 ? filteredCities.map(c => (
                    <div 
                      key={c.id} 
                      onClick={() => {
                        setCitySearch(c.name);
                        setFormData({ ...formData, city: c.name, country: c.country });
                        setShowCityDropdown(false);
                      }}
                      className="px-4 py-2 hover:bg-amber-50 cursor-pointer flex justify-between items-center"
                    >
                      <span className="font-medium text-gray-900">{c.name}</span>
                      <span className="text-sm text-gray-500">{c.country}</span>
                    </div>
                  )) : (
                    <div className="px-4 py-2 text-sm text-gray-500">Press enter to use custom city</div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-gray-700" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                <input type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-gray-700" />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" disabled={isSaving} className="flex-1 py-3 px-4 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors flex items-center justify-center">
                {isSaving ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Stop'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
