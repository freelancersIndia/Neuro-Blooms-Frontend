import React, { useState, useRef, useEffect } from 'react';
import { Search, RefreshCw, Download, Calendar, ChevronDown, X, FileText } from 'lucide-react';

export const ClinicBreakToolbar = ({
  search,
  onSearchChange,
  weekdayFilter,
  onWeekdayFilterChange,
  statusFilter,
  onStatusFilterChange,
  onRefresh,
  onExport,
  disabled = false
}) => {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const exportRef = useRef(null);

  // Close export dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setIsExportOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExportClick = (type) => {
    if (onExport) onExport(type);
    setIsExportOpen(false);
  };

  const weekdays = [
    { value: 'All', label: 'All Days' },
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNESDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
    { value: 'SATURDAY', label: 'Saturday' },
    { value: 'SUNDAY', label: 'Sunday' }
  ];

  return (
    <div className="h-16 px-6 bg-white border border-[#E5E7EB] rounded-2xl flex items-center justify-between gap-4 select-none flex-shrink-0 shadow-sm">
      {/* Left Side: Search and Filters */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Search Input */}
        <div className="relative w-full max-w-[320px]">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            disabled={disabled}
            placeholder="Search break name..."
            className="w-full h-10 pl-10 pr-4 bg-white border border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#111827] placeholder-[#9CA3AF] hover:border-slate-400 focus:border-[#6D28D9] focus:ring-4 focus:ring-[#6D28D9]/10 transition-all duration-150 outline-none"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
        </div>

        {/* Weekday Filter */}
        <select
          value={weekdayFilter}
          onChange={(e) => onWeekdayFilterChange(e.target.value)}
          disabled={disabled}
          className="h-10 px-3 bg-white border border-[#CBD5E1] rounded-xl text-xs font-bold text-[#4B5563] hover:border-slate-400 focus:border-[#6D28D9] focus:ring-4 focus:ring-[#6D28D9]/10 transition-all duration-150 outline-none cursor-pointer"
        >
          {weekdays.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          disabled={disabled}
          className="h-10 px-3 bg-white border border-[#CBD5E1] rounded-xl text-xs font-bold text-[#4B5563] hover:border-slate-400 focus:border-[#6D28D9] focus:ring-4 focus:ring-[#6D28D9]/10 transition-all duration-150 outline-none cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
        </select>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-2">
        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={disabled}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-[#6D28D9] hover:bg-[#F3E8FF] transition-all border border-[#E5E7EB] cursor-pointer"
          title="Refresh"
        >
          <RefreshCw size={16} />
        </button>

        {/* Export Button & Dropdown */}
        <div className="relative" ref={exportRef}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsExportOpen(!isExportOpen)}
            className="h-10 px-4 rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#4B5563] bg-white hover:border-slate-400 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Download size={14} className="text-slate-400" />
            <span>Export</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {isExportOpen && (
            <div className="absolute top-[calc(100%+6px)] right-0 bg-white border border-[#E5E7EB] shadow-xl rounded-xl p-1 z-40 animate-fade-in w-36 flex flex-col">
              <button
                type="button"
                onClick={() => handleExportClick('CSV')}
                className="w-full h-9 px-3 rounded-lg text-left text-xs font-semibold text-[#4B5563] hover:bg-slate-50 hover:text-[#6D28D9] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FileText size={14} />
                CSV
              </button>
              <button
                type="button"
                onClick={() => handleExportClick('Excel')}
                className="w-full h-9 px-3 rounded-lg text-left text-xs font-semibold text-[#4B5563] hover:bg-slate-50 hover:text-[#6D28D9] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FileText size={14} />
                Excel
              </button>
              <button
                type="button"
                onClick={() => handleExportClick('PDF')}
                className="w-full h-9 px-3 rounded-lg text-left text-xs font-semibold text-[#4B5563] hover:bg-slate-50 hover:text-[#6D28D9] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <FileText size={14} />
                PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicBreakToolbar;
