import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, UserCheck, Shield, UserX } from 'lucide-react';
import userService from '../../services/user.service';
import { StatisticsCard } from './components/StatisticsCard';
import { UsersToolbar } from './components/UsersToolbar';
import { UserCard } from './components/UserCard';
import { UsersPagination } from './components/UsersPagination';
import { UserFormModal } from '../../components/users/UserFormModal';

export const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isLoading, setIsLoading] = useState(false);

  // API State
  const [usersList, setUsersList] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [statsData, setStatsData] = useState({
    total_users: 127,
    verified_users: 86,
    active_users: 98,
    inactive_users: 29
  });

  // Fetch Listing
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await userService.getUsers({
        page: currentPage,
        page_size: pageSize,
        search: searchQuery,
        role: roleFilter,
        is_active: statusFilter
      });
      if (response && response.success && response.data) {
        setUsersList(response.data.results || []);
        setTotalUsers(response.data.count || 0);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Stats
  const fetchStats = async () => {
    try {
      const response = await userService.getUserStatistics();
      if (response && response.success && response.data) {
        setStatsData(response.data);
      }
    } catch (err) {
      console.error('Error fetching user stats:', err);
    }
  };

  // Initial stats fetch
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch listing when page, page size, search, role or status filter changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, searchQuery ? 300 : 0);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, pageSize, searchQuery, roleFilter, statusFilter]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter, statusFilter]);

  // Statistics Data
  const stats = [
    {
      title: 'Total Users',
      value: statsData.total_users.toString(),
      trend: '↑ 12 this month',
      icon: Users,
      iconBgColor: 'bg-admin-blue-50 border-admin-blue-100',
      iconColor: 'text-admin-blue-600',
      trendColor: 'text-emerald-600'
    },
    {
      title: 'Active Users',
      value: statsData.active_users.toString(),
      trend: '↑ 15 this month',
      icon: UserCheck,
      iconBgColor: 'bg-emerald-50 border-emerald-100',
      iconColor: 'text-emerald-600',
      trendColor: 'text-emerald-600'
    },
    {
      title: 'Verified Users',
      value: statsData.verified_users.toString(),
      trend: '↑ 10 this month',
      icon: Shield,
      iconBgColor: 'bg-purple-50 border-purple-100',
      iconColor: 'text-purple-600',
      trendColor: 'text-emerald-600'
    },
    {
      title: 'Inactive Users',
      value: statsData.inactive_users.toString(),
      trend: '↓ 3 this month',
      icon: UserX,
      iconBgColor: 'bg-red-50 border-red-100',
      iconColor: 'text-red-600',
      trendColor: 'text-red-650'
    }
  ];

  // Action Loggers
  const handleRefresh = () => {
    console.log('Refresh Clicked');
    fetchStats();
    fetchUsers();
  };

  const handleReset = () => {
    console.log('Reset Filters Clicked');
    setSearchQuery('');
    setRoleFilter('ALL');
    setStatusFilter('ALL');
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 text-left select-none pb-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col text-left">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight font-display">
            Users
          </h1>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            Manage administrators, doctors and receptionists.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              console.log('Create User Clicked');
              setIsCreateModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-admin-blue-600 hover:bg-admin-blue-700 text-xs font-bold text-white rounded-[14px] shadow-md hover:shadow-lg shadow-admin-blue-600/10 hover:shadow-admin-blue-600/20 transition-all duration-150 cursor-pointer flex-1 sm:flex-initial"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Create User</span>
          </motion.button>
        </div>
      </div>

      {/* 2. Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatisticsCard key={idx} {...stat} />
        ))}
      </div>

      {/* 3. Toolbar */}
      <UsersToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onRefresh={handleRefresh}
        onReset={handleReset}
      />

      {/* 4. User Cards Grid / Skeleton Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm animate-pulse flex flex-col gap-4 h-[255px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[16px] bg-slate-100 flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 bg-slate-100 rounded w-2/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              </div>
              <div className="h-5 bg-slate-100 rounded w-1/4" />
              <div className="h-px bg-slate-100 my-1" />
              <div className="flex flex-col gap-2.5">
                <div className="h-3 bg-slate-100 rounded w-5/6" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                <div className="h-5 bg-slate-100 rounded w-1/3" />
                <div className="h-5 bg-slate-100 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : usersList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {usersList.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-[24px] p-12 text-center shadow-sm">
          <div className="text-slate-350 text-sm font-bold">No users match the search filters.</div>
          <button
            onClick={handleReset}
            className="mt-4 text-xs font-black text-admin-blue-600 hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* 5. Pagination */}
      <UsersPagination
        totalUsers={totalUsers}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />

      <UserFormModal
        mode="create"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          fetchStats();
          fetchUsers();
        }}
      />
    </div>
  );
};

export default UsersPage;
