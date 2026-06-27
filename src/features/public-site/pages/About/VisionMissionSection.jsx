import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';
import Container from '../../../../components/common/Container';

export const VisionMissionSection = () => {
  return (
    <section className="relative py-20 bg-[#FFF8E8] overflow-hidden select-none">
      
      {/* Background blobs */}
      <div className="absolute top-[20%] left-[5%] w-[25%] h-[35%] bg-emerald-100/30 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[5%] w-[25%] h-[35%] bg-purple-100/30 rounded-full filter blur-3xl pointer-events-none z-0" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="relative bg-white rounded-[32px] p-8 sm:p-10 border border-emerald-100/50 shadow-[0_10px_35px_rgba(79,94,84,0.04)] overflow-hidden group text-left"
          >
            {/* Soft Green Gradient Top Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Mountain Outline Illustration (Doodle) */}
            <div className="absolute bottom-4 right-4 text-emerald-100 w-24 h-16 pointer-events-none opacity-50 z-0">
              <svg viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M10,70 L50,20 L80,50 L110,30 L120,70 Z" />
                <path d="M30,45 L45,45 L50,55" />
                <path d="M85,47 L95,43 L100,50" />
              </svg>
            </div>

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center shadow-sm shrink-0 mb-6 group-hover:scale-105 transition-transform duration-300">
              <Eye className="w-7 h-7" />
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-display mb-4">Our Vision</h3>
            
            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal z-10 relative">
              To create a future where every child has the opportunity to reach their fullest potential, participate confidently in society, and lead an independent, fulfilling life.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="relative bg-white rounded-[32px] p-8 sm:p-10 border border-purple-100/50 shadow-[0_10px_35px_rgba(79,94,84,0.04)] overflow-hidden group text-left"
          >
            {/* Soft Purple Gradient Top Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-300" />

            {/* Rocket Outline Illustration (Doodle) */}
            <div className="absolute bottom-4 right-4 text-purple-100 w-20 h-20 pointer-events-none opacity-50 z-0">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                <path d="M45,20 C50,10 60,10 65,20 L75,55 L55,75 L35,55 Z" />
                <path d="M35,55 C25,60 25,70 35,75 L55,75" />
                <path d="M75,55 C85,60 85,70 75,75 L55,75" />
                <path d="M50,75 L50,90 M40,80 L35,90 M60,80 L65,90" />
              </svg>
            </div>

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#8E24AA] flex items-center justify-center shadow-sm shrink-0 mb-6 group-hover:scale-105 transition-transform duration-300">
              <Target className="w-7 h-7" />
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-display mb-4">Our Mission</h3>
            
            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal z-10 relative">
              To provide evidence-based developmental care, early intervention services and parent empowerment programs that improve developmental outcomes for children and families.
            </p>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default VisionMissionSection;
