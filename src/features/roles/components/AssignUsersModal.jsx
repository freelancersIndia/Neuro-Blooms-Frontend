import React, { useState, useEffect } from 'react';
import { X, Search, UserPlus, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { roleService } from '../services/roleService';

export const AssignUsersModal = ({
  isOpen,
  onClose,
  onAssign,
  isSaving = false,
  alreadyAssignedIds = [],
}) => {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  // Query to fetch all users
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['assignableUsers', search],
    queryFn: () => roleService.getUsers({ search }),
    enabled: isOpen,
  });

  // Filter out users who are already assigned to this role
  const assignableUsers = React.useMemo(() => {
    if (!usersData?.results) return [];
    return usersData.results.filter((user) => !alreadyAssignedIds.includes(user.id));
  }, [usersData, alreadyAssignedIds]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleToggleUser = (userId) => {
    setSelectedIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === assignableUsers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(assignableUsers.map((u) => u.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIds.length > 0) {
      onAssign(selectedIds);
    }
  };

  const isAllSelected = assignableUsers.length > 0 && selectedIds.length === assignableUsers.length;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="w-full max-w-[520px] bg-white border border-slate-200 rounded-[24px] shadow-2xl flex flex-col font-body overflow-hidden max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-sm font-bold text-slate-950">
                Assign Users to Role
              </h3>
              <p className="text-[11px] font-semibold text-slate-400">
                Select and add administrative staff members to this role.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="w-8 h-8 rounded-lg border border-slate-100 text-slate-400 hover:text-slate-650 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer outline-none"
          >
            <X size={14} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by user name or email..."
              className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
            />
          </div>
          
          {assignableUsers.length > 0 && (
            <button
              type="button"
              onClick={handleToggleSelectAll}
              className={`text-[10px] font-black uppercase border px-2.5 h-10 rounded-xl cursor-pointer transition-colors
                ${isAllSelected ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
            >
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </button>
          )}
        </div>

        {/* List of Users */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 min-h-[200px] max-h-[350px]">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
              <span className="text-xs font-semibold">Loading users...</span>
            </div>
          ) : assignableUsers.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <span className="text-xs font-semibold">No assignable users found.</span>
              <span className="text-[10px] font-semibold text-slate-400 mt-0.5">All matching users are already assigned to this role.</span>
            </div>
          ) : (
            assignableUsers.map((user) => {
              const isChecked = selectedIds.includes(user.id);
              return (
                <div
                  key={user.id}
                  onClick={() => handleToggleUser(user.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none
                    ${isChecked ? 'bg-indigo-50/30 border-indigo-200' : 'border-slate-100 hover:bg-slate-50/50 hover:border-slate-200'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                      {user.full_name.charAt(0)}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-800">{user.full_name}</span>
                      <span className="text-[10px] font-semibold text-slate-400">{user.email}</span>
                    </div>
                  </div>

                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all
                    ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'}`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[4]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider">
            {selectedIds.length} Selected
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="h-10 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selectedIds.length === 0 || isSaving}
              className="h-10 px-5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer shadow-sm shadow-indigo-600/10"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Assigning...
                </>
              ) : (
                'Assign Users'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AssignUsersModal;
