import React from 'react';
import { User, Mail, Phone, Shield, ShieldAlert, CheckCircle, Clock, Key, Lock } from 'lucide-react';
import { UserRoleBadge } from '../../../pages/users/components/UserRoleBadge';

export const AccountSummaryCard = ({ formValues }) => {
  const {
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
    countryCode = '+91',
    status = 'Active',
    roles = [],
    emailVerified = false,
    forcePasswordChange = true,
    avatar = ''
  } = formValues;

  const fullName = `${firstName} ${lastName}`.trim() || '—';
  const displayEmail = email || '—';
  const displayPhone = phone ? `${countryCode} ${phone}` : '—';

  return (
    <div className="lg:sticky lg:top-6 bg-slate-50/50 border border-slate-100 rounded-[24px] p-5 flex flex-col gap-5 text-left h-full">
      {/* Title */}
      <h3 className="text-sm font-black text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-3">
        Account Summary
      </h3>

      {/* Avatar Panel */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="w-24 h-24 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100 flex items-center justify-center">
          {avatar ? (
            <img
              src={avatar}
              alt="Summary Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-slate-400" />
          )}
        </div>
      </div>

      {/* Metadata Rows */}
      <div className="flex flex-col">
        {/* Name Row */}
        <div className="flex items-start gap-3.5 py-3 border-b border-slate-100/80">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 flex-shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
              Name
            </span>
            <span className="text-xs font-black text-slate-700 truncate mt-1">
              {fullName}
            </span>
          </div>
        </div>

        {/* Email Row */}
        <div className="flex items-start gap-3.5 py-3 border-b border-slate-100/80">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 flex-shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
              Email
            </span>
            <span className="text-xs font-black text-slate-700 truncate mt-1">
              {displayEmail}
            </span>
          </div>
        </div>

        {/* Phone Row */}
        <div className="flex items-start gap-3.5 py-3 border-b border-slate-100/80">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 flex-shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
              Phone
            </span>
            <span className="text-xs font-black text-slate-700 truncate mt-1">
              {displayPhone}
            </span>
          </div>
        </div>

        {/* Roles Row */}
        <div className="flex items-start gap-3.5 py-3 border-b border-slate-100/80">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 flex-shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
              Roles
            </span>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {roles.length > 0 ? (
                roles.map((r) => (
                  <UserRoleBadge key={r} role={r} />
                ))
              ) : (
                <span className="text-xs font-semibold text-slate-400">—</span>
              )}
            </div>
          </div>
        </div>

        {/* Status Row */}
        <div className="flex items-start gap-3.5 py-3 border-b border-slate-100/80">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 flex-shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
              Status
            </span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className={`text-xs font-black ${status === 'Active' ? 'text-emerald-600' : 'text-red-650'}`}>
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Row */}
        <div className="flex items-start gap-3.5 py-3 border-b border-slate-100/80">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 flex-shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
              Verification
            </span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={`w-2 h-2 rounded-full ${emailVerified ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className={`text-xs font-black ${emailVerified ? 'text-emerald-600' : 'text-amber-600'}`}>
                {emailVerified ? 'Verified' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Password Change Row */}
        <div className="flex items-start gap-3.5 py-3 border-b border-slate-100/80">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 flex-shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
              Password Change
            </span>
            <span className="text-xs font-black text-slate-700 mt-1">
              {forcePasswordChange ? 'Required on first login' : 'Not required'}
            </span>
          </div>
        </div>

        {/* Email OTP Row */}
        <div className="flex items-start gap-3.5 py-3">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/60 flex items-center justify-center text-slate-400 flex-shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">
              Email OTP
            </span>
            <span className="text-xs font-black text-slate-700 mt-1">
              Enabled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummaryCard;
