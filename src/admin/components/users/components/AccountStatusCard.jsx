import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

export const AccountStatusCard = ({ status, setStatus, emailVerified, setEmailVerified, forcePasswordChange, setForcePasswordChange, isEdit }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex flex-col gap-4 text-left">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
        <ShieldCheck className="w-4.5 h-4.5 text-admin-blue-600" />
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          Account Status
        </h3>
      </div>

      {/* Selectable Status Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Active Card */}
        <div
          onClick={() => setStatus('Active')}
          className={`border rounded-[14px] p-4 flex flex-col gap-1.5 cursor-pointer transition-all ${
            status === 'Active'
              ? 'border-emerald-500 bg-emerald-50/10 shadow-sm shadow-emerald-500/5'
              : 'border-slate-200 hover:border-slate-300 bg-slate-50/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800">Active</span>
            {status === 'Active' ? (
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border border-slate-300" />
            )}
          </div>
          <span className="text-[10px] font-bold text-slate-400 leading-tight">
            User can access the system
          </span>
        </div>

        {/* Disabled Card */}
        <div
          onClick={() => setStatus('Disabled')}
          className={`border rounded-[14px] p-4 flex flex-col gap-1.5 cursor-pointer transition-all ${
            status === 'Disabled'
              ? 'border-red-500 bg-red-50/10 shadow-sm shadow-red-500/5'
              : 'border-slate-200 hover:border-slate-300 bg-slate-50/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800">Disabled</span>
            {status === 'Disabled' ? (
              <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border border-slate-300" />
            )}
          </div>
          <span className="text-[10px] font-bold text-slate-400 leading-tight">
            User cannot access the system
          </span>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3.5 mt-2 pt-2 border-t border-slate-50">
        {/* Email Verified Toggle */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-700">Email Verified</span>
            <span className="text-[10px] font-bold text-slate-400 mt-0.5">Mark email as verified</span>
          </div>
          
          <button
            type="button"
            onClick={() => setEmailVerified(!emailVerified)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
              emailVerified ? 'bg-admin-blue-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                emailVerified ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>


      </div>
    </div>
  );
};

export default AccountStatusCard;
