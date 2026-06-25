import React from 'react';

export const UserRoleBadge = ({ role }) => {
  let colorClasses = 'bg-slate-50 text-slate-600 border-slate-100';
  if (role === 'ADMIN') {
    colorClasses = 'bg-admin-blue-50 text-admin-blue-700 border-admin-blue-100';
  } else if (role === 'DOCTOR') {
    colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-100';
  } else if (role === 'RECEPTIONIST') {
    colorClasses = 'bg-purple-50 text-purple-700 border-purple-100';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black tracking-wider uppercase border ${colorClasses}`}>
      {role}
    </span>
  );
};

export default UserRoleBadge;
