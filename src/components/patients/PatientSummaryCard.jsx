import React from 'react';

export const PatientSummaryCard = ({ stats }) => {
  const total = stats.totalPatients || 248;
  const underTreatment = stats.underTreatment || 142;
  const active = stats.activePatients - stats.underTreatment > 0 ? stats.activePatients - stats.underTreatment : 84;
  const completed = stats.completed || 16;
  const inactive = stats.inactive || 6;

  // Recalculate exact percentages
  const pctUnderTreatment = ((underTreatment / total) * 100).toFixed(1);
  const pctActive = ((active / total) * 100).toFixed(1);
  const pctCompleted = ((completed / total) * 100).toFixed(1);
  const pctInactive = ((inactive / total) * 100).toFixed(1);

  // SVG circle calculations
  const radius = 35;
  const circumference = 2 * Math.PI * radius; // ~219.91
  
  const strokeUnderTreatment = (underTreatment / total) * circumference;
  const strokeActive = (active / total) * circumference;
  const strokeCompleted = (completed / total) * circumference;
  const strokeInactive = (inactive / total) * circumference;

  const offsetUnderTreatment = circumference - strokeUnderTreatment;
  const offsetActive = offsetUnderTreatment - strokeActive;
  const offsetCompleted = offsetActive - strokeCompleted;
  const offsetInactive = offsetCompleted - strokeInactive;

  const legendItems = [
    { label: 'Under Treatment', count: underTreatment, pct: pctUnderTreatment, color: 'bg-purple-600', textColor: 'text-purple-650' },
    { label: 'Active', count: active, pct: pctActive, color: 'bg-emerald-500', textColor: 'text-emerald-650' },
    { label: 'Treatment Completed', count: completed, pct: pctCompleted, color: 'bg-blue-500', textColor: 'text-blue-650' },
    { label: 'Inactive', count: inactive, pct: pctInactive, color: 'bg-slate-400', textColor: 'text-slate-500' }
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm select-none text-left space-y-5">
      <h4 className="text-xs font-black text-slate-800 tracking-wider font-display uppercase border-b border-slate-50 pb-3">
        Patient Summary
      </h4>

      {/* SVG Donut Chart and Legend Wrapper */}
      <div className="flex flex-col items-center gap-5">
        
        {/* Donut Chart Graphics */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-slate-50 fill-transparent"
              strokeWidth="11"
            />
            {/* Inactive segment */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-slate-400 fill-transparent transition-all duration-500"
              strokeWidth="11.5"
              strokeDasharray={circumference}
              strokeDashoffset={offsetInactive}
            />
            {/* Completed segment */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-blue-500 fill-transparent transition-all duration-500"
              strokeWidth="11.5"
              strokeDasharray={circumference}
              strokeDashoffset={offsetCompleted}
            />
            {/* Active segment */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-emerald-500 fill-transparent transition-all duration-500"
              strokeWidth="11.5"
              strokeDasharray={circumference}
              strokeDashoffset={offsetActive}
            />
            {/* Under Treatment segment */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-purple-600 fill-transparent transition-all duration-500"
              strokeWidth="11.5"
              strokeDasharray={circumference}
              strokeDashoffset={offsetUnderTreatment}
            />
          </svg>

          {/* Central text displaying total count */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-slate-850 tracking-tight font-display leading-none">
              {total}
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider font-display mt-1">
              Patients
            </span>
          </div>
        </div>

        {/* Legend Indicators List */}
        <div className="w-full space-y-2.5 pt-1">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-xs font-bold text-slate-650">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`} />
                <span className="text-slate-650 font-semibold">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5 font-display text-right">
                <span className="text-slate-800 font-extrabold">{item.count}</span>
                <span className="text-[10px] font-bold text-slate-400">({item.pct}%)</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PatientSummaryCard;
