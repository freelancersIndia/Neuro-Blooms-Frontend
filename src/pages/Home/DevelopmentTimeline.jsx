import React from 'react';
import { motion } from 'framer-motion';
import TimelineStepCard from './TimelineStepCard';

export const DevelopmentTimeline = () => {
  // Leaf doodles for title decoration
  const leafDoodleLeft = (
    <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#3B8A4C] fill-current opacity-70">
      <path d="M25 35 Q15 25 18 15 Q21 5 35 2 Q25 12 28 20 Q31 28 25 35 Z" />
      <path d="M10 25 Q3 18 8 10 Q13 2 22 5 Q13 12 14 18 Q15 24 10 25 Z" opacity="0.6" />
    </svg>
  );

  const leafDoodleRight = (
    <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#3B8A4C] fill-current opacity-70 transform scale-x-[-1]">
      <path d="M25 35 Q15 25 18 15 Q21 5 35 2 Q25 12 28 20 Q31 28 25 35 Z" />
      <path d="M10 25 Q3 18 8 10 Q13 2 22 5 Q13 12 14 18 Q15 24 10 25 Z" opacity="0.6" />
    </svg>
  );

  const steps = [
    {
      stepNumber: '1',
      title: 'Assessment',
      description: 'Comprehensive evaluation to understand your child\'s strengths, challenges and developmental needs.',
      color: '#3B8A4C', // green
      bgLight: '#E8F5E9',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 20h9M3 20h.01M9 16H3M15 12H3M18 8H3" />
          <circle cx="17" cy="15" r="3" />
          <path d="M19.5 17.5L22 20" />
        </svg>
      )
    },
    {
      stepNumber: '2',
      title: 'Goal Planning',
      description: 'We create a personalized development plan with clear goals and milestones for your child.',
      color: '#F57C00', // orange
      bgLight: '#FFF3E0',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    },
    {
      stepNumber: '3',
      title: 'Intervention',
      description: 'Engaging 1:1 and group sessions using evidence-based intervention strategies.',
      color: '#1E88E5', // blue
      bgLight: '#E3F2FD',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      stepNumber: '4',
      title: 'Parent Coaching',
      description: 'We train and empower parents to support their child\'s development confidently at home.',
      color: '#3B8A4C', // green
      bgLight: '#E8F5E9',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="9" cy="8" r="3" />
          <circle cx="15" cy="8" r="3" />
          <path d="M6 18c0-2.5 2-4 3-4h6c1 0 3 1.5 3 4" />
          <path d="M12 3a2 2 0 0 1 2 2c0 1-2 3-2 3s-2-2-2-3a2 2 0 0 1 2-2z" fill="currentColor" />
        </svg>
      )
    },
    {
      stepNumber: '5',
      title: 'Progress Review',
      description: 'Regular reviews to measure progress, adjust goals, and celebrate achievements.',
      color: '#8E24AA', // purple
      bgLight: '#F3E5F5',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      )
    },
    {
      stepNumber: '6',
      title: 'Independence',
      description: 'Building skills, confidence and independence for a brighter and successful future.',
      color: '#D48C00', // gold
      bgLight: '#FFFDE7',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="6" r="2.5" />
          <path d="M12 8.5v6.5M8 11.5l4-3 4 3M9.5 20l2.5-5 2.5 5" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-16 w-full">
      
      {/* Title with doodles */}
      <div className="flex items-center justify-center gap-3 md:gap-5 text-center">
        {leafDoodleLeft}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-display tracking-tight leading-none">
          Our 6-Step Development Journey
        </h3>
        {leafDoodleRight}
      </div>

      {/* Timeline Layout Container */}
      <div className="relative w-full">
        
        {/* --- DESKTOP VIEW CONNECTORS & ARROWS --- */}
        <div className="absolute top-[3rem] left-[6%] right-[6%] h-0.5 border-t-2 border-dashed border-[#A5D6A7]/40 z-0 hidden lg:block pointer-events-none" />
        
        {/* Step Arrows desktop */}
        <div className="absolute top-[2.4rem] left-[6%] right-[6%] w-[88%] flex justify-between z-0 hidden lg:flex pointer-events-none opacity-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="text-[#3B8A4C] font-black text-sm select-none mx-auto transform translate-x-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          ))}
        </div>

        {/* --- MOBILE VIEW DASHED CONNECTOR LINE (Left side margin) --- */}
        <div className="absolute top-8 bottom-8 left-4 w-0.5 border-l-2 border-dashed border-[#A5D6A7]/40 z-0 block md:hidden pointer-events-none" />

        {/* --- TABLET VIEW DASHED CONNECTOR LINE (Dual rows) --- */}
        {/* Dash lines on tablet (hidden on desktop and mobile) */}
        <div className="absolute top-[3rem] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-[#A5D6A7]/30 z-0 hidden md:block lg:hidden pointer-events-none" />
        <div className="absolute bottom-[11.5rem] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-[#A5D6A7]/30 z-0 hidden md:block lg:hidden pointer-events-none" />

        {/* Timeline Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6 lg:gap-8 relative z-10 pl-10 md:pl-0"
        >
          {steps.map((step, idx) => (
            <TimelineStepCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              color={step.color}
              bgLight={step.bgLight}
              icon={step.icon}
              idx={idx}
            />
          ))}
        </motion.div>

      </div>

    </div>
  );
};

export default DevelopmentTimeline;
