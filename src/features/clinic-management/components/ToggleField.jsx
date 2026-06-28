import React from 'react';

export const ToggleField = ({
  label,
  description,
  value,
  onChange,
  disabled = false,
  name
}) => {
  const handleToggle = () => {
    if (disabled) return;
    onChange({ target: { name, value: !value } });
  };

  return (
    <div className="flex flex-col gap-1.5 w-full text-left font-display">
      {label && (
        <span className="text-sm font-semibold text-[#0F172A]">
          {label}
        </span>
      )}

      {description && (
        <span className="text-xs text-[#64748B] -mt-1 leading-normal">
          {description}
        </span>
      )}

      <div className="flex items-center gap-3 mt-0.5">
        {/* Toggle Switch */}
        <button
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none focus:ring-4 focus:ring-[#7C3AED]/10
            ${value ? 'bg-[#7C3AED]' : 'bg-[#E2E8F0]'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          role="switch"
          aria-checked={value}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
              ${value ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>

        {/* State Label Text */}
        <span className="text-sm font-semibold text-[#64748B]">
          {value ? 'Enabled' : 'Disabled'}
        </span>
      </div>
    </div>
  );
};

export default ToggleField;
