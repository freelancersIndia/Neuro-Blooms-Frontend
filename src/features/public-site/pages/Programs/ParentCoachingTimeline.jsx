import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Clipboard, BookOpen, Home, BarChart2 } from 'lucide-react';

export const ParentCoachingTimeline = () => {
  const steps = [
    {
      number: '1',
      title: 'Consultation',
      description: "Understand child's needs.",
      color: '#8E24AA', // purple
      bgColor: 'bg-purple-50 text-purple-600 border-purple-100',
      icon: MessageSquare,
    },
    {
      number: '2',
      title: 'Program Design',
      description: 'Personalized plan for your child.',
      color: '#1E88E5', // blue
      bgColor: 'bg-blue-50 text-blue-600 border-blue-100',
      icon: Clipboard,
    },
    {
      number: '3',
      title: 'Parent Training',
      description: 'Learn strategies & techniques.',
      color: '#3B8A4C', // green
      bgColor: 'bg-emerald-50 text-[#3B8A4C] border-emerald-100',
      icon: BookOpen,
    },
    {
      number: '4',
      title: 'Home Implementation',
      description: 'Apply strategies to routines.',
      color: '#F57C00', // orange
      bgColor: 'bg-orange-50 text-orange-500 border-orange-100',
      icon: Home,
    },
    {
      number: '5',
      title: 'Progress Tracking',
      description: 'Review progress & challenges.',
      color: '#E53935', // red
      bgColor: 'bg-red-50 text-red-600 border-red-100',
      icon: BarChart2,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="space-y-8 w-full">
      {/* Title */}
      <div className="text-left">
        <h4 className="text-xl font-extrabold text-slate-800 font-display tracking-tight">
          How Parent Coaching Works
        </h4>
        <div className="h-1 w-10 bg-purple-500 rounded-full mt-2" />
      </div>

      {/* Horizontal timeline */}
      <div className="relative w-full">
        {/* Connector Line (Desktop Only) */}
        <div className="absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-purple-200/50 z-0 hidden md:block pointer-events-none" />

        {/* Step Arrows (Desktop Only) */}
        <div className="absolute top-[1.95rem] left-[10%] right-[10%] w-[80%] flex justify-between z-0 hidden md:flex pointer-events-none opacity-40">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-purple-400 font-bold text-sm mx-auto transform translate-x-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="w-5 h-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          ))}
        </div>

        {/* Vertical Connector Line (Mobile Only) */}
        <div className="absolute top-6 bottom-6 left-6 w-0.5 border-l-2 border-dashed border-purple-200/50 z-0 block md:hidden pointer-events-none" />

        {/* Timeline grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-5 gap-5 relative z-10 pl-14 md:pl-0"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center relative"
              >
                {/* Step Circle Badge */}
                <div
                  className="w-6.5 h-6.5 rounded-full flex items-center justify-center text-white font-extrabold text-[10.5px] shadow-xs absolute -top-3 left-1/2 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 left-5 md:left-auto md:translate-x-auto select-none"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>

                {/* Icon Wrapper */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center mt-2.5 mb-3.5 border ${step.bgColor}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h5 className="text-[12.5px] sm:text-xs font-extrabold text-slate-800 font-display leading-snug">
                    {step.title}
                  </h5>
                  <p className="text-slate-500 text-[10px] leading-normal font-medium">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ParentCoachingTimeline;
