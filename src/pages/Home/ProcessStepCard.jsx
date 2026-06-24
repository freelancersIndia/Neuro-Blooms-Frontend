import React from 'react';
import { motion } from 'framer-motion';

export const ProcessStepCard = ({
  stepNumber,
  title,
  description,
  color,
  bgLight,
  icon,
  image,
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
        delay: idx * 0.08
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-[28px] p-5 pb-4 text-center border border-slate-100/60 shadow-[0_10px_25px_rgba(79,94,84,0.03)] hover:shadow-[0_15px_30px_rgba(79,94,84,0.06)] relative transition-all duration-300 flex flex-col items-center justify-between flex-grow w-full"
    >
      {/* Top Floating Number Badge */}
      <div 
        className="w-7 h-7 rounded-full flex items-center justify-center text-white font-extrabold text-xs shadow-sm absolute -top-3.5 left-1/2 -translate-x-1/2"
        style={{ backgroundColor: color }}
      >
        {stepNumber}
      </div>

      {/* Circular Icon (Pastel Bg) */}
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mt-2 mb-4"
        style={{ backgroundColor: bgLight, color: color }}
      >
        {icon}
      </div>

      {/* Card Text Content */}
      <div className="space-y-1.5 mb-4 flex-grow flex flex-col justify-start">
        <h4 
          className="text-sm sm:text-base font-extrabold font-display leading-tight"
          style={{ color: color }}
        >
          {title}
        </h4>
        <p className="text-slate-500 text-[11px] sm:text-xs leading-normal font-normal">
          {description}
        </p>
      </div>

      {/* Bottom Photo */}
      <div className="w-full h-20 sm:h-24 rounded-2xl overflow-hidden shadow-inner border border-slate-100 flex-shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
        />
      </div>

    </motion.div>
  );
};

export default ProcessStepCard;
