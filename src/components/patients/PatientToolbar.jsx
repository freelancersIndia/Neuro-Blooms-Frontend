import React from 'react';
import { Search } from 'lucide-react';

export const PatientToolbar = ({ filters, onFilterChange }) => {
  const doctors = [
    "Dr. Priya Sharma",
    "Dr. Amit Verma",
    "Dr. Rohan Joshi",
    "Dr. Neha Singh"
  ];

  const handleSearchChange = (e) => {
    onFilterChange('search', e.target.value);
  };

  const handleSelectChange = (field, value) => {
    onFilterChange(field, value);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[20px] p-4 flex flex-col md:flex-row md:items-center gap-4 shadow-sm select-none text-left min-h-[76px] lg:h-19">
      
      {/* 1. Search Box Input */}
      <div className="relative flex-grow min-w-0 md:max-w-md">
        <span className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none">
          <Search className="h-4.5 w-4.5 text-slate-400" />
        </span>
        <input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Search patients..."
          className="block w-full h-11 pl-11.5 pr-4.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-150 rounded-xl text-xs font-bold text-slate-700 placeholder-slate-450 focus:outline-none focus:bg-white focus:border-[#7C3AED]/40 focus:ring-4 focus:ring-purple-50 transition-all font-display"
        />
      </div>

      {/* 2. Dropdown Filter Blocks */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-3.5 w-full md:w-auto">
        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => handleSelectChange('status', e.target.value)}
          className="flex-1 md:flex-none h-11 border border-slate-150 rounded-xl px-4 text-xs font-bold text-slate-650 hover:text-slate-800 bg-white hover:bg-slate-50 focus:outline-none focus:border-[#7C3AED]/40 focus:ring-4 focus:ring-purple-50 transition-all cursor-pointer min-w-[120px]"
        >
          <option value="All">All Statuses</option>
          <option value="Under Treatment">Under Treatment</option>
          <option value="Active">Active</option>
          <option value="Treatment Completed">Completed</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Gender Filter */}
        <select
          value={filters.gender}
          onChange={(e) => handleSelectChange('gender', e.target.value)}
          className="flex-1 md:flex-none h-11 border border-slate-150 rounded-xl px-4 text-xs font-bold text-slate-650 hover:text-slate-800 bg-white hover:bg-slate-50 focus:outline-none focus:border-[#7C3AED]/40 focus:ring-4 focus:ring-purple-50 transition-all cursor-pointer min-w-[120px]"
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Age Range Filter */}
        <select
          value={filters.ageRange}
          onChange={(e) => handleSelectChange('ageRange', e.target.value)}
          className="flex-1 md:flex-none h-11 border border-slate-150 rounded-xl px-4 text-xs font-bold text-slate-650 hover:text-slate-800 bg-white hover:bg-slate-50 focus:outline-none focus:border-[#7C3AED]/40 focus:ring-4 focus:ring-purple-50 transition-all cursor-pointer min-w-[125px]"
        >
          <option value="All">All Ages</option>
          <option value="0-3">0-3 Years</option>
          <option value="4-6">4-6 Years</option>
          <option value="7-12">7-12 Years</option>
          <option value="12+">12+ Years</option>
        </select>

        {/* Doctor Filter (Assigned Doctors) */}
        <select
          value={filters.doctor}
          onChange={(e) => handleSelectChange('doctor', e.target.value)}
          className="flex-1 md:flex-none h-11 border border-slate-150 rounded-xl px-4 text-xs font-bold text-slate-650 hover:text-slate-800 bg-white hover:bg-slate-50 focus:outline-none focus:border-[#7C3AED]/40 focus:ring-4 focus:ring-purple-50 transition-all cursor-pointer min-w-[145px]"
        >
          <option value="All">All Doctors</option>
          {doctors.map((doc) => (
            <option key={doc} value={doc}>{doc.replace('Dr. ', '')}</option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default PatientToolbar;
