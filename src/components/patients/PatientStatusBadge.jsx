import React from 'react';

export const PatientStatusBadge = ({ status }) => {
  let badgeClasses = 'bg-slate-50 text-slate-650 border-slate-200/60';
  
  if (status === 'Under Treatment') {
    badgeClasses = 'bg-purple-50 text-purple-700 border-purple-100';
  } else if (status === 'Active') {
    badgeClasses = 'bg-emerald-50 text-emerald-700 border-emerald-100';
  } else if (status === 'Treatment Completed') {
    badgeClasses = 'bg-blue-50 text-blue-700 border-blue-100';
  } else if (status === 'Inactive') {
    badgeClasses = 'bg-slate-100 text-slate-500 border-slate-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-black tracking-wide font-display ${badgeClasses}`}>
      {status}
    </span>
  );
};

export default PatientStatusBadge;
