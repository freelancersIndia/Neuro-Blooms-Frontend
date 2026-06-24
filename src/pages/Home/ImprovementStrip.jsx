import React from 'react';

export const ImprovementStrip = ({ icon: Icon, text, bgClass, iconBgClass, iconTextClass, labelClass }) => {
  return (
    <div className={`rounded-xl p-2 sm:p-2.5 flex items-center gap-2.5 w-full mt-3.5 ${bgClass} border border-slate-100/30`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBgClass} ${iconTextClass}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-left">
        <span className={`block text-[9px] font-extrabold uppercase tracking-wide leading-none ${labelClass}`}>
          Area of Improvement
        </span>
        <span className="block text-[11px] font-bold text-slate-700 leading-tight mt-1">
          {text}
        </span>
      </div>
    </div>
  );
};

export default ImprovementStrip;
