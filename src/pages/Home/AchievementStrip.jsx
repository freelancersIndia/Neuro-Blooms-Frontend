import React from 'react';
import { motion } from 'framer-motion';
import { UserRound, Users, GraduationCap, ShieldCheck } from 'lucide-react';

export const AchievementStrip = () => {
  const achievements = [
    {
      title: '23+ Years',
      subtitle: 'Clinical Experience',
      color: '#3B8A4C', // green
      bgLight: '#E8F5E9',
      icon: <UserRound className="h-5 w-5" />
    },
    {
      title: 'National Faculty',
      subtitle: 'Early Intervention',
      color: '#F57C00', // orange
      bgLight: '#FFF3E0',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: 'Autism &',
      subtitle: 'ADHD Specialist',
      color: '#1E88E5', // blue
      bgLight: '#E3F2FD',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'AIIMS Certified',
      subtitle: 'Master Trainer',
      color: '#8E24AA', // purple
      bgLight: '#F3E5F5',
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      title: 'Evidence-Based',
      subtitle: 'Child Development Care',
      color: '#3B8A4C', // green
      bgLight: '#E8F5E9',
      icon: <ShieldCheck className="h-5 w-5" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white border border-slate-100 rounded-[32px] p-6 lg:p-7 shadow-[0_15px_45px_rgba(79,94,84,0.03)] w-full relative z-10 flex flex-col justify-center"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center text-center space-y-2.5 w-full"
          >
            {/* Colored icon circles */}
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ backgroundColor: item.bgLight, color: item.color }}
            >
              {item.icon}
            </div>
            <div className="space-y-0.5">
              <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm font-display leading-tight">
                {item.title}
              </h4>
              <p className="text-slate-500 text-[10px] sm:text-xs leading-normal">
                {item.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementStrip;
