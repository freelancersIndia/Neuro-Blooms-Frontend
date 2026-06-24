import React, { useRef, useState, useEffect } from 'react';

export const OTPInput = ({ value = '', onChange, error }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);

  // Sync internal state if value is changed from outside (e.g. cleared)
  useEffect(() => {
    const otpArray = value.split('').slice(0, 6);
    const paddedArray = [...otpArray, ...Array(6 - otpArray.length).fill('')];
    setOtp(paddedArray);
  }, [value]);

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const val = e.target.value;
    // Allow only single numeric digit
    if (val && !/^\d$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    
    // Trigger parent callback
    const otpString = newOtp.join('');
    onChange(otpString);

    // Auto-focus next field on entry
    if (val && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous field on Backspace if current field is empty
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = ''; // Clear previous digit
        setOtp(newOtp);
        onChange(newOtp.join(''));
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = ''; // Clear current digit
        setOtp(newOtp);
        onChange(newOtp.join(''));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    // Keep only the first 6 digits
    const digits = pasteData.replace(/\D/g, '').substring(0, 6);
    
    if (digits) {
      const newOtp = [...otp];
      for (let i = 0; i < digits.length; i++) {
        newOtp[i] = digits[i];
      }
      setOtp(newOtp);
      onChange(newOtp.join(''));

      // Focus the last filled input, or the last input if fully pasted
      const focusIndex = Math.min(digits.length, 5);
      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2 md:gap-3 my-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            placeholder="0"
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined} // Only handle paste on first field
            className={`w-11 h-12 sm:w-12 sm:h-13 md:w-14 md:h-15 text-center text-xl sm:text-2xl font-bold text-slate-800 bg-white border ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                : digit
                ? 'border-admin-blue-500 focus:border-admin-blue-600 focus:ring-admin-blue-100'
                : 'border-slate-200 focus:border-admin-blue-500 focus:ring-admin-blue-100'
            } rounded-xl shadow-sm focus:ring-4 focus:outline-none transition-all duration-150 placeholder:text-slate-300 placeholder:font-medium`}
          />
        ))}
      </div>
      {error && (
        <span className="text-xs font-semibold text-red-500 text-left pl-1 flex items-center gap-1 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
};

export default OTPInput;
