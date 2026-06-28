import React from 'react';

export const WeekdayBadge = ({ weekday }) => {
  if (!weekday) return null;
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F3E8FF] text-[#6D28D9] tracking-wider uppercase select-none">
      {weekday}
    </span>
  );
};

export default WeekdayBadge;
