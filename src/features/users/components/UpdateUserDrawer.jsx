import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { X, User, Mail, Phone, Shield, Check, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import { userService } from '../services/userService';

export const UpdateUserDrawer = ({ isOpen, onClose, userId, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    roles: [],
    is_active: true,
    is_verified: false,
  });

  const [errors, setErrors] = useState({});

  // 1. Fetch User Details
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userDetails', userId],
    queryFn: () => userService.getUserDetails(userId),
    enabled: isOpen && !!userId,
    staleTime: 0,
  });

  // Populate form when user data is retrieved
  useEffect(() => {
    if (user) {
      // Handle different serializer key mappings defensively
      const fullName = user.full_name || '';
      const nameParts = fullName.split(' ');
      const firstName = user.first_name || nameParts[0] || '';
      const lastName = user.last_name || nameParts.slice(1).join(' ') || '';

      setFormData({
        first_name: firstName,
        last_name: lastName,
        email: user.email || '',
        phone_number: user.phone_number || user.phone || '',
        roles: user.roles || [],
        is_active: user.is_active ?? user.active ?? true,
        is_verified: user.is_verified ?? user.verified ?? false,
      });
    }
  }, [user]);

  // 2. Update Mutation
  const updateMutation = useMutation({
    mutationFn: (data) => userService.updateUser(userId, data),
    onSuccess: (updatedUser) => {
      toast.success('User updated successfully.');
      onSuccess(updatedUser);
      onClose();
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update user.');
    },
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleRoleToggle = (role) => {
    setFormData((prev) => {
      const alreadyHas = prev.roles.includes(role);
      const nextRoles = alreadyHas
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles: nextRoles };
    });
    if (errors.roles) {
      setErrors((prev) => ({ ...prev, roles: null }));
    }
  };

  const handleToggleChange = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required.';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.roles.length === 0) {
      newErrors.roles = 'At least one role must be selected.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    updateMutation.mutate(formData);
  };

  const availableRoles = [
    { id: 'ADMIN', label: 'Administrator', desc: 'Full access to clinic settings, billing, and user management.' },
    { id: 'DOCTOR', label: 'Medical Doctor', desc: 'Clinical access to EMR, prescribing, and schedule management.' },
    { id: 'RECEPTIONIST', label: 'Receptionist', desc: 'Front desk access to patient registration and scheduling.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        className="relative w-full max-w-[520px] h-full bg-white border-l border-slate-200 shadow-2xl flex flex-col overflow-hidden font-body text-left"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-950 font-display">
                Update User Details
              </h3>
              <p className="text-[11px] font-semibold text-slate-450 mt-0.5">
                Modify user profile, credentials, and access roles.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-100 text-slate-450 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer outline-none"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex-1 p-6 flex flex-col gap-6 animate-pulse">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-14 bg-slate-100 rounded-xl" />
              <div className="h-14 bg-slate-100 rounded-xl" />
            </div>
            <div className="h-14 bg-slate-100 rounded-xl" />
            <div className="h-14 bg-slate-100 rounded-xl" />
            <div className="h-32 bg-slate-100 rounded-xl" />
          </div>
        ) : isError ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center gap-3 select-none">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-black text-slate-900 font-display">Failed to load user details</h4>
            <p className="text-[10.5px] font-semibold text-slate-400 max-w-xs">{error.message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className={`w-full h-10 pl-10 pr-4 bg-white border ${errors.first_name ? 'border-red-350 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'} rounded-xl text-xs font-semibold text-slate-900 outline-none`}
                    />
                  </div>
                  {errors.first_name && (
                    <span className="text-[10px] font-semibold text-red-600">{errors.first_name}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className={`w-full h-10 pl-10 pr-4 bg-white border ${errors.last_name ? 'border-red-350 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'} rounded-xl text-xs font-semibold text-slate-900 outline-none`}
                    />
                  </div>
                  {errors.last_name && (
                    <span className="text-[10px] font-semibold text-red-600">{errors.last_name}</span>
                  )}
                </div>
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full h-10 pl-10 pr-4 bg-white border ${errors.email ? 'border-red-350 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'} rounded-xl text-xs font-semibold text-slate-900 outline-none`}
                  />
                </div>
                {errors.email && (
                  <span className="text-[10px] font-semibold text-red-600">{errors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Roles Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700">Assign Roles</label>
                <div className="flex flex-col gap-3">
                  {availableRoles.map((role) => {
                    const isChecked = formData.roles.includes(role.id);
                    return (
                      <div
                        key={role.id}
                        onClick={() => handleRoleToggle(role.id)}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none
                          ${isChecked ? 'bg-indigo-50/20 border-indigo-200' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all mt-0.5 flex-shrink-0
                          ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'}`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-800">{role.label}</span>
                          <span className="text-[10.5px] font-semibold text-slate-400 mt-0.5 leading-normal">{role.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {errors.roles && (
                  <span className="text-[10px] font-semibold text-red-600 mt-1">{errors.roles}</span>
                )}
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 gap-4 mt-1">
                {/* Status */}
                <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 h-14 justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">Account Status</span>
                    <span className="text-[10px] font-semibold text-slate-450 mt-0.5">Allow user to login</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleChange('is_active')}
                    className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.is_active ? 'bg-indigo-600' : 'bg-slate-200'}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.is_active ? 'translate-x-4.5' : 'translate-x-0'}`}
                    />
                  </button>
                </div>

                {/* Verification */}
                <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 h-14 justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">Email Verified</span>
                    <span className="text-[10px] font-semibold text-slate-455 mt-0.5">Flag email as verified</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleChange('is_verified')}
                    className={`relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.is_verified ? 'bg-indigo-600' : 'bg-slate-200'}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.is_verified ? 'translate-x-4.5' : 'translate-x-0'}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-10 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="h-10 px-5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/10"
              >
                {updateMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default UpdateUserDrawer;
