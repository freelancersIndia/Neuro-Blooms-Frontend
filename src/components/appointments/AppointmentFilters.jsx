import React, { useState } from 'react';
import { Calendar, RefreshCcw, Filter } from 'lucide-react';
import { APPOINTMENT_STATUS } from '../../constants/appointmentStatus';
import { APPOINTMENT_TYPES } from '../../constants/appointmentTypes';
import { PRIMARY_CONCERNS } from '../../constants/primaryConcerns';
import AppointmentSearchBar from './AppointmentSearchBar';

export const AppointmentFilters = ({ filters, onApplyFilters, onResetFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    onResetFilters();
    setLocalFilters({
      search: '',
      status: 'All',
      type: 'All',
      date: '',
      concern: 'All'
    });
  };

  return (
    <form
      onSubmit={handleApply}
      className="bg-white border border-slate-100 p-5 rounded-[20px] shadow-[0_10px_25px_rgba(79,94,84,0.012)] hover:shadow-[0_12px_30px_rgba(79,94,84,0.02)] transition-shadow duration-300 select-none flex flex-col gap-4.5"
    >
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search Input: col-span-5 */}
        <div className="md:col-span-5 flex flex-col gap-1.5 text-left">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-display">
            Search
          </label>
          <AppointmentSearchBar
            value={localFilters.search}
            onChange={(val) => handleChange('search', val)}
            placeholder="Search by Parent, Child, Mobile Number or Request ID"
          />
        </div>

        {/* Status Dropdown: col-span-2 */}
        <div className="md:col-span-2 flex flex-col gap-1.5 text-left">
          <label htmlFor="filter-status" className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-display">
            Status
          </label>
          <select
            id="filter-status"
            value={localFilters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/5 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value={APPOINTMENT_STATUS.PENDING}>Pending</option>
            <option value={APPOINTMENT_STATUS.APPROVED}>Approved</option>
            <option value={APPOINTMENT_STATUS.REJECTED}>Rejected</option>
          </select>
        </div>

        {/* Appointment Type Dropdown: col-span-2 */}
        <div className="md:col-span-2 flex flex-col gap-1.5 text-left">
          <label htmlFor="filter-type" className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-display">
            Appointment Type
          </label>
          <select
            id="filter-type"
            value={localFilters.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/5 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value={APPOINTMENT_TYPES.INITIAL_CONSULTATION}>Initial Consultation</option>
            <option value={APPOINTMENT_TYPES.DEVELOPMENT_ASSESSMENT}>Development Assessment</option>
          </select>
        </div>

        {/* Date Picker: col-span-3 */}
        <div className="md:col-span-3 flex flex-col gap-1.5 text-left">
          <label htmlFor="filter-date" className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-display">
            Preferred Date
          </label>
          <div className="relative flex items-center">
            <Calendar className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="filter-date"
              type="date"
              value={localFilters.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/5 transition-all duration-200 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Primary Concern: col-span-5 */}
        <div className="md:col-span-5 flex flex-col gap-1.5 text-left">
          <label htmlFor="filter-concern" className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-display">
            Primary Concern
          </label>
          <select
            id="filter-concern"
            value={localFilters.concern}
            onChange={(e) => handleChange('concern', e.target.value)}
            className="w-full bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/5 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="All">All Concerns</option>
            {Object.values(PRIMARY_CONCERNS).map((concern) => (
              <option key={concern} value={concern}>
                {concern}
              </option>
            ))}
          </select>
        </div>

        {/* Spacer for desktop: col-span-3 */}
        <div className="hidden md:block md:col-span-3"></div>

        {/* Buttons: col-span-4 */}
        <div className="md:col-span-4 flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-all duration-200 cursor-pointer w-1/2 sm:w-auto"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5.5 py-2.5 rounded-xl text-xs font-black shadow-[0_4px_12px_rgba(124,58,237,0.15)] hover:shadow-[0_6px_16px_rgba(124,58,237,0.25)] transition-all duration-200 cursor-pointer w-1/2 sm:w-auto font-display"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AppointmentFilters;
