import React from 'react';

// Generate time options from 12:00 AM to 11:45 PM in 15-minute increments
const generateTimes = () => {
  const times = [];
  const periods = ['AM', 'PM'];
  
  for (let hour = 0; hour < 24; hour++) {
    const period = hour >= 12 ? 'PM' : 'AM';
    let displayHour = hour % 12;
    displayHour = displayHour === 0 ? 12 : displayHour;
    const hourStr = displayHour.toString().padStart(2, '0');
    
    for (let min = 0; min < 60; min += 15) {
      const minStr = min.toString().padStart(2, '0');
      times.push(`${hourStr}:${minStr} ${period}`);
    }
  }
  return times;
};

const TIME_OPTIONS = generateTimes();

export const WeeklyTimePicker = ({ value, onChange, disabled = false, error, placeholder = '--' }) => {
  return (
    <div className="relative w-full">
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled}
        className={`w-full h-9 px-3 bg-white border rounded-xl text-xs font-semibold text-[#0f172a] transition-all duration-150 outline-none cursor-pointer appearance-none
          ${disabled ? 'bg-[#F8FAFC] border-[#E2E8F0] cursor-not-allowed text-[#94A3B8]' : 'border-[#CBD5E1] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10'}
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
        `}
      >
        <option value="">{placeholder}</option>
        {TIME_OPTIONS.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      
      {/* Dropdown indicator icon */}
      {!disabled && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default WeeklyTimePicker;
