import React from 'react';
import { CalendarCheck } from 'lucide-react';

export const AppointmentSummary = ({ doctorName = "Dr. A. Jagadish", date, time, childName, childAge, consultationReason }) => {
  
  // Format Date beautifully: e.g. "22 June 2026"
  const formatDate = (dateObj) => {
    if (!dateObj) return 'Not selected';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-[#E8F5E9]/45 border border-[#A5D6A7]/20 rounded-3xl p-5 w-full text-left shadow-sm">
      {/* Title */}
      <div className="flex items-center gap-1.5 pb-3.5 border-b border-[#A5D6A7]/20 text-[#2E7D32] font-extrabold text-xs sm:text-sm font-display">
        <CalendarCheck className="h-4.5 w-4.5 text-[#3B8A4C]" />
        <span>Appointment Summary</span>
      </div>

      {/* Grid of Summary Details */}
      <div className="grid grid-cols-3 gap-y-4 gap-x-4 pt-3.5 text-xs">
        {/* Doctor */}
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Doctor</span>
          <span className="font-extrabold text-slate-800 font-display">{doctorName}</span>
        </div>

        {/* Date */}
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Date</span>
          <span className="font-extrabold text-slate-800 font-display">{formatDate(date)}</span>
        </div>

        {/* Time */}
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Time</span>
          <span className="font-extrabold text-slate-800 font-display">{time || 'Not selected'}</span>
        </div>

        {/* Child */}
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Child</span>
          <span className="font-extrabold text-slate-800 font-display">{childName || '—'}</span>
        </div>

        {/* Age */}
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Age</span>
          <span className="font-extrabold text-slate-800 font-display">{childAge ? `${childAge} Years` : '—'}</span>
        </div>

        {/* Consultation */}
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Consultation</span>
          <span className="font-extrabold text-[#3B8A4C] font-display">{consultationReason || '—'}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
