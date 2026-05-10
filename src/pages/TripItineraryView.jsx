import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, Clock, Utensils, Plane, Camera, 
  Share2, FileText, ChevronRight, ChevronDown, IndianRupee, 
  ArrowLeft, Globe, Briefcase
} from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const mockTripData = {
  name: "Europe Summer Trip",
  startDate: "12 Jun",
  endDate: "28 Jun 2025",
  duration: "16 Days",
  budget: "₹2,50,000",
  spent: "₹1,85,000",
  cities: [
    {
      id: 'c1',
      name: 'Paris',
      arrivalDate: '12 Jun',
      days: 5,
      budget: '₹85,000',
      itinerary: [
        { 
          id: 'a1', day: 'Day 1', time: '10:00 AM – 12:30 PM', 
          name: 'Eiffel Tower Visit', category: 'sightseeing', 
          cost: '₹2,500', desc: 'Pre-booked skip-the-line tickets for the summit.' 
        },
        { 
          id: 'a2', day: 'Day 1', time: '01:30 PM – 03:00 PM', 
          name: 'Le Comptoir du Relais', category: 'food', 
          cost: '₹3,200', desc: 'Classic French bistro lunch in Saint-Germain.' 
        },
        { 
          id: 'a3', day: 'Day 2', time: '09:00 AM – 05:00 PM', 
          name: 'Louvre Museum', category: 'sightseeing', 
          cost: '₹1,800', desc: 'Full day exploration of the world\'s largest art museum.' 
        },
        { 
          id: 'a4', day: 'Day 3', time: '08:00 PM – 10:00 PM', 
          name: 'Seine River Cruise', category: 'transport', 
          cost: '₹1,500', desc: 'Evening boat tour with illumination views.' 
        }
      ]
    },
    {
      id: 'c2',
      name: 'Rome',
      arrivalDate: '17 Jun',
      days: 6,
      budget: '₹95,000',
      itinerary: [
        { 
          id: 'a5', day: 'Day 6', time: '09:00 AM – 12:00 PM', 
          name: 'Colosseum Tour', category: 'sightseeing', 
          cost: '₹4,000', desc: 'Guided tour of the Flavian Amphitheatre.' 
        },
        { 
          id: 'a6', day: 'Day 6', time: '01:00 PM – 02:00 PM', 
          name: 'Pizzeria Emma', category: 'food', 
          cost: '₹1,200', desc: 'Authentic thin-crust Roman pizza.' 
        }
      ]
    },
    {
      id: 'c3',
      name: 'Barcelona',
      arrivalDate: '23 Jun',
      days: 5,
      budget: '₹70,000',
      itinerary: [
        { 
          id: 'a7', day: 'Day 12', time: '10:00 AM – 12:00 PM', 
          name: 'Sagrada Família', category: 'sightseeing', 
          cost: '₹2,800', desc: 'Gaudí\'s unfinished masterpiece.' 
        }
      ]
    }
  ]
};

const categoryIcons = {
  sightseeing: <Camera className="w-4 h-4" />,
  food: <Utensils className="w-4 h-4" />,
  transport: <Plane className="w-4 h-4" />,
  hotel: <Briefcase className="w-4 h-4" />
};

const categoryColors = {
  sightseeing: 'bg-amber-100 text-amber-600',
  food: 'bg-rose-100 text-rose-600',
  transport: 'bg-blue-100 text-blue-600',
  hotel: 'bg-purple-100 text-purple-600'
};

export default function TripItineraryView() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeCityId, setActiveCityId] = useState(mockTripData.cities[0].id);
  const [expandedActivityId, setExpandedActivityId] = useState(null);

  const activeCity = mockTripData.cities.find(c => c.id === activeCityId);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard! 🔗');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <DashboardHeader user={user} logout={logout} />

      <div className="pt-20 px-4 max-w-md mx-auto relative">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-600 font-medium mb-4 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Trip Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5 mb-6 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Globe className="w-32 h-32" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{mockTripData.name}</h1>
          <p className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-teal-500" />
            {mockTripData.startDate} – {mockTripData.endDate}
          </p>
          
          <div className="flex gap-2">
            <div className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-[11px] font-bold border border-teal-100">
              {mockTripData.duration}
            </div>
            <div className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-[11px] font-bold border border-amber-100">
              Budget: {mockTripData.budget}
            </div>
          </div>
        </motion.div>

        {/* City Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {mockTripData.cities.map((city) => (
            <button
              key={city.id}
              onClick={() => setActiveCityId(city.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeCityId === city.id 
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-100' 
                  : 'bg-white text-gray-500 border border-gray-100'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* City Summary Divider */}
        <motion.div 
          key={`summary-${activeCityId}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-teal-50/50 rounded-2xl p-4 border border-teal-100/50 mb-6 flex justify-between items-center"
        >
          <div>
            <h2 className="text-sm font-bold text-teal-900">{activeCity.name}</h2>
            <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">
              {activeCity.arrivalDate} • {activeCity.days} Days
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">City Budget</p>
            <p className="text-sm font-bold text-teal-900">{activeCity.budget}</p>
          </div>
        </motion.div>

        {/* Timeline View */}
        <div className="relative pl-4">
          <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-teal-100" />
          
          <div className="space-y-8">
            {activeCity.itinerary.map((activity, index) => (
              <div key={activity.id} className="relative flex gap-6">
                {/* Day Label & Connector Dot */}
                <div className="flex flex-col items-center">
                  <div className="z-10 w-5 h-5 rounded-full bg-white border-2 border-teal-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                    {index === 0 || activity.day !== activeCity.itinerary[index - 1].day ? activity.day : ''}
                  </span>
                </div>

                {/* Activity Card */}
                <motion.div 
                  onClick={() => setExpandedActivityId(expandedActivityId === activity.id ? null : activity.id)}
                  className="flex-1 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:border-teal-200 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${categoryColors[activity.category]}`}>
                      {categoryIcons[activity.category]}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900">{activity.name}</h4>
                      <p className="text-[10px] text-gray-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-teal-600 uppercase">{activity.cost}</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 line-clamp-1 mb-0">
                    {activity.desc}
                  </p>

                  <AnimatePresence>
                    {expandedActivityId === activity.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-gray-50 text-xs text-gray-600 leading-relaxed">
                          {activity.desc} Additional details for {activity.name} can be added here, including addresses, ticket confirmation numbers, and helpful travel tips for this specific activity.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Summary Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 p-4 z-40">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Remaining Budget</p>
              <p className="text-base font-bold text-teal-600">
                ₹{(parseInt(mockTripData.budget.replace(/[^0-9]/g, '')) - parseInt(mockTripData.spent.replace(/[^0-9]/g, ''))).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleShare}
                className="p-3 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-teal-500 text-white font-bold rounded-xl shadow-lg shadow-teal-100 hover:bg-teal-600 transition-colors">
                <FileText className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
