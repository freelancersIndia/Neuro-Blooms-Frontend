import React from 'react';
import { motion } from 'framer-motion';

export const StatisticCard = ({ icon: Icon, label, value, subLabel, iconColorClass, iconBgClass }) => {
  return (
    <motion.div
      whileHover={{ y: -2, shadow: '0 12px 30px -5px rgba(0,0,0,0.03)' }}
      className="bg-white border border-slate-100 rounded-[20px] p-5 flex items-center gap-4.5 transition-all duration-200 text-left select-none shadow-sm cursor-pointer min-h-[110px]"
    >
      {/* Icon Circle wrapper */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBgClass}`}>
        <Icon className={`w-6.5 h-6.5 ${iconColorClass}`} />
      </div>

      {/* Label and Count values */}
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider font-display">
          {label}
        </span>
        <span className="text-2xl font-black text-slate-800 tracking-tight mt-0.5 font-display leading-tight">
          {value}
        </span>
        <span className="text-[10px] font-bold text-slate-400 mt-1 truncate">
          {subLabel}
        </span>
      </div>
    </motion.div>
  );
};

export default StatisticCard;
