import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import ProcessFlow from './ProcessFlow';
import BottomCTA from './BottomCTA';

export const HowItWorksSection = () => {
  const leftImage = "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400";
  const rightImage = "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400";

  return (
    <section className="relative py-12 lg:py-16 bg-[#F5FBFF] overflow-hidden w-full max-h-[1050px] flex flex-col justify-center">
      
      {/* --- FLOATING DECORATIONS --- */}
      
      {/* Top Left Floating Crop-Circle Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -30 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-[8%] left-[4%] w-32 h-32 rounded-full border-4 border-[#A5D6A7]/40 shadow-[0_8px_20px_rgba(79,94,84,0.06)] overflow-hidden hidden xl:block select-none pointer-events-none"
      >
        <img src={leftImage} alt="Specialist helping child" className="w-full h-full object-cover" />
      </motion.div>

      {/* Top Right Floating Crop-Circle Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 30 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-[8%] right-[4%] w-32 h-32 rounded-full border-4 border-[#A5D6A7]/40 shadow-[0_8px_20px_rgba(79,94,84,0.06)] overflow-hidden hidden xl:block select-none pointer-events-none"
      >
        <img src={rightImage} alt="Happy family portrait" className="w-full h-full object-cover" />
      </motion.div>

      {/* Floating doodles */}
      {/* Blue Heart (Right area) */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[35%] right-[2%] w-10 h-10 opacity-30 text-[#1E88E5] pointer-events-none hidden lg:block"
        animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }}
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

      {/* Dotted curve with paper airplane (Bottom Right area) */}
      <div className="absolute bottom-[6%] right-[5%] w-36 h-20 opacity-30 hidden lg:block select-none pointer-events-none">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="#3B8A4C" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <g transform="translate(140, 45) rotate(20) scale(0.6)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#3B8A4C" />
          </g>
        </svg>
      </div>

      {/* Yellow star (Left area) */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[32%] left-[3%] w-6 h-6 opacity-35 text-amber-400 fill-amber-200/20 pointer-events-none hidden lg:block"
        animate={{ y: [0, -3, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" />
      </motion.svg>

      {/* Main Centered Content Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col space-y-9 md:space-y-11 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <Settings className="h-4 w-4 text-[#3B8A4C] animate-[spin_10s_linear_infinite]" />
            <span>How It Works</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
            Simple Steps,{' '}
            <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
              Meaningful Progress
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-[680px] font-normal">
            Our streamlined process makes it easy for families to get started and stay supported every step of the way.
          </p>
        </div>

        {/* Process Flow Cards */}
        <div className="w-full">
          <ProcessFlow />
        </div>

        {/* Bottom CTA floating banner */}
        <div className="w-full">
          <BottomCTA />
        </div>

      </div>

    </section>
  );
};

export default HowItWorksSection;
