import React from 'react';
import { Shield, Users, UserCheck, HeartPulse } from 'lucide-react';
import { RoleCard } from './RoleCard';

export const RolesCard = ({ selectedRoles, onChange, error, className = '' }) => {
  const rolesList = [
    {
      role: 'ADMIN',
      name: 'ADMIN',
      description: 'Full access to system, manage users, settings, website, and security logs.',
      badge: 'Full Access',
      badgeColor: 'bg-slate-100 text-slate-655 border-slate-200/60', // Fix a slight typo in text color token
      icon: Shield
    },
    {
      role: 'DOCTOR',
      name: 'DOCTOR',
      description: 'Clinical access, patient records, appointments, and medical notes.',
      badge: 'Clinical Access',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      icon: HeartPulse
    },
    {
      role: 'RECEPTIONIST',
      name: 'RECEPTIONIST',
      description: 'Appointments, patient registration, front desk, and scheduling.',
      badge: 'Front Desk',
      badgeColor: 'bg-purple-50 text-purple-750 border-purple-100',
      icon: Users
    }
  ];

  const handleToggle = (role) => {
    const isSelected = selectedRoles.includes(role);
    let newRoles = [];
    if (isSelected) {
      // Must have at least one role selected, or let it be empty if they want
      newRoles = selectedRoles.filter(r => r !== role);
    } else {
      newRoles = [...selectedRoles, role];
    }
    onChange(newRoles);
  };

  return (
    <div className={`bg-white border rounded-[24px] p-5 shadow-sm flex flex-col gap-4 text-left transition-all ${
      error 
        ? 'border-red-300 ring-2 ring-red-105/50' 
        : 'border-slate-100'
    } ${className}`}>
      {/* Title */}
      <div className="flex flex-col text-left border-b border-slate-50 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4.5 h-4.5 text-admin-blue-600" />
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Roles <span className="text-red-500">*</span>
            </h3>
          </div>
          {error && (
            <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100/30">
              {error.message}
            </span>
          )}
        </div>
        <p className="text-[10px] font-semibold text-slate-400 mt-1">
          Assign one or more roles to this user
        </p>
      </div>

      {/* Role Cards List */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {rolesList.map((roleItem) => (
          <RoleCard
            key={roleItem.role}
            {...roleItem}
            isSelected={selectedRoles.includes(roleItem.role)}
            onToggle={() => handleToggle(roleItem.role)}
          />
        ))}
      </div>
    </div>
  );
};

export default RolesCard;
