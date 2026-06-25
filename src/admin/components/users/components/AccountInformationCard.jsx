import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, RotateCw, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import checkPasswordStrength from '../utils/passwordStrength';

export const AccountInformationCard = ({ register, errors, setValue, watchedPassword, watchedConfirmPassword, isEdit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [strength, setStrength] = useState({ label: 'Empty', color: 'text-slate-400', bg: 'bg-slate-200', width: 'w-0' });

  // Update password strength indicator dynamically
  useEffect(() => {
    setStrength(checkPasswordStrength(watchedPassword));
  }, [watchedPassword]);

  const generatePassword = () => {
    console.log('Generate Password Clicked');
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let pass = '';
    // Let's generate a complex password of length 12
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setValue('password', pass, { shouldValidate: true });
    setValue('confirmPassword', pass, { shouldValidate: true });
  };

  const copyPassword = () => {
    console.log('Copy Password Clicked');
    if (watchedPassword) {
      navigator.clipboard.writeText(watchedPassword)
        .then(() => alert('Password copied to clipboard (Mock)'))
        .catch(err => console.error('Clipboard copy failed:', err));
    }
  };

  const isMatching = watchedPassword && watchedConfirmPassword && watchedPassword === watchedConfirmPassword;

  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex flex-col gap-4 text-left">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
        <Lock className="w-4.5 h-4.5 text-admin-blue-600" />
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          Account Information
        </h3>
      </div>



      {/* Temporary Password Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black text-slate-700">
          Temporary Password <span className="text-red-500">*</span>
        </label>
        
        <div className="flex gap-2 items-stretch">
          <div className="relative flex-1">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Dr@783#Kd2"
              className={`w-full bg-slate-50/50 hover:bg-slate-50 border rounded-[14px] pl-3.5 pr-10 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${
                errors?.password 
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : 'border-slate-205 focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={generatePassword}
            className="flex items-center gap-1.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-205 rounded-[14px] text-xs font-black text-slate-600 hover:text-slate-800 transition-colors cursor-pointer select-none"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Generate</span>
          </button>
        </div>
        {errors?.password && (
          <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.password.message}</span>
        )}

        {/* Password Strength Segment Bar & Label */}
        {watchedPassword && (
          <div className="flex items-center justify-between gap-4 mt-1 border border-slate-50 p-2 rounded-xl bg-slate-50/20">
            <div className="flex-1 flex gap-1 items-center">
              {/* Colored Segments */}
              <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden relative">
                <div className={`h-full ${strength.bg} transition-all duration-300`} style={{ width: strength.label === 'Weak' ? '33%' : strength.label === 'Medium' ? '66%' : '100%' }} />
              </div>
              <span className={`text-[10px] font-black tracking-wide ml-2 ${strength.color}`}>
                {strength.label}
              </span>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={copyPassword}
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
            >
              <Copy className="w-3 h-3 text-slate-500" />
              <span>Copy</span>
            </button>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="flex flex-col gap-1.5 mt-1">
        <label className="text-xs font-black text-slate-700">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            placeholder="Confirm temporary password"
            className={`w-full bg-slate-50/50 hover:bg-slate-50 border rounded-[14px] pl-3.5 pr-10 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${
              errors?.confirmPassword 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                : 'border-slate-205 focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors?.confirmPassword && (
          <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.confirmPassword.message}</span>
        )}

        {/* Passwords Match Helper */}
        {watchedConfirmPassword && (
          <div className="mt-1">
            {isMatching ? (
              <span className="text-[10px] font-black text-emerald-650 flex items-center gap-1 select-none">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Passwords match
              </span>
            ) : (
              <span className="text-[10px] font-black text-red-550 flex items-center gap-1 select-none">
                <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                Passwords do not match
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInformationCard;
