import React from 'react';
import { motion } from 'framer-motion';
import ProcessStepCard from './ProcessStepCard';

export const ProcessFlow = () => {
  const steps = [
    {
      stepNumber: '1',
      title: 'Book Your Appointment',
      description: 'Schedule a consultation with our care team at your convenience.',
      color: '#3B8A4C', // green
      bgLight: '#E8F5E9',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=300',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      stepNumber: '2',
      title: 'Initial Consultation',
      description: 'We understand your concerns, answer your questions, and guide you.',
      color: '#F57C00', // orange
      bgLight: '#FFF3E0',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      stepNumber: '3',
      title: 'Comprehensive Assessment',
      description: 'Our specialists conduct a detailed evaluation to understand strengths and needs.',
      color: '#1E88E5', // blue
      bgLight: '#E3F2FD',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=300',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5">
          <path d="M12 20h9M3 20h.01M9 16H3M15 12H3M18 8H3" />
          <circle cx="17" cy="15" r="3" />
          <path d="M19.5 17.5L22 20" />
        </svg>
      )
    },
    {
      stepNumber: '4',
      title: 'Personalized Plan',
      description: 'We create a customized development plan with clear goals and strategies.',
      color: '#3B8A4C', // green
      bgLight: '#E8F5E9',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    },
    {
      stepNumber: '5',
      title: 'Therapy & Coaching',
      description: 'Your child receives expert therapy while we empower you as a partner.',
      color: '#8E24AA', // purple
      bgLight: '#F3E5F5',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=300',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      stepNumber: '6',
      title: 'Track & Celebrate',
      description: 'We track progress, adjust plans, and celebrate every achievement together.',
      color: '#D48C00', // gold
      bgLight: '#FFFDE7',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=300',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5">
          <polyline points="23 6 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      )
    }
  ];

  // Grid container animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className="relative w-full">
      
      {/* --- DESKTOP VIEW CONNECTING ARROWS --- */}
      <div className="absolute top-[2.2rem] left-[6%] right-[6%] w-[88%] flex justify-between z-0 hidden lg:flex pointer-events-none opacity-50">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="text-[#3B8A4C] font-black text-sm select-none mx-auto transform translate-x-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 animate-[pulse_2s_infinite]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        ))}
      </div>

      {/* --- TABLET VIEW DASHED CONNECTOR LINES --- */}
      {/* 3 cards per row, 2 rows */}
      <div className="absolute top-[2.2rem] left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[#A5D6A7]/30 z-0 hidden md:block lg:hidden pointer-events-none" />
      <div className="absolute bottom-[8.5rem] left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[#A5D6A7]/30 z-0 hidden md:block lg:hidden pointer-events-none" />

      {/* --- MOBILE VIEW DASHED CONNECTOR LINE --- */}
      <div className="absolute top-8 bottom-8 left-4 w-0.5 border-l-2 border-dashed border-[#A5D6A7]/40 z-0 block md:hidden pointer-events-none" />

      {/* Cards List Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-5 lg:gap-6 relative z-10 pl-9 md:pl-0"
      >
        {steps.map((step, idx) => (
          <ProcessStepCard
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            color={step.color}
            bgLight={step.bgLight}
            icon={step.icon}
            image={step.image}
            idx={idx}
          />
        ))}
      </motion.div>

    </div>
  );
};

export default ProcessFlow;
