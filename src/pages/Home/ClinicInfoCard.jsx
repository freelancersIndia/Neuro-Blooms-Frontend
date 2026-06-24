import React from 'react';
import { Clock } from 'lucide-react';

export const ClinicInfoCard = () => {
  return (
    <div className="relative w-full max-w-[420px] lg:max-w-none mx-auto">
      {/* Soft green organic dashed border frame */}
      <div className="absolute inset-0 border-2 border-dashed border-[#A5D6A7]/50 rounded-[40px_80px_35px_70px] transform rotate-2 scale-103 pointer-events-none z-0" />
      
      {/* Image Container */}
      <div className="w-[96%] aspect-[1.3/1] rounded-[35px_75px_40px_65px] overflow-hidden border-4 border-white shadow-md relative z-10 bg-emerald-50">
        <img
          src="/images/contact/clinic_interior_reception.png"
          alt="Neuro Blooms clinic reception interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Hours Card */}
      <div className="absolute bottom-[-20px] left-[-10px] sm:left-[-20px] bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(79,94,84,0.08)] border border-slate-100/60 flex items-center gap-3.5 z-20 max-w-[280px] select-none">
        <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center flex-shrink-0 shadow-sm">
          <Clock className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="flex flex-col text-left leading-snug">
          <span className="text-xs font-black text-slate-800 font-display">
            Mon - Sat: 9:00 AM - 7:00 PM
          </span>
          <span className="text-[11px] text-slate-400 font-bold">
            Sunday: Closed
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClinicInfoCard;
