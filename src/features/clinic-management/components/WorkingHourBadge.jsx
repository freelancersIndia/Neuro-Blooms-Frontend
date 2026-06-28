import React from 'react';

export const WorkingHourBadge = ({ hours }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 select-none">
      {hours}
    </span>
  );
};

export default WorkingHourBadge;
