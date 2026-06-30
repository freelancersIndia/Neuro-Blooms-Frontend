import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit3, Trash2, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

// Relative time helper
const getRelativeTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now - date;
  
  if (isNaN(date.getTime())) return dateStr;

  const diffSeconds = Math.floor(diffTime / 1000);
  if (diffSeconds < 60) return 'Just now';

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  // Return formatted date if older than a week
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Full date formatter for tooltip
const formatFullDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
};

export const RoleTable = ({ roles = [], isLoading, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleRowClick = (roleId) => {
    navigate(`/admin/roles/${roleId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white border border-slate-200/85 rounded-[20px] overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[22%]">Role Name</th>
                <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[30%]">Description</th>
                <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[10%]">Users</th>
                <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[10%]">Permissions</th>
                <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[10%]">Type</th>
                <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[10%]">Status</th>
                <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[8%]">Created</th>
                <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[10%] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0 h-16 animate-pulse">
                  <td className="py-3 px-6"><div className="w-24 h-4 bg-slate-100 rounded" /></td>
                  <td className="py-3 px-6"><div className="w-full h-4 bg-slate-100 rounded" /></td>
                  <td className="py-3 px-6"><div className="w-12 h-4 bg-slate-100 rounded" /></td>
                  <td className="py-3 px-6"><div className="w-12 h-4 bg-slate-100 rounded" /></td>
                  <td className="py-3 px-6"><div className="w-16 h-5 bg-slate-100 rounded-full" /></td>
                  <td className="py-3 px-6"><div className="w-16 h-5 bg-slate-100 rounded-full" /></td>
                  <td className="py-3 px-6"><div className="w-16 h-4 bg-slate-100 rounded" /></td>
                  <td className="py-3 px-6"><div className="w-20 h-8 bg-slate-100 rounded-lg mx-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-slate-200/85 rounded-[20px] overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.01)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="sticky top-0 bg-white z-10 border-b border-slate-100 shadow-[0_1px_0_rgba(229,231,235,1)]">
            <tr className="bg-slate-50/50 h-12 select-none">
              <th className="py-3.5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[22%]">Role Name</th>
              <th className="py-3.5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[30%]">Description</th>
              <th className="py-3.5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[10%]">Users</th>
              <th className="py-3.5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[10%]">Permissions</th>
              <th className="py-3.5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[10%]">Type</th>
              <th className="py-3.5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[10%]">Status</th>
              <th className="py-3.5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[8%]">Created</th>
              <th className="py-3.5 px-6 text-[10px] font-black text-slate-400 uppercase tracking-wider w-[10%] text-center">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-slate-100"
          >
            {roles.map((role) => {
              const isSystem = role.is_system;
              const isActive = role.is_active;

              return (
                <motion.tr
                  key={role.id}
                  variants={rowVariants}
                  className="hover:bg-slate-50/40 transition-colors group cursor-pointer h-16"
                  onClick={() => handleRowClick(role.id)}
                >
                  {/* Role Name */}
                  <td className="py-3 px-6 font-bold text-slate-900 text-sm tracking-tight truncate">
                    <div className="flex items-center gap-2">
                      <span className="hover:text-indigo-600 transition-colors">{role.name}</span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="py-3 px-6 text-xs font-semibold text-slate-500 max-w-[300px]">
                    <p className="line-clamp-2 leading-relaxed" title={role.description}>
                      {role.description || <span className="text-slate-300 font-medium">No description provided.</span>}
                    </p>
                  </td>

                  {/* Users Count */}
                  <td className="py-3 px-6 text-xs font-bold text-slate-600" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleRowClick(role.id)}
                      className="inline-flex items-center gap-1.5 hover:text-indigo-600 hover:bg-indigo-50/70 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
                      <span>{role.users_count}</span>
                    </button>
                  </td>

                  {/* Permissions Count */}
                  <td className="py-3 px-6 text-xs font-bold text-slate-600">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5">
                      <Shield className="w-3.5 h-3.5 text-slate-450" />
                      <span>{role.permissions_count}</span>
                    </div>
                  </td>

                  {/* Type Badge */}
                  <td className="py-3 px-6 text-xs font-bold">
                    {isSystem ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-black tracking-wide uppercase">
                        System
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-black tracking-wide uppercase">
                        Custom
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-6 text-xs font-bold">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-black tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100 text-[10px] font-black tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Created Relative with Tooltip */}
                  <td className="py-3 px-6 text-xs font-semibold text-slate-400 group/tooltip relative">
                    <span className="border-b border-dashed border-slate-200 cursor-help hover:text-slate-600 transition-colors">
                      {getRelativeTime(role.created_at)}
                    </span>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block bg-slate-950 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap z-30 shadow-lg pointer-events-none select-none">
                      {formatFullDate(role.created_at)}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-6" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1">
                      {/* View Button */}
                      <button
                        type="button"
                        onClick={() => handleRowClick(role.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-150 cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => onEdit(role)}
                        disabled={!role.can_edit}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-amber-600 hover:bg-amber-50/50 transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                        title={role.can_edit ? "Edit Role" : "This role cannot be edited."}
                      >
                        <Edit3 size={14} />
                      </button>

                      {/* Delete Button */}
                      <div className="relative group/delete">
                        <button
                          type="button"
                          onClick={() => onDelete(role)}
                          disabled={!role.can_delete}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-red-600 hover:bg-red-50/50 transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                        
                        {!role.can_delete && (
                          <div className="absolute bottom-full right-0 mb-2 hidden group-hover/delete:block bg-slate-950 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap z-30 shadow-lg pointer-events-none select-none">
                            {isSystem ? "System roles cannot be deleted." : "Cannot delete role with assigned users."}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleTable;
