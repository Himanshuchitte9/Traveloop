import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PlanTripFAB() {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/create-trip')}
      className="fixed bottom-24 sm:bottom-6 right-6 flex items-center gap-2 bg-white border-2 border-amber-400 text-amber-500 font-bold px-4 py-3 sm:px-5 sm:py-3 rounded-full shadow-[0_4px_20px_rgba(245,166,35,0.35)] hover:bg-amber-400 hover:text-white transition-all duration-200 z-50 group"
    >
      <motion.span 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="text-2xl"
      >
        +
      </motion.span>
      <span className="hidden sm:inline">Plan a trip</span>
    </motion.button>
  );
}
