import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, HeartHandshake, Award } from 'lucide-react';

export const ProgramValueStrip = () => {
  const valueItems = [
    {
      title: 'Individualized Plans',
      description: 'Tailored to your child\'s unique strengths and needs.',
      color: '#3B8A4C', // green
      bgLight: '#E8F5E9',
      icon: <Users className="h-6 w-6" />
    },
    {
      title: 'Evidence-Based',
      description: 'Interventions backed by research and best practices.',
      color: '#F57C00', // orange
      bgLight: '#FFF3E0',
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: 'Parent Partnership',
      description: 'We walk with you every step of the way.',
      color: '#1E88E5', // blue
      bgLight: '#E3F2FD',
      icon: <HeartHandshake className="h-6 w-6" />
    },
    {
      title: 'Measurable Results',
      description: 'Real progress. Real impact. Stronger outcomes.',
      color: '#8E24AA', // purple
      bgLight: '#F3E5F5',
      icon: <Award className="h-6 w-6" />
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-[0_15px_45px_rgba(79,94,84,0.06)] border border-slate-100/60 w-full relative z-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {valueItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex gap-4 items-start"
          >
            <div 
              className="p-3 rounded-2xl flex-shrink-0 shadow-sm border border-slate-100/40"
              style={{ backgroundColor: item.bgLight, color: item.color }}
            >
              {item.icon}
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base font-display">
                {item.title}
              </h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgramValueStrip;
