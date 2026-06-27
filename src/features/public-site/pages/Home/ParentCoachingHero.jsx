import React from 'react';
import { motion } from 'framer-motion';
import { Users, Home, HeartHandshake, Quote } from 'lucide-react';

export const ParentCoachingHero = () => {
  const heroImage = "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
      {/* LEFT COLUMN: Content Area */}
      <motion.div 
        className="lg:col-span-7 flex flex-col space-y-4 md:space-y-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Badge */}
        <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs font-bold tracking-wide shadow-sm">
          <Users className="h-3.5 w-3.5 text-[#3B8A4C]" />
          <span>Parent Coaching Program</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight leading-[1.15] font-display">
          Stronger Parents,<br />
          Stronger <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">Progress</span>
        </h2>

        {/* Subheading */}
        <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-[620px] font-normal">
          Our Parent Coaching Program empowers you with the knowledge, tools, and confidence to support your child's development every day — at home and beyond.
        </p>

        {/* FEATURE HIGHLIGHTS: Horizontal Layout (3 Items) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100/60">
          
          {/* Item 1 */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32]">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-tight">
              You are your child's best coach.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-orange-600">
              <Home className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-tight">
              Small steps at home create big results.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-tight">
              We guide you, you empower them.
            </p>
          </div>

        </div>
      </motion.div>

      {/* RIGHT COLUMN: Organic Image Container */}
      <motion.div 
        className="lg:col-span-5 relative w-full flex justify-center items-center py-4 lg:py-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Organic Shaped Frame Wrapper */}
        <div className="relative w-full max-w-[340px] xs:max-w-[380px] md:max-w-[400px] aspect-[1.1] mx-auto">
          {/* Wobbling background dashed path */}
          <div className="absolute inset-0 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] border-2 border-dashed border-[#A5D6A7] animate-[spin_40s_linear_infinite] opacity-60"></div>
          
          {/* Main Image Container */}
          <div className="absolute inset-[3%] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] overflow-hidden border-4 border-white shadow-xl bg-slate-50">
            <img 
              src={heroImage} 
              alt="Parent and child playing with blocks" 
              className="w-full h-full object-cover object-center scale-[1.03] hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* FLOATING QUOTE CARD: Bottom Right */}
          <motion.div 
            className="absolute bottom-[-20px] right-[-15px] sm:right-[-30px] md:right-[-40px] bg-white rounded-2xl shadow-lg border border-slate-100/80 p-4 max-w-[210px] sm:max-w-[230px] z-20 flex flex-col gap-2 cursor-pointer"
            whileHover={{ y: -4, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center gap-1 text-[#3B8A4C]">
              <Quote className="w-5 h-5 rotate-180 fill-current opacity-70" />
            </div>
            <p className="text-xs sm:text-[13px] font-medium text-slate-600 leading-snug">
              When parents and therapists work together,{' '}
              <span className="text-[#2E7D32] font-extrabold bg-gradient-to-r from-[#2E7D32] to-[#3B8A4C] bg-clip-text text-transparent">
                children thrive together.
              </span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParentCoachingHero;
