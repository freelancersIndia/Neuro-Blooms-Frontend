import React from 'react';
import { Coffee, Plus } from 'lucide-react';

export const EmptyState = ({ onCreateClick, isAdmin }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 select-none">
      <div className="w-16 h-16 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#6D28D9] mb-4 border border-[#E5E7EB] shadow-sm">
        <Coffee size={28} />
      </div>
      <h3 className="text-sm font-bold text-[#111827]">No Clinic Breaks Configured</h3>
      <p className="text-xs text-[#4B5563] mt-1.5 text-center max-w-[340px] leading-normal">
        Configure recurring breaks to automatically pause appointment booking during specific hours.
      </p>
      {isAdmin && (
        <button
          type="button"
          onClick={onCreateClick}
          className="mt-6 h-10 px-5 rounded-xl bg-[#6D28D9] text-xs font-bold text-white hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Plus size={14} />
          Create First Break
        </button>
      )}
    </div>
  );
};

export default EmptyState;
