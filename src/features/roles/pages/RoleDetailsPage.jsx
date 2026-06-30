import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Lock,
  Copy,
  Users,
  Shield,
  Calendar,
  Clock,
  UserPlus,
  Search,
  Filter,
  AlertCircle,
  RefreshCw,
  Plus,
  UserMinus,
  CheckCircle,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Services & Components
import { roleService, MOCK_PERMISSIONS, MOCK_USERS } from '../services/roleService';
import PermissionMatrix from '../components/PermissionMatrix';
import AssignUsersModal from '../components/AssignUsersModal';
import DeleteRoleDialog from '../components/DeleteRoleDialog';

export const RoleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 1. Core States
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isAssignUsersOpen, setIsAssignUsersOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Users Tab search and filter states
  const [userSearch, setUserSearch] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState('All');
  const [userPage, setUserPage] = useState(1);
  const [userPageSize] = useState(5);

  // Edit Mode Form States
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState(true);
  const [editPermissions, setEditPermissions] = useState([]);

  // 2. Fetch Role Details Query
  const {
    data: role,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['roleDetails', id],
    queryFn: () => roleService.getRoleDetails(id),
    staleTime: 5000,
  });

  // Initialize edit form states when role data is loaded
  useEffect(() => {
    if (role) {
      setEditDescription(role.description || '');
      setEditStatus(role.is_active ?? true);
      setEditPermissions(
        role.permissions ? role.permissions.filter((p) => p.assigned).map((p) => p.id) : []
      );
    }
  }, [role]);

  // 3. Mutations
  // Update Role (PATCH)
  const updateRoleMutation = useMutation({
    mutationFn: (data) => roleService.updateRole(role.id, data),
    onSuccess: () => {
      toast.success('Role Updated Successfully');
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['roleDetails', id] });
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update role.');
    },
  });

  // Assign Permissions
  const assignPermissionsMutation = useMutation({
    mutationFn: (permissionIds) => roleService.assignPermissions(role.id, permissionIds),
    onSuccess: () => {
      toast.success('Permissions Assigned Successfully');
      queryClient.invalidateQueries({ queryKey: ['roleDetails', id] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to assign permissions.');
    },
  });

  // Remove Permissions
  const removePermissionsMutation = useMutation({
    mutationFn: (permissionIds) => roleService.removePermissions(role.id, permissionIds),
    onSuccess: () => {
      toast.success('Permissions Removed Successfully');
      queryClient.invalidateQueries({ queryKey: ['roleDetails', id] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to remove permissions.');
    },
  });

  // Assign Users
  const assignUsersMutation = useMutation({
    mutationFn: (userIds) => roleService.assignUsers(role.id, userIds),
    onSuccess: () => {
      toast.success('Users Assigned Successfully');
      setIsAssignUsersOpen(false);
      queryClient.invalidateQueries({ queryKey: ['roleDetails', id] });
      queryClient.invalidateQueries({ queryKey: ['rolesStatistics'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to assign users.');
    },
  });

  // Remove Users
  const removeUsersMutation = useMutation({
    mutationFn: (userIds) => roleService.removeUsers(role.id, userIds),
    onSuccess: () => {
      toast.success('Users Removed Successfully');
      queryClient.invalidateQueries({ queryKey: ['roleDetails', id] });
      queryClient.invalidateQueries({ queryKey: ['rolesStatistics'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to remove users.');
    },
  });

  // Delete Role
  const deleteRoleMutation = useMutation({
    mutationFn: () => roleService.deleteRole(role.id),
    onSuccess: () => {
      toast.success('Role Deleted Successfully');
      setIsDeleteOpen(false);
      navigate('/admin/roles');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete role.');
    },
  });

  // 4. Calculations & Helpers
  const copyRoleId = () => {
    if (role?.id) {
      navigator.clipboard.writeText(role.id);
      toast.success('Role ID copied to clipboard');
    }
  };

  // Group permissions for Edit Mode and Distribution Chart
  const permissionDistribution = useMemo(() => {
    if (!role?.permissions) return [];
    
    const groups = role.permissions.reduce((acc, p) => {
      const gName = p.group || 'General';
      if (!acc[gName]) acc[gName] = { count: 0, assigned: 0 };
      acc[gName].count += 1;
      if (p.assigned) acc[gName].assigned += 1;
      return acc;
    }, {});

    const colors = [
      '#4F46E5', // Indigo
      '#22C55E', // Green
      '#F59E0B', // Orange
      '#3B82F6', // Blue
      '#EC4899', // Pink
      '#8B5CF6', // Purple
    ];

    return Object.entries(groups)
      .map(([name, stats], index) => ({
        name,
        count: stats.assigned,
        percentage: stats.assigned > 0 ? Math.round((stats.assigned / role.permissions_count) * 100) : 0,
        color: colors[index % colors.length]
      }))
      .filter((item) => item.count > 0);
  }, [role]);

  // Compute SVG Donut Chart coordinates
  const donutChartSegments = useMemo(() => {
    let accumulatedPercentage = 0;
    return permissionDistribution.map((item) => {
      const startAngle = (accumulatedPercentage / 100) * 360;
      accumulatedPercentage += item.percentage;
      const endAngle = (accumulatedPercentage / 100) * 360;

      // Convert angles to SVG coordinates (radius 40, center 50)
      const r = 36;
      const cx = 50;
      const cy = 50;

      const x1 = cx + r * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = cy + r * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = cx + r * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = cy + r * Math.sin((endAngle - 90) * Math.PI / 180);

      const largeArcFlag = item.percentage > 50 ? 1 : 0;

      const pathData = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
      return { ...item, pathData };
    });
  }, [permissionDistribution]);

  // Filtered users for Assigned Users Tab
  const filteredUsers = useMemo(() => {
    if (!role?.assigned_users?.results) return [];
    
    let result = role.assigned_users.results;

    // Search
    if (userSearch) {
      const q = userSearch.toLowerCase();
      result = result.filter(
        (u) => u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }

    // Status Filter
    if (userStatusFilter !== 'All') {
      result = result.filter((u) => u.status === userStatusFilter);
    }

    return result;
  }, [role, userSearch, userStatusFilter]);

  // Paginated users for Assigned Users Tab
  const paginatedUsers = useMemo(() => {
    const start = (userPage - 1) * userPageSize;
    return filteredUsers.slice(start, start + userPageSize);
  }, [filteredUsers, userPage, userPageSize]);

  const totalUserPages = Math.ceil(filteredUsers.length / userPageSize) || 1;

  // Edit Mode: Toggle individual permission check
  const handleEditTogglePermission = (permId) => {
    setEditPermissions((prev) =>
      prev.includes(permId) ? prev.filter((id) => id !== permId) : [...prev, permId]
    );
  };

  const handleEditSave = () => {
    if (editPermissions.length === 0) {
      toast.error('A role must have at least one permission selected.');
      return;
    }
    updateRoleMutation.mutate({
      description: editDescription,
      is_active: editStatus,
      permissions: editPermissions,
    });
  };

  // 5. Render States
  if (isLoading) {
    return (
      <div className="max-w-[1600px] w-full mx-auto px-8 py-8 flex flex-col gap-6 animate-pulse">
        {/* Skeleton Header */}
        <div className="flex justify-between items-center h-16">
          <div className="flex flex-col gap-2">
            <div className="w-24 h-3 bg-slate-200 rounded" />
            <div className="w-48 h-7 bg-slate-200 rounded" />
          </div>
          <div className="flex gap-3"><div className="w-24 h-10 bg-slate-200 rounded-xl" /></div>
        </div>

        {/* Skeleton Hero */}
        <div className="h-[170px] bg-slate-200 rounded-[24px]" />

        {/* Skeleton Content */}
        <div className="flex-1 grid grid-cols-3 gap-6">
          <div className="col-span-1 bg-slate-200 rounded-[24px]" />
          <div className="col-span-2 bg-slate-200 rounded-[24px]" />
        </div>
      </div>
    );
  }

  if (isError) {
    const is404 = error?.status === 404;
    const is403 = error?.status === 403;

    return (
      <div className="max-w-[1600px] w-full mx-auto px-8 py-8 flex flex-col items-center justify-center text-center select-none">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-black text-slate-950 font-display">
          {is404 ? 'Role Not Found' : is403 ? 'Permission Denied' : 'Unable to load role details'}
        </h3>
        <p className="text-xs font-semibold text-slate-450 mt-1.5 max-w-md leading-normal">
          {is404
            ? 'The role you are looking for might have been deleted or does not exist.'
            : is403
            ? 'You do not have the required permissions to view this role console.'
            : 'An unexpected error occurred while communicating with the server.'}
        </p>
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => navigate('/admin/roles')}
            className="h-10 px-5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Back to Roles
          </button>
          <button
            onClick={refetch}
            className="h-10 px-5 rounded-xl bg-slate-900 text-xs font-bold text-white hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  const isSystemRole = role.is_system;
  const avatarText = role.name.substring(0, 2).toUpperCase();
  const assignedUsersList = role.assigned_users?.results || [];

  return (
    <div className="max-w-[1600px] w-full mx-auto px-8 py-8 flex flex-col gap-6 select-none">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 text-left">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span className="cursor-pointer hover:text-slate-600" onClick={() => navigate('/admin/dashboard')}>Accounts</span>
            <span>&gt;</span>
            <span className="cursor-pointer hover:text-slate-600" onClick={() => navigate('/admin/roles')}>Roles</span>
            <span>&gt;</span>
            <span className="text-indigo-600">Role Details</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display mt-1">
            Role Details
          </h1>
          <p className="text-xs font-semibold text-slate-450">
            Manage role information, permissions, and assigned users.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/roles')}
            className="h-10 px-4 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Roles
          </button>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="h-10 px-4 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/10"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit Role
            </button>
          )}

          <div className="relative group/delete">
            <button
              onClick={() => setIsDeleteOpen(true)}
              disabled={!role.can_delete}
              className="h-10 px-4 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-750 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {!role.can_delete ? <Lock className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
              Delete Role
            </button>
            {!role.can_delete && (
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover/delete:block bg-slate-950 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap z-30 shadow-lg pointer-events-none select-none">
                {isSystemRole ? 'System roles cannot be deleted.' : 'Cannot delete role with assigned users.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HERO INFORMATION CARD */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-[0_2px_8px_rgba(15,23,42,0.01)] flex flex-col lg:flex-row items-center justify-between gap-6 min-h-[170px]">
        {/* Left Side Info */}
        <div className="flex items-center gap-5 flex-1 w-full text-left">
          {/* Circular Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-black font-display text-white shadow-md shadow-indigo-200/50 shrink-0">
            {avatarText}
          </div>

          <div className="flex flex-col gap-2 min-w-0 flex-1">
            {/* Title / Badges */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-black text-slate-900 tracking-tight font-display">
                {role.name}
              </h2>
              {isSystemRole ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-black tracking-wide uppercase">
                  System Role
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-[10px] font-black tracking-wide uppercase">
                  Custom Role
                </span>
              )}
              {role.is_active ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-black tracking-wide uppercase">
                  <span className="w-1 h-1 rounded-full bg-emerald-600" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100 text-[10px] font-black tracking-wide uppercase">
                  <span className="w-1 h-1 rounded-full bg-red-650" />
                  Inactive
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs font-semibold text-slate-500 line-clamp-1 leading-normal max-w-2xl">
              {role.description || 'No description provided.'}
            </p>

            {/* Audit Log Details */}
            <div className="flex items-center gap-x-6 gap-y-1.5 text-[10.5px] font-semibold text-slate-400 flex-wrap mt-1 pt-2 border-t border-slate-50">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-350" />
                Created by: <strong className="text-slate-600 font-bold">{role.created_by}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-355" />
                Created at: <strong className="text-slate-600 font-bold">{new Date(role.created_at).toLocaleDateString()}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-355" />
                Updated: <strong className="text-slate-600 font-bold">{new Date(role.updated_at).toLocaleDateString()}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Stats (Odometer style) */}
        <div className="flex items-center gap-4 shrink-0 overflow-x-auto w-full lg:w-auto">
          {/* Card 1: Users */}
          <div className="w-28 h-28 bg-slate-50/50 border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-sm hover:shadow transition-all">
            <span className="text-lg">👥</span>
            <span className="text-xl font-black text-slate-900 font-display tracking-tight mt-1">
              {role.users_count}
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">
              Users
            </span>
          </div>

          {/* Card 2: Permissions */}
          <div className="w-28 h-28 bg-slate-50/50 border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-sm hover:shadow transition-all">
            <span className="text-lg">🛡️</span>
            <span className="text-xl font-black text-slate-900 font-display tracking-tight mt-1">
              {role.permissions_count}
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">
              Permissions
            </span>
          </div>



          {/* Card 4: Last Updated */}
          <div className="w-28 h-28 bg-slate-50/50 border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-sm hover:shadow transition-all">
            <span className="text-lg">🕒</span>
            <span className="text-xs font-black text-slate-900 font-display tracking-tight mt-1.5">
              2d ago
            </span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-1">
              Updated
            </span>
          </div>
        </div>
      </div>

      {/* TABS HEADER */}
      <div className="border-b border-slate-200 flex items-center gap-6 sticky top-0 bg-white z-15">
        {['Overview', 'Permissions', 'Assigned Users'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                if (isEditing && tab !== 'Overview') {
                  toast.error('Please save or cancel your changes first.');
                  return;
                }
                setActiveTab(tab);
              }}
              className={`relative py-3.5 px-1 text-xs font-bold transition-all cursor-pointer outline-none flex items-center gap-1.5
                ${isActive ? 'text-indigo-600 font-black' : 'text-slate-450 hover:text-slate-700'}`}
            >
              {tab === 'Overview' && <span>📁</span>}
              {tab === 'Permissions' && <span>🛡️</span>}
              {tab === 'Assigned Users' && <span>👥</span>}
              {tab}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT (Viewport filling, scrollable) */}
      <div className="w-full pr-1 pb-4">
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
            {/* LEFT COLUMN (40%) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Role Information Card */}
              <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-4 text-left">
                <h3 className="text-xs font-black text-slate-700 font-display uppercase tracking-wider">
                  Role Information
                </h3>
                <div className="divide-y divide-slate-50 text-xs">
                  <div className="py-3 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-450">Role ID</span>
                    <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800">
                      <span className="truncate max-w-[150px]" title={role.id}>{role.id}</span>
                      <button onClick={copyRoleId} className="p-1 hover:bg-slate-100 rounded text-slate-450 cursor-pointer">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="font-semibold text-slate-450">Role Name</span>
                    <span className="font-bold text-slate-800">{role.name}</span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="font-semibold text-slate-455">Role Type</span>
                    <span className="font-bold text-slate-800">{isSystemRole ? 'System' : 'Custom'}</span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="font-semibold text-slate-455">Status</span>
                    <span className={`font-bold ${role.is_active ? 'text-emerald-600' : 'text-red-600'}`}>
                      {role.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="font-semibold text-slate-455">Users Mapped</span>
                    <span className="font-bold text-slate-800">{role.users_count} Users</span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <span className="font-semibold text-slate-455">Permissions Mapped</span>
                    <span className="font-bold text-slate-800">{role.permissions_count} Permissions</span>
                  </div>
                </div>
              </div>

              {/* Permission Distribution */}
              <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-4 text-left">
                <h3 className="text-xs font-black text-slate-700 font-display uppercase tracking-wider">
                  Permission Distribution
                </h3>

                {permissionDistribution.length > 0 ? (
                  <div className="flex items-center gap-6">
                    {/* SVG Donut Chart */}
                    <div className="relative w-24 h-24 shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        {/* Underlay */}
                        <circle cx="50" cy="50" r="36" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                        {/* Segments */}
                        {donutChartSegments.map((seg, index) => {
                          // Compute stroke array for visual representation
                          const circumference = 2 * Math.PI * 36;
                          const strokeLength = (seg.percentage / 100) * circumference;
                          const strokeOffset = circumference - strokeLength;

                          return (
                            <circle
                              key={index}
                              cx="50"
                              cy="50"
                              r="36"
                              fill="transparent"
                              stroke={seg.color}
                              strokeWidth="12"
                              strokeDasharray={circumference}
                              strokeDashoffset={circumference - (donutChartSegments.slice(0, index).reduce((acc, s) => acc + s.percentage, 0) / 100 * circumference)}
                              className="transition-all duration-500"
                            />
                          );
                        })}
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-black text-slate-900 font-display tracking-tight leading-none">
                          {role.permissions_count}
                        </span>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                          Total
                        </span>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                      {permissionDistribution.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-650">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="truncate">{item.name}</span>
                          </div>
                          <span className="font-bold text-slate-900 shrink-0">
                            {item.count} ({item.percentage}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-slate-400 font-semibold">
                    No permissions assigned to this role.
                  </div>
                )}

                <button
                  onClick={() => setActiveTab('Permissions')}
                  className="mt-2 w-full h-10 border border-slate-200 hover:bg-slate-50 text-indigo-600 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  View All Permissions
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN (60%) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Description Card */}
              <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-3 text-left">
                <h3 className="text-xs font-black text-slate-700 font-display uppercase tracking-wider">
                  Description
                </h3>
                <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                  {role.description || 'No detailed description provided for this role.'}
                </p>
              </div>

              {/* Assigned Users Preview Table */}
              <div className="bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-sm flex flex-col text-left">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                  <h3 className="text-xs font-black text-slate-700 font-display uppercase tracking-wider">
                    Assigned Users
                  </h3>
                  <button
                    onClick={() => setIsAssignUsersOpen(true)}
                    className="h-9 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/10"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Assign Users
                  </button>
                </div>

                {assignedUsersList.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                    <Users className="w-8 h-8 text-slate-300" />
                    <span className="text-xs font-semibold">No users assigned to this role yet.</span>
                    <button
                      onClick={() => setIsAssignUsersOpen(true)}
                      className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                    >
                      Assign Users Now
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto max-h-[310px] overflow-y-auto">
                    <table className="w-full text-left border-collapse table-fixed">
                      <thead className="sticky top-0 bg-white z-10 border-b border-slate-100">
                        <tr className="bg-slate-50/50 h-10 select-none text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          <th className="py-2.5 px-6 w-[35%]">User</th>
                          <th className="py-2.5 px-6 w-[35%]">Email</th>
                          <th className="py-2.5 px-6 w-[15%]">Status</th>
                          <th className="py-2.5 px-6 w-[15%] text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {assignedUsersList.slice(0, 6).map((user) => (
                          <tr key={user.id} className="h-14 hover:bg-slate-50/25">
                            <td className="py-2 px-6 font-bold text-slate-950 text-xs truncate">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-600 border">
                                  {user.full_name.charAt(0)}
                                </div>
                                <span className="truncate">{user.full_name}</span>
                              </div>
                            </td>
                            <td className="py-2 px-6 font-semibold text-slate-500 text-xs truncate">
                              {user.email}
                            </td>
                            <td className="py-2 px-6 text-xs">
                              {user.status === 'Active' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-bold uppercase">
                                  Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100 text-[9px] font-bold uppercase">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-6" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => removeUsersMutation.mutate([user.id])}
                                  disabled={!user.can_remove}
                                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-red-600 hover:bg-red-50/50 transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                                  title={user.can_remove ? "Remove User" : "Cannot remove this user."}
                                >
                                  <UserMinus size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {assignedUsersList.length > 6 && (
                  <div className="p-3 border-t border-slate-100 text-center bg-slate-50/30">
                    <button
                      onClick={() => setActiveTab('Assigned Users')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                    >
                      View All {assignedUsersList.length} Assigned Users
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Permissions' && (
          <PermissionMatrix
            rolePermissions={role.permissions}
            isSystem={isSystemRole}
            canEdit={role.can_edit}
            isSaving={assignPermissionsMutation.isPending || removePermissionsMutation.isPending}
            onAssignPermissions={(permIds) => assignPermissionsMutation.mutate(permIds)}
            onRemovePermissions={(permIds) => removePermissionsMutation.mutate(permIds)}
          />
        )}

        {activeTab === 'Assigned Users' && (
          <div className="bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-sm flex flex-col text-left">
            {/* Toolbar */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
              <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => {
                      setUserSearch(e.target.value);
                      setUserPage(1);
                    }}
                    placeholder="Search assigned users..."
                    className="w-full h-9 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="relative">
                  <select
                    value={userStatusFilter}
                    onChange={(e) => {
                      setUserStatusFilter(e.target.value);
                      setUserPage(1);
                    }}
                    className="h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => setIsAssignUsersOpen(true)}
                className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/10 self-end sm:self-auto"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Assign Users
              </button>
            </div>

            {/* Table */}
            {paginatedUsers.length === 0 ? (
              <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                <Users className="w-10 h-10 text-slate-350" />
                <span className="text-xs font-bold">No assigned users match your filters.</span>
              </div>
            ) : (
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
                  <thead>
                    <tr className="bg-slate-50/50 h-11 select-none text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3 px-6 w-[25%]">Full Name</th>
                      <th className="py-3 px-6 w-[30%]">Email</th>
                      <th className="py-3 px-6 w-[20%]">Phone</th>
                      <th className="py-3 px-6 w-[13%]">Status</th>
                      <th className="py-3 px-6 w-[12%] text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedUsers.map((user) => (
                      <tr key={user.id} className="h-14 hover:bg-slate-50/20">
                        <td className="py-2.5 px-6 font-bold text-slate-950 text-xs truncate">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-600 border">
                              {user.full_name.charAt(0)}
                            </div>
                            <span className="truncate">{user.full_name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-6 font-semibold text-slate-500 text-xs truncate">
                          {user.email}
                        </td>
                        <td className="py-2.5 px-6 font-semibold text-slate-500 text-xs">
                          {user.phone || '--'}
                        </td>
                        <td className="py-2.5 px-6 text-xs">
                          {user.status === 'Active' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-black uppercase">
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100 text-[9px] font-black uppercase">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-6" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeUsersMutation.mutate([user.id])}
                              disabled={!user.can_remove}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-red-600 hover:bg-red-50/50 transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                              title={user.can_remove ? "Remove User" : "Cannot remove this user."}
                            >
                              <UserMinus size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Table Pagination */}
            {filteredUsers.length > 0 && (
              <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-4 bg-slate-50/10">
                <span className="text-xs font-semibold text-slate-400">
                  Showing {(userPage - 1) * userPageSize + 1}–{Math.min(userPage * userPageSize, filteredUsers.length)} of {filteredUsers.length} Users
                </span>

                <div className="flex items-center gap-2">
                  <button
                    disabled={userPage === 1}
                    onClick={() => setUserPage((p) => p - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-650 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-700 px-2">
                    Page {userPage} of {totalUserPages}
                  </span>
                  <button
                    disabled={userPage === totalUserPages}
                    onClick={() => setUserPage((p) => p + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-650 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}


      </div>

      {/* EDIT MODE OVERLAY FORM */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="w-full max-w-[720px] bg-white border border-slate-200 rounded-[24px] shadow-2xl flex flex-col font-body overflow-hidden max-h-[85vh]"
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Edit className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">
                      Edit Role: {role.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-400">
                      Modify role attributes and assign permissions.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-8 h-8 rounded-lg border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer outline-none"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 text-left">
                {/* Role Name (Disabled if system role) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Role Name</label>
                  <input
                    type="text"
                    value={role.name}
                    disabled
                    className="w-full h-10 px-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-400 cursor-not-allowed"
                  />
                  {isSystemRole && (
                    <span className="text-[9px] font-semibold text-slate-400">System role names cannot be modified.</span>
                  )}
                </div>

                {/* Status Toggle */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60 h-11">
                  <button
                    type="button"
                    onClick={() => setEditStatus(!editStatus)}
                    disabled={isSystemRole && role.name === 'ADMIN'}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${editStatus ? 'bg-indigo-600' : 'bg-slate-200'} ${isSystemRole && role.name === 'ADMIN' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${editStatus ? 'translate-x-4' : 'translate-x-0'}`}
                    />
                  </button>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">Role Active Status</span>
                    {isSystemRole && role.name === 'ADMIN' && (
                      <span className="text-[9px] font-semibold text-slate-400">The ADMIN system role cannot be deactivated.</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Description</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={3}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-500"
                    placeholder="Enter role description..."
                  />
                </div>

                {/* Permission Selection Matrix */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700">Permissions Mapping</label>
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/20 max-h-[250px] overflow-y-auto flex flex-col gap-3">
                    {MOCK_PERMISSIONS.map((perm) => {
                      const isChecked = editPermissions.includes(perm.id);
                      return (
                        <div
                          key={perm.id}
                          onClick={() => handleEditTogglePermission(perm.id)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer select-none
                            ${isChecked ? 'bg-indigo-50/30 border-indigo-200' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all mt-0.5 flex-shrink-0
                            ${isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'}`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-800">{perm.name}</span>
                              <span className="text-[9px] font-bold text-slate-400 font-mono bg-slate-50 border px-1 rounded">
                                {perm.code}
                              </span>
                            </div>
                            <span className="text-[10px] font-semibold text-slate-400 mt-0.5">{perm.description}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="h-10 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditSave}
                  disabled={updateRoleMutation.isPending}
                  className="h-10 px-5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/10"
                >
                  {updateRoleMutation.isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ASSIGN USERS MODAL */}
      <AnimatePresence>
        {isAssignUsersOpen && (
          <AssignUsersModal
            isOpen={isAssignUsersOpen}
            onClose={() => setIsAssignUsersOpen(false)}
            onAssign={(userIds) => assignUsersMutation.mutate(userIds)}
            isSaving={assignUsersMutation.isPending}
            alreadyAssignedIds={role.assigned_users?.results?.map((u) => u.id) || []}
          />
        )}
      </AnimatePresence>

      {/* DELETE DIALOG */}
      <AnimatePresence>
        {isDeleteOpen && (
          <DeleteRoleDialog
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={() => deleteRoleMutation.mutate()}
            roleName={role.name}
            isDeleting={deleteRoleMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoleDetailsPage;
