import React, { useState, useRef, useEffect } from 'react';
import { Search, RefreshCw, Download, Calendar, ChevronDown, X } from 'lucide-react';

export const HolidayToolbar = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onRefresh,
  disabled = false
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef(null);

  // Close date picker on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearDates = (e) => {
    e.stopPropagation();
    onStartDateChange('');
    onEndDateChange('');
  };

  const hasDateFilter = startDate || endDate;

  return (
    <div className="h-16 px-6 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between gap-4 select-none flex-shrink-0 shadow-sm">
      {/* Left Side Actions */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Search Field */}
        <div className="relative w-full max-w-[320px]">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={disabled}
            placeholder="Search holiday name..."
            className="w-full h-10 pl-10 pr-4 bg-white border border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#0f172a] placeholder-[#94a3b8] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10 transition-all duration-150 outline-none"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        </div>

        {/* Date Filter */}
        <div className="relative" ref={datePickerRef}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className={`h-10 px-4 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all duration-150 outline-none
              ${hasDateFilter 
                ? 'border-[#7C3AED] bg-[#F3EEFF] text-[#7C3AED]' 
                : 'border-[#CBD5E1] bg-white text-[#64748B] hover:border-slate-400'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <Calendar size={14} />
            <span>
              {startDate && endDate 
                ? `${startDate} to ${endDate}` 
                : startDate 
                  ? `From ${startDate}` 
                  : endDate 
                    ? `Until ${endDate}` 
                    : 'Filter Date'
              }
            </span>
            {hasDateFilter ? (
              <X 
                size={14} 
                className="hover:text-red-500 transition-colors ml-1" 
                onClick={handleClearDates} 
              />
            ) : (
              <ChevronDown size={14} className="text-slate-400" />
            )}
          </button>

          {isDatePickerOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 bg-white border border-[#E2E8F0] shadow-xl rounded-xl p-4 z-40 animate-fade-in w-72 flex flex-col gap-3">
              <span className="text-xs font-bold text-[#0F172A] text-left">Filter by Date Range</span>
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#64748B]">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="h-9 px-2.5 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#0f172a] outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-[#64748B]">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="h-9 px-2.5 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-[#0f172a] outline-none focus:border-[#7C3AED]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(false)}
                  className="h-8 px-3 rounded-lg bg-[#7C3AED] text-white text-xs font-bold hover:bg-purple-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          disabled={disabled}
          className="h-10 px-3 bg-white border border-[#CBD5E1] rounded-xl text-xs font-bold text-[#64748B] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10 transition-all duration-150 outline-none cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Past">Past</option>
        </select>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          disabled={disabled}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors border border-[#E2E8F0]"
          title="Refresh"
        >
          <RefreshCw size={16} />
        </button>
        
        <button
          type="button"
          disabled={disabled}
          className="h-10 px-4 rounded-xl border border-[#E2E8F0] text-xs font-bold text-slate-400 bg-white cursor-not-allowed flex items-center gap-2"
          title="Export (Future ready)"
        >
          <Download size={14} />
          Export
        </button>
      </div>
    </div>
  );
};

export default HolidayToolbar;
