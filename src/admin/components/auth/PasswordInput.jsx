import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export const PasswordInput = React.forwardRef(({ error, label = 'Password', id = 'password', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <label htmlFor={id} className="text-sm font-bold text-slate-700 tracking-wide">
        {label}
      </label>
      <div className="relative flex items-center">
        {/* Left Icon */}
        <div className="absolute left-4 text-slate-400 pointer-events-none">
          <Lock className="w-5 h-5" />
        </div>

        {/* Input Field */}
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          className={`w-full bg-slate-50/50 hover:bg-slate-50 border ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-200 focus:border-admin-blue-500 focus:ring-admin-blue-100'
          } rounded-xl pl-12 pr-12 py-3 text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-medium focus:ring-4 focus:outline-none transition-all duration-200`}
          {...props}
        />

        {/* Right Toggle Button */}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors duration-150 cursor-pointer"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <span className="text-xs font-semibold text-red-500 mt-0.5 pl-1 flex items-center gap-1 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
