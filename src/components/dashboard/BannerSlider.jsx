import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Calendar, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "The Magic of Santorini",
    subtitle: "Experience the world's most beautiful sunsets and white-washed villages.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200",
    location: "Greece",
    tag: "FEATURED"
  },
  {
    id: 2,
    title: "Wild Safari in Kenya",
    subtitle: "Get up close with the Big Five in their natural habitat.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200",
    location: "Maasai Mara",
    tag: "ADVENTURE"
  },
  {
    id: 3,
    title: "Cherry Blossoms in Kyoto",
    subtitle: "Walk through pink-petaled paths and ancient serene temples.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1200",
    location: "Japan",
    tag: "SEASONAL"
  },
  {
    id: 4,
    title: "Alps Winter Wonderland",
    subtitle: "Swiss peaks, luxury lodges, and the world's finest skiing.",
    image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&q=80&w=1200",
    location: "Switzerland",
    tag: "LUXURY"
  }
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div 
      className="relative w-full h-[300px] md:h-[450px] rounded-[40px] overflow-hidden shadow-2xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src={slides[current].image} 
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black rounded-full tracking-widest">
                {slides[current].tag}
              </span>
              <span className="flex items-center gap-1 text-white/80 text-[10px] font-bold tracking-widest uppercase">
                <MapPin className="w-3 h-3" /> {slides[current].location}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-tight"
            >
              {slides[current].title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-white/70 font-medium mb-8 max-w-lg leading-relaxed"
            >
              {slides[current].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button className="flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-xl shadow-black/20 group/btn">
                Plan My Trip <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-6 right-6 flex items-center justify-between pointer-events-none">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/30 transition-all pointer-events-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/30 transition-all pointer-events-auto opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-20 flex gap-3 z-10">
        {slides.map((_, idx) => (
          <div 
            key={idx}
            onClick={() => setCurrent(idx)}
            className="group relative cursor-pointer py-2"
          >
            <div className={`h-1 rounded-full transition-all duration-300 ${
              idx === current ? 'w-12 bg-amber-500' : 'w-6 bg-white/30 group-hover:bg-white/60'
            }`} />
          </div>
        ))}
      </div>
    </div>
  );
}
