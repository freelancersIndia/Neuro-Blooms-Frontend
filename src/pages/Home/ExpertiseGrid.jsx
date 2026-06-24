import React from 'react';
import { motion } from 'framer-motion';

export const ExpertiseGrid = () => {
  const skills = [
    {
      name: 'Autism Spectrum Disorder (ASD)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M11.75 3.5H8a2 2 0 0 0-2 2v3.75a1.5 1.5 0 0 1-1.5 1.5h-.75a1.5 1.5 0 0 0 0 3h.75a1.5 1.5 0 0 1 1.5 1.5V19a2 2 0 0 0 2 2h3.75a1.5 1.5 0 0 1 1.5 1.5v.75a1.5 1.5 0 0 0 3 0v-.75a1.5 1.5 0 0 1 1.5-1.5H19a2 2 0 0 0 2-2v-3.75a1.5 1.5 0 0 1 1.5-1.5h.75a1.5 1.5 0 0 0 0-3h-.75a1.5 1.5 0 0 1-1.5-1.5V5.5a2 2 0 0 0-2-2h-3.75a1.5 1.5 0 0 1-1.5-1.5v-.75a1.5 1.5 0 0 0-3 0v.75a1.5 1.5 0 0 1-1.5 1.5z" />
        </svg>
      )
    },
    {
      name: 'ADHD',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="5" r="2" />
          <path d="M12 10l-2 3-3-1M18 10l-3-1-3 2v4M13 18l-3 4M15 15l2 4" />
        </svg>
      )
    },
    {
      name: 'Early Intervention',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 22V12" />
          <path d="M12 12c2.5-2.5 5-2.5 7-1a4.5 4.5 0 0 1-1.5 7.5c-2.5.5-4.5-1.5-5.5-6.5z" fill="currentColor" fillOpacity="0.1" />
          <path d="M12 15c-2.5-2.5-5-2.5-7-1a4.5 4.5 0 0 0 1.5 7.5c2.5.5 4.5-1.5 5.5-6.5z" fill="currentColor" fillOpacity="0.1" />
        </svg>
      )
    },
    {
      name: 'Developmental Assessment',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      )
    },
    {
      name: 'Learning Disabilities (SLD)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    },
    {
      name: 'Cerebral Palsy (CP)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      name: 'Positive Parenting',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )
    },
    {
      name: 'Family Therapy',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      name: 'Behavior Disorders',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    {
      name: 'High-Risk Newborn Follow-up',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      )
    },
    {
      name: 'Multi Sensory Integration Therapy',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707" />
        </svg>
      )
    },
    {
      name: 'Neuro Developmental Disabilities',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-4.12 2.5 2.5 0 0 1 0-4.88 2.5 2.5 0 0 1 2.46-3.06z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-4.12 2.5 2.5 0 0 0 0-4.88 2.5 2.5 0 0 0-2.46-3.06z" fill="currentColor" fillOpacity="0.1" />
        </svg>
      )
    },
    {
      name: 'Child Nutrition Guidance',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 22c4.97 0 9-4.03 9-9 0-4.97-4.03-9-9-9s-9 4.03-9 9c0 4.97 4.03 9 9 9z" />
          <path d="M12 4V2c0 0 3 .5 3 2s-3 2-3 2z" />
        </svg>
      )
    },
    {
      name: 'Trauma Focused CBT',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.1" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
    }
  ];

  // Stagger wrapper variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 140,
        damping: 14
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="inline-flex items-center gap-2 text-[#3B8A4C] font-extrabold text-sm font-display tracking-wide uppercase">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>Areas of Expertise</span>
      </div>

      {/* Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -2 }}
            className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center space-y-2.5 shadow-[0_4px_15px_rgba(79,94,84,0.03)] hover:shadow-[0_8px_20px_rgba(79,94,84,0.06)] hover:border-emerald-100/60 transition-all duration-300 min-h-[96px] cursor-default"
          >
            <div className="w-9 h-9 rounded-xl bg-[#E8F5E9]/50 text-[#3B8A4C] flex items-center justify-center flex-shrink-0">
              {skill.icon}
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-700 font-display leading-tight">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExpertiseGrid;
