import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Star, Compass, Utensils, Mountain } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const suggestions = [
  { id: 1, name: 'Paris', category: 'City', icon: <Star className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Hiking', category: 'Activity', icon: <Mountain className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Tokyo', category: 'City', icon: <Compass className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Sushi Bar', category: 'Food', icon: <Utensils className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Bali', category: 'Nature', icon: <Mountain className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400' },
  { id: 6, name: 'Rome', category: 'History', icon: <Star className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400' },
];

export default function CreateTrip() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    place: '',
    startDate: '',
    arrivalDate: '', // The "repeated" start date field from wireframe
    endDate: ''
  });

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    if (!formData.place || !formData.startDate || !formData.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/trips', {
        name: `Trip to ${formData.place}`,
        destination: formData.place,
        startDate: formData.startDate,
        endDate: formData.endDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success('Trip created successfully! ✈️');
        navigate(`/trips/${response.data.data.id}/builder`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create trip. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <DashboardHeader user={user} logout={logout} />
      
      <div className="pt-20 px-4 max-w-md mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-600 font-medium mb-6 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Plan a new trip</h1>
          
          <form onSubmit={handleCreateTrip} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Select a Place</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={formData.place}
                  onChange={(e) => setFormData({...formData, place: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Repeated Start Date field as per wireframe requirement */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">Start Date (Arrival)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
                  <input
                    type="date"
                    value={formData.arrivalDate}
                    onChange={(e) => setFormData({...formData, arrivalDate: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 ml-1">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          </form>
        </motion.div>

        <div className="mb-24">
          <h2 className="text-base font-bold text-gray-900 mb-4 px-1">
            Suggestion for Places to Visit / Activities to perform
          </h2>
          
          <div className="grid grid-cols-3 gap-3">
            {suggestions.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData({...formData, place: item.name})}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shadow-sm border border-gray-100"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{item.category}</p>
                  <p className="text-xs font-bold truncate">{item.name}</p>
                </div>
                <div className="absolute top-2 right-2 p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white">
                  {item.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-40">
          <button
            onClick={handleCreateTrip}
            disabled={isLoading}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Create Trip'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
