import React from 'react';
import { Search, RotateCw, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export const UsersToolbar = ({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onRefresh,
  onReset
}) => {
  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Left Side: Search and Filters */}
      <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-205 rounded-[14px] pl-11 pr-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10 transition-all"
          />
        </div>

        {/* Role Filter Dropdown */}
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-[150px] bg-slate-50/50 hover:bg-slate-50 border border-slate-205 rounded-[14px] px-4 py-2.5 pr-9 text-xs font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_10px_center] bg-no-repeat cursor-pointer focus:outline-none focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10 transition-all"
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="DOCTOR">Doctor</option>
            <option value="RECEPTIONIST">Receptionist</option>
          </select>
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-[150px] bg-slate-50/50 hover:bg-slate-50 border border-slate-205 rounded-[14px] px-4 py-2.5 pr-9 text-xs font-bold text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-[right_10px_center] bg-no-repeat cursor-pointer focus:outline-none focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10 transition-all"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* Right Side: Refresh & Reset Buttons */}
      <div className="flex items-center gap-2 self-end lg:self-auto">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRefresh}
          className="flex items-center justify-center p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[14px] text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          title="Refresh List"
          aria-label="Refresh list"
        >
          <RotateCw className="w-4.5 h-4.5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[14px] text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          title="Reset Filters"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </motion.button>
      </div>
    </div>
  );
};

export default UsersToolbar;
