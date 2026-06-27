import React from 'react';
import { motion } from 'framer-motion';
import ParentCoachingHero from './ParentCoachingHero';
import BenefitsGrid from './BenefitsGrid';
import ParentCoachingCTA from './ParentCoachingCTA';

export const ParentCoachingSection = () => {
  return (
    <section className="relative py-6 sm:py-8 lg:py-10 bg-[#FFF8E8] overflow-hidden w-full flex flex-col justify-center min-h-[90vh] lg:min-h-0 lg:max-h-[900px]">
      
      {/* --- FLOATING DECORATIONS --- */}
      
      {/* Blue Star (Top Left) */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[8%] left-[2%] w-6 h-6 opacity-35 text-[#1E88E5] fill-[#1E88E5]/5 pointer-events-none hidden lg:block"
        animate={{ y: [0, -4, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" />
      </motion.svg>

      {/* Floating Orange Heart (Top Center-Left) */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[10%] left-[45%] w-7 h-7 opacity-30 text-orange-400 pointer-events-none hidden lg:block"
        animate={{ y: [0, -3, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Floating Purple Heart (Right near border) */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[20%] right-[3%] w-7 h-7 opacity-30 text-[#8E24AA] pointer-events-none hidden lg:block"
        animate={{ y: [0, 4, 0], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Floating Green Leaf Doodle (Left center) */}
      <motion.div
        className="absolute top-[35%] left-[1.5%] w-10 h-10 opacity-25 text-emerald-600 pointer-events-none hidden lg:block"
        animate={{ rotate: [0, 12, -12, 0], y: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 3.3 1.6 6.2 4.1 8L6.5 16C5 14.5 4.5 12 4.5 12C7 12 9.5 11.5 11 10C12.5 8.5 13 6 13 6C13.5 8.5 16 9 17.5 10.5C19 12 18.5 14.5 18.5 14.5C18.5 14.5 21 15 22 12C22 6.5 17.5 2 12 2Z" />
        </svg>
      </motion.div>

      {/* Dotted path + Paper plane (Top Right) */}
      <div className="absolute top-[5%] right-[5%] w-32 h-20 opacity-20 hidden lg:block select-none pointer-events-none">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <g transform="translate(140, 45) rotate(20) scale(0.6)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#E67E22" />
          </g>
        </svg>
      </div>

      {/* Bottom Left Leaves */}
      <div className="absolute bottom-[5%] left-[1.5%] w-10 h-16 opacity-30 text-[#A5D6A7] pointer-events-none hidden lg:block">
        <svg viewBox="0 0 40 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M10 70 Q 25 40 20 10" />
          <path d="M22 35 Q 35 30 30 20" />
          <path d="M18 50 Q 5 45 10 35" />
        </svg>
      </div>

      {/* Bottom Right Leaves */}
      <div className="absolute bottom-[5%] right-[1.5%] w-10 h-16 opacity-30 text-[#A5D6A7] pointer-events-none hidden lg:block scale-x-[-1]">
        <svg viewBox="0 0 40 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M10 70 Q 25 40 20 10" />
          <path d="M22 35 Q 35 30 30 20" />
          <path d="M18 50 Q 5 45 10 35" />
        </svg>
      </div>

      {/* Main Centered Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col space-y-6 md:space-y-8 w-full">
        {/* Parent Coaching Hero */}
        <ParentCoachingHero />

        {/* Benefits Grid */}
        <BenefitsGrid />

        {/* Bottom CTA Card */}
        <ParentCoachingCTA />
      </div>

    </section>
  );
};

export default ParentCoachingSection;
