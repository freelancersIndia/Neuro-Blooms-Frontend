import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Container from '../../components/common/Container';

export const OurStorySection = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden select-none">
      
      {/* Decorative Doodles */}
      {/* Dotted path + Heart Doodle */}
      <div className="absolute top-[10%] right-[10%] w-32 h-24 opacity-35 hidden md:block select-none pointer-events-none z-0">
        <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,80 Q80,20 130,70" stroke="#FF8A80" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <g transform="translate(130, 70) rotate(-10) scale(0.6)">
            <path d="M12,5 C12,5 4,1 1,9 C-2,17 7,22 12,28 C17,22 26,17 23,9 C20,1 12,5 12,5 Z" fill="#FF8A80" />
          </g>
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Clinic Image and Highlight Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            {/* Dashed outer border border */}
            <div className="absolute inset-0 border-2 border-dashed border-[#A5D6A7]/40 rounded-[32px] transform rotate-2 scale-102 pointer-events-none z-0" />
            
            {/* Main Image Container */}
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-[32px] overflow-hidden border-4 border-white shadow-xl z-10 bg-slate-50">
              <img 
                src="/images/doctor/doctor_office_playroom.png" 
                alt="Neuro Blooms Clinic Playroom" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlapping Highlight Card */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="absolute -bottom-6 -left-4 md:left-6 bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_12px_30px_rgba(79,94,84,0.08)] flex items-start gap-4 max-w-[280px] sm:max-w-[320px] z-20"
            >
              <div className="bg-emerald-100 text-[#2E7D32] p-3 rounded-xl shrink-0 flex items-center justify-center">
                <Heart className="h-6 w-6 fill-current text-[#3B8A4C]" />
              </div>
              <div className="text-left space-y-1">
                <h4 className="text-[#3B8A4C] text-sm sm:text-base font-black font-display">Since 2003</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 font-semibold leading-snug">
                  Supporting Children & Families Through Early Intervention
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Narrative Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-left space-y-6 lg:pl-6 pt-6 lg:pt-0"
          >
            <div className="space-y-2">
              <span className="text-secondary font-semibold tracking-wider text-xs uppercase block font-display">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight font-display">
                Our Story
              </h2>
              <div className="h-1 w-12 bg-accent mt-2" />
            </div>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
              <p className="font-semibold text-slate-700">
                Neuro Blooms was founded with a simple belief: Every child can grow, learn and thrive when provided with the right support at the right time.
              </p>
              <p>
                We understand that every child's developmental journey is unique. Our mission is to provide compassionate, evidence-based developmental care that empowers both children and their families.
              </p>
              <p>
                Through developmental assessments, early intervention programs, parent coaching and continuous guidance, we help children achieve meaningful progress in everyday life.
              </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

export default OurStorySection;
