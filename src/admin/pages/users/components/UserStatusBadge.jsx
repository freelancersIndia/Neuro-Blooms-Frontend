import React from 'react';

export const UserStatusBadge = ({ status }) => {
  const isActive = status?.toLowerCase() === 'active';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
      isActive 
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50' 
        : 'bg-slate-100 text-slate-600 border border-slate-200/50'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
      {status}
    </span>
  );
};

export default UserStatusBadge;
