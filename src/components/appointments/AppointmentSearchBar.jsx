import React from 'react';
import { Search } from 'lucide-react';

export const AppointmentSearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="relative flex items-center w-full">
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/5 transition-all duration-200"
      />
    </div>
  );
};

export default AppointmentSearchBar;
