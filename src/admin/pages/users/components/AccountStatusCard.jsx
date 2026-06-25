import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { InfoRow } from './InfoRow';

export const AccountStatusCard = ({ user }) => {
  const {
    status,
    emailVerified,
    phoneVerified,
    twoFactor,
    accountLockStatus,
    lastLoginIp,
    failedLoginAttempts
  } = user;

  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex flex-col gap-4 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-admin-blue-600" />
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Account Status
          </h3>
        </div>
      </div>

      {/* Info Rows */}
      <div className="flex flex-col">
        <InfoRow
          label="Account Status"
          value={status}
          valueClass={status === 'Active' ? 'text-emerald-600' : 'text-red-500'}
        />
        <InfoRow
          label="Email Verified"
          value={emailVerified ? 'Yes' : 'No'}
          valueClass={emailVerified ? 'text-emerald-600' : 'text-red-500'}
        />
        <InfoRow
          label="Phone Verified"
          value={phoneVerified ? 'Yes' : 'No'}
          valueClass={phoneVerified ? 'text-emerald-650' : 'text-red-500'}
        />
        <InfoRow
          label="Two Factor (Email OTP)"
          value={twoFactor ? 'Enabled' : 'Disabled'}
          valueClass={twoFactor ? 'text-emerald-600' : 'text-slate-400'}
        />
        <InfoRow
          label="Account Lock Status"
          value={accountLockStatus}
          valueClass={accountLockStatus === 'Unlocked' ? 'text-emerald-600' : 'text-red-500'}
        />
        <InfoRow
          label="Last Login IP"
          value={lastLoginIp}
        />
        <InfoRow
          label="Failed Login Attempts"
          value={failedLoginAttempts}
        />
      </div>
    </div>
  );
};

export default AccountStatusCard;
