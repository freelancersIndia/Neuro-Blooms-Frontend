import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { clinicService } from '../services/clinic.service';
import { useAuthStore } from '../../auth/store/authStore';

// Components
import ClinicBreakHeader from '../components/ClinicBreakHeader';
import ClinicBreakStats from '../components/ClinicBreakStats';
import ClinicBreakToolbar from '../components/ClinicBreakToolbar';
import ClinicBreakTable from '../components/ClinicBreakTable';
import AddBreakModal from '../components/AddBreakModal';
import EditBreakModal from '../components/EditBreakModal';
import DeleteBreakDialog from '../components/DeleteBreakDialog';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';

import { calculateDurationInMinutes, formatDuration } from '../components/BreakDurationBadge';

const MOCK_BREAKS = [
  {
    id: 'mock-b1',
    break_name: 'Lunch Break',
    weekday: 'MONDAY',
    start_time: '13:00:00',
    end_time: '14:00:00',
    is_active: true,
    created_at: new Date('2026-06-01T13:00:00Z').toISOString(),
  },
  {
    id: 'mock-b2',
    break_name: 'Tea Break',
    weekday: 'MONDAY',
    start_time: '16:00:00',
    end_time: '16:30:00',
    is_active: true,
    created_at: new Date('2026-06-01T16:00:00Z').toISOString(),
  },
  {
    id: 'mock-b3',
    break_name: 'Staff Meeting',
    weekday: 'WEDNESDAY',
    start_time: '15:00:00',
    end_time: '16:00:00',
    is_active: true,
    created_at: new Date('2026-06-03T15:00:00Z').toISOString(),
  },
  {
    id: 'mock-b4',
    break_name: 'Lunch Break',
    weekday: 'FRIDAY',
    start_time: '13:00:00',
    end_time: '14:00:00',
    is_active: true,
    created_at: new Date('2026-06-05T13:00:00Z').toISOString(),
  },
];

export const ClinicBreaksPage = () => {
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);
  const isAdmin = role === 'ADMIN';

  // State
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [localBreaks, setLocalBreaks] = useState([]);
  const [search, setSearch] = useState('');
  const [weekdayFilter, setWeekdayFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedBreak, setSelectedBreak] = useState(null);
  const [breakToDelete, setBreakToDelete] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});

  // Query to fetch breaks
  const { data: serverData, isLoading, isError, error: queryError, refetch } = useQuery({
    queryKey: ['clinicBreaks'],
    queryFn: clinicService.getBreaks,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  // Sync server data
  useEffect(() => {
    if (serverData) {
      setLocalBreaks(serverData);
      setIsPreviewMode(false);
    }
  }, [serverData]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      console.warn('Failed to fetch breaks from server. Operating in local preview mode.');
      setIsPreviewMode(true);
      if (localBreaks.length === 0) {
        setLocalBreaks(MOCK_BREAKS);
      }
    }
  }, [isError]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: clinicService.createBreak,
    onSuccess: () => {
      toast.success('Clinic break created successfully.');
      queryClient.invalidateQueries({ queryKey: ['clinicBreaks'] });
      setIsAddOpen(false);
      setBackendErrors({});
    },
    onError: (err) => {
      console.error('Failed to create break:', err);
      if (err.data && err.data.errors) {
        setBackendErrors(err.data.errors);
      } else {
        toast.error(err.message || 'Unable to create clinic break.');
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => clinicService.updateBreak(id, data),
    onSuccess: () => {
      toast.success('Clinic break updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['clinicBreaks'] });
      setIsEditOpen(false);
      setBackendErrors({});
    },
    onError: (err) => {
      console.error('Failed to update break:', err);
      if (err.data && err.data.errors) {
        setBackendErrors(err.data.errors);
      } else {
        toast.error(err.message || 'Unable to update clinic break.');
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: clinicService.deleteBreak,
    onSuccess: () => {
      toast.success('Clinic break deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['clinicBreaks'] });
      setIsDeleteOpen(false);
    },
    onError: (err) => {
      console.error('Failed to delete break:', err);
      toast.error(err.message || 'Unable to delete clinic break.');
    },
  });

  // Client-side overlap checker for local preview mode
  const checkLocalOverlap = (newBreak) => {
    const newStart = parseTimeToMinutes(newBreak.start_time);
    const newEnd = parseTimeToMinutes(newBreak.end_time);

    return localBreaks.some((b) => {
      if (!b.is_active || b.weekday.toUpperCase() !== newBreak.weekday.toUpperCase()) return false;
      if (selectedBreak && b.id === selectedBreak.id) return false;

      const start = parseTimeToMinutes(b.start_time);
      const end = parseTimeToMinutes(b.end_time);
      return newStart < end && newEnd > start;
    });
  };

  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + (m || 0);
  };

  // Handlers
  const handleAddSubmit = (data) => {
    // Ensure times are formatted as HH:MM:SS for API
    const formattedData = {
      ...data,
      start_time: data.start_time.length === 5 ? `${data.start_time}:00` : data.start_time,
      end_time: data.end_time.length === 5 ? `${data.end_time}:00` : data.end_time,
    };

    if (isPreviewMode) {
      if (checkLocalOverlap(formattedData)) {
        setBackendErrors({
          non_field_errors: ['Break overlaps an existing break on this weekday.'],
        });
        toast.error('Validation failed. Break overlaps existing break.');
        return;
      }
      const newBreak = {
        id: `mock-b-${Date.now()}`,
        ...formattedData,
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setLocalBreaks((prev) => [...prev, newBreak]);
      toast.success('Clinic break created successfully (Local Preview Mode).');
      setIsAddOpen(false);
      setBackendErrors({});
    } else {
      createMutation.mutate(formattedData);
    }
  };

  const handleEditSubmit = (data) => {
    const formattedData = {
      ...data,
      start_time: data.start_time.length === 5 ? `${data.start_time}:00` : data.start_time,
      end_time: data.end_time.length === 5 ? `${data.end_time}:00` : data.end_time,
    };

    if (isPreviewMode) {
      if (checkLocalOverlap(formattedData)) {
        setBackendErrors({
          non_field_errors: ['Break overlaps an existing break on this weekday.'],
        });
        toast.error('Validation failed. Break overlaps existing break.');
        return;
      }
      setLocalBreaks((prev) =>
        prev.map((b) =>
          b.id === selectedBreak.id ? { ...b, ...formattedData, updated_at: new Date().toISOString() } : b
        )
      );
      toast.success('Clinic break updated successfully (Local Preview Mode).');
      setIsEditOpen(false);
      setBackendErrors({});
    } else {
      updateMutation.mutate({ id: selectedBreak.id, data: formattedData });
    }
  };

  const handleDeleteConfirm = () => {
    if (isPreviewMode) {
      setLocalBreaks((prev) => prev.filter((b) => b.id !== breakToDelete.id));
      toast.success('Clinic break deleted successfully (Local Preview Mode).');
      setIsDeleteOpen(false);
    } else {
      deleteMutation.mutate(breakToDelete.id);
    }
  };

  const handleViewBreak = (item) => {
    setSelectedBreak(item);
    setIsReadOnly(true);
    setIsEditOpen(true);
    setBackendErrors({});
  };

  const handleEditBreak = (item) => {
    setSelectedBreak(item);
    setIsReadOnly(false);
    setIsEditOpen(true);
    setBackendErrors({});
  };

  const handleDeleteBreak = (item) => {
    setBreakToDelete(item);
    setIsDeleteOpen(true);
  };

  const handleRefresh = () => {
    if (isPreviewMode) {
      refetch();
    } else {
      queryClient.invalidateQueries({ queryKey: ['clinicBreaks'] });
    }
  };

  const handleExport = (type) => {
    toast.success(`Exporting to ${type}...`);
    const activeBreaks = localBreaks.filter((b) => b.is_active);
    
    // Simple CSV generator
    const headers = ['Break Name', 'Weekday', 'Start Time', 'End Time', 'Duration'];
    const rows = activeBreaks.map((b) => [
      b.break_name || 'Clinic Break',
      b.weekday,
      b.start_time,
      b.end_time,
      formatDuration(calculateDurationInMinutes(b.start_time, b.end_time)),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinic_breaks_${type.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering
  const filteredBreaks = localBreaks.filter((item) => {
    if (!item.is_active) return false;

    // 1. Search (break_name or weekday)
    if (search) {
      const matchName = (item.break_name || '').toLowerCase().includes(search.toLowerCase());
      const matchWeekday = item.weekday.toLowerCase().includes(search.toLowerCase());
      if (!matchName && !matchWeekday) return false;
    }

    // 2. Weekday filter
    if (weekdayFilter !== 'All' && item.weekday.toUpperCase() !== weekdayFilter.toUpperCase()) {
      return false;
    }

    // 3. Status filter (in this case, all listed are active, but we can match)
    if (statusFilter === 'Active' && !item.is_active) {
      return false;
    }

    return true;
  });

  // Sort by weekday standard order (Monday first) and then by start time
  const weekdayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const sortedBreaks = [...filteredBreaks].sort((a, b) => {
    const dayA = weekdayOrder.indexOf(a.weekday.toUpperCase());
    const dayB = weekdayOrder.indexOf(b.weekday.toUpperCase());
    if (dayA !== dayB) return dayA - dayB;
    return a.start_time.localeCompare(b.start_time);
  });

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 text-left font-display h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-hidden">
        <div className="flex items-center gap-2.5 text-sm font-medium text-[#9CA3AF] select-none flex-shrink-0">
          <span>Administration</span>
          <ChevronRight size={14} />
          <span>Scheduling</span>
          <ChevronRight size={14} />
          <span className="text-[#111827] font-semibold">Clinic Breaks</span>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError && isPreviewMode === false) {
    return (
      <div className="w-full flex flex-col gap-4 text-left font-display h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-hidden">
        <div className="flex items-center gap-2.5 text-sm font-medium text-[#9CA3AF] select-none flex-shrink-0">
          <span>Administration</span>
          <ChevronRight size={14} />
          <span>Scheduling</span>
          <ChevronRight size={14} />
          <span className="text-[#111827] font-semibold">Clinic Breaks</span>
        </div>
        <ErrorState onRetry={refetch} message={queryError?.message} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 text-left font-display">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2.5 text-sm font-medium text-[#9CA3AF] select-none">
        <span>Administration</span>
        <ChevronRight size={14} />
        <span>Scheduling</span>
        <ChevronRight size={14} />
        <span className="text-[#111827] font-semibold">Clinic Breaks</span>
      </div>

      {/* Offline Alert Banner */}
      {isPreviewMode && (
        <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-2xl text-purple-800 text-sm font-semibold animate-fade-in">
          <AlertCircle className="text-purple-600 flex-shrink-0" size={18} />
          <span>Backend settings API offline. Displaying local preview mode details.</span>
        </div>
      )}

      {/* Page Header */}
      <ClinicBreakHeader
        onAddClick={() => {
          setSelectedBreak(null);
          setIsAddOpen(true);
          setBackendErrors({});
        }}
        isAdmin={isAdmin}
      />

      {/* Statistics Grid */}
      <ClinicBreakStats breaks={localBreaks} />

      {/* Toolbar Filters */}
      <ClinicBreakToolbar
        search={search}
        onSearchChange={setSearch}
        weekdayFilter={weekdayFilter}
        onWeekdayFilterChange={setWeekdayFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onRefresh={handleRefresh}
        onExport={handleExport}
        disabled={isLoading}
      />

      {/* Main Content Area */}
      <div className="w-full bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm overflow-hidden flex flex-col">
        {sortedBreaks.length === 0 ? (
          <EmptyState
            onCreateClick={() => {
              setSelectedBreak(null);
              setIsAddOpen(true);
              setBackendErrors({});
            }}
            isAdmin={isAdmin}
          />
        ) : (
          <ClinicBreakTable
            breaks={sortedBreaks}
            onView={handleViewBreak}
            onEdit={handleEditBreak}
            onDelete={handleDeleteBreak}
            isAdmin={isAdmin}
          />
        )}
      </div>

      {/* Modals */}
      <AddBreakModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddSubmit}
        isSaving={createMutation.isPending}
        backendErrors={backendErrors}
      />

      <EditBreakModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
        breakData={selectedBreak}
        isSaving={updateMutation.isPending}
        isReadOnly={isReadOnly}
        backendErrors={backendErrors}
      />

      <DeleteBreakDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};

export default ClinicBreaksPage;
