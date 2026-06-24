import React from 'react';
import { motion } from 'framer-motion';

export const TimelineStepCard = ({
  stepNumber,
  title,
  description,
  color,
  bgLight,
  icon,
  idx
}) => {
  // Animation variant for single card
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 14,
        delay: idx * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white rounded-[28px] p-6 text-center border border-slate-100/60 shadow-[0_10px_30px_rgba(79,94,84,0.03)] hover:shadow-[0_15px_35px_rgba(79,94,84,0.06)] relative transition-all duration-300 flex flex-col items-center flex-grow"
    >
      {/* Top Floating Number Badge */}
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-sm absolute -top-4 left-1/2 -translate-x-1/2"
        style={{ backgroundColor: color }}
      >
        {stepNumber}
      </div>

      {/* Large Circular Icon Circle (Pastel Bg) */}
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mt-3 mb-5 transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: bgLight, color: color }}
      >
        {icon}
      </div>

      {/* Step Content */}
      <div className="space-y-2">
        <h4 
          className="text-base sm:text-lg font-bold font-display leading-tight"
          style={{ color: color }}
        >
          {title}
        </h4>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
          {description}
        </p>
      </div>

    </motion.div>
  );
};

export default TimelineStepCard;
