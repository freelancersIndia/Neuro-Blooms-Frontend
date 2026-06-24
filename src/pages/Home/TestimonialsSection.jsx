import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Star } from 'lucide-react';
import TestimonialCarousel from './TestimonialCarousel';
import TrustMetricsStrip from './TrustMetricsStrip';

export const TestimonialsSection = () => {
  return (
    <section className="relative w-full bg-[#FFFDF7] overflow-hidden py-12 md:py-16 lg:py-6 xl:py-8 lg:h-screen lg:max-h-[920px] lg:min-h-[860px] flex flex-col justify-between select-none">
      
      {/* --- FLOATING DECORATIONS & LEAVES --- */}
      
      {/* Top Left Leaf Illustration */}
      <div className="absolute top-[8%] left-[2%] opacity-25 w-12 h-12 text-[#3B8A4C] pointer-events-none hidden lg:block select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Top Right Leaf Illustration */}
      <div className="absolute top-[8%] right-[2%] opacity-25 w-12 h-12 text-[#3B8A4C] pointer-events-none hidden lg:block select-none transform scale-x-[-1]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Bottom Left Leaf Illustration */}
      <div className="absolute bottom-[2%] left-[1.5%] opacity-20 w-16 h-16 text-[#3B8A4C] pointer-events-none hidden lg:block select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Bottom Right Leaf Illustration */}
      <div className="absolute bottom-[2%] right-[1.5%] opacity-20 w-16 h-16 text-[#3B8A4C] pointer-events-none hidden lg:block select-none transform scale-x-[-1]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Left Purple Star Outline */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[28%] left-[2.5%] w-6 h-6 opacity-35 text-[#AB47BC] pointer-events-none hidden xl:block select-none"
        animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2.2" fill="none" />
      </motion.svg>

      {/* Left Blue Dot */}
      <div className="absolute top-[40%] left-[2%] w-3 h-3 bg-[#1E88E5]/40 rounded-full hidden xl:block pointer-events-none select-none" />

      {/* Right Orange Heart Outline */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[24%] right-[22%] w-8 h-8 opacity-45 text-[#F57C00] pointer-events-none hidden xl:block select-none"
        animate={{ y: [0, -6, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="5 3"
        />
      </motion.svg>

      {/* Right Blue Heart Outline */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[52%] right-[2.5%] w-7 h-7 opacity-35 text-[#1E88E5] pointer-events-none hidden xl:block select-none"
        animate={{ y: [0, 4, 0], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Right Green/Blue Dot */}
      <div className="absolute top-[38%] right-[1.8%] w-3 h-3 bg-[#3B8A4C]/40 rounded-full hidden xl:block pointer-events-none select-none" />

      {/* --- DECORATIVE ORGANIC IMAGE - TOP LEFT --- */}
      <div className="absolute top-[10%] left-[3%] w-[130px] h-[130px] xl:w-[170px] xl:h-[170px] hidden md:block">
        {/* Soft green organic dashed outline */}
        <div className="absolute inset-0 border-2 border-dashed border-[#A5D6A7]/50 rounded-[40px_70px_35px_65px] transform rotate-6 scale-105 pointer-events-none z-0" />
        {/* Main image container */}
        <div className="w-full h-full rounded-[35px_65px_40px_70px] overflow-hidden border-4 border-white shadow-md relative z-10 bg-emerald-50">
          <img 
            src="/images/testimonials/mother_child.png" 
            alt="Mother and Child Hugging" 
            className="w-full h-full object-cover" 
          />
        </div>
        {/* Overlapping Heart Badge */}
        <div className="absolute bottom-[-6px] right-[-6px] bg-[#3B8A4C] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md border-2 border-white z-20">
          <Heart className="w-4 h-4 fill-current text-white" />
        </div>
      </div>

      {/* --- DECORATIVE ORGANIC IMAGE - TOP RIGHT --- */}
      <div className="absolute top-[10%] right-[3%] w-[130px] h-[130px] xl:w-[170px] xl:h-[170px] hidden md:block">
        {/* Soft green organic dashed outline */}
        <div className="absolute inset-0 border-2 border-dashed border-[#A5D6A7]/50 rounded-[65px_35px_70px_40px] transform -rotate-6 scale-105 pointer-events-none z-0" />
        {/* Main image container */}
        <div className="w-full h-full rounded-[70px_40px_65px_35px] overflow-hidden border-4 border-white shadow-md relative z-10 bg-[#E3F2FD]">
          <img 
            src="/images/testimonials/father_child.png" 
            alt="Happy Parent and Child" 
            className="w-full h-full object-cover" 
          />
        </div>
        {/* Overlapping Star Badge */}
        <div className="absolute bottom-[-6px] left-[-6px] bg-amber-400 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md border-2 border-white z-20">
          <Star className="w-4 h-4 fill-current text-white" />
        </div>
      </div>

      {/* --- HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center space-y-3 lg:space-y-2.5 mt-2 lg:mt-0"
      >
        {/* Badge Rounded Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm backdrop-blur-sm">
          <MessageCircle className="h-4 w-4 text-[#3B8A4C] fill-current opacity-70" />
          <span>Testimonials</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-slate-800 font-display tracking-tight leading-none">
          Loved &amp; Trusted{' '}
          <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
            by Parents
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-[700px] font-medium px-4">
          Real feedback from real families who have experienced the Neuro Blooms difference.
        </p>
      </motion.div>

      {/* --- TESTIMONIAL CAROUSEL --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full relative z-10 flex items-center justify-center my-6 lg:my-3"
      >
        <TestimonialCarousel />
      </motion.div>

      {/* --- BOTTOM TRUST STRIP --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-4 mt-2 lg:mt-0"
      >
        <TrustMetricsStrip />
      </motion.div>

    </section>
  );
};

export default TestimonialsSection;
