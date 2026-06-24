import React from 'react';
import { motion } from 'framer-motion';

export const ComparisonRow = ({
  category,
  traditionalTitle,
  traditionalDesc,
  traditionalIcon,
  centerIcon,
  neuroTitle,
  neuroDesc,
  neuroIcon,
  rowNumber
}) => {
  // Desktop layout (lg and up)
  const desktopLayout = (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: rowNumber * 0.08 }}
      className="hidden lg:grid grid-cols-12 gap-6 items-center py-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/40 rounded-2xl px-5 transition-all duration-300 group/row"
    >
      {/* Column 1: Traditional Therapy */}
      <div className="col-span-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50 text-red-400 flex-shrink-0 shadow-sm transition-transform group-hover/row:-translate-x-0.5">
          {traditionalIcon}
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-slate-800 text-sm font-display">{traditionalTitle}</h4>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{traditionalDesc}</p>
        </div>
      </div>

      {/* Column 2: Comparison Category */}
      <div className="col-span-2 flex flex-col items-center justify-center text-center">
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-amber-50 text-amber-500 flex-shrink-0 mb-1 shadow-sm transition-transform group-hover/row:scale-105">
          {centerIcon}
        </div>
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
          {category}
        </span>
      </div>

      {/* Column 3: Neuro Blooms Approach */}
      <div className="col-span-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-50 text-[#3B8A4C] flex-shrink-0 shadow-sm transition-transform group-hover/row:translate-x-0.5">
            {neuroIcon}
          </div>
          <div className="space-y-0.5">
            <h4 className="font-bold text-[#3B8A4C] text-sm font-display">{neuroTitle}</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{neuroDesc}</p>
          </div>
        </div>

        {/* Checkmark in double border circles */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0.5 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: rowNumber * 0.1 }}
          className="w-6 h-6 rounded-full border border-emerald-500/20 flex items-center justify-center text-[#3B8A4C] bg-emerald-50 flex-shrink-0 p-0.5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );

  // Mobile/Tablet layout (less than lg)
  const mobileLayout = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="lg:hidden bg-slate-50/50 p-5 rounded-[24px] border border-slate-100 shadow-[0_4px_15px_rgba(79,94,84,0.02)] space-y-4 hover:shadow-md transition-all duration-300"
    >
      {/* Category Indicator Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm">
          <span className="opacity-80">{centerIcon}</span>
          <span>{category}</span>
        </div>
      </div>

      {/* Traditional Therapy Block */}
      <div className="bg-white p-4 rounded-2xl border border-red-50/50 flex gap-3 items-start">
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-red-50/80 text-red-400 flex-shrink-0 shadow-inner">
          {traditionalIcon}
        </div>
        <div className="space-y-0.5">
          <h5 className="font-bold text-slate-800 text-sm font-display">{traditionalTitle}</h5>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{traditionalDesc}</p>
        </div>
      </div>

      {/* VS Divider */}
      <div className="flex items-center justify-center relative py-1">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-slate-200 z-0" />
        <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-800 text-xs font-black shadow-sm">
          VS
        </span>
      </div>

      {/* Neuro Blooms Approach Block */}
      <div className="bg-[#E8F5E9]/30 p-4 rounded-2xl border border-[#A5D6A7]/25 flex gap-3 items-start relative">
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-50 text-[#3B8A4C] flex-shrink-0 shadow-inner">
          {neuroIcon}
        </div>
        <div className="space-y-0.5 flex-grow pr-6">
          <h5 className="font-bold text-[#3B8A4C] text-sm font-display">{neuroTitle}</h5>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{neuroDesc}</p>
        </div>
        {/* Checkmark in top-right */}
        <div className="absolute top-4 right-4 w-5 h-5 rounded-full border border-emerald-500/25 flex items-center justify-center text-[#3B8A4C] bg-emerald-50 p-0.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {desktopLayout}
      {mobileLayout}
    </>
  );
};

export default ComparisonRow;
