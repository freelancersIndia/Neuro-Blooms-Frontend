import React from 'react';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const FooterBottomWave = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative bg-gradient-to-b from-[#0E3F24] to-[#155D35] text-emerald-100/90 pt-36 pb-8 px-4 sm:px-6 lg:px-8 z-0">
      
      {/* --- SVG Wave Shape Divider (Top Seam) --- */}
      <div className="absolute top-0 left-0 right-0 w-full h-[80px] -translate-y-[79px] z-0 overflow-hidden pointer-events-none select-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full text-[#0E3F24] fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 C240,15 480,95 720,50 C960,5 1200,75 1440,35 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* --- BACKGROUND DECORATIVE DOODLES --- */}

      {/* Left Sprouted Leaf Silhouette */}
      <div className="absolute bottom-[20%] left-[2%] opacity-10 w-24 h-24 text-emerald-300 pointer-events-none hidden xl:block select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Right Sprouted Leaf Silhouette */}
      <div className="absolute bottom-[20%] right-[2%] opacity-10 w-24 h-24 text-emerald-300 pointer-events-none hidden xl:block select-none transform scale-x-[-1]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Left Dotted Path Trail */}
      <div className="absolute top-[25%] left-[8%] w-36 h-12 opacity-12 pointer-events-none hidden xl:block select-none text-emerald-300">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" />
        </svg>
      </div>

      {/* Right Orange Heart Outline curved doodle */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[28%] right-[12%] w-7 h-7 opacity-40 text-[#F57C00] pointer-events-none hidden xl:block select-none"
        animate={{ y: [0, -4, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
      </motion.svg>

      {/* Right Dotted Path Trail */}
      <div className="absolute top-[38%] right-[8%] w-32 h-10 opacity-12 pointer-events-none hidden xl:block select-none text-emerald-300">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform scale-x-[-1]">
          <path d="M10,65 Q80,15 140,45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" />
        </svg>
      </div>

      {/* --- CENTERED MOTIVATIONAL BRAND MESSAGE --- */}
      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-2 mb-10 relative z-10 select-none">
        
        {/* Floating Green Heart & Purple Star above center text */}
        <div className="flex items-center gap-10 mb-1">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}>
            <Heart className="w-5 h-5 text-emerald-300 fill-emerald-300/20 opacity-60" />
          </motion.div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
            <Star className="w-4 h-4 text-[#AB47BC] opacity-50" />
          </motion.div>
        </div>

        {/* Small text */}
        <p className="text-xs sm:text-sm font-semibold text-emerald-200/75 tracking-wide uppercase font-display px-4">
          Every child has potential. Every family deserves support.
        </p>

        {/* Let's grow together */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white font-display px-4">
          Let's{' '}
          <span className="text-[#A5D6A7] bg-[#A5D6A7]/10 px-2 py-0.5 rounded-lg border border-[#A5D6A7]/20">
            grow
          </span>{' '}
          together.
        </h3>

      </div>

      {/* --- BOTTOM COPYRIGHT & POLICIES BAR --- */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10">
        {/* Horizontal Divider */}
        <div className="border-t border-emerald-950/30 my-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-left text-xs text-emerald-200/60 font-semibold px-2">
          {/* Left copyright info */}
          <div>
            &copy; {currentYear} Neuro Blooms Child Development Center. All Rights Reserved.
          </div>

          {/* Right policy links */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 justify-center">
            <a href="#/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
            <a href="#/terms" className="hover:text-white transition-colors duration-200">
              Terms & Conditions
            </a>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
            <a href="#/refund" className="hover:text-white transition-colors duration-200">
              Refund Policy
            </a>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
            <a href="#/sitemap" className="hover:text-white transition-colors duration-200">
              Sitemap
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FooterBottomWave;
