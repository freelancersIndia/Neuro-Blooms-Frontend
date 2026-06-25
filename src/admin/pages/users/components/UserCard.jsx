import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, CheckCircle2, Clock } from 'lucide-react';
import { UserRoleBadge } from './UserRoleBadge';
import { UserStatusBadge } from './UserStatusBadge';
import { UserDropdownMenu } from './UserDropdownMenu';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

export const UserCard = ({ user }) => {
  const { id, name, email, phone, avatar, initials, roles, status, verification, createdAt } = user;
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between gap-4 text-left h-full"
    >
      {/* Top Section: Avatar, Details, and Action */}
      <div className="flex items-start justify-between gap-3">
        <div 
          className="flex gap-3 min-w-0 cursor-pointer" 
          onClick={() => navigate(`/admin/users/${id}`)}
        >
          {/* Avatar / Initials */}
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-12 h-12 rounded-[16px] object-cover border border-slate-100 flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-[16px] bg-admin-blue-50 border border-admin-blue-100 flex items-center justify-center text-admin-blue-600 font-extrabold text-sm flex-shrink-0">
              {initials}
            </div>
          )}

          {/* User Basic Info */}
          <div className="flex flex-col min-w-0 justify-center">
            <h3 className="text-sm font-black text-slate-800 leading-snug truncate hover:text-clip hover:overflow-visible">
              {name}
            </h3>
          </div>
        </div>

        {/* Action Dropdown Menu */}
        <UserDropdownMenu userName={name} />
      </div>

      {/* Roles Badges */}
      <div className="flex flex-wrap gap-1.5">
        {roles.map((role) => (
          <UserRoleBadge key={role} role={role} />
        ))}
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-2 border-y border-slate-50 py-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 min-w-0">
          <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 min-w-0">
          <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span>{phone}</span>
        </div>
      </div>

      {/* Status Row */}
      <div className="flex items-center justify-between gap-2">
        <UserStatusBadge status={status} />
        
        {/* Verification Status */}
        {verification === 'Verified' ? (
          <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50/50 px-2.5 py-0.5 rounded-full border border-emerald-100/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verified</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[10px] font-black text-admin-blue-600 bg-admin-blue-50 px-2.5 py-0.5 rounded-full border border-admin-blue-100/30">
            <Clock className="w-3.5 h-3.5 text-admin-blue-500" />
            <span>Pending</span>
          </div>
        )}
      </div>

      {/* Bottom Info: Created Date */}
      <div className="text-[10px] font-bold text-slate-400 flex items-center justify-between pt-1 border-t border-slate-50/50">
        <span>Created:</span>
        <span className="font-extrabold text-slate-500">{formatDate(createdAt)}</span>
      </div>
    </motion.div>
  );
};

export default UserCard;
