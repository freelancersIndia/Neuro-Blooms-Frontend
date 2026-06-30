import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Shield, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const CreateUserModal = ({ isOpen, onClose, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    roles: [],
    is_active: true,
    is_verified: false,
  });

  const [errors, setErrors] = useState({});

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
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
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
    onSave(formData);
  };

  const availableRoles = [
    { id: 'ADMIN', label: 'Administrator', desc: 'Full access to clinic settings, billing, and user management.' },
    { id: 'DOCTOR', label: 'Medical Doctor', desc: 'Clinical access to EMR, prescribing, and schedule management.' },
    { id: 'RECEPTIONIST', label: 'Receptionist', desc: 'Front desk access to patient registration and scheduling.' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="w-full max-w-[640px] bg-white border border-slate-200 rounded-[24px] shadow-2xl flex flex-col overflow-hidden my-8 font-body"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <User className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-black text-slate-950 font-display">
                Create New User
              </h3>
              <p className="text-[11px] font-semibold text-slate-450">
                Register a new staff member or medical professional.
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 text-left">
          <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[60vh]">
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
                    placeholder="John"
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
                    placeholder="Doe"
                  />
                </div>
                {errors.last_name && (
                  <span className="text-[10px] font-semibold text-red-600">{errors.last_name}</span>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="john.doe@clinic.com"
                  />
                </div>
                {errors.email && (
                  <span className="text-[10px] font-semibold text-red-600">{errors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Phone Number (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Temporary Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full h-10 pl-10 pr-4 bg-white border ${errors.password ? 'border-red-350 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'} rounded-xl text-xs font-semibold text-slate-900 outline-none`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password ? (
                <span className="text-[10px] font-semibold text-red-600">{errors.password}</span>
              ) : (
                <span className="text-[9px] font-semibold text-slate-400">Temporary password must be at least 8 characters.</span>
              )}
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

            {/* Toggles (Status & Verification) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
              {/* Status */}
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 h-14 justify-between">
                <div className="flex flex-col text-left">
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
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800">Email Verified</span>
                  <span className="text-[10px] font-semibold text-slate-455 mt-0.5">Pre-verify email address</span>
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
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="h-10 px-5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/10"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Create User
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateUserModal;
