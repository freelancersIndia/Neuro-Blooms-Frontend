import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const TIMEZONES = [
  'Asia/Kolkata (IST)',
  'UTC (Coordinated Universal Time)',
  'America/New_York (EST/EDT)',
  'America/Chicago (CST/CDT)',
  'America/Denver (MST/MDT)',
  'America/Los_Angeles (PST/PDT)',
  'Europe/London (GMT/BST)',
  'Europe/Paris (CET/CEST)',
  'Asia/Singapore (SGT)',
  'Asia/Tokyo (JST)',
  'Australia/Sydney (AEST/AEDT)',
  'Europe/Berlin (CET)',
  'Asia/Dubai (GST)',
  'Asia/Hong_Kong (HKT)',
];

export const SearchableSelect = ({
  label,
  value,
  onChange,
  error,
  required = false,
  helperText,
  disabled = false,
  name
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = TIMEZONES.filter((tz) =>
    tz.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="flex flex-col gap-1.5 w-full text-left font-display" ref={containerRef}>
      {label && (
        <label className="text-sm font-semibold text-[#0F172A]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {helperText && (
        <span className="text-xs text-[#64748B] -mt-1 leading-normal">
          {helperText}
        </span>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-10 px-4 flex items-center justify-between bg-white border rounded-xl text-sm font-medium text-[#0f172a] transition-all duration-150 outline-none
            ${disabled ? 'bg-slate-100 border-[#E2E8F0] cursor-not-allowed text-slate-400' : 'border-[#CBD5E1] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10'}
            ${error ? 'border-red-500 hover:border-red-500 focus:border-red-500' : ''}
          `}
        >
          <span>{value || 'Select timezone'}</span>
          <ChevronDown
            size={18}
            className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#7C3AED]' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white border border-[#E2E8F0] shadow-xl rounded-xl p-2 z-50 animate-fade-in max-h-72 flex flex-col">
            {/* Search Input */}
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search timezone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 text-xs font-medium border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            </div>

            {/* List options */}
            <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 scrollbar-thin">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = option === value;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                        isSelected
                          ? 'bg-[#F3EEFF] text-[#7C3AED]'
                          : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-4 text-xs font-medium text-[#94A3B8]">
                  No timezones found.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs font-semibold text-red-500 flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
          {error}
        </span>
      )}
    </div>
  );
};

export default SearchableSelect;
