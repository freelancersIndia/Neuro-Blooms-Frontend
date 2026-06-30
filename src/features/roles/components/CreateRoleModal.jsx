import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X, Shield, Info, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CreateRoleModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSaving = false,
  availablePermissions = [],
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      is_active: true,
      permissions: [], // Array of UUIDs
    },
  });

  // Watch fields
  const nameValue = watch('name') || '';
  const descriptionValue = watch('description') || '';
  const selectedPermissions = watch('permissions') || [];

  // Reset form on open/close
  useEffect(() => {
    if (isOpen) {
      reset({
        name: '',
        description: '',
        is_active: true,
        permissions: [],
      });
    }
  }, [isOpen, reset]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Group permissions by category/group
  const groupedPermissions = availablePermissions.reduce((acc, perm) => {
    const groupName = perm.group || 'General';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(perm);
    return acc;
  }, {});

  const handleTogglePermission = (permId) => {
    const current = [...selectedPermissions];
    const index = current.indexOf(permId);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(permId);
    }
    setValue('permissions', current, { shouldValidate: true, shouldDirty: true });
  };

  const handleToggleCategory = (groupName, permsInGroup) => {
    const current = [...selectedPermissions];
    const permIdsInGroup = permsInGroup.map((p) => p.id);
    const allSelected = permIdsInGroup.every((id) => current.includes(id));

    let nextPermissions;
    if (allSelected) {
      // Remove all in this group
      nextPermissions = current.filter((id) => !permIdsInGroup.includes(id));
    } else {
      // Add missing ones in this group
      const uniqueNewIds = permIdsInGroup.filter((id) => !current.includes(id));
      nextPermissions = [...current, ...uniqueNewIds];
    }
    setValue('permissions', nextPermissions, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="w-full max-w-[840px] my-8 bg-white border border-slate-200 rounded-[24px] shadow-2xl flex flex-col font-body overflow-hidden max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-25">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-bold text-slate-950">
                Create New System Role
              </h3>
              <p className="text-xs font-semibold text-slate-400">
                Define access levels, descriptors, and assign granular permissions.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="w-8 h-8 rounded-lg border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer outline-none"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body - scrollable */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 text-left">
          {/* Form Fields Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role Name */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-bold text-slate-700">
                Role Name <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: 'Role name is required.',
                  minLength: { value: 3, message: 'Name must be at least 3 characters.' },
                  maxLength: { value: 50, message: 'Name cannot exceed 50 characters.' },
                  validate: (val) => val.trim() !== '' || 'Role name cannot be blank.',
                }}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value.toUpperCase())}
                    disabled={isSaving}
                    placeholder="e.g. WARD_MANAGER"
                    className={`w-full h-11 px-4 bg-slate-50 border rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 transition-all duration-150 outline-none uppercase tracking-wide
                      ${isSaving ? 'bg-slate-100 cursor-not-allowed text-slate-400' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 focus:bg-white'}
                      ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/5' : ''}
                    `}
                  />
                )}
              />
              {errors.name && (
                <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-0.5">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Status Option */}
            <div className="flex flex-col justify-end pb-1 w-full">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60 h-11">
                <Controller
                  control={control}
                  name="is_active"
                  render={({ field: { value, onChange } }) => (
                    <button
                      type="button"
                      onClick={() => onChange(!value)}
                      disabled={isSaving}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${value ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${value ? 'translate-x-4' : 'translate-x-0'}`}
                      />
                    </button>
                  )}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Activate Immediately</span>
                  <span className="text-[9px] font-semibold text-slate-400">Enable this role for user assignment.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Description</label>
              <span className="text-[10px] font-bold text-slate-400">
                {descriptionValue.length} / 500
              </span>
            </div>
            <Controller
              control={control}
              name="description"
              rules={{
                maxLength: { value: 500, message: 'Description cannot exceed 500 characters.' },
              }}
              render={({ field: { value, onChange } }) => (
                <textarea
                  value={value}
                  onChange={onChange}
                  disabled={isSaving}
                  rows={3}
                  placeholder="Summarize the operational responsibilities of this role..."
                  className={`w-full p-4 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 transition-all duration-150 outline-none resize-none
                    ${isSaving ? 'bg-slate-100 cursor-not-allowed text-slate-400' : 'border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 focus:bg-white'}
                    ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500/5' : ''}
                  `}
                />
              )}
            />
            {errors.description && (
              <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-0.5">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Permissions Header */}
          <div className="flex flex-col gap-1 border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                Role Permissions <span className="text-red-500">*</span>
              </span>
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${selectedPermissions.length > 0 ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                {selectedPermissions.length} Selected
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-400">
              Select at least one permission to define what operations users in this role can perform.
            </p>
            <Controller
              control={control}
              name="permissions"
              rules={{
                validate: (val) => val.length > 0 || 'At least one permission must be selected.',
              }}
              render={() => null} // Handled via custom checkboxes
            />
            {errors.permissions && (
              <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-1">
                {errors.permissions.message}
              </span>
            )}
          </div>

          {/* Permissions Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groupedPermissions).map(([groupName, perms]) => {
              const permIds = perms.map((p) => p.id);
              const isGroupAllSelected = permIds.every((id) => selectedPermissions.includes(id));

              return (
                <div key={groupName} className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/25 flex flex-col">
                  {/* Category Header */}
                  <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-700 font-display uppercase tracking-wider">{groupName}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleCategory(groupName, perms)}
                      disabled={isSaving}
                      className={`text-[10px] font-black uppercase border px-2 py-0.5 rounded-md cursor-pointer transition-colors
                        ${isGroupAllSelected ? 'bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100/50' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                    >
                      {isGroupAllSelected ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>

                  {/* Category List */}
                  <div className="p-4 flex flex-col gap-3 flex-1 bg-white">
                    {perms.map((perm) => {
                      const isChecked = selectedPermissions.includes(perm.id);

                      return (
                        <div
                          key={perm.id}
                          onClick={() => !isSaving && handleTogglePermission(perm.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-150 cursor-pointer select-none
                            ${isChecked ? 'bg-indigo-50/30 border-indigo-200' : 'border-slate-100 hover:bg-slate-50/50 hover:border-slate-200'}
                          `}
                        >
                          <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center transition-all flex-shrink-0
                            ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'}`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[4]" />}
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-bold text-slate-800">{perm.name}</span>
                            <span className="text-[10px] font-semibold text-slate-400 leading-normal">{perm.description}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-end gap-3.5 bg-slate-50">
          <button
            type="button"
            disabled={isSaving}
            onClick={onClose}
            className="h-11 px-5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isSaving}
            className="h-11 px-6 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm shadow-indigo-600/10 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                Creating Role...
              </>
            ) : (
              'Create Role'
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateRoleModal;
