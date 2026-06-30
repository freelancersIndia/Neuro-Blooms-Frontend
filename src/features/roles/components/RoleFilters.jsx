import React, { useState, useEffect } from 'react';
import { Search, Filter, RotateCcw, ChevronDown, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RoleFilters = ({ onFiltersChange, onReset, initialFilters = {}, disabled = false }) => {
  // Local state for search (with debounce)
  const [search, setSearch] = useState(initialFilters.search || '');
  
  // Local state for other filters
  const [status, setStatus] = useState(initialFilters.status || 'All');
  const [type, setType] = useState(initialFilters.type || 'All');
  const [hasUsers, setHasUsers] = useState(initialFilters.has_users || 'All');
  const [dateRange, setDateRange] = useState(initialFilters.date_range || 'All');
  const [createdAfter, setCreatedAfter] = useState(initialFilters.created_after || '');
  const [createdBefore, setCreatedBefore] = useState(initialFilters.created_before || '');
  const [ordering, setOrdering] = useState(initialFilters.ordering || '-created_at');
  const [pageSize, setPageSize] = useState(initialFilters.page_size || '10');

  // Sync with initialFilters if they change externally (e.g., on reset)
  useEffect(() => {
    setSearch(initialFilters.search || '');
    setStatus(initialFilters.status || 'All');
    setType(initialFilters.type || 'All');
    setHasUsers(initialFilters.has_users || 'All');
    setDateRange(initialFilters.date_range || 'All');
    setCreatedAfter(initialFilters.created_after || '');
    setCreatedBefore(initialFilters.created_before || '');
    setOrdering(initialFilters.ordering || '-created_at');
    setPageSize(initialFilters.page_size || '10');
  }, [initialFilters]);

  // Debounce search input
  useEffect(() => {
    if (search === (initialFilters.search || '')) return;
    
    const timer = setTimeout(() => {
      onFiltersChange({ search });
    }, 500);

    return () => clearTimeout(timer);
  }, [search, onFiltersChange, initialFilters.search]);

  const handleApply = (e) => {
    if (e) e.preventDefault();
    onFiltersChange({
      status,
      type,
      has_users: hasUsers,
      date_range: dateRange,
      created_after: dateRange === 'Custom' ? createdAfter : '',
      created_before: dateRange === 'Custom' ? createdBefore : '',
      ordering,
      page_size: pageSize,
    });
  };

  const handleReset = () => {
    setSearch('');
    setStatus('All');
    setType('All');
    setHasUsers('All');
    setDateRange('All');
    setCreatedAfter('');
    setCreatedBefore('');
    setOrdering('-created_at');
    setPageSize('10');
    onReset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white border border-slate-200/80 rounded-[20px] p-6 shadow-[0_2px_8px_rgba(15,23,42,0.01)]"
    >
      <form onSubmit={handleApply} className="flex flex-col gap-5">
        {/* Search Row & Quick Actions */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={disabled}
              placeholder="Search by role name or description..."
              className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200/80 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 focus:bg-white disabled:opacity-50"
            />
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleReset}
              disabled={disabled}
              className="h-12 px-5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={disabled}
              className="h-12 px-6 rounded-xl bg-indigo-600 text-sm font-bold text-white hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-600/10 cursor-pointer disabled:opacity-50"
            >
              <Filter className="w-4 h-4" />
              Apply Filters
            </motion.button>
          </div>
        </div>

        {/* Dropdowns Filter Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Status Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Status</label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/5 disabled:opacity-50"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Type Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Role Type</label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/5 disabled:opacity-50"
              >
                <option value="All">All Types</option>
                <option value="System">System Role</option>
                <option value="Custom">Custom Role</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Has Users Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Has Users</label>
            <div className="relative">
              <select
                value={hasUsers}
                onChange={(e) => setHasUsers(e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/5 disabled:opacity-50"
              >
                <option value="All">Any Assignment</option>
                <option value="Yes">Yes (Has Users)</option>
                <option value="No">No (Unassigned)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Date Range Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Date Created</label>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/5 disabled:opacity-50"
              >
                <option value="All">All Time</option>
                <option value="today">Today</option>
                <option value="7_days">Last 7 Days</option>
                <option value="30_days">Last 30 Days</option>
                <option value="Custom">Custom Range</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Sort By</label>
            <div className="relative">
              <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/5 disabled:opacity-50"
              >
                <option value="-created_at">Newest First</option>
                <option value="created_at">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="-name">Name (Z-A)</option>
                <option value="-users_count">Users (High-Low)</option>
                <option value="-permissions_count">Permissions (High-Low)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Page Size Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Rows Per Page</label>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/5 disabled:opacity-50"
              >
                <option value="10">10 Rows</option>
                <option value="20">20 Rows</option>
                <option value="50">50 Rows</option>
                <option value="100">100 Rows</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Custom Date Range Panel */}
        <AnimatePresence>
          {dateRange === 'Custom' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex flex-col gap-1.5 flex-1 w-full">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Created After</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={createdAfter}
                      onChange={(e) => setCreatedAfter(e.target.value)}
                      disabled={disabled}
                      className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/5 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 flex-1 w-full">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Created Before</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={createdBefore}
                      onChange={(e) => setCreatedBefore(e.target.value)}
                      disabled={disabled}
                      className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/5 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default RoleFilters;
