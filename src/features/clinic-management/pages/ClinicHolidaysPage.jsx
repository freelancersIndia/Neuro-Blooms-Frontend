import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronRight, ChevronLeft, Plus, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { clinicService } from '../services/clinic.service';
import { useAuthStore } from '../../auth/store/authStore';

// Components
import HolidayTable from '../components/HolidayTable';
import HolidayFormModal from '../components/HolidayFormModal';
import HolidayToolbar from '../components/HolidayToolbar';
import DeleteHolidayDialog from '../components/DeleteHolidayDialog';
import HolidayStatsCards from '../components/HolidayStatsCards';

const MOCK_HOLIDAYS = [
  {
    id: 'mock-1',
    holiday_name: "New Year's Day",
    holiday_date: '2026-01-01',
    description: 'New Year celebration. Clinic closed.',
    is_active: true,
    created_at: new Date('2026-01-01T00:00:00Z').toISOString(),
  },
  {
    id: 'mock-2',
    holiday_name: 'Republic Day',
    holiday_date: '2026-01-26',
    description: 'Republic Day of India.',
    is_active: true,
    created_at: new Date('2026-01-26T00:00:00Z').toISOString(),
  },
  {
    id: 'mock-3',
    holiday_name: 'Independence Day',
    holiday_date: '2026-08-15',
    description: 'Independence Day of India. National holiday.',
    is_active: true,
    created_at: new Date('2026-08-15T00:00:00Z').toISOString(),
  },
  {
    id: 'mock-4',
    holiday_name: 'Gandhi Jayanti',
    holiday_date: '2026-10-02',
    description: "Mahatma Gandhi's birthday.",
    is_active: true,
    created_at: new Date('2026-10-02T00:00:00Z').toISOString(),
  },
  {
    id: 'mock-5',
    holiday_name: 'Christmas Day',
    holiday_date: '2026-12-25',
    description: 'Christmas holiday. Clinic closed.',
    is_active: true,
    created_at: new Date('2026-12-25T00:00:00Z').toISOString(),
  },
];

export const ClinicHolidaysPage = () => {
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);
  const isAdmin = role === 'ADMIN';

  // Local state for preview mode and filtering
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [localHolidays, setLocalHolidays] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, startDate, endDate]);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState(null);

  // Query to fetch holidays
  const { data: serverData, isLoading, isError, refetch } = useQuery({
    queryKey: ['clinicHolidays'],
    queryFn: clinicService.getHolidays,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  // Sync server data to local state
  useEffect(() => {
    if (serverData) {
      setLocalHolidays(serverData);
      setIsPreviewMode(false);
    }
  }, [serverData]);

  // Handle server fetch error and switch to preview mode
  useEffect(() => {
    if (isError) {
      console.warn('Failed to fetch holidays from server. Operating in local preview mode.');
      setIsPreviewMode(true);
      if (localHolidays.length === 0) {
        setLocalHolidays(MOCK_HOLIDAYS);
      }
    }
  }, [isError]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: clinicService.createHoliday,
    onSuccess: () => {
      toast.success('Clinic holiday created successfully.');
      queryClient.invalidateQueries({ queryKey: ['clinicHolidays'] });
      setIsFormModalOpen(false);
    },
    onError: (err) => {
      console.error('Failed to create holiday:', err);
      toast.error(err.message || 'Unable to create clinic holiday.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => clinicService.updateHoliday(id, data),
    onSuccess: () => {
      toast.success('Clinic holiday updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['clinicHolidays'] });
      setIsFormModalOpen(false);
    },
    onError: (err) => {
      console.error('Failed to update holiday:', err);
      toast.error(err.message || 'Unable to update clinic holiday.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: clinicService.deleteHoliday,
    onSuccess: () => {
      toast.success('Clinic holiday deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['clinicHolidays'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (err) => {
      console.error('Failed to delete holiday:', err);
      toast.error(err.message || 'Unable to delete clinic holiday.');
    },
  });

  // Handlers
  const handleAddClick = () => {
    if (!isAdmin) {
      toast.error('Only administrators can add clinic holidays.');
      return;
    }
    setSelectedHoliday(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (holiday) => {
    if (!isAdmin) {
      toast.error('Only administrators can edit clinic holidays.');
      return;
    }
    setSelectedHoliday(holiday);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (holiday) => {
    if (!isAdmin) {
      toast.error('Only administrators can delete clinic holidays.');
      return;
    }
    setHolidayToDelete(holiday);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (isPreviewMode) {
      if (selectedHoliday) {
        // Edit mode in local state
        setLocalHolidays((prev) =>
          prev.map((h) =>
            h.id === selectedHoliday.id
              ? { ...h, ...data, updated_at: new Date().toISOString() }
              : h
          )
        );
        toast.success('Holiday updated successfully (Local Preview Mode).');
      } else {
        // Create mode in local state
        // Verify unique date constraint
        const isDuplicate = localHolidays.some(
          (h) => h.is_active && h.holiday_date === data.holiday_date
        );
        if (isDuplicate) {
          toast.error('Another active holiday is already configured on this date.');
          return;
        }

        const newHoliday = {
          id: `mock-${Date.now()}`,
          ...data,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setLocalHolidays((prev) => [...prev, newHoliday]);
        toast.success('Holiday created successfully (Local Preview Mode).');
      }
      setIsFormModalOpen(false);
    } else {
      if (selectedHoliday) {
        updateMutation.mutate({ id: selectedHoliday.id, data });
      } else {
        createMutation.mutate(data);
      }
    }
  };

  const handleDeleteConfirm = () => {
    if (isPreviewMode) {
      setLocalHolidays((prev) => prev.filter((h) => h.id !== holidayToDelete.id));
      toast.success('Holiday deleted successfully (Local Preview Mode).');
      setIsDeleteDialogOpen(false);
    } else {
      deleteMutation.mutate(holidayToDelete.id);
    }
  };

  const handleRefresh = () => {
    if (isPreviewMode) {
      refetch();
    } else {
      queryClient.invalidateQueries({ queryKey: ['clinicHolidays'] });
    }
  };

  // Filter & Search Logic
  const todayStr = new Date().toISOString().split('T')[0];

  const filteredHolidays = localHolidays.filter((holiday) => {
    if (!holiday.is_active) return false;

    // 1. Search Filter
    if (search && !holiday.holiday_name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // 2. Status Filter
    if (statusFilter === 'Upcoming' && holiday.holiday_date < todayStr) {
      return false;
    }
    if (statusFilter === 'Past' && holiday.holiday_date >= todayStr) {
      return false;
    }

    // 3. Date Range Filter
    if (startDate && holiday.holiday_date < startDate) {
      return false;
    }
    if (endDate && holiday.holiday_date > endDate) {
      return false;
    }

    return true;
  });

  // Sort chronologically (ascending date)
  const sortedHolidays = [...filteredHolidays].sort((a, b) =>
    a.holiday_date.localeCompare(b.holiday_date)
  );

  const PAGE_SIZE = 5;
  const totalItems = sortedHolidays.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedHolidays = sortedHolidays.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col gap-4 text-left font-display overflow-hidden">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2.5 text-sm font-medium text-[#64748B] select-none flex-shrink-0">
        <span>Home</span>
        <ChevronRight size={14} />
        <span>Administration</span>
        <ChevronRight size={14} />
        <span className="text-[#0F172A] font-semibold">Clinic Holidays</span>
      </div>

      {/* Offline Warning Banner */}
      {isPreviewMode && (
        <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-2xl text-purple-800 text-xs font-semibold animate-fade-in flex-shrink-0">
          <AlertCircle className="text-purple-600 flex-shrink-0" size={16} />
          <span>Backend settings API offline. Displaying local preview mode details.</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0">
        <div className="flex flex-col gap-0.5 select-none">
          <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">Clinic Holidays</h2>
          <span className="text-xs font-semibold text-[#64748B]">
            Configure global holidays to automatically block appointments and slot generation.
          </span>
        </div>

        {/* Add Holiday Button */}
        {isAdmin && (
          <button
            type="button"
            onClick={handleAddClick}
            className="h-9 px-4 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus size={14} />
            Add Holiday
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="flex-shrink-0">
        <HolidayStatsCards holidays={localHolidays.filter((h) => h.is_active)} />
      </div>

      {/* Toolbar Filter Actions */}
      <div className="flex-shrink-0">
        <HolidayToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onRefresh={handleRefresh}
          disabled={isLoading}
        />
      </div>

      {/* Main Content Card / Table */}
      <div className="w-full bg-white border border-[#E2E8F0] rounded-[20px] shadow-sm overflow-hidden flex flex-col flex-1 min-h-[250px]">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16">
            <RefreshCw className="animate-spin text-[#7C3AED]" size={32} />
            <span className="text-sm font-semibold text-[#64748B]">Loading clinic holidays...</span>
          </div>
        ) : sortedHolidays.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
              <Calendar size={28} />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A]">No holidays found</h3>
            <p className="text-xs text-[#64748B] mt-1.5 text-center max-w-[320px] leading-normal">
              {search || startDate || endDate || statusFilter !== 'All'
                ? 'No holidays match your current filter criteria. Try adjusting your filters.'
                : 'There are no clinic holidays configured. Click "Add Holiday" to create one.'}
            </p>
          </div>
        ) : (
          <>
            <HolidayTable
              holidays={paginatedHolidays}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              isAdmin={isAdmin}
            />
            {/* Pagination Footer */}
            <div className="bg-white border-t border-[#EEF2F7] px-6 py-3 flex items-center justify-between flex-shrink-0 select-none">
              <span className="text-[11px] font-semibold text-[#64748B]">
                Showing <span className="text-[#0F172A]">{totalItems === 0 ? 0 : startIndex + 1}</span> to{' '}
                <span className="text-[#0F172A]">{Math.min(startIndex + PAGE_SIZE, totalItems)}</span> of{' '}
                <span className="text-[#0F172A]">{totalItems}</span> holidays
              </span>
              
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = page === currentPage;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-colors cursor-pointer
                        ${isActive 
                          ? 'bg-[#7C3AED] text-white' 
                          : 'border border-slate-200 text-[#64748B] hover:bg-slate-50 hover:text-slate-800'
                        }
                      `}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <HolidayFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        holiday={selectedHoliday}
        isSaving={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteHolidayDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};

export default ClinicHolidaysPage;
