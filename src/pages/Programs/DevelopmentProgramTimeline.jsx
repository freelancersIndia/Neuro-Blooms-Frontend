import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, FileText, UserCheck, ShieldAlert, CalendarRange, TrendingUp } from 'lucide-react';

export const DevelopmentProgramTimeline = () => {
  const steps = [
    {
      number: '1',
      title: 'Assessment',
      description: 'Detailed evaluation by our specialist.',
      color: '#3B8A4C', // green
      bgColor: 'bg-emerald-50 text-[#3B8A4C] border-emerald-100',
      icon: ClipboardCheck,
    },
    {
      number: '2',
      title: 'Program Planning',
      description: 'Personalized plan with clear goals.',
      color: '#1E88E5', // blue
      bgColor: 'bg-blue-50 text-blue-600 border-blue-100',
      icon: FileText,
    },
    {
      number: '3',
      title: 'Intervention Sessions',
      description: 'Therapy-based skill development.',
      color: '#8E24AA', // purple
      bgColor: 'bg-purple-50 text-purple-600 border-purple-100',
      icon: UserCheck,
    },
    {
      number: '4',
      title: 'Parent Coaching',
      description: 'Guidance & training for family.',
      color: '#F57C00', // orange
      bgColor: 'bg-orange-50 text-orange-500 border-orange-100',
      icon: ShieldAlert,
    },
    {
      number: '5',
      title: 'Monthly Reviews',
      description: 'Track progress & update goals.',
      color: '#E53935', // red/orange
      bgColor: 'bg-red-50 text-red-600 border-red-100',
      icon: CalendarRange,
    },
    {
      number: '6',
      title: 'Progress Reports',
      description: 'Quarterly reports & next steps.',
      color: '#00796B', // teal
      bgColor: 'bg-teal-50 text-teal-600 border-teal-100',
      icon: TrendingUp,
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
    <div className="space-y-10 w-full">
      {/* Title */}
      <div className="text-center lg:text-left">
        <h4 className="text-2xl font-extrabold text-slate-800 font-display tracking-tight">
          How NBDP Works
        </h4>
        <div className="h-1 w-12 bg-amber-400 rounded-full mt-2 mx-auto lg:mx-0" />
      </div>

      {/* Horizontal Timeline Flow Container */}
      <div className="relative w-full">
        {/* Horizontal Connector Line (Desktop Only) */}
        <div className="absolute top-[2.75rem] left-[8%] right-[8%] h-0.5 border-t-2 border-dashed border-slate-200 z-0 hidden lg:block pointer-events-none" />

        {/* Step Arrows (Desktop Only) */}
        <div className="absolute top-[2.15rem] left-[8%] right-[8%] w-[84%] flex justify-between z-0 hidden lg:flex pointer-events-none opacity-40">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="text-slate-400 font-bold text-sm mx-auto transform translate-x-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="w-5 h-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          ))}
        </div>

        {/* Vertical Connector Line (Mobile Only) */}
        <div className="absolute top-8 bottom-8 left-6 w-0.5 border-l-2 border-dashed border-slate-200 z-0 block lg:hidden pointer-events-none" />

        {/* Timeline Steps Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10 pl-14 lg:pl-0"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center relative"
              >
                {/* Step Circle Badge */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-extrabold text-xs shadow-xs absolute -top-3.5 left-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 left-6 lg:left-auto lg:translate-x-auto select-none"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>

                {/* Icon Wrapper */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mt-2 mb-4 border ${step.bgColor}`}>
                  <Icon className="w-5.5 h-5.5" />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-800 font-display leading-snug">
                    {step.title}
                  </h5>
                  <p className="text-slate-500 text-[10.5px] leading-normal font-medium">
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

export default DevelopmentProgramTimeline;
