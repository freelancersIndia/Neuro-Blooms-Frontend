import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import ComparisonTable from './ComparisonTable';
import ValueBanner from './ValueBanner';

export const WhyNeuroBloomsSection = () => {
  // Unsplash photos matching the mock
  const leftImage = "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400";
  const rightImage = "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400";

  return (
    <section className="relative py-24 lg:py-32 bg-[#FFF8E8] overflow-hidden w-full">
      
      {/* --- FLOATING DECORATIONS & STICKERS --- */}
      
      {/* Top Left Floating Crop-Circle Image (Therapist and child) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -30 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-[8%] left-[5%] w-36 h-36 rounded-full border-4 border-[#A5D6A7]/40 shadow-[0_10px_25px_rgba(79,94,84,0.08)] overflow-hidden hidden xl:block select-none pointer-events-none"
      >
        <img src={leftImage} alt="Interacting with child" className="w-full h-full object-cover" />
      </motion.div>

      {/* Top Right Floating Crop-Circle Image (Family portrait) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 30 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-[8%] right-[5%] w-36 h-36 rounded-full border-4 border-[#A5D6A7]/40 shadow-[0_10px_25px_rgba(79,94,84,0.08)] overflow-hidden hidden xl:block select-none pointer-events-none"
      >
        <img src={rightImage} alt="Happy family portrait" className="w-full h-full object-cover" />
      </motion.div>

      {/* Dotted path with paper airplane (Top Right area) */}
      <div className="absolute top-[6%] right-[22%] w-44 h-24 opacity-40 hidden lg:block select-none pointer-events-none">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Path */}
          <path d="M10,60 Q80,20 140,50" stroke="#F57C00" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          {/* Airplane */}
          <g transform="translate(140, 50) rotate(20) scale(0.6)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#F57C00" />
            <path d="M7,8 L18,-5 L12,4 Z" fill="#E65100" />
          </g>
        </svg>
      </div>

      {/* Blue Heart outline (Right Side) */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[32%] right-[4%] w-10 h-10 opacity-30 text-[#1E88E5] pointer-events-none"
        animate={{ y: [0, -5, 0], rotate: [0, 6, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
      </motion.svg>

      {/* Green Leaf outlines (Top Left) */}
      <motion.div
        className="absolute top-[28%] left-[23%] w-7 h-7 opacity-35 text-[#3B8A4C] pointer-events-none"
        animate={{ y: [0, 4, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </motion.div>

      {/* Yellow Star (Left Side) */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[45%] left-[4%] w-6 h-6 opacity-35 text-amber-400 fill-amber-200/20 pointer-events-none"
        animate={{ y: [0, -3, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" />
      </motion.svg>

      {/* Soft color background dots */}
      <div className="absolute top-[20%] left-[6%] w-3 h-3 bg-emerald-500/20 rounded-full hidden xl:block" />
      <div className="absolute top-[52%] right-[7%] w-3 h-3 bg-amber-500/20 rounded-full hidden xl:block" />

      {/* Bottom Left Wavy Plant Graphic */}
      <div className="absolute bottom-[4%] left-[-16px] w-20 h-40 opacity-25 text-[#3B8A4C] pointer-events-none hidden md:block">
        <svg viewBox="0 0 60 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-full h-full">
          <path d="M10 120 Q20 80 15 40 Q10 20 15 5" />
          <path d="M20 120 Q35 70 30 30 Q25 10 32 2" />
          {/* Leaves */}
          <path d="M14 85 C22 80 25 88 23 92 C15 95 14 88 14 85 Z" fill="currentColor" opacity="0.4" />
          <path d="M12 60 C4 55 2 63 6 67 C10 70 12 65 12 60 Z" fill="currentColor" opacity="0.4" />
          <path d="M16 30 C24 25 27 32 25 36 C18 39 16 34 16 30 Z" fill="currentColor" opacity="0.4" />
          <path d="M27 90 C19 85 17 93 21 97 C25 100 27 95 27 90 Z" fill="currentColor" opacity="0.4" />
          <path d="M29 60 C37 55 40 62 38 66 C32 69 29 64 29 60 Z" fill="currentColor" opacity="0.4" />
          <path d="M30 20 C22 15 20 23 24 27 C28 30 30 25 30 20 Z" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <Star className="h-4 w-4 fill-current text-amber-500 stroke-amber-500" />
            <span>Why Choose Us</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
            Why <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">Neuro Blooms</span>
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[700px] font-normal">
            We go beyond traditional therapy. Our approach focuses on whole-child development with parents at the heart of every step.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="w-full">
          <ComparisonTable />
        </div>

        {/* Value Banner */}
        <div className="w-full pt-4">
          <ValueBanner />
        </div>

      </div>

    </section>
  );
};

export default WhyNeuroBloomsSection;
