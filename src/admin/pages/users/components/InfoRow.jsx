import React from 'react';

export const InfoRow = ({ icon: Icon, label, value, valueClass = '' }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100/60 last:border-b-0 last:pb-0 gap-4 text-xs font-bold">
      <div className="flex items-center gap-2.5 text-slate-500 min-w-0">
        {Icon && <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />}
        <span className="text-slate-450 font-semibold">{label}</span>
      </div>
      <div className={`text-slate-800 font-extrabold text-right truncate ${valueClass}`}>
        {value}
      </div>
    </div>
  );
};

export default InfoRow;
