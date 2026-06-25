import React from 'react';
import { Mail, Phone } from 'lucide-react';

export const ContactInformationCard = ({ register, errors, watchedEmail }) => {
  const isEmailValid = watchedEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail);

  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex flex-col gap-4 text-left">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
        <Mail className="w-4.5 h-4.5 text-admin-blue-600" />
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          Contact Information
        </h3>
      </div>

      {/* Email Address Field */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-slate-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          
          {/* Validation Badge */}
          {isEmailValid && (
            <span className="text-[10px] font-black text-emerald-650 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/30 flex items-center gap-1 select-none">
              ✓ Valid Email
            </span>
          )}
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="email"
            {...register('email')}
            placeholder="john.doe@neuroblooms.com"
            className={`w-full bg-slate-50/50 hover:bg-slate-50 border rounded-[14px] pl-11 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${
              errors?.email 
                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                : 'border-slate-205 focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10'
            }`}
          />
        </div>
        {errors?.email && (
          <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.email.message}</span>
        )}
      </div>

      {/* Phone Number Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black text-slate-700">
          Phone Number
        </label>
        
        <div className="flex gap-2 items-stretch">
          {/* Dummy Country Selector */}
          <div className="relative flex-shrink-0">
            <select
              {...register('countryCode')}
              className="bg-slate-50/50 hover:bg-slate-50 border border-slate-205 rounded-[14px] px-3 py-2.5 text-xs font-bold text-slate-700 appearance-none pr-8 cursor-pointer focus:outline-none focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10 transition-all bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:14px_14px] bg-[right_8px_center] bg-no-repeat"
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
            </select>
          </div>

          {/* Number Input */}
          <div className="relative flex-1">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              {...register('phone')}
              placeholder="98765 43210"
              className={`w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-205 rounded-[14px] pl-11 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${
                errors?.phone 
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                  : 'focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10'
              }`}
            />
          </div>
        </div>
        {errors?.phone && (
          <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.phone.message}</span>
        )}
      </div>
    </div>
  );
};

export default ContactInformationCard;
