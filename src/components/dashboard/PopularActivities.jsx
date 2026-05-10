import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, TrendingUp } from 'lucide-react';

const activities = [
  {
    id: 1,
    name: "Skydiving over Interlaken",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1521673461164-de300ebcf417?auto=format&fit=crop&q=80&w=400",
    rating: 4.9,
    price: "₹18,500"
  },
  {
    id: 2,
    name: "Hot Air Ballooning",
    location: "Cappadocia",
    image: "https://images.unsplash.com/photo-1520440229334-962af01ef057?auto=format&fit=crop&q=80&w=400",
    rating: 4.8,
    price: "₹12,200"
  },
  {
    id: 3,
    name: "Northern Lights Tour",
    location: "Iceland",
    image: "https://images.unsplash.com/photo-1531366930471-893ca76da03f?auto=format&fit=crop&q=80&w=400",
    rating: 4.9,
    price: "₹9,500"
  },
  {
    id: 4,
    name: "Scuba Diving",
    location: "Great Barrier Reef",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400",
    rating: 4.7,
    price: "₹14,000"
  }
];

export default function PopularActivities() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
          <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider">Top Activities</h2>
        </div>
        <button 
          onClick={() => navigate('/discover/search')}
          className="text-amber-600 text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1"
        >
          View all <TrendingUp className="w-3 h-3" />
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 -mx-1 px-1 scrollbar-hide snap-x">
        {activities.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className="min-w-[240px] bg-white rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 group cursor-pointer snap-start"
            onClick={() => navigate(`/discover/activities?id=${item.id}`)}
          >
            <div className="relative h-40">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                <span className="text-[10px] font-black text-gray-900">{item.rating}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-black text-gray-900 text-sm mb-1 truncate">{item.name}</h3>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4">
                <MapPin className="w-3 h-3" /> {item.location}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-500">{item.price}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-amber-500 transition-colors">Details →</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
