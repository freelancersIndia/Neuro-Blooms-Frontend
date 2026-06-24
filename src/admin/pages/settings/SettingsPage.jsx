import React from 'react';
import { Save, User, Shield, KeyRound, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const SettingsPage = () => {
  const { user, role } = useAuth();

  return (
    <div className="flex flex-col gap-8 text-left select-none max-w-4xl">
      
      {/* 1. Profile Settings Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <User className="w-5 h-5 text-admin-blue-600" />
          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">
            Profile Settings
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
            <input
              type="text"
              defaultValue={user ? `${user.first_name} ${user.last_name}`.trim() : 'Admin Administrator'}
              disabled
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              defaultValue={user?.email || 'admin@neuroblooms.com'}
              disabled
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Account Role</label>
            <input
              type="text"
              defaultValue={role || 'ADMIN'}
              disabled
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Account ID</label>
            <input
              type="text"
              defaultValue={user?.id || 'USR-0021'}
              disabled
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>
        <p className="text-[11px] font-semibold text-slate-500 leading-snug">
          Note: Admin profile details can only be edited by the System Administrator.
        </p>
      </div>

      {/* 2. Security Settings Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <Shield className="w-5 h-5 text-admin-blue-600" />
          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">
            Security & Authentication Preferences
          </h3>
        </div>

        <div className="flex flex-col gap-6">
          {/* MFA Preference */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-slate-800">
                Multi-Factor Authentication (MFA)
              </span>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed max-w-lg">
                Require a 6-digit one-time passcode verification sent to your registered email on every login attempt. This is currently enforced globally.
              </p>
            </div>
            <span className="inline-flex px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-extrabold border border-emerald-100">
              Enforced
            </span>
          </div>

          <hr className="border-slate-100" />

          {/* Session Cooldown Preference */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-bold text-slate-800">
                Session Inactivity Timeout
              </span>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed max-w-lg">
                Automatically log out and lock the admin panel after a period of inactivity.
              </p>
            </div>
            <select
              defaultValue="30"
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-admin-blue-500"
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">1 Hour</option>
              <option value="120">2 Hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="bg-admin-blue-600 hover:bg-admin-blue-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer self-start">
        <Save className="w-4 h-4" />
        <span>Save Preferences</span>
      </button>

    </div>
  );
};

export default SettingsPage;
