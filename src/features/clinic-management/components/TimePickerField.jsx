import React from 'react';
import { Clock } from 'lucide-react';

export const TimePickerField = ({
  label,
  value,
  onChange,
  error,
  required = false,
  helperText,
  disabled = false,
  readOnly = false,
  name,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left font-display">
      {label && (
        <label className="text-sm font-semibold text-[#0F172A]">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {helperText && (
        <span className="text-xs text-[#64748B] -mt-1 leading-normal">
          {helperText}
        </span>
      )}

      <div className="relative">
        <input
          type="time"
          name={name}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          className={`w-full h-10 pl-4 pr-12 bg-white border rounded-xl text-sm font-medium text-[#0f172a] placeholder-[#94a3b8] transition-all duration-150 outline-none
            ${disabled ? 'bg-slate-100 border-[#E2E8F0] cursor-not-allowed text-slate-400' : 'border-[#CBD5E1] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10'}
            ${error ? 'border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
          `}
          {...props}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <Clock size={18} />
        </div>
      </div>

      {error && (
        <span className="text-xs font-semibold text-red-500 flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
          {error}
        </span>
      )}
    </div>
  );
};

export default TimePickerField;
