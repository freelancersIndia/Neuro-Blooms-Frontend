import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Users,
  UserPlus,
  Download,
  RefreshCw,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Lock,
  Unlock,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Loader2,
  Filter,
  Calendar,
  ArrowUpDown,
  SlidersHorizontal,
  Check,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Services & Components
import { userService } from '../services/userService';
import CreateUserModal from '../components/CreateUserModal';
import UpdateUserDrawer from '../components/UpdateUserDrawer';

export const UsersPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 1. Filtering & Pagination States
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [verifiedFilter, setVerifiedFilter] = useState('All');
  const [blockedFilter, setBlockedFilter] = useState('All');
  const [activeFilter, setActiveFilter] = useState('All');
  const [dateRange, setDateRange] = useState('');
  
  // Collapsible Filters Row 2
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [hasProfileImageFilter, setHasProfileImageFilter] = useState('All');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // 2. Modals & Actions States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  
  const [lockingUser, setLockingUser] = useState(null);
  const [unlockingUser, setUnlockingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [activeDropdownUserId, setActiveDropdownUserId] = useState(null);

  // 3. API Queries
  // List Users
  const queryParams = useMemo(() => {
    const params = {
      page,
      page_size: pageSize,
    };
    if (search.trim()) params.search = search.trim();
    if (roleFilter !== 'All Roles') params.role = roleFilter;
    
    if (verifiedFilter !== 'All') {
      params.verified = verifiedFilter === 'Yes' ? 'true' : 'false';
    }
    if (blockedFilter !== 'All') {
      params.blocked = blockedFilter === 'Yes' ? 'true' : 'false';
    }
    if (activeFilter !== 'All') {
      params.active = activeFilter === 'Yes' ? 'true' : 'false';
    }
    if (hasProfileImageFilter !== 'All') {
      params.has_profile_image = hasProfileImageFilter === 'Yes' ? 'true' : 'false';
    }
    
    // Sort ordering
    const prefix = sortOrder === 'desc' ? '-' : '';
    params.ordering = `${prefix}${sortBy}`;

    return params;
  }, [page, pageSize, search, roleFilter, verifiedFilter, blockedFilter, activeFilter, hasProfileImageFilter, sortBy, sortOrder]);

  const {
    data: usersData,
    isLoading: isListLoading,
    isError: isListError,
    error: listError,
    refetch: refetchList
  } = useQuery({
    queryKey: ['usersList', queryParams],
    queryFn: () => userService.getUsers(queryParams),
    staleTime: 5000,
  });

  // Statistics
  const {
    data: statsData,
    isLoading: isStatsLoading,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['usersStatistics'],
    queryFn: () => userService.getUsersStatistics(),
    staleTime: 10000,
  });

  // 4. API Mutations
  // Create User
  const createUserMutation = useMutation({
    mutationFn: (data) => userService.createUser(data),
    onSuccess: () => {
      toast.success('User created successfully.');
      setIsCreateOpen(false);
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
      queryClient.invalidateQueries({ queryKey: ['usersStatistics'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create user.');
    }
  });

  // Lock User
  const lockUserMutation = useMutation({
    mutationFn: (id) => userService.lockUser(id),
    onSuccess: () => {
      toast.success('User locked successfully.');
      setLockingUser(null);
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
      queryClient.invalidateQueries({ queryKey: ['usersStatistics'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to lock user.');
    }
  });

  // Unlock User
  const unlockUserMutation = useMutation({
    mutationFn: (id) => userService.unlockUser(id),
    onSuccess: () => {
      toast.success('User unlocked successfully.');
      setUnlockingUser(null);
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
      queryClient.invalidateQueries({ queryKey: ['usersStatistics'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to unlock user.');
    }
  });

  // Delete User
  const deleteUserMutation = useMutation({
    mutationFn: (id) => userService.deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted successfully.');
      setDeletingUser(null);
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
      queryClient.invalidateQueries({ queryKey: ['usersStatistics'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete user.');
    }
  });

  // 5. Helpers
  const handleResetFilters = () => {
    setSearch('');
    setRoleFilter('All Roles');
    setVerifiedFilter('All');
    setBlockedFilter('All');
    setActiveFilter('All');
    setHasProfileImageFilter('All');
    setSortBy('created_at');
    setSortOrder('desc');
    setDateRange('');
    setPage(1);
  };

  const handleRefreshAll = () => {
    refetchList();
    refetchStats();
    toast.success('Data refreshed');
  };

  const handleExportUsers = () => {
    if (!usersList || usersList.length === 0) {
      toast.error('No users to export.');
      return;
    }
    const headers = ['User ID', 'Full Name', 'Email', 'Phone', 'Roles', 'Verified', 'Blocked', 'Active', 'Created At'];
    const rows = usersList.map((u) => [
      u.id,
      u.full_name,
      u.email,
      u.phone_number || u.phone || '',
      u.roles.join(', '),
      (u.is_verified ?? u.verified) ? 'Yes' : 'No',
      (u.is_blocked ?? u.blocked) ? 'Yes' : 'No',
      (u.is_active ?? u.active) ? 'Active' : 'Inactive',
      u.created_at
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `neuro_blooms_users_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Users list exported as CSV');
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUserIds(usersList.map((u) => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (e, userId) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedUserIds((prev) => [...prev, userId]);
    } else {
      setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  const stats = useMemo(() => {
    if (statsData) return statsData;
    return {
      total_users: 0,
      doctors: 0,
      receptionists: 0,
      admins: 0,
      locked_users: 0,
      inactive_users: 0
    };
  }, [statsData]);

  const usersList = usersData?.results || [];
  const totalCount = usersData?.count || 0;
  const totalPages = usersData?.total_pages || 1;

  const getRolePillStyles = (role) => {
    const r = role.toUpperCase();
    if (r === 'ADMIN' || r === 'SUPER ADMIN') {
      return 'bg-purple-50 text-purple-750 border-purple-100';
    }
    if (r === 'DOCTOR') {
      return 'bg-blue-50 text-blue-700 border-blue-150';
    }
    return 'bg-orange-50 text-orange-700 border-orange-100';
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-8 py-8 flex flex-col gap-6 select-none font-body text-left">
      {/* Click-away overlay for dropdowns */}
      {activeDropdownUserId && (
        <div 
          className="fixed inset-0 z-30 bg-transparent" 
          onClick={() => setActiveDropdownUserId(null)} 
        />
      )}
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
            Users Management
          </h1>
          <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-slate-400">
            <span>Accounts</span>
            <span>&gt;</span>
            <span className="text-slate-600">Users</span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10 outline-none"
          >
            <UserPlus className="w-4 h-4" />
            Create User
          </button>
        </div>
      </div>

      {/* STATISTICS SECTION (6 Cards Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
        {isStatsLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-[130px] rounded-[24px] bg-white border border-slate-200 p-5 animate-pulse flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                <div className="w-12 h-4 bg-slate-100 rounded-full" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="w-16 h-6 bg-slate-100 rounded" />
                <div className="w-24 h-3 bg-slate-100 rounded" />
              </div>
            </div>
          ))
        ) : (
          <>
            {/* Total Users */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white border border-slate-200 rounded-[22px] p-4 shadow-sm flex flex-col justify-between h-[135px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-9.5 h-9.5 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-base select-none shrink-0">
                  👥
                </div>
                <span className="text-[9px] font-black text-emerald-650 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  +12.5%
                </span>
              </div>
              <div className="flex flex-col text-left mt-2.5 min-w-0">
                <span className="text-xl font-black text-slate-900 font-display leading-none">{stats.total_users}</span>
                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider mt-1 truncate">Total Users</span>
                <span className="text-[9px] font-semibold text-slate-400 mt-0.5 truncate">All registered users</span>
              </div>
            </motion.div>

            {/* Doctors */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white border border-slate-200 rounded-[22px] p-4 shadow-sm flex flex-col justify-between h-[135px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-9.5 h-9.5 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-base select-none shrink-0">
                  👨‍⚕️
                </div>
                <span className="text-[9px] font-black text-emerald-650 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  +8.2%
                </span>
              </div>
              <div className="flex flex-col text-left mt-2.5 min-w-0">
                <span className="text-xl font-black text-slate-900 font-display leading-none">{stats.doctors}</span>
                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider mt-1 truncate">Doctors</span>
                <span className="text-[9px] font-semibold text-slate-400 mt-0.5 truncate">Medical professionals</span>
              </div>
            </motion.div>

            {/* Receptionists */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white border border-slate-200 rounded-[22px] p-4 shadow-sm flex flex-col justify-between h-[135px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-9.5 h-9.5 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-base select-none shrink-0">
                  👩‍💼
                </div>
                <span className="text-[9px] font-black text-emerald-650 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  +5.3%
                </span>
              </div>
              <div className="flex flex-col text-left mt-2.5 min-w-0">
                <span className="text-xl font-black text-slate-900 font-display leading-none">{stats.receptionists}</span>
                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider mt-1 truncate">Receptionists</span>
                <span className="text-[9px] font-semibold text-slate-400 mt-0.5 truncate">Front desk staff</span>
              </div>
            </motion.div>

            {/* Admins */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white border border-slate-200 rounded-[22px] p-4 shadow-sm flex flex-col justify-between h-[135px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-9.5 h-9.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-base select-none shrink-0">
                  ⚙️
                </div>
                <span className="text-[9px] font-black text-emerald-650 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  +2.1%
                </span>
              </div>
              <div className="flex flex-col text-left mt-2.5 min-w-0">
                <span className="text-xl font-black text-slate-900 font-display leading-none">{stats.admins}</span>
                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider mt-1 truncate">Admins</span>
                <span className="text-[9px] font-semibold text-slate-400 mt-0.5 truncate">System administrators</span>
              </div>
            </motion.div>

            {/* Locked Users */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white border border-slate-200 rounded-[22px] p-4 shadow-sm flex flex-col justify-between h-[135px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-9.5 h-9.5 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-base select-none shrink-0">
                  🔒
                </div>
                <span className="text-[9px] font-black text-red-650 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full shrink-0">
                  -1.2%
                </span>
              </div>
              <div className="flex flex-col text-left mt-2.5 min-w-0">
                <span className="text-xl font-black text-slate-900 font-display leading-none">{stats.locked_users}</span>
                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider mt-1 truncate">Locked Users</span>
                <span className="text-[9px] font-semibold text-slate-400 mt-0.5 truncate">Account locked</span>
              </div>
            </motion.div>

            {/* Inactive Users */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white border border-slate-200 rounded-[22px] p-4 shadow-sm flex flex-col justify-between h-[135px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-9.5 h-9.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-base select-none shrink-0">
                  👤
                </div>
                <span className="text-[9px] font-black text-red-650 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full shrink-0">
                  +3.4%
                </span>
              </div>
              <div className="flex flex-col text-left mt-2.5 min-w-0">
                <span className="text-xl font-black text-slate-900 font-display leading-none">{stats.inactive_users}</span>
                <span className="text-[9.5px] font-black text-slate-400 uppercase tracking-wider mt-1 truncate">Inactive Users</span>
                <span className="text-[9px] font-semibold text-slate-400 mt-0.5 truncate">Not active</span>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* FILTERING PANEL */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-sm flex flex-col gap-4">
        {/* Row 1: Main Filters */}
        <div className="flex flex-col xl:flex-row items-center gap-4 w-full">
          {/* Search Input */}
          <div className="relative w-full xl:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search users by name, email or phone..."
              className="w-full h-10.5 pl-11 pr-4 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-indigo-550 transition-colors"
            />
          </div>

          {/* Filters dropdowns */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-3.5 w-full xl:w-auto">
            {/* Role */}
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Role</span>
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                className="h-10.5 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:border-slate-300 transition-colors"
              >
                <option value="All Roles">All Roles</option>
                <option value="Doctor">Doctor</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>

            {/* Verified */}
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Verified</span>
              <select
                value={verifiedFilter}
                onChange={(e) => {
                  setVerifiedFilter(e.target.value);
                  setPage(1);
                }}
                className="h-10.5 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:border-slate-300 transition-colors"
              >
                <option value="All">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Blocked */}
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Blocked</span>
              <select
                value={blockedFilter}
                onChange={(e) => {
                  setBlockedFilter(e.target.value);
                  setPage(1);
                }}
                className="h-10.5 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:border-slate-300 transition-colors"
              >
                <option value="All">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Active */}
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Active</span>
              <select
                value={activeFilter}
                onChange={(e) => {
                  setActiveFilter(e.target.value);
                  setPage(1);
                }}
                className="h-10.5 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:border-slate-300 transition-colors"
              >
                <option value="All">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Date Picker (Shortcut) */}
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Created Date</span>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={dateRange || 'Select date range'}
                  onClick={() => {
                    // Date range picker click
                    setDateRange('Last 30 Days');
                    toast.success('Shortcut applied: Last 30 Days');
                  }}
                  className="h-10.5 w-44 pl-3.5 pr-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:border-slate-300 transition-colors"
                />
                <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Toggle Row 2 Button */}
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-transparent select-none mb-1">Toggle</span>
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`h-10.5 px-4 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer outline-none
                  ${showAdvancedFilters ? 'border-indigo-600 bg-indigo-50/20 text-indigo-600' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Collapsible Filters */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4.5 flex-wrap">
                {/* Profile Image */}
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Has Profile Image</span>
                  <select
                    value={hasProfileImageFilter}
                    onChange={(e) => setHasProfileImageFilter(e.target.value)}
                    className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Sort By</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="created_at">Created At</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Sort Order</span>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="h-10 px-3.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 self-end mt-2 sm:mt-0">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer outline-none"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => refetchList()}
                  className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-600/10 transition-colors cursor-pointer outline-none"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* USERS LIST TABLE */}
      <div className="bg-white border border-slate-200 rounded-[20px] shadow-sm overflow-hidden flex flex-col">
        {isListLoading ? (
          <div className="p-6 flex flex-col gap-5 animate-pulse">
            {Array.from({ length: pageSize }).map((_, idx) => (
              <div key={idx} className="h-12 bg-slate-100 rounded-lg" />
            ))}
          </div>
        ) : isListError ? (
          <div className="p-12 flex flex-col items-center justify-center text-center gap-4 select-none">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-black text-slate-900 font-display">Failed to load users</h3>
              <p className="text-xs font-semibold text-slate-450 max-w-sm leading-normal">
                {listError.message || 'An error occurred while connecting to the administration API.'}
              </p>
            </div>
            <button
              onClick={refetchList}
              className="h-10 px-5 bg-slate-900 text-xs font-bold text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 rounded-xl cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Connection
            </button>
          </div>
        ) : usersList.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center gap-4 select-none">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border flex items-center justify-center text-slate-400 text-2xl">
              🔍
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-black text-slate-950 font-display">No users found</h3>
              <p className="text-xs font-semibold text-slate-455 leading-relaxed max-w-xs">
                Try changing filters, clearing your search query, or create a new user.
              </p>
            </div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              + Create User
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border-spacing-0 table-fixed">
              <thead>
                <tr className="bg-slate-50/30 h-12 border-b border-slate-150/70 select-none text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-6 w-[28%]">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700" onClick={() => { setSortBy('name'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      User
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-6 w-[28%]">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700" onClick={() => { setSortBy('email'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Email
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-6 w-[16%]">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700" onClick={() => { setSortBy('phone'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Phone
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-6 w-[16%]">Roles</th>
                  <th className="py-3 px-6 w-[10%] text-center">
                    <div className="flex items-center justify-center gap-1 cursor-pointer hover:text-slate-700" onClick={() => { setSortBy('is_active'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
                      Active
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-6 w-[12%] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map((user) => {
                  const userActive = user.is_active ?? user.active ?? true;
                  const userVerified = user.is_verified ?? user.verified ?? false;
                  const userBlocked = user.is_blocked ?? user.blocked ?? false;
                  const userLocked = user.is_locked ?? user.locked ?? false;
                  const avatarInitials = user.full_name.substring(0, 2).toUpperCase();
                  const isChecked = selectedUserIds.includes(user.id);

                  return (
                    <tr
                      key={user.id}
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      className="h-18 hover:bg-slate-50/35 cursor-pointer transition-colors group"
                    >
                      {/* User (Avatar, Name) */}
                      <td className="py-2.5 px-6 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-50 to-slate-100 flex items-center justify-center text-[11px] font-black text-indigo-600 border border-slate-200 shrink-0 select-none">
                            {user.profile_image ? (
                              <img src={user.profile_image} alt={user.full_name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              avatarInitials
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors font-display">
                              {user.full_name}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-2.5 px-6 font-semibold text-slate-550 text-xs truncate">
                        {user.email}
                      </td>

                      {/* Phone */}
                      <td className="py-2.5 px-6 font-semibold text-slate-550 text-xs truncate">
                        {user.phone_number || user.phone || '--'}
                      </td>

                      {/* Roles */}
                      <td className="py-2.5 px-6">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {user.roles.map((role) => (
                            <span
                              key={role}
                              className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wide ${getRolePillStyles(role)}`}
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Active Status */}
                      <td className="py-2.5 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {userActive ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-750 border border-emerald-100 text-[9px] font-black uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100 text-[9px] font-black uppercase tracking-wider">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                              Inactive
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-6 text-center relative" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setActiveDropdownUserId(activeDropdownUserId === user.id ? null : user.id)}
                            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors cursor-pointer outline-none"
                          >
                            <MoreVertical className="w-4.5 h-4.5" />
                          </button>
                        </div>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {activeDropdownUserId === user.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -8 }}
                              transition={{ duration: 0.1 }}
                              className="absolute right-6 top-12 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-40 flex flex-col text-left"
                            >
                              {/* View */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownUserId(null);
                                  navigate(`/admin/users/${user.id}`);
                                }}
                                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer w-full text-left"
                              >
                                <Eye size={14} className="text-slate-400" />
                                View Details
                              </button>

                              {/* Edit */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownUserId(null);
                                  setEditingUserId(user.id);
                                }}
                                disabled={!user.can_edit}
                                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-colors cursor-pointer w-full text-left"
                              >
                                <Pencil size={14} className="text-slate-400" />
                                Edit User
                              </button>

                              {/* Lock / Unlock */}
                              {userLocked ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveDropdownUserId(null);
                                    setUnlockingUser(user);
                                  }}
                                  disabled={!user.can_unlock}
                                  className="px-3.5 py-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-50/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-colors cursor-pointer w-full text-left"
                                >
                                  <Unlock size={14} className="text-emerald-500" />
                                  Unlock Account
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveDropdownUserId(null);
                                    setLockingUser(user);
                                  }}
                                  disabled={!user.can_block}
                                  className="px-3.5 py-2 text-xs font-semibold text-red-650 hover:bg-red-50/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-colors cursor-pointer w-full text-left"
                                >
                                  <Lock size={14} className="text-red-450" />
                                  Lock Account
                                </button>
                              )}

                              {/* Divider */}
                              <div className="h-px bg-slate-100 my-1" />

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownUserId(null);
                                  setDeletingUser(user);
                                }}
                                disabled={!user.can_delete}
                                className="px-3.5 py-2 text-xs font-semibold text-red-650 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-colors cursor-pointer w-full text-left"
                              >
                                <Trash2 size={14} className="text-red-550" />
                                Delete User
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        {!isListLoading && !isListError && totalCount > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4.5 p-4 bg-slate-50/30 border-t border-slate-100">
            {/* Show Count */}
            <span className="text-xs font-semibold text-slate-400">
              Showing <strong className="text-slate-600 font-bold">1 to {usersList.length}</strong> of <strong className="text-slate-600 font-bold">{totalCount}</strong> users
            </span>

            {/* Pagination Controls */}
            <div className="flex items-center gap-3.5">
              {/* Previous */}
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Pages List */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pNum = index + 1;
                  const isCurrent = page === pNum;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setPage(pNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer outline-none
                        ${isCurrent ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/10' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                    >
                      {pNum}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Page Size Dropdown */}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value, 10));
                  setPage(1);
                }}
                className="h-8 px-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 outline-none cursor-pointer hover:border-slate-300 transition-colors"
              >
                {[10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>{size} / page</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* MODALS & DRAWERS */}
      <AnimatePresence>
        {isCreateOpen && (
          <CreateUserModal
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
            onSave={(data) => createUserMutation.mutate(data)}
            isSaving={createUserMutation.isPending}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingUserId && (
          <UpdateUserDrawer
            isOpen={!!editingUserId}
            onClose={() => setEditingUserId(null)}
            userId={editingUserId}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['usersList'] });
              queryClient.invalidateQueries({ queryKey: ['usersStatistics'] });
            }}
          />
        )}
      </AnimatePresence>

      {/* LOCK CONFIRMATION MODAL */}
      <AnimatePresence>
        {lockingUser && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-[20px] shadow-2xl p-6 max-w-sm w-full text-center flex flex-col gap-4 font-body"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 text-red-650 flex items-center justify-center mx-auto text-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-black text-slate-900 font-display">Lock User Account</h3>
                <p className="text-xs font-semibold text-slate-450 leading-relaxed">
                  This user ({lockingUser.full_name}) will not be able to login until unlocked.
                </p>
              </div>
              <div className="flex items-center gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setLockingUser(null)}
                  className="h-9 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-550 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => lockUserMutation.mutate(lockingUser.id)}
                  disabled={lockUserMutation.isPending}
                  className="h-9 px-4 rounded-xl bg-red-650 hover:bg-red-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1"
                >
                  {lockUserMutation.isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                  Lock Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UNLOCK CONFIRMATION MODAL */}
      <AnimatePresence>
        {unlockingUser && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-[20px] shadow-2xl p-6 max-w-sm w-full text-center flex flex-col gap-4 font-body"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-black text-slate-900 font-display">Unlock User Account</h3>
                <p className="text-xs font-semibold text-slate-450 leading-relaxed">
                  Restore access for {unlockingUser.full_name} and reset failed login attempts.
                </p>
              </div>
              <div className="flex items-center gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setUnlockingUser(null)}
                  className="h-9 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => unlockUserMutation.mutate(unlockingUser.id)}
                  disabled={unlockUserMutation.isPending}
                  className="h-9 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1"
                >
                  {unlockUserMutation.isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                  Unlock Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingUser && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-[20px] shadow-2xl overflow-hidden max-w-md w-full flex flex-col font-body text-left"
            >
              <div className="bg-red-600 px-6 py-5 flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black font-display">Delete User Account</h3>
                  <p className="text-[11px] text-red-100 font-semibold mt-0.5">This action cannot be undone.</p>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <p className="text-xs font-semibold text-slate-550 leading-relaxed">
                  Are you absolutely sure you want to delete <strong className="text-slate-900 font-bold">{deletingUser.full_name}</strong> permanently? All associated active sessions will be revoked and they will lose access to the system.
                </p>
                <div className="flex items-center gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setDeletingUser(null)}
                    className="h-9 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteUserMutation.mutate(deletingUser.id)}
                    disabled={deleteUserMutation.isPending}
                    className="h-9 px-4 rounded-xl bg-red-650 hover:bg-red-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1"
                  >
                    {deleteUserMutation.isPending && <Loader2 className="w-3 h-3 animate-spin" />}
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

export default UsersPage;
