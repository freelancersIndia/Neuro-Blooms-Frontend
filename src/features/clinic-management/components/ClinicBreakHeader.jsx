import React from 'react';
import { Coffee, Plus } from 'lucide-react';

export const ClinicBreakHeader = ({ onAddClick, isAdmin }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none flex-shrink-0">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#6D28D9] flex-shrink-0 shadow-sm border border-[#E5E7EB]">
          <Coffee size={22} strokeWidth={2.2} />
        </div>
        <div className="flex flex-col text-left">
          <h2 className="text-2xl font-bold tracking-tight text-[#111827]">Clinic Breaks</h2>
          <span className="text-xs font-semibold text-[#4B5563] mt-1 leading-normal">
            Manage recurring breaks during clinic operating hours. Breaks automatically block appointment slot generation.
          </span>
        </div>
      </div>

      {isAdmin && (
        <button
          type="button"
          onClick={onAddClick}
          className="h-11 px-5 rounded-xl bg-[#6D28D9] text-xs font-bold text-white hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          Add Break
        </button>
      )}
    </div>
  );
};

export default ClinicBreakHeader;
