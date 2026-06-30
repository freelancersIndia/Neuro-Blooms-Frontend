import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, ChevronLeft, ChevronRight, AlertCircle, RefreshCw, ChevronRightSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Service & Mock data
import { roleService, MOCK_PERMISSIONS } from '../services/roleService';

// Components
import RoleStatsCards from '../components/RoleStatsCards';
import RoleFilters from '../components/RoleFilters';
import RoleTable from '../components/RoleTable';
import CreateRoleModal from '../components/CreateRoleModal';
import DeleteRoleDialog from '../components/DeleteRoleDialog';

export const RolesPage = () => {
  const queryClient = useQueryClient();

  // 1. Filter and Pagination States
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    type: 'All',
    has_users: 'All',
    date_range: 'All',
    created_after: '',
    created_before: '',
    ordering: '-created_at',
    page: 1,
    page_size: 10,
  });

  // 2. Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [goToPageVal, setGoToPageVal] = useState('');

  // 3. Queries
  // Fetch Roles List
  const {
    data: rolesData,
    isLoading: isRolesLoading,
    isError: isRolesError,
    refetch: refetchRoles,
    isFetching: isRolesFetching,
  } = useQuery({
    queryKey: ['roles', filters],
    queryFn: () => roleService.getRoles(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 5000,
  });

  // Fetch Statistics
  const {
    data: statsData,
    isLoading: isStatsLoading,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['rolesStatistics'],
    queryFn: roleService.getRoleStatistics,
    staleTime: 10000,
  });

  // Fetch details of the first role to get the master list of permissions dynamically
  const firstRoleId = useMemo(() => {
    return rolesData?.results?.[0]?.id;
  }, [rolesData]);

  const { data: firstRoleDetails } = useQuery({
    queryKey: ['roleDetails', firstRoleId],
    queryFn: () => roleService.getRoleDetails(firstRoleId),
    enabled: !!firstRoleId,
    staleTime: 60000,
  });

  const availablePermissions = useMemo(() => {
    return firstRoleDetails?.permissions || MOCK_PERMISSIONS;
  }, [firstRoleDetails]);

  // 4. Mutations
  // Create Role Mutation
  const createRoleMutation = useMutation({
    mutationFn: roleService.createRole,
    onSuccess: () => {
      toast.success('Role Created Successfully');
      setIsCreateModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['rolesStatistics'] });
    },
    onError: (error) => {
      console.error('Create role error:', error);
      toast.error(error.message || 'Failed to create role.');
    },
  });

  // Delete Role Mutation
  const deleteRoleMutation = useMutation({
    mutationFn: roleService.deleteRole,
    onSuccess: () => {
      toast.success('Role Deleted Successfully');
      setIsDeleteModalOpen(false);
      setRoleToDelete(null);
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['rolesStatistics'] });
    },
    onError: (error) => {
      console.error('Delete role error:', error);
      toast.error(error.message || 'Failed to delete role.');
    },
  });

  // 5. Handlers
  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page on filter change
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'All',
      type: 'All',
      has_users: 'All',
      date_range: 'All',
      created_after: '',
      created_before: '',
      ordering: '-created_at',
      page: 1,
      page_size: 10,
    });
    setGoToPageVal('');
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > (rolesData?.total_pages || 1)) return;
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleGoToPageSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(goToPageVal, 10);
    const total = rolesData?.total_pages || 1;
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= total) {
      handlePageChange(pageNum);
    } else {
      toast.error(`Please enter a valid page between 1 and ${total}`);
    }
  };

  const handleCreateSubmit = (data) => {
    createRoleMutation.mutate(data);
  };

  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (roleToDelete) {
      deleteRoleMutation.mutate(roleToDelete.id);
    }
  };

  const handleRetry = () => {
    refetchRoles();
    refetchStats();
  };

  // Pagination Text
  const paginationText = useMemo(() => {
    if (!rolesData) return '';
    const start = (filters.page - 1) * filters.page_size + 1;
    const end = Math.min(filters.page * filters.page_size, rolesData.count);
    return `Showing ${start}–${end} of ${rolesData.count} Roles`;
  }, [rolesData, filters.page, filters.page_size]);  return (
    <div className="max-w-[1600px] w-full mx-auto px-8 py-8 flex flex-col gap-6 select-none">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 text-left">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>Admin</span>
            <ChevronRightSquare className="w-3 h-3 text-slate-300" />
            <span className="text-indigo-600">Role Management</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display mt-1">
            Role Management
          </h1>
          <p className="text-xs font-semibold text-slate-450">
            Create, manage and organize system roles, permissions and user assignments.
          </p>
        </div>

        {/* Create Role Button */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="h-11 px-5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-600/15 flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          Create Role
        </motion.button>
      </div>

      {/* Statistics Section */}
      <RoleStatsCards stats={statsData} isLoading={isStatsLoading} />

      {/* Filters Section */}
      <RoleFilters
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
        initialFilters={filters}
        disabled={isRolesLoading}
      />

      {/* Main Content (Table / States) */}
      <div className="relative w-full">
        {isRolesError ? (
          /* Error State */
          <div className="flex-1 flex flex-col items-center justify-center border border-slate-200 border-dashed rounded-[24px] bg-white p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-150 flex items-center justify-center text-red-500 mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-950">Unable to load roles</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1 max-w-sm leading-normal">
              An error occurred while communicating with the security endpoint. Please check your connection and try again.
            </p>
            <button
              onClick={handleRetry}
              className="mt-5 h-10 px-5 rounded-xl bg-slate-900 text-xs font-bold text-white hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Connection
            </button>
          </div>
        ) : !isRolesLoading && rolesData?.count === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center border border-slate-200 border-dashed rounded-[24px] bg-white p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-500 mb-4">
              <Plus className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-950">No roles found</h3>
            <p className="text-xs font-semibold text-slate-500 mt-1 max-w-sm leading-normal">
              Try adjusting your filters, clearing your search query, or create a new system role from scratch.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-5 h-10 px-5 rounded-xl bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Role
            </button>
          </div>
        ) : (
          /* Table Layout */
          <>
            <RoleTable
              roles={rolesData?.results}
              isLoading={isRolesLoading}
              onDelete={handleDeleteClick}
              onEdit={(role) => {
                toast.error(`Editing for ${role.name} is reserved for the Role Detail screen.`);
              }}
            />

            {/* Pagination Footer */}
            {rolesData && rolesData.count > 0 && (
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 py-1 select-none">
                {/* Left side info */}
                <span className="text-xs font-semibold text-slate-400">
                  {paginationText}
                </span>

                {/* Right side controls */}
                <div className="flex items-center gap-6">
                  {/* Rows dropdown shortcut (alternative to filter) */}
                  <div className="hidden lg:flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-450 uppercase tracking-wide">Rows:</span>
                    <select
                      value={filters.page_size}
                      onChange={(e) => handleFiltersChange({ page_size: e.target.value })}
                      className="h-8 px-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none cursor-pointer"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>

                  {/* Go to page form */}
                  <form onSubmit={handleGoToPageSubmit} className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-450 uppercase tracking-wide">Go to:</span>
                    <input
                      type="number"
                      min="1"
                      max={rolesData.total_pages}
                      value={goToPageVal}
                      onChange={(e) => setGoToPageVal(e.target.value)}
                      placeholder={filters.page}
                      className="w-11 h-8 px-1 text-center bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none focus:border-indigo-500"
                    />
                  </form>

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-1.5">
                    {/* Previous Button */}
                    <button
                      type="button"
                      disabled={filters.page === 1}
                      onClick={() => handlePageChange(filters.page - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rolesData.total_pages }).map((_, index) => {
                        const pageNum = index + 1;
                        // Limit displayed page numbers for UX
                        if (
                          rolesData.total_pages > 5 &&
                          Math.abs(pageNum - filters.page) > 1 &&
                          pageNum !== 1 &&
                          pageNum !== rolesData.total_pages
                        ) {
                          if (pageNum === 2 || pageNum === rolesData.total_pages - 1) {
                            return <span key={pageNum} className="text-slate-400 px-1 text-xs">...</span>;
                          }
                          return null;
                        }

                        return (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer
                              ${filters.page === pageNum
                                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/10'
                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      disabled={filters.page === rolesData.total_pages}
                      onClick={() => handlePageChange(filters.page + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals & Dialogs */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateRoleModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateSubmit}
            isSaving={createRoleMutation.isPending}
            availablePermissions={availablePermissions}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <DeleteRoleDialog
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setRoleToDelete(null);
            }}
            onConfirm={handleDeleteConfirm}
            roleName={roleToDelete?.name}
            isDeleting={deleteRoleMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RolesPage;
