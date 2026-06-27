import React, { useState } from 'react';
import { Search, Calendar, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const PatientFiltersCard = ({ filters, onApply, onReset }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApply(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({
      search: '',
      status: 'All',
      gender: 'All',
      doctor: 'All',
      ageRange: 'All',
      regDateStart: '',
      regDateEnd: ''
    });
    onReset();
  };

  const doctors = [
    "Dr. Priya Sharma",
    "Dr. Amit Verma",
    "Dr. Rohan Joshi",
    "Dr. Neha Singh"
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-sm select-none text-left space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
        <h4 className="text-xs font-black text-slate-800 tracking-wider font-display uppercase flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>Filters</span>
        </h4>
        <button
          type="button"
          onClick={handleReset}
          className="text-[10px] font-black text-[#7C3AED] hover:text-[#6D28D9] uppercase tracking-wider font-display flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <form onSubmit={handleApply} className="space-y-4">
        {/* Search */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={localFilters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              placeholder="Name, Parent, Mobile or Patient ID"
              className="w-full h-11 pl-4 pr-10 bg-slate-50 hover:bg-slate-100/50 border border-slate-150 rounded-xl text-xs font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#7C3AED]/45 focus:ring-4 focus:ring-purple-50 transition-all font-display"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display">
            Status
          </label>
          <select
            value={localFilters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full h-11 border border-slate-150 rounded-xl px-4 text-xs font-bold text-slate-650 hover:text-slate-800 bg-white hover:bg-slate-50 focus:outline-none focus:border-[#7C3AED]/40 focus:ring-4 focus:ring-purple-50 transition-all cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Under Treatment">Under Treatment</option>
            <option value="Active">Active</option>
            <option value="Treatment Completed">Completed</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display">
            Gender
          </label>
          <select
            value={localFilters.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full h-11 border border-slate-150 rounded-xl px-4 text-xs font-bold text-slate-650 hover:text-slate-800 bg-white hover:bg-slate-50 focus:outline-none focus:border-[#7C3AED]/40 focus:ring-4 focus:ring-purple-50 transition-all cursor-pointer"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Age Range */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display">
            Age Range
          </label>
          <select
            value={localFilters.ageRange}
            onChange={(e) => handleChange('ageRange', e.target.value)}
            className="w-full h-11 border border-slate-150 rounded-xl px-4 text-xs font-bold text-slate-650 hover:text-slate-800 bg-white hover:bg-slate-50 focus:outline-none focus:border-[#7C3AED]/40 focus:ring-4 focus:ring-purple-50 transition-all cursor-pointer"
          >
            <option value="All">All Ages</option>
            <option value="0-3">0-3 Years</option>
            <option value="4-6">4-6 Years</option>
            <option value="7-12">7-12 Years</option>
            <option value="12+">12+ Years</option>
          </select>
        </div>

        {/* Assigned Doctor */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display">
            Assigned Doctor
          </label>
          <select
            value={localFilters.doctor}
            onChange={(e) => handleChange('doctor', e.target.value)}
            className="w-full h-11 border border-slate-150 rounded-xl px-4 text-xs font-bold text-slate-650 hover:text-slate-800 bg-white hover:bg-slate-50 focus:outline-none focus:border-[#7C3AED]/40 focus:ring-4 focus:ring-purple-50 transition-all cursor-pointer"
          >
            <option value="All">All Doctors</option>
            {doctors.map((doc) => (
              <option key={doc} value={doc}>{doc.replace('Dr. ', '')}</option>
            ))}
          </select>
        </div>

        {/* Registration Date */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display">
            Registration Date Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <input
                type="date"
                value={localFilters.regDateStart}
                onChange={(e) => handleChange('regDateStart', e.target.value)}
                className="w-full h-11 px-2.5 bg-slate-50 border border-slate-150 rounded-xl text-[10px] font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#7C3AED]/45 focus:ring-4 focus:ring-purple-50 transition-all"
              />
            </div>
            <div className="relative">
              <input
                type="date"
                value={localFilters.regDateEnd}
                onChange={(e) => handleChange('regDateEnd', e.target.value)}
                className="w-full h-11 px-2.5 bg-slate-50 border border-slate-150 rounded-xl text-[10px] font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-[#7C3AED]/45 focus:ring-4 focus:ring-purple-50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            type="submit"
            className="h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-black shadow-md shadow-[#7C3AED]/15 transition-all cursor-pointer font-display text-center flex items-center justify-center"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="h-11 border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer font-display text-center flex items-center justify-center"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientFiltersCard;
