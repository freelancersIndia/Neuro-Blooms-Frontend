import React from 'react';
import { Info, Check } from 'lucide-react';

export const AvailabilitySummary = ({ formValues, bookings = 6 }) => {
  const isAccepting = formValues?.accepting_appointments ?? true;
  const duration = formValues?.consultation_duration ?? 45;
  const capacity = formValues?.max_daily_patients ?? 10;
  const remaining = isAccepting ? Math.max(0, capacity - bookings) : 0;

  return (
    <div className="w-full flex flex-col gap-4 h-full">
      {/* Card 1: Quick Summary */}
      <div className="bg-[#F3EEFF]/40 border border-[#E9DDFE] rounded-[24px] p-5 flex flex-col justify-between flex-1 min-h-[160px] text-left select-none">
        <h4 className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
          Quick Preview
        </h4>
        
        <div className="space-y-2.5 mt-3">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-[#64748B]">Each patient slot</span>
            <span className="text-[#0F172A] font-bold">{duration} minutes</span>
          </div>
          
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-[#64748B]">Daily capacity</span>
            <span className="text-[#0F172A] font-bold">{capacity} patients</span>
          </div>

          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-[#64748B]">Available today</span>
            <span className={`font-bold ${isAccepting ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {isAccepting ? `${remaining} slots remaining` : 'No slots available'}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E9DDFE]/60 flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
            Status
          </span>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold leading-none select-none
            ${isAccepting 
              ? 'bg-[#E8F5E9] text-[#16A34A]' 
              : 'bg-[#FFEBEE] text-[#D32F2F]'
            }
          `}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isAccepting ? 'bg-[#16A34A]' : 'bg-[#D32F2F]'}`} />
            {isAccepting ? 'Accepting Appointments' : 'Appointments Paused'}
          </span>
        </div>
      </div>

      {/* Card 2: Information */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 flex flex-col justify-between flex-1 min-h-[160px] text-left select-none">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Info size={15} />
          </div>
          <h4 className="text-xs font-bold text-[#0F172A]">
            How these settings work
          </h4>
        </div>

        <ul className="space-y-2 mt-3 flex-1">
          <li className="flex items-start gap-2.5 text-[10px] font-semibold text-[#4B5563] leading-relaxed">
            <Check size={12} className="text-[#10B981] mt-0.5 flex-shrink-0" />
            <span>Consultation duration determines slot length</span>
          </li>
          <li className="flex items-start gap-2.5 text-[10px] font-semibold text-[#4B5563] leading-relaxed">
            <Check size={12} className="text-[#10B981] mt-0.5 flex-shrink-0" />
            <span>Max daily patients limits bookings per day</span>
          </li>
          <li className="flex items-start gap-2.5 text-[10px] font-semibold text-[#4B5563] leading-relaxed">
            <Check size={12} className="text-[#10B981] mt-0.5 flex-shrink-0" />
            <span>Disabling appointments hides availability</span>
          </li>
          <li className="flex items-start gap-2.5 text-[10px] font-semibold text-[#4B5563] leading-relaxed">
            <Check size={12} className="text-[#10B981] mt-0.5 flex-shrink-0" />
            <span>Changes take effect immediately</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AvailabilitySummary;
