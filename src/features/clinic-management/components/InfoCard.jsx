import React from 'react';
import { Info } from 'lucide-react';

export const InfoCard = () => {
  return (
    <div className="flex gap-4 p-4 bg-[#F3E8FF] border border-[#E5E7EB] rounded-2xl items-start shadow-sm select-none">
      <div className="p-1 rounded-lg text-[#6D28D9] flex-shrink-0 mt-0.5">
        <Info size={18} />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xs font-bold text-[#6D28D9]">Information</span>
        <p className="text-xs font-medium text-[#4B5563] mt-1 leading-normal">
          Clinic breaks temporarily pause appointment booking during the configured time period.
        </p>
        <div className="flex flex-col gap-1 mt-2">
          <span className="text-xs font-semibold text-[#4B5563] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]" />
            Stay within clinic operating hours
          </span>
          <span className="text-xs font-semibold text-[#4B5563] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]" />
            Not overlap with another break
          </span>
          <span className="text-xs font-semibold text-[#4B5563] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]" />
            Cannot exist on closed weekdays
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
