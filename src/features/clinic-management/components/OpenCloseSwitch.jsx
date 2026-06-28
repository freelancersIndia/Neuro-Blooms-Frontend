import React from 'react';

export const OpenCloseSwitch = ({ checked, onChange, disabled = false }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED]
        ${checked ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-md
          ${checked ? 'translate-x-8' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

export default OpenCloseSwitch;
