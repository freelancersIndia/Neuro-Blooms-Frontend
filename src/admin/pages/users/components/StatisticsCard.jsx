import React from 'react';
import { motion } from 'framer-motion';

export const StatisticsCard = ({ title, value, trend, icon: Icon, iconBgColor, iconColor, trendColor }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-4 text-left"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${iconBgColor} ${iconColor} flex-shrink-0`}>
        <Icon className="w-5.5 h-5.5" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
          {title}
        </span>
        <span className="text-2xl font-black text-slate-800 font-display leading-tight mt-1">
          {value}
        </span>
        <span className={`text-[10px] font-bold mt-1.5 leading-none ${trendColor}`}>
          {trend}
        </span>
      </div>
    </motion.div>
  );
};

export default StatisticsCard;
