import React from 'react';

export const StatusBadge = ({ isOpen }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-none
        ${isOpen 
          ? 'bg-[#EFFDF4] text-[#16A34A]' 
          : 'bg-[#FDF2F2] text-[#DC2626]'
        }
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isOpen ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`} />
      {isOpen ? 'Open' : 'Closed'}
    </span>
  );
};

export default StatusBadge;
