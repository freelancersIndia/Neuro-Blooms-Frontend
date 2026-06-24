import React from 'react';
import { motion } from 'framer-motion';

export const ValueBanner = () => {
  // SVG leaf outline for right side of banner
  const leafOutline = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3B8A4C] flex-shrink-0 animate-[pulse_4s_infinite]">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 20 4c-.48 3-1 4.5-2.1 10.2A7 7 0 0 1 11 20z" />
      <path d="M19 5L9 15" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-[#E8F5E9]/50 border border-[#A5D6A7]/20 rounded-[32px] p-6 lg:p-8 w-full relative overflow-hidden shadow-sm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        
        {/* Left Side: Statement & Icon */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Heart in hand icon */}
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#3B8A4C] shadow-sm flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          
          <h4 className="text-slate-800 text-lg sm:text-xl font-bold font-display leading-tight max-w-[420px]">
            We don't just work with children, we{' '}
            <span className="text-[#3B8A4C] relative inline-block">
              walk with families
              <svg className="absolute -bottom-1 left-0 w-full h-1 text-[#3B8A4C]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h4>
        </div>

        {/* Vertical Divider line on Desktop */}
        <div className="hidden lg:block absolute left-1/2 top-[15%] bottom-[15%] w-px bg-slate-200" />

        {/* Right Side: Mission with color accents */}
        <div className="flex items-center justify-center lg:justify-between gap-4 text-center lg:text-left lg:pl-8">
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-[480px]">
            Our mission is simple – to help your child{' '}
            <span className="text-[#3B8A4C] font-extrabold font-display">grow</span>,{' '}
            <span className="text-[#F57C00] font-extrabold font-display">learn</span>,{' '}
            <span className="text-[#1E88E5] font-extrabold font-display">thrive</span> and live a confident life.
          </p>
          <div className="hidden sm:block">
            {leafOutline}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ValueBanner;
