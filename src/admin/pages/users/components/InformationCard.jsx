import React from 'react';

export const InformationCard = ({ icon: Icon, label, value, subValue, valueClass = '' }) => {
  return (
    <div className="bg-slate-50/40 border border-slate-100/80 rounded-2xl p-4 flex flex-col justify-between text-left min-w-0 flex-1">
      {/* Icon + Label */}
      <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[9px] uppercase tracking-wider">
        {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />}
        <span>{label}</span>
      </div>

      {/* Values */}
      <div className="mt-3 flex flex-col text-left">
        <span className={`text-xs font-black text-slate-800 leading-tight ${valueClass}`}>
          {value}
        </span>
        {subValue && (
          <span className="text-[9px] font-semibold text-slate-400 mt-1.5 leading-none">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default InformationCard;
