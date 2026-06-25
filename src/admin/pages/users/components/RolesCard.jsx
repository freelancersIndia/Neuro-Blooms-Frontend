import React from 'react';
import { Users, Shield, HeartPulse } from 'lucide-react';
import { RoleCard } from '../../../components/users/components/RoleCard';

export const RolesCard = ({ user }) => {
  const { roles = [] } = user;

  const rolesList = [
    {
      role: 'ADMIN',
      name: 'ADMIN',
      description: 'Full access to system, manage users, settings, website, and security logs.',
      badge: 'Full Access',
      badgeColor: 'bg-slate-100 text-slate-655 border-slate-200/60',
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

  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex flex-col gap-4 text-left">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4.5 h-4.5 text-admin-blue-600" />
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Roles
          </h3>
        </div>
      </div>

      {/* Role Cards List */}
      <div className="flex flex-col gap-3 max-h-[290px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {rolesList.map((roleItem) => {
          const isSelected = roles.includes(roleItem.role);
          return (
            <div key={roleItem.role} className="pointer-events-none">
              <RoleCard
                {...roleItem}
                isSelected={isSelected}
                onToggle={() => {}}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RolesCard;
