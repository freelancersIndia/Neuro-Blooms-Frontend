import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sprout } from 'lucide-react';

export const ProgramHero = () => {
  const heroImage = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      {/* Left Column: Text & Value Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="lg:col-span-7 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left"
      >
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm">
          <Sprout className="h-4 w-4 text-[#3B8A4C]" />
          <span>Our Signature Program</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 font-display tracking-tight leading-[1.12]">
          The Neuro Blooms <br />
          <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">Development</span>{' '}
          <span className="bg-gradient-to-r from-[#F57C00] to-amber-500 bg-clip-text text-transparent">Program</span>
        </h2>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[650px] font-normal">
          A structured, evidence-based program that supports your child's overall development and helps them reach their fullest potential.
        </p>

        {/* Value Card */}
        <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-[0_8px_30px_rgba(79,94,84,0.03)] flex flex-col sm:flex-row items-center sm:items-start gap-4 max-w-[580px] w-full text-center sm:text-left relative z-10">
          <div className="w-12 h-12 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#3B8A4C] flex-shrink-0 shadow-sm">
            <Heart className="w-5 h-5 fill-current text-[#3B8A4C]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-slate-800 text-sm sm:text-base font-display">
              Personalized. Holistic. Family-Centered.
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Because every child deserves the right start.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Organic Cropped Image Container */}
      <motion.div
        initial={{ opacity: 0, x: 45 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="lg:col-span-5 relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-none mx-auto lg:mx-0 flex justify-center items-center"
      >
        {/* Dashed outer crop-frame line */}
        <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[98%] h-[98%] border-2 border-dashed border-[#A5D6A7]/40 rounded-[65px_105px_50px_90px] z-0 pointer-events-none transform -rotate-6" />

        {/* Floating blue heart */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute -bottom-8 -left-4 w-12 h-12 opacity-35 text-[#1E88E5] z-10 pointer-events-none"
          animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
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

        {/* Floating orange star */}
        <motion.svg
          viewBox="0 0 24 24"
          className="absolute top-[18%] -right-8 w-6 h-6 opacity-35 text-[#F57C00] fill-amber-200/10 pointer-events-none"
          animate={{ y: [0, -4, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" />
        </motion.svg>

        {/* Paper airplane path (Top Center-Left) */}
        <div className="absolute -top-[12%] -left-[14%] w-36 h-20 opacity-35 hidden sm:block pointer-events-none">
          <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M140,65 Q70,15 15,45" stroke="#F57C00" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
            <g transform="translate(15, 45) rotate(200) scale(0.6)">
              <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#F57C00" />
              <path d="M7,8 L18,-5 L12,4 Z" fill="#E65100" />
            </g>
          </svg>
        </div>

        {/* Leaf Graphic bottom-right */}
        <div className="absolute bottom-[2%] -right-8 w-14 h-14 opacity-30 text-[#3B8A4C] pointer-events-none">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
          </svg>
        </div>

        {/* Main Organic Image Box */}
        <div className="w-[94%] aspect-square rounded-[60px_100px_45px_85px] overflow-hidden border-8 border-white shadow-2xl z-10 bg-emerald-50">
          <img
            src={heroImage}
            alt="Development specialist working with child"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

    </div>
  );
};

export default ProgramHero;
