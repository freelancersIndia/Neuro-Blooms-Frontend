import React from 'react';
import { User } from 'lucide-react';
import { InfoRow } from './InfoRow';

export const PersonalInformationCard = ({ user }) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    lastLogin,
    createdAt,
    updatedAt
  } = user;

  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex flex-col gap-4 text-left">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
        <div className="flex items-center gap-2">
          <User className="w-4.5 h-4.5 text-admin-blue-600" />
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Personal Information
          </h3>
        </div>
      </div>

      {/* Info List */}
      <div className="flex flex-col">
        <InfoRow label="First Name" value={firstName} />
        <InfoRow label="Last Name" value={lastName} />
        <InfoRow label="Email Address" value={email} />
        <InfoRow label="Phone Number" value={phone} />
        <InfoRow label="Last Login" value={lastLogin} />
        <InfoRow label="Created at" value={createdAt} />
        <InfoRow label="Updated at" value={updatedAt} />
      </div>
    </div>
  );
};

export default PersonalInformationCard;
