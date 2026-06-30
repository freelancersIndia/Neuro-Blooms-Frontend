import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  RefreshCw,
  User,
  Shield,
  ShieldCheck,
  Clock,
  Mail,
  Phone,
  Calendar,
  Lock,
  Unlock,
  Trash2,
  Camera,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
  Plus,
  AlertCircle,
  Fingerprint,
  UserCheck,
  MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Service
import { userService } from '../services/userService';

export const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  // 1. Component Modes & UI States
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  
  // Modals
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);

  // 2. Form States for Edit Mode
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  // 3. API Queries
  // Fetch User Details
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
    refetch: refetchUser
  } = useQuery({
    queryKey: ['userDetails', id],
    queryFn: () => userService.getUserDetails(id),
    staleTime: 5000,
  });

  // Fetch Roles Dropdown
  const { data: rolesDropdown = [] } = useQuery({
    queryKey: ['rolesDropdown'],
    queryFn: () => userService.getRolesDropdown(),
    staleTime: 60000,
  });

  // 4. Initialize Form States on Data Load
  useEffect(() => {
    if (user) {
      const nameParts = user.full_name ? user.full_name.split(' ') : ['', ''];
      setFirstName(user.first_name || nameParts[0] || '');
      setLastName(user.last_name || nameParts.slice(1).join(' ') || '');
      setEmail(user.email || '');
      setPhone(user.phone_number || user.phone || '');
      setSelectedRoles(user.roles || []);
      setIsActive(user.is_active ?? user.active ?? true);
      setIsVerified(user.is_verified ?? user.verified ?? false);
      setProfileImagePreview(user.profile_image || null);
      setProfileImageFile(null);
    }
  }, [user, isEditMode]);

  // 5. API Mutations
  // Update User
  const updateUserMutation = useMutation({
    mutationFn: (data) => userService.updateUser(id, data),
    onSuccess: () => {
      toast.success('User updated successfully.');
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['userDetails', id] });
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update user.');
    }
  });

  // Lock User
  const lockUserMutation = useMutation({
    mutationFn: () => userService.lockUser(id),
    onSuccess: () => {
      toast.success('User account locked successfully.');
      setIsLockModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['userDetails', id] });
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to lock user.');
    }
  });

  // Unlock User
  const unlockUserMutation = useMutation({
    mutationFn: () => userService.unlockUser(id),
    onSuccess: () => {
      toast.success('User account unlocked successfully.');
      setIsUnlockModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['userDetails', id] });
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to unlock user.');
    }
  });

  // Delete User
  const deleteUserMutation = useMutation({
    mutationFn: () => userService.deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted permanently.');
      setIsDeleteModalOpen(false);
      navigate('/admin/users');
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete user.');
    }
  });

  // 6. Event Handlers
  const handleSave = (e) => {
    e?.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      toast.error('First Name and Last Name are required.');
      return;
    }
    if (!email.trim()) {
      toast.error('Email is required.');
      return;
    }

    // Call update API
    updateUserMutation.mutate({
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
      roles: selectedRoles,
      is_active: isActive,
      is_verified: isVerified,
      profile_image: profileImagePreview // In real multipart this would be profileImageFile
    });
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  // Image Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    // Limits: 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Maximum image size is 5MB.');
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, JPEG, PNG, or WEBP images are supported.');
      return;
    }

    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isEditMode) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isEditMode) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  // Role Management in Edit Mode
  const handleRemoveRole = (roleToRemove) => {
    if (!isEditMode) return;
    setSelectedRoles((prev) => prev.filter((r) => r !== roleToRemove));
  };

  const handleAddRole = (roleName) => {
    if (!selectedRoles.includes(roleName)) {
      setSelectedRoles((prev) => [...prev, roleName]);
    }
    setIsAddRoleOpen(false);
  };

  // Formatted Initials
  const initials = useMemo(() => {
    if (user?.full_name) {
      const parts = user.full_name.split(' ');
      return parts.map((p) => p[0]).join('').substring(0, 2).toUpperCase();
    }
    return 'US';
  }, [user]);

  // Derived variables
  const userActive = user ? (user.is_active ?? user.active ?? true) : true;
  const userVerified = user ? (user.is_verified ?? user.verified ?? false) : false;
  const userLocked = user ? (user.is_locked ?? user.locked ?? false) : false;

  // Render Skeletons for Loading State
  if (isUserLoading) {
    return (
      <div className="max-w-[1500px] w-full mx-auto px-8 py-8 flex flex-col gap-6 select-none font-body text-left">
        {/* Breadcrumb Skeleton */}
        <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
        {/* Title Skeleton */}
        <div className="h-10 w-64 bg-slate-200 rounded animate-pulse" />
        
        {/* Hero Card Skeleton */}
        <div className="h-40 w-full bg-white border border-slate-200 rounded-[18px] p-6 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-slate-200" />
            <div className="flex flex-col gap-2">
              <div className="h-6 w-48 bg-slate-200 rounded" />
              <div className="h-4 w-32 bg-slate-200 rounded" />
              <div className="h-4 w-40 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="w-32 h-10 bg-slate-200 rounded-xl" />
        </div>

        {/* Grid Skeletons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-white border border-slate-200 rounded-[18px] animate-pulse" />
          <div className="h-80 bg-white border border-slate-200 rounded-[18px] animate-pulse" />
        </div>
      </div>
    );
  }

  // Render Error State
  if (isUserError) {
    return (
      <div className="max-w-[1500px] w-full mx-auto px-8 py-8 flex flex-col items-center justify-center text-center min-h-[60vh] gap-4 select-none font-body text-left">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-black text-slate-900 font-display">Unable to load user</h2>
          <p className="text-xs font-semibold text-slate-450 max-w-sm leading-normal">
            {userError.message || 'The requested user profile could not be found or retrieved from the database.'}
          </p>
        </div>
        <button
          onClick={() => refetchUser()}
          className="h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm shadow-indigo-600/10"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] w-full mx-auto px-8 py-8 flex flex-col gap-6 select-none font-body text-left relative">
      {/* Click-away overlay for Add Role Dropdown */}
      {isAddRoleOpen && (
        <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setIsAddRoleOpen(false)} />
      )}

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => navigate('/admin/users')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-450 hover:text-indigo-600 transition-colors w-fit cursor-pointer outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Users
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight font-display leading-none">
              User Details
            </h1>
            <p className="text-xs font-semibold text-slate-400 mt-1">
              View and manage user profile, permissions and account security.
            </p>
          </div>

          {/* Header Action Buttons (Only in Readonly Mode) */}
          {!isEditMode && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  refetchUser();
                  toast.success('User details refreshed.');
                }}
                className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer outline-none"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                disabled={!user?.can_edit}
                className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer outline-none disabled:opacity-30 disabled:cursor-not-allowed shadow-sm shadow-indigo-600/10"
              >
                Edit User
              </button>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={!user?.can_delete}
                className="h-10 px-4 rounded-xl border border-red-200 bg-white hover:bg-red-50/30 text-red-600 text-xs font-bold transition-colors cursor-pointer outline-none disabled:opacity-20 disabled:cursor-not-allowed"
              >
                Delete User
              </button>
            </div>
          )}
        </div>
      </div>

      {/* HERO PROFILE CARD */}
      <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-md transition-all duration-300">
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
          {/* Avatar Container with Drag-and-Drop Uploader in Edit Mode */}
          <div
            onClick={() => isEditMode && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-24 h-24 rounded-full relative shrink-0 select-none overflow-hidden border border-slate-200 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100
              ${isEditMode ? 'cursor-pointer group' : ''} ${isDragging ? 'border-indigo-550 border-dashed bg-indigo-50/50' : ''}`}
          >
            {profileImagePreview ? (
              <img src={profileImagePreview} alt={user?.full_name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-black text-indigo-600 font-display">{initials}</span>
            )}

            {/* Hover overlay in Edit Mode */}
            {isEditMode && (
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[9.5px] font-black uppercase tracking-wider transition-opacity gap-1">
                <Camera className="w-4 h-4 text-white" />
                Change Photo
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
            />
          </div>

          {/* User Details labels */}
          <div className="flex flex-col text-center sm:text-left min-w-0">
            <h2 className="text-xl font-black text-slate-900 font-display leading-tight flex items-center justify-center sm:justify-start gap-2.5">
              {user?.full_name}
              {userActive && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active" />
              )}
            </h2>
            <span className="text-xs font-semibold text-slate-455 mt-1">{email}</span>
            {phone && (
              <span className="text-xs font-semibold text-slate-450 mt-0.5">{phone}</span>
            )}

            {/* Role Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mt-3">
              {selectedRoles.map((role) => {
                const r = role.toUpperCase();
                let colorClass = 'bg-orange-50 text-orange-700 border-orange-100';
                if (r === 'ADMIN' || r === 'SUPER ADMIN') {
                  colorClass = 'bg-purple-50 text-purple-755 border-purple-100';
                } else if (r === 'DOCTOR') {
                  colorClass = 'bg-blue-50 text-blue-700 border-blue-150';
                }
                return (
                  <span
                    key={role}
                    className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wide ${colorClass}`}
                  >
                    {role}
                  </span>
                );
              })}
            </div>

            {/* Quick Status Chips */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3.5">
              {userVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-750 border border-emerald-100 text-[9px] font-black uppercase tracking-wider">
                  Verified
                </span>
              )}
              {userActive ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-755 border border-emerald-100 text-[9px] font-black uppercase tracking-wider">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200 text-[9px] font-black uppercase tracking-wider">
                  Inactive
                </span>
              )}
              {userLocked ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100 text-[9px] font-black uppercase tracking-wider">
                  Locked
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-750 border border-emerald-100 text-[9px] font-black uppercase tracking-wider">
                  Unlocked
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hero Card Actions (Right Side) */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
          {/* Lock / Unlock Toggle button */}
          {userLocked ? (
            <button
              type="button"
              onClick={() => setIsUnlockModalOpen(true)}
              disabled={!user?.can_unlock || isEditMode}
              className="h-10 px-5 rounded-xl bg-emerald-650 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 outline-none disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Unlock size={14} />
              Unlock Account
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsLockModalOpen(true)}
              disabled={!user?.can_block || isEditMode}
              className="h-10 px-5 rounded-xl bg-red-650 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 outline-none disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Lock size={14} />
              Lock Account
            </button>
          )}

          {/* Quick Edit/Delete buttons visible only in readonly */}
          {!isEditMode && (
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                disabled={!user?.can_edit}
                className="h-10 px-5 flex-1 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-750 text-xs font-bold transition-colors cursor-pointer outline-none disabled:opacity-30"
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={!user?.can_delete}
                className="h-10 px-4 rounded-xl border border-red-100 bg-white hover:bg-red-50/20 text-red-600 text-xs font-bold transition-colors cursor-pointer outline-none disabled:opacity-20"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* INFORMATION GRID (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          
          {/* CARD 1: BASIC INFORMATION */}
          <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm flex flex-col gap-5 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <User size={16} />
              </div>
              <h3 className="text-sm font-black text-slate-900 font-display">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              {/* First Name */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">First Name</span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-550 transition-colors"
                  />
                ) : (
                  <span className="text-xs font-bold text-slate-700">{firstName || '--'}</span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Last Name</span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-550 transition-colors"
                  />
                ) : (
                  <span className="text-xs font-bold text-slate-700">{lastName || '--'}</span>
                )}
              </div>

              {/* Full Name (Readonly always) */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Full Name</span>
                <span className="text-xs font-bold text-slate-700">
                  {isEditMode ? `${firstName} ${lastName}` : user?.full_name}
                </span>
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Email Address</span>
                {isEditMode ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-555 transition-colors"
                  />
                ) : (
                  <span className="text-xs font-bold text-slate-700">{email}</span>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Phone Number</span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-550 transition-colors"
                  />
                ) : (
                  <span className="text-xs font-bold text-slate-700">{phone || '--'}</span>
                )}
              </div>

              {/* UUID */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">User ID (UUID)</span>
                <span className="text-xs font-bold text-slate-400 font-mono select-all bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 w-fit">
                  {user?.id}
                </span>
              </div>
            </div>
          </div>

          {/* CARD 3: ROLES & PERMISSIONS */}
          <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm flex flex-col gap-5 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <ShieldCheck size={16} />
              </div>
              <h3 className="text-sm font-black text-slate-900 font-display">Assigned Roles</h3>
            </div>

            <div className="flex flex-wrap gap-2 text-left">
              {selectedRoles.length === 0 ? (
                <span className="text-xs font-semibold text-slate-400 py-1">No roles assigned.</span>
              ) : (
                selectedRoles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-150 bg-slate-50 text-slate-750 text-xs font-bold uppercase tracking-wide select-none transition-all"
                  >
                    {role}
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(role)}
                        className="w-4 h-4 rounded-full bg-slate-200 hover:bg-red-100 text-slate-500 hover:text-red-650 flex items-center justify-center transition-colors cursor-pointer outline-none border-none"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </span>
                ))
              )}
            </div>

            {/* Add Role selector dropdown */}
            {isEditMode && (
              <div className="relative mt-2 text-left">
                <button
                  type="button"
                  onClick={() => setIsAddRoleOpen(!isAddRoleOpen)}
                  className="h-9 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-1.5 cursor-pointer outline-none"
                >
                  <Plus className="w-4.5 h-4.5 text-slate-450" />
                  Add Role
                </button>

                {/* Popover list */}
                <AnimatePresence>
                  {isAddRoleOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      transition={{ duration: 0.1 }}
                      className="absolute left-0 top-10.5 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-40 flex flex-col text-left"
                    >
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider px-3.5 py-1 border-b border-slate-100">
                        Available Roles
                      </span>
                      {rolesDropdown
                        .filter((r) => !selectedRoles.includes(r.name))
                        .map((roleObj) => (
                          <button
                            key={roleObj.id}
                            type="button"
                            onClick={() => handleAddRole(roleObj.name)}
                            className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors w-full text-left cursor-pointer"
                          >
                            {roleObj.name}
                          </button>
                        ))}
                      {rolesDropdown.filter((r) => !selectedRoles.includes(r.name)).length === 0 && (
                        <span className="px-3.5 py-2 text-xs font-semibold text-slate-400">
                          All roles assigned.
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          
          {/* CARD 2: ACCOUNT STATUS */}
          <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm flex flex-col gap-5 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Shield size={16} />
              </div>
              <h3 className="text-sm font-black text-slate-900 font-display">Account Status</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              {/* Active Toggle */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Active State</span>
                {isEditMode ? (
                  <div className="flex items-center gap-3 mt-1.5">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-650"></div>
                    </label>
                    <span className="text-xs font-bold text-slate-705">
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ) : (
                  <div className="mt-1">
                    {userActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-750 border border-emerald-100 text-[10px] font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-slate-550 border border-slate-200 text-[10px] font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        Inactive
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Verified Toggle */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Verification Status</span>
                {isEditMode ? (
                  <div className="flex items-center gap-3 mt-1.5">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isVerified}
                        onChange={(e) => setIsVerified(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <span className="text-xs font-bold text-slate-700">
                      {isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                ) : (
                  <div className="mt-1">
                    {userVerified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-black uppercase tracking-wider">
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100 text-[10px] font-black uppercase tracking-wider">
                        Unverified
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Locked (Display only) */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Account Security</span>
                <div className="mt-1">
                  {userLocked ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-100 text-[10px] font-black uppercase tracking-wider">
                      <Lock size={10} className="stroke-[2.5]" />
                      Locked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-black uppercase tracking-wider">
                      <Unlock size={10} className="stroke-[2.5]" />
                      Unlocked
                    </span>
                  )}
                </div>
              </div>

              {/* Failed Login Attempts */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Failed Login Attempts</span>
                <span className={`text-xs font-bold mt-1 px-2.5 py-1.5 rounded-lg border w-fit font-mono
                  ${user?.failed_login_attempts > 0 ? 'bg-red-50 text-red-700 border-red-100' : 'bg-slate-50 text-slate-650 border-slate-200'}`}>
                  {user?.failed_login_attempts ?? 0} Attempts
                </span>
              </div>
            </div>
          </div>

          {/* CARD 4: TIMELINE */}
          <div className="bg-white border border-slate-200 rounded-[18px] p-6 shadow-sm flex flex-col gap-5 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                <Clock size={16} />
              </div>
              <h3 className="text-sm font-black text-slate-900 font-display">Account Timeline</h3>
            </div>

            {/* Vertical Timeline UI */}
            <div className="relative pl-6 flex flex-col gap-6 text-left">
              {/* Timeline Line */}
              <div className="absolute left-2.5 top-1.5 bottom-1.5 w-0.5 border-l-2 border-slate-100 border-dashed" />

              {/* Created At */}
              <div className="relative flex flex-col gap-0.5">
                <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-[2.5px] border-indigo-600 bg-white" />
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Account Created</span>
                <span className="text-xs font-bold text-slate-700">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })
                    : '--'}
                </span>
              </div>

              {/* Updated At */}
              <div className="relative flex flex-col gap-0.5">
                <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-[2.5px] border-amber-500 bg-white" />
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Last Profile Update</span>
                <span className="text-xs font-bold text-slate-700">
                  {user?.updated_at
                    ? new Date(user.updated_at).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })
                    : '--'}
                </span>
              </div>

              {/* Last Login */}
              <div className="relative flex flex-col gap-0.5">
                <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-[2.5px] border-emerald-500 bg-white" />
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Last Authentication</span>
                <span className="text-xs font-bold text-slate-700">
                  {user?.last_login
                    ? new Date(user.last_login).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })
                    : 'Never Authenticated'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM ACTION BAR (Visible only in Edit Mode) */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-xl w-[90%] bg-slate-900 border border-slate-800 rounded-2xl p-4.5 shadow-2xl flex items-center justify-between gap-6 z-50 select-none font-body"
          >
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-200">Unsaved Changes</span>
              <span className="text-[10px] font-semibold text-slate-400 mt-0.5">You are currently in editing mode.</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="h-9.5 px-4 rounded-xl border border-slate-700 bg-slate-850 hover:bg-slate-800 text-slate-200 text-xs font-bold cursor-pointer outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={updateUserMutation.isPending}
                className="h-9.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 outline-none shadow-md shadow-indigo-655/15"
              >
                {updateUserMutation.isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                Save Changes
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOCK CONFIRMATION MODAL */}
      <AnimatePresence>
        {isLockModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-[20px] shadow-2xl p-6 max-w-sm w-full text-center flex flex-col gap-4 font-body"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 text-red-650 flex items-center justify-center mx-auto text-xl">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-black text-slate-900 font-display">Lock User Account?</h3>
                <p className="text-xs font-semibold text-slate-450 leading-relaxed">
                  This user will not be able to login until unlocked.
                </p>
              </div>
              <div className="flex items-center gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsLockModalOpen(false)}
                  className="h-9.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-550 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => lockUserMutation.mutate()}
                  disabled={lockUserMutation.isPending}
                  className="h-9.5 px-5 rounded-xl bg-red-650 hover:bg-red-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"
                >
                  {lockUserMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Lock Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UNLOCK CONFIRMATION MODAL */}
      <AnimatePresence>
        {isUnlockModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-[20px] shadow-2xl p-6 max-w-sm w-full text-center flex flex-col gap-4 font-body"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
                <Unlock className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-black text-slate-900 font-display">Unlock User Account?</h3>
                <p className="text-xs font-semibold text-slate-450 leading-relaxed">
                  Restore access for this user and reset failed login attempts.
                </p>
              </div>
              <div className="flex items-center gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsUnlockModalOpen(false)}
                  className="h-9.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => unlockUserMutation.mutate()}
                  disabled={unlockUserMutation.isPending}
                  className="h-9.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"
                >
                  {unlockUserMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Unlock Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-[20px] shadow-2xl overflow-hidden max-w-md w-full flex flex-col font-body text-left"
            >
              <div className="bg-red-600 px-6 py-5 flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black font-display">Delete User Permanently?</h3>
                  <p className="text-[11px] text-red-100 font-semibold mt-0.5">This action cannot be undone.</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <p className="text-xs font-semibold text-slate-555 leading-relaxed">
                  Are you absolutely sure you want to delete <strong className="text-slate-900 font-bold">{user?.full_name}</strong> permanently? This will revoke all active sessions.
                </p>
                
                <div className="flex flex-col gap-1.5 mt-2">
                  <label htmlFor="confirm-delete-input" className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                    Type <span className="font-mono text-red-650 font-bold">DELETE</span> to confirm
                  </label>
                  <input
                    id="confirm-delete-input"
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type DELETE..."
                    className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-red-500 transition-colors w-full"
                  />
                </div>

                <div className="flex items-center gap-3 justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setDeleteConfirmText('');
                    }}
                    className="h-9.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteUserMutation.mutate()}
                    disabled={deleteConfirmText !== 'DELETE' || deleteUserMutation.isPending}
                    className="h-9.5 px-5 rounded-xl bg-red-650 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"
                  >
                    {deleteUserMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Delete Permanently
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDetailsPage;
