import React from 'react';
import { motion } from 'framer-motion';

export const BenefitCard = ({ icon: Icon, title, description, accentClass, iconBgClass, iconTextClass }) => {
  return (
    <motion.div
      className="relative bg-white rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100/50 p-6 flex flex-col items-center text-center justify-between min-h-[220px] transition-all duration-300 overflow-hidden cursor-pointer group"
      whileHover={{ y: -8 }}
    >
      {/* Icon Wrapper */}
      <div className="flex flex-col items-center space-y-4 w-full">
        <div className={`flex items-center justify-center w-12 h-12 rounded-2xl ${iconBgClass} ${iconTextClass} transition-transform duration-300 group-hover:scale-110 shadow-[0_4px_12px_rgba(0,0,0,0.01)]`}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Title */}
        <h4 className="text-base font-extrabold text-slate-800 tracking-tight">
          {title}
        </h4>

        {/* Description */}
        <p className="text-[13px] text-slate-500 leading-relaxed max-w-[200px] font-normal">
          {description}
        </p>
      </div>

      {/* Spacing spacer to push divider down */}
      <div className="h-4"></div>

      {/* Bottom accent colored line */}
      <div className={`absolute bottom-0 left-0 w-full h-[5px] ${accentClass} rounded-b-[28px]`} />
    </motion.div>
  );
};

export default BenefitCard;
