import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const regions = [
  { 
    name: 'Europe', 
    emoji: '🏰', 
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400',
    description: 'Historical charm & iconic landmarks'
  },
  { 
    name: 'Asia', 
    emoji: '🏯', 
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=400',
    description: 'Modern cities & ancient temples'
  },
  { 
    name: 'Middle East', 
    emoji: '🕌', 
    image: 'https://images.unsplash.com/photo-1512453979798-5eaad0df3b03?auto=format&fit=crop&q=80&w=400',
    description: 'Rich heritage & desert landscapes'
  },
  { 
    name: 'Americas', 
    emoji: '🗽', 
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=400',
    description: 'Diverse cultures & natural wonders'
  },
  { 
    name: 'Africa', 
    emoji: '🦁', 
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=400',
    description: 'Vibrant wildlife & unique horizons'
  },
  { 
    name: 'Oceania', 
    emoji: '🦘', 
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=400',
    description: 'Coastal beauty & island adventures'
  }
];

export default function TopRegionalSelections({ searchQuery = '' }) {
  const filteredRegions = regions.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
          <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider">Explore by Region</h2>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 -mx-1 px-1 scrollbar-hide snap-x">
        {filteredRegions.length > 0 ? (
          filteredRegions.map((region, index) => (
            <RegionalCard key={region.name} region={region} index={index} />
          ))
        ) : (
          <div className="w-full py-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
             <p className="text-sm text-gray-400 font-medium italic">No regions found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

function RegionalCard({ region, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/discover/cities?region=${region.name}`)}
      className="min-w-[180px] md:min-w-[220px] aspect-[4/5] rounded-[32px] overflow-hidden relative shadow-lg shadow-gray-200/50 cursor-pointer group snap-start"
    >
      {/* Background Image */}
      <img 
        src={region.image} 
        alt={region.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl mb-3 border border-white/30 transform group-hover:scale-110 transition-transform">
          {region.emoji}
        </div>
        <h3 className="text-white font-black text-xl mb-1 tracking-tight">{region.name}</h3>
        <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider line-clamp-1 group-hover:text-white transition-colors">
          {region.description}
        </p>
        
        <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-amber-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-transform">
          Explore <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}
