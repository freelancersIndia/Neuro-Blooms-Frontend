import React from 'react';
import { motion } from 'framer-motion';

export const MissionQuoteCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white border border-slate-100 rounded-[32px] p-6 lg:p-7 w-full relative overflow-hidden shadow-[0_15px_45px_rgba(79,94,84,0.03)] flex flex-col justify-between"
    >
      {/* Floating hand-drawn heart doodle in the bottom right */}
      <motion.div 
        className="absolute bottom-4 right-6 w-12 h-12 opacity-40 text-[#3B8A4C] pointer-events-none select-none"
        animate={{ y: [0, -2, 0], rotate: [0, 4, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Heart path */}
          <path
            d="M50,75 C50,75 20,52 20,32 C20,16 36,12 50,28 C64,12 80,16 80,32 C80,52 50,75 50,75 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="4 2"
          />
          {/* Dotted path leading to heart */}
          <path 
            d="M10,80 Q30,85 40,65" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeDasharray="3 3" 
          />
        </svg>
      </motion.div>

      <div className="flex gap-4 items-start relative z-10">
        
        {/* Double Quote Icon */}
        <div className="text-emerald-100/95 flex-shrink-0 select-none transform -translate-y-1">
          <svg width="48" height="48" viewBox="0 0 36 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 21.6h7.2c0-3.6-2.4-7.2-7.2-7.2V7.2C7.2 7.2 14.4 12 14.4 21.6V28.8H0V21.6zm21.6 0H28.8c0-3.6-2.4-7.2-7.2-7.2V7.2c7.2 0 14.4 4.8 14.4 14.4V28.8H21.6V21.6z" />
          </svg>
        </div>

        {/* Quote & Highlighted Text */}
        <div className="flex flex-col space-y-3.5 text-left">
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-display font-medium italic">
            "Early identification and early intervention can transform a child's future."
          </p>
          <p className="text-sm sm:text-base font-display font-bold leading-normal">
            <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
              Every child deserves the opportunity to reach their fullest potential.
            </span>
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default MissionQuoteCard;
