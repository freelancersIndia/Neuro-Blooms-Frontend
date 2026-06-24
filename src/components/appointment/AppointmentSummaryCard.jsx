import React from 'react';

export const AppointmentSummaryCard = ({ title, icon, children }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_10px_30px_rgba(79,94,84,0.02)] flex flex-col space-y-3.5 text-left h-full">
      {/* Card Header */}
      <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-[#E8F5E9]/75 text-[#3B8A4C] flex items-center justify-center shadow-inner">
          {icon}
        </div>
        <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm font-display tracking-tight uppercase">
          {title}
        </h4>
      </div>

      {/* Card Content Grid */}
      <div className="space-y-3 flex-grow">
        {children}
      </div>
    </div>
  );
};

// Sub-component for individual metadata rows inside the cards
export const SummaryRow = ({ label, value, icon }) => {
  return (
    <div className="flex items-start gap-2.5 text-xs">
      {icon && (
        <div className="text-slate-400 mt-0.5 flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="space-y-0.5 leading-tight text-left">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
          {label}
        </span>
        <span className="font-bold text-slate-700 font-display">
          {value || '—'}
        </span>
      </div>
    </div>
  );
};

export default AppointmentSummaryCard;
