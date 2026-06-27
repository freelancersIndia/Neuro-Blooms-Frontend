import React from 'react';
import { UserX, Plus } from 'lucide-react';

export const EmptyState = ({ onCreatePatient }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-[20px] p-10 flex flex-col items-center justify-center text-center shadow-sm select-none text-left min-h-[350px]">
      <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-5">
        <UserX className="w-8 h-8" />
      </div>
      <h3 className="text-base font-extrabold text-slate-800 tracking-tight font-display">
        No Patients Found
      </h3>
      <p className="text-xs font-semibold text-slate-500 mt-2 max-w-sm leading-relaxed">
        Patients matching your search or filters will appear here. Try adjusting your query or filters, or add a new patient profile.
      </p>
      <button
        type="button"
        onClick={onCreatePatient}
        className="mt-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-colors font-display flex items-center gap-1.5"
      >
        <Plus className="w-4 h-4" />
        <span>Add New Patient</span>
      </button>
    </div>
  );
};

export default EmptyState;
