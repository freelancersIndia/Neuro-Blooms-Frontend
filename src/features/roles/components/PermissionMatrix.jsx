import React, { useState } from 'react';
import { Shield, ChevronDown, ChevronUp, Lock, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PermissionMatrix = ({
  rolePermissions = [],
  isSystem = false,
  canEdit = true,
  isSaving = false,
  onAssignPermissions,
  onRemovePermissions,
}) => {
  // Group permissions by category
  const groupedPermissions = React.useMemo(() => {
    return rolePermissions.reduce((acc, perm) => {
      const groupName = perm.group || 'General';
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(perm);
      return acc;
    }, {});
  }, [rolePermissions]);

  // Accordion open/close state
  const [expandedGroups, setExpandedGroups] = useState(
    Object.keys(groupedPermissions).slice(0, 2) // Expand first two groups by default
  );

  // Selected permissions for bulk actions
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleGroup = (groupName) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName) ? prev.filter((g) => g !== groupName) : [...prev, groupName]
    );
  };

  const handleToggleSelect = (permId) => {
    if (isSystem || !canEdit) return;
    setSelectedIds((prev) =>
      prev.includes(permId) ? prev.filter((id) => id !== permId) : [...prev, permId]
    );
  };

  const handleBulkAssign = () => {
    if (selectedIds.length > 0) {
      onAssignPermissions(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleBulkRemove = () => {
    if (selectedIds.length > 0) {
      onRemovePermissions(selectedIds);
      setSelectedIds([]);
    }
  };

  const getGroupStats = (perms) => {
    const total = perms.length;
    const assigned = perms.filter((p) => p.assigned).length;
    return `${assigned}/${total} Assigned`;
  };

  return (
    <div className="flex flex-col gap-5 text-left">
      {/* Banner for System Roles */}
      {isSystem && (
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
          <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-amber-800">System Role Permissions Locked</span>
            <span className="text-[10.5px] font-semibold text-amber-600 leading-normal mt-0.5">
              This is a system-level role. The permission mappings are predefined and cannot be modified to prevent system instability.
            </span>
          </div>
        </div>
      )}

      {/* Toolbar for Custom Roles */}
      {!isSystem && canEdit && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-450" />
            <span className="text-xs font-bold text-slate-700">
              {selectedIds.length} Permissions Selected for Actions
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBulkRemove}
              disabled={selectedIds.length === 0 || isSaving}
              className="h-9 px-4 rounded-xl border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Remove Selected
            </button>

            <button
              type="button"
              onClick={handleBulkAssign}
              disabled={selectedIds.length === 0 || isSaving}
              className="h-9 px-4 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm shadow-indigo-600/10 flex items-center gap-1.5"
            >
              {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
              Assign Selected
            </button>
          </div>
        </div>
      )}

      {/* Accordion List */}
      <div className="pr-1 flex flex-col gap-4">
        {Object.entries(groupedPermissions).map(([groupName, perms]) => {
          const isExpanded = expandedGroups.includes(groupName);

          return (
            <div
              key={groupName}
              className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              {/* Header */}
              <div
                onClick={() => toggleGroup(groupName)}
                className="px-6 py-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer select-none border-b border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-slate-700 font-display uppercase tracking-wider">
                    {groupName}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/60 text-slate-500">
                    {getGroupStats(perms)}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>

              {/* Body (Permission Cards) */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-white"
                  >
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {perms.map((perm) => {
                        const isChecked = selectedIds.includes(perm.id);
                        const isAssigned = perm.assigned;

                        return (
                          <div
                            key={perm.id}
                            onClick={() => handleToggleSelect(perm.id)}
                            className={`p-4 rounded-xl border flex gap-3 select-none transition-all
                              ${isChecked ? 'bg-indigo-50/30 border-indigo-200' : 'border-slate-100'}
                              ${isAssigned ? 'shadow-sm shadow-slate-100/30' : ''}
                              ${(isSystem || !canEdit) ? 'cursor-default' : 'cursor-pointer hover:bg-slate-50/40 hover:border-slate-250'}`}
                          >
                            {/* Checkbox / Lock icon */}
                            {!isSystem && canEdit ? (
                              <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all mt-0.5 flex-shrink-0
                                ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'}`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[4]" />}
                              </div>
                            ) : (
                              <div className="w-4.5 h-4.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mt-0.5 flex-shrink-0">
                                <Lock className="w-2.5 h-2.5" />
                              </div>
                            )}

                            {/* Info */}
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-slate-800">{perm.name}</span>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-50 border border-slate-150 text-slate-400 font-mono">
                                  {perm.code}
                                </span>
                                {isAssigned && (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 text-[9px] font-bold uppercase tracking-wide">
                                    <span className="w-1 h-1 rounded-full bg-indigo-600" />
                                    Assigned
                                  </span>
                                )}
                              </div>
                              <span className="text-[10.5px] font-semibold text-slate-450 leading-relaxed">
                                {perm.description}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionMatrix;
