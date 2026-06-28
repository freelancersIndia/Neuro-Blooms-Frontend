import React from 'react';

export const HolidayStatusBadge = ({ dateStr }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const isUpcoming = dateStr >= todayStr;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold leading-none select-none
        ${isUpcoming 
          ? 'bg-[#EFFDF4] text-[#16A34A]' 
          : 'bg-slate-100 text-slate-500'
        }
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isUpcoming ? 'bg-[#16A34A]' : 'bg-slate-400'}`} />
      {isUpcoming ? 'Upcoming' : 'Completed'}
    </span>
  );
};

export default HolidayStatusBadge;
