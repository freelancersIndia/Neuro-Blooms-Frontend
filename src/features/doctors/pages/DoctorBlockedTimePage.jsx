import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Users, 
  AlertTriangle, 
  RefreshCw, 
  Search,
  Download,
  FilterX,
  Plus,
  Edit2,
  Trash2,
  X,
  Info,
  CalendarRange,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

import doctorsService from '../services/doctors.service';

// Date formatting helpers
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getDayOfWeek = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { weekday: 'short' });
};

// Convert 24-hour time "HH:MM:SS" or "HH:MM" to 12-hour "hh:mm AM/PM"
const formatTime12h = (timeStr) => {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  let hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strMinutes = minutes.toString().padStart(2, '0');
  return `${hours.toString().padStart(2, '0')}:${strMinutes} ${ampm}`;
};

// Calculate duration in hours and minutes
const calculateTimeDuration = (start, end) => {
  if (!start || !end) return '';
  const [sH, sM] = start.split(':').map(Number);
  const [eH, eM] = end.split(':').map(Number);
  
  let diffMinutes = (eH * 60 + eM) - (sH * 60 + sM);
  if (diffMinutes < 0) diffMinutes += 24 * 60; // Handle overnight wrap if any

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};

// Derive status based on current date and time
const deriveStatus = (dateStr, startStr, endStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const blockDate = new Date(dateStr);
  blockDate.setHours(0, 0, 0, 0);

  if (blockDate > today) return 'UPCOMING';
  if (blockDate < today) return 'COMPLETED';

  // If it's today, check the times
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [sH, sM] = startStr.split(':').map(Number);
  const [eH, eM] = endStr.split(':').map(Number);

  const startMinutes = sH * 60 + sM;
  const endMinutes = eH * 60 + eM;

  if (currentMinutes < startMinutes) return 'UPCOMING';
  if (currentMinutes > endMinutes) return 'COMPLETED';
  return 'ONGOING';
};

export const DoctorBlockedTimePage = () => {
  const queryClient = useQueryClient();
  const [selectedDoctorId, setSelectedDoctorId] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [filterReason, setFilterReason] = useState('ALL');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal states
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null); // null for create, block object for edit
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [blockToDelete, setBlockToDelete] = useState(null);

  // Form states inside modal
  const [modalDoctorId, setModalDoctorId] = useState('');
  const [modalDate, setModalDate] = useState('');
  const [modalStartTime, setModalStartTime] = useState('');
  const [modalEndTime, setModalEndTime] = useState('');
  const [modalReason, setModalReason] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // 1. Fetch doctors list
  const {
    data: doctors = [],
    isLoading: isLoadingDoctors,
    isError: isDoctorsError,
    refetch: refetchDoctors
  } = useQuery({
    queryKey: ['doctorsList'],
    queryFn: doctorsService.getDoctorsList,
  });

  // Set initial doctor when list loads
  useEffect(() => {
    if (doctors.length > 0 && !selectedDoctorId) {
      setSelectedDoctorId('ALL');
    }
  }, [doctors, selectedDoctorId]);

  // 2. Fetch selected doctor profile (if not 'ALL')
  const {
    data: doctorProfile,
    isLoading: isLoadingProfile
  } = useQuery({
    queryKey: ['doctorDetails', selectedDoctorId],
    queryFn: () => doctorsService.getDoctorDetails(selectedDoctorId),
    enabled: selectedDoctorId !== 'ALL' && selectedDoctorId !== '',
  });

  // 3. Fetch blocked slots
  const {
    data: rawBlockedSlots = [],
    isLoading: isLoadingBlockedSlots,
    isError: isBlockedSlotsError,
    refetch: refetchBlockedSlots
  } = useQuery({
    queryKey: ['doctorBlockedSlots', selectedDoctorId, doctors],
    queryFn: async () => {
      if (selectedDoctorId === 'ALL') {
        if (doctors.length === 0) return [];
        const promises = doctors.map(async (doc) => {
          try {
            const slots = await doctorsService.getDoctorBlockedSlots(doc.id);
            return slots.map(slot => ({
              ...slot,
              doctor_details: doc
            }));
          } catch (e) {
            console.error(`Failed to fetch blocked slots for doctor ${doc.id}:`, e);
            return [];
          }
        });
        const results = await Promise.all(promises);
        return results.flat();
      } else {
        const slots = await doctorsService.getDoctorBlockedSlots(selectedDoctorId);
        const doc = doctors.find(d => d.id === selectedDoctorId);
        return slots.map(slot => ({
          ...slot,
          doctor_details: doc
        }));
      }
    },
    enabled: doctors.length > 0,
  });

  // Automatically set modal doctor ID when selectedDoctorId changes (if not 'ALL')
  useEffect(() => {
    if (selectedDoctorId !== 'ALL') {
      setModalDoctorId(selectedDoctorId);
    } else if (doctors.length > 0) {
      setModalDoctorId(doctors[0].id);
    }
  }, [selectedDoctorId, doctors]);

  // Reset to page 1 when filters or selections change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus, startDateFilter, endDateFilter, filterReason, selectedDoctorId]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: ({ doctorId, payload }) => doctorsService.createDoctorBlockedSlot(doctorId, payload),
    onSuccess: () => {
      toast.success('Blocked slot scheduled successfully.');
      queryClient.invalidateQueries({ queryKey: ['doctorBlockedSlots'] });
      setIsBlockModalOpen(false);
      resetModalForm();
    },
    onError: (err) => {
      const errorsObj = err.response?.data || {};
      if (typeof errorsObj === 'object') {
        setValidationErrors(errorsObj);
        const nonFieldErr = errorsObj.non_field_errors?.[0] || errorsObj.detail || err.message || 'Failed to create blocked slot.';
        setServerError(nonFieldErr);
      } else {
        setServerError(err.message || 'Failed to create blocked slot.');
      }
      toast.error('Validation or conflict error occurred.');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ doctorId, blockId, payload }) => doctorsService.updateDoctorBlockedSlot(doctorId, blockId, payload),
    onSuccess: () => {
      toast.success('Blocked slot updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['doctorBlockedSlots'] });
      setIsBlockModalOpen(false);
      resetModalForm();
    },
    onError: (err) => {
      const errorsObj = err.response?.data || {};
      if (typeof errorsObj === 'object') {
        setValidationErrors(errorsObj);
        const nonFieldErr = errorsObj.non_field_errors?.[0] || errorsObj.detail || err.message || 'Failed to update blocked slot.';
        setServerError(nonFieldErr);
      } else {
        setServerError(err.message || 'Failed to update blocked slot.');
      }
      toast.error('Validation or conflict error occurred.');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: ({ doctorId, blockId }) => doctorsService.deleteDoctorBlockedSlot(doctorId, blockId),
    onSuccess: () => {
      toast.success('Blocked slot deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['doctorBlockedSlots'] });
      setIsDeleteConfirmOpen(false);
      setBlockToDelete(null);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete blocked slot.');
    }
  });

  // Modal form reset
  const resetModalForm = () => {
    setEditingBlock(null);
    setModalDate('');
    setModalStartTime('');
    setModalEndTime('');
    setModalReason('');
    setValidationErrors({});
    setServerError('');
    if (selectedDoctorId !== 'ALL') {
      setModalDoctorId(selectedDoctorId);
    }
  };

  // Open modal for creating
  const handleOpenCreateModal = () => {
    resetModalForm();
    setIsBlockModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (block) => {
    setEditingBlock(block);
    setModalDoctorId(block.doctor);
    setModalDate(block.block_date);
    setModalStartTime(block.start_time.substring(0, 5));
    setModalEndTime(block.end_time.substring(0, 5));
    setModalReason(block.reason || '');
    setValidationErrors({});
    setServerError('');
    setIsBlockModalOpen(true);
  };

  // Save handler (create or edit)
  const handleSaveBlock = () => {
    setServerError('');
    const errors = {};
    if (!modalDoctorId) errors.doctor = ['Doctor selection is required.'];
    if (!modalDate) errors.block_date = ['Block date is required.'];
    if (!modalStartTime) errors.start_time = ['Start time is required.'];
    if (!modalEndTime) errors.end_time = ['End time is required.'];
    if (!modalReason.trim()) errors.reason = ['Reason is required.'];
    
    if (modalStartTime && modalEndTime && modalStartTime >= modalEndTime) {
      errors.end_time = ['End time must be after start time.'];
    }

    const today = new Date().toISOString().split('T')[0];
    if (modalDate && modalDate < today) {
      errors.block_date = ['Block date cannot be in the past.'];
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const payload = {
      block_date: modalDate,
      start_time: `${modalStartTime}:00`,
      end_time: `${modalEndTime}:00`,
      reason: modalReason
    };

    if (editingBlock) {
      updateMutation.mutate({
        doctorId: editingBlock.doctor,
        blockId: editingBlock.id,
        payload
      });
    } else {
      createMutation.mutate({
        doctorId: modalDoctorId,
        payload
      });
    }
  };

  // Delete handler
  const handleConfirmDelete = () => {
    if (blockToDelete) {
      deleteMutation.mutate({
        doctorId: blockToDelete.doctor,
        blockId: blockToDelete.id
      });
    }
  };

  const handleOpenDeleteConfirm = (block) => {
    setBlockToDelete(block);
    setIsDeleteConfirmOpen(true);
  };

  // Filter and Search Logic
  const filteredBlockedSlots = useMemo(() => {
    return rawBlockedSlots.filter(slot => {
      const reasonMatch = slot.reason?.toLowerCase().includes(searchQuery.toLowerCase());
      const doctorMatch = slot.doctor_details?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          slot.doctor_details?.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
      const dateMatchStr = slot.block_date.includes(searchQuery);
      
      const matchQuery = !searchQuery || reasonMatch || doctorMatch || dateMatchStr;

      const status = deriveStatus(slot.block_date, slot.start_time, slot.end_time);
      const matchStatus = filterStatus === 'ALL' || status === filterStatus;

      let matchDateRange = true;
      if (startDateFilter) {
        matchDateRange = matchDateRange && slot.block_date >= startDateFilter;
      }
      if (endDateFilter) {
        matchDateRange = matchDateRange && slot.block_date <= endDateFilter;
      }

      let matchReason = true;
      if (filterReason !== 'ALL') {
        matchReason = slot.reason?.toLowerCase().includes(filterReason.toLowerCase());
      }

      return matchQuery && matchStatus && matchDateRange && matchReason;
    });
  }, [rawBlockedSlots, searchQuery, filterStatus, startDateFilter, endDateFilter, filterReason]);

  // Statistics Calculations
  const stats = useMemo(() => {
    const totalActive = rawBlockedSlots.length;
    let todayBlocks = 0;
    let upcomingBlocks = 0;
    let totalMinutes = 0;
    let thisMonth = 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    rawBlockedSlots.forEach(slot => {
      const status = deriveStatus(slot.block_date, slot.start_time, slot.end_time);
      
      if (slot.block_date === todayStr) {
        todayBlocks++;
      }

      if (status === 'UPCOMING') {
        upcomingBlocks++;
        const [sH, sM] = slot.start_time.split(':').map(Number);
        const [eH, eM] = slot.end_time.split(':').map(Number);
        const diff = (eH * 60 + eM) - (sH * 60 + sM);
        if (diff > 0) totalMinutes += diff;
      }

      const blockDate = new Date(slot.block_date);
      if (blockDate.getMonth() === currentMonth && blockDate.getFullYear() === currentYear) {
        thisMonth++;
      }
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const formattedHours = totalHours > 0 ? `${totalHours}h ${remainingMinutes}m` : `${remainingMinutes}m`;

    return {
      totalActive,
      todayBlocks,
      upcomingBlocks,
      totalBlockedHours: formattedHours,
      thisMonth
    };
  }, [rawBlockedSlots]);

  // Pagination Math
  const totalRows = filteredBlockedSlots.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const paginatedBlockedSlots = useMemo(() => {
    return filteredBlockedSlots.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredBlockedSlots, startIndex, rowsPerPage]);

  // Export CSV Helper
  const handleExportCSV = () => {
    if (filteredBlockedSlots.length === 0) {
      toast.error('No records to export.');
      return;
    }
    const headers = ['Doctor Name', 'Block Date', 'Start Time', 'End Time', 'Duration', 'Reason', 'Status'];
    const rows = filteredBlockedSlots.map(slot => [
      slot.doctor_details?.name || slot.doctor_details?.full_name || 'Unknown',
      slot.block_date,
      slot.start_time,
      slot.end_time,
      calculateTimeDuration(slot.start_time, slot.end_time),
      slot.reason || '',
      deriveStatus(slot.block_date, slot.start_time, slot.end_time)
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `doctor_blocked_slots_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV exported successfully.');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterStatus('ALL');
    setStartDateFilter('');
    setEndDateFilter('');
    setFilterReason('ALL');
    toast.success('Filters cleared.');
  };

  const isPageLoading = isLoadingDoctors || isLoadingBlockedSlots;

  if (isPageLoading) {
    return (
      <div className="w-full flex flex-col gap-5 text-left font-display select-none">
        <div className="flex items-center gap-2.5 text-sm font-medium text-[#64748B] select-none flex-shrink-0">
          <span>Administration</span>
          <ChevronRight size={14} />
          <span>Scheduling</span>
          <ChevronRight size={14} />
          <span className="text-[#0F172A] font-semibold">Doctor Blocked Time</span>
        </div>
        
        {/* Header Skeleton */}
        <div className="flex items-center justify-between gap-4 flex-shrink-0 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-100" />
            <div className="flex flex-col gap-2">
              <div className="h-5 bg-slate-200 rounded w-48" />
              <div className="h-3 bg-slate-100 rounded w-96" />
            </div>
          </div>
          <div className="w-40 h-10 bg-slate-100 rounded-2xl" />
        </div>



        {/* Table Skeleton */}
        <div className="bg-white border border-slate-200/60 rounded-[24px] p-6 h-[450px] animate-pulse animate-pulse-fast" />
      </div>
    );
  }

  if (isDoctorsError || isBlockedSlotsError) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center p-8 text-center font-display">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#EF4444] mb-4">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-lg font-bold text-[#1E293B]">Connection Failed</h3>
        <p className="text-xs text-[#64748B] mt-2 max-w-[360px] leading-relaxed">
          Failed to load doctor blocked slot records. Please make sure the backend server is running.
        </p>
        <button
          onClick={() => {
            refetchDoctors();
            refetchBlockedSlots();
          }}
          className="mt-6 h-10 px-6 rounded-xl bg-[#5B3FD6] text-xs font-bold text-white hover:bg-[#4B2EC7] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <RefreshCw size={14} />
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 text-left font-display select-none max-w-[1600px] mx-auto p-2">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2.5 text-sm font-medium text-[#64748B] select-none flex-shrink-0">
        <span>Administration</span>
        <ChevronRight size={14} />
        <span>Scheduling</span>
        <ChevronRight size={14} />
        <span className="text-[#0F172A] font-semibold">Doctor Blocked Time</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#F3EEFF] text-[#5B3FD6] flex items-center justify-center shadow-sm">
            <CalendarRange size={22} />
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-xl font-bold tracking-tight text-[#1E293B]">Doctor Blocked Time</h2>
            <span className="text-xs font-semibold text-[#64748B] mt-0.5">
              Temporarily block specific time periods when the doctor is unavailable for appointments.
            </span>
          </div>
        </div>

        {/* Block Time Slot Button */}
        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="h-11 px-5 rounded-[14px] bg-[#5B3FD6] hover:bg-[#4B2EC7] text-xs font-bold text-white transition-all duration-150 flex items-center gap-2 shadow-[0_4px_12px_rgba(91,63,214,0.15)] hover:shadow-[0_6px_16px_rgba(91,63,214,0.25)] cursor-pointer"
        >
          <Plus size={15} />
          Block Time Slot
        </button>
      </div>

      {/* Doctor Information Card */}
      <div className="bg-white border border-[#E8ECF4] rounded-[20px] p-4 flex items-center justify-between shadow-[0_8px_30px_rgba(15,23,42,0.03)] h-[110px]">
        {selectedDoctorId === 'ALL' ? (
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
              <User size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#1E293B]">All Clinic Doctors</span>
              <span className="text-[11px] font-semibold text-[#64748B] mt-0.5">
                Displaying aggregated blocked slots and schedules across the entire team.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <img
              src={doctorProfile?.profile_image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120&h=120'}
              alt={doctorProfile?.full_name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
            />
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1E293B]">{doctorProfile?.full_name}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold bg-green-50 text-green-700">
                  Active
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#64748B] mt-0.5">
                {doctorProfile?.specialization} • <span className="text-[#5B3FD6] font-bold">{doctorProfile?.qualification}</span> • {doctorProfile?.experience} Years Exp.
              </span>
            </div>

            <div className="h-8 w-[1px] bg-slate-100 mx-2" />

            <div className="flex items-center gap-6 text-xs font-semibold text-slate-500">
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Consultation</span>
                <span className="text-[#1E293B] font-bold mt-0.5">{doctorProfile?.availability?.consultation_duration || 30} mins</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Max Patients</span>
                <span className="text-[#1E293B] font-bold mt-0.5">{doctorProfile?.availability?.max_daily_patients || 15} Patients</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Accepting</span>
                <span className="text-green-600 font-bold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Yes
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Doctor selector dropdown */}
        <div className="flex flex-col text-right">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5 select-none">
            Select Doctor
          </label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="h-10 px-3.5 bg-white border border-[#E5E7EB] hover:border-slate-400 rounded-xl text-xs font-bold text-[#1E293B] outline-none cursor-pointer focus:ring-2 focus:ring-[#5B3FD6]/10 min-w-[220px]"
          >
            <option value="ALL">All Doctors</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>
      </div>



      {/* Filter Toolbar */}
      <div className="bg-white border border-[#E8ECF4] rounded-[20px] p-3.5 flex items-center justify-between gap-4 shadow-[0_8px_30px_rgba(15,23,42,0.02)]">
        {/* Left: Search input */}
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search blocked slots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#1E293B] placeholder-slate-400 focus:border-[#5B3FD6] focus:bg-white focus:ring-4 focus:ring-[#5B3FD6]/10 outline-none transition-all duration-150"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Right: Date filter, Status filter, action buttons */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              className="h-9 px-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#1E293B] outline-none"
            />
            <span className="text-xs font-bold text-slate-400">to</span>
            <input
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              className="h-9 px-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#1E293B] outline-none"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#1E293B] outline-none cursor-pointer min-w-[120px]"
          >
            <option value="ALL">All Status</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            value={filterReason}
            onChange={(e) => setFilterReason(e.target.value)}
            className="h-9 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#1E293B] outline-none cursor-pointer min-w-[130px]"
          >
            <option value="ALL">All Reasons</option>
            <option value="meeting">Meeting</option>
            <option value="personal">Personal</option>
            <option value="maintenance">Maintenance</option>
            <option value="admin">Admin</option>
            <option value="conference">Conference</option>
            <option value="other">Other</option>
          </select>

          <button
            type="button"
            onClick={() => refetchBlockedSlots()}
            className="h-9 w-9 rounded-xl border border-[#E5E7EB] hover:bg-slate-50 flex items-center justify-center text-slate-500 cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw size={14} />
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            className="h-9 px-3.5 rounded-xl border border-[#E5E7EB] hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} />
            Export
          </button>
          {(searchQuery || filterStatus !== 'ALL' || startDateFilter || endDateFilter || filterReason !== 'ALL') && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="h-9 px-3.5 rounded-xl border border-dashed border-red-200 bg-red-50/50 hover:bg-red-50 text-xs font-bold text-red-500 flex items-center gap-1.5 cursor-pointer"
            >
              <FilterX size={14} />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Content: Table (Full Width) */}
      <div className="bg-white border border-[#E8ECF4] rounded-[20px] shadow-[0_8px_30px_rgba(15,23,42,0.02)] p-5">
        {paginatedBlockedSlots.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <CalendarRange size={32} />
            </div>
            <h3 className="text-base font-bold text-[#1E293B]">No Blocked Slots Found</h3>
            <p className="text-xs text-[#64748B] mt-2 max-w-[360px] leading-relaxed">
              No temporarily blocked slots match your filter parameters. Create one to block online bookings.
            </p>
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="mt-5 h-9 px-5 rounded-xl bg-[#5B3FD6] hover:bg-[#4B2EC7] text-xs font-bold text-white transition-all duration-150 shadow-sm cursor-pointer"
            >
              Create First Block
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-[#64748B] uppercase tracking-wider select-none">
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Time Slot</th>
                    <th className="py-3.5 px-4">Duration</th>
                    <th className="py-3.5 px-4">Reason</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4">Created At</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-[#1E293B]">
                  {paginatedBlockedSlots.map((slot) => {
                    const duration = calculateTimeDuration(slot.start_time, slot.end_time);
                    const status = deriveStatus(slot.block_date, slot.start_time, slot.end_time);
                    
                    return (
                      <tr key={slot.id} className="hover:bg-[#EEF2FF]/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col text-left">
                            <span className="font-bold text-[#1E293B]">{formatDate(slot.block_date)}</span>
                            <span className="text-[10px] font-bold text-slate-400 mt-0.5">{getDayOfWeek(slot.block_date)}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                            <span>{formatTime12h(slot.start_time)}</span>
                            <span className="text-slate-300">-</span>
                            <span>{formatTime12h(slot.end_time)}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EDE9FE] text-[#5B3FD6]">
                            {duration}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 max-w-[300px]">
                          <div className="line-clamp-2 text-left text-slate-600 font-medium leading-relaxed" title={slot.reason}>
                            {slot.reason}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center w-28">
                          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider ${
                            status === 'UPCOMING' ? 'bg-[#EFF6FF] text-[#2563EB]' :
                            status === 'ONGOING' ? 'bg-[#ECFDF5] text-[#16A34A]' :
                            'bg-[#F1F5F9] text-[#64748B]'
                          }`}>
                            {status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 font-medium">
                          {slot.created_at ? (
                            <div className="flex flex-col text-left">
                              <span>{formatDate(slot.created_at)}</span>
                              <span className="text-[10px] text-slate-400 mt-0.5">
                                {new Date(slot.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                              </span>
                            </div>
                          ) : '--'}
                        </td>

                        <td className="py-3.5 px-4 text-right w-36">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(slot)}
                              className="h-8 w-8 rounded-lg border border-[#E8ECF4] hover:bg-slate-50 text-slate-500 hover:text-[#5B3FD6] flex items-center justify-center transition-colors cursor-pointer"
                              title="Edit Blocked Slot"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDeleteConfirm(slot)}
                              className="h-8 w-8 rounded-lg border border-[#E8ECF4] hover:bg-red-50 text-slate-500 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                              title="Delete Blocked Slot"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalRows > 0 && (
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 text-xs font-semibold text-slate-500 select-none">
                <div>
                  Showing <span className="text-[#1E293B] font-bold">{startIndex + 1}</span> to{' '}
                  <span className="text-[#1E293B] font-bold">{endIndex}</span> of{' '}
                  <span className="text-[#1E293B] font-bold">{totalRows}</span> blocked slots
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span>Rows per page:</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setCurrentPage(1);
                      }}
                      className="h-8 px-2 bg-white border border-slate-200 rounded-lg outline-none cursor-pointer font-bold text-slate-600"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                      className="h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      K
                    </button>
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className="h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      &lt;
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`h-8 w-8 rounded-lg border flex items-center justify-center cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-[#5B3FD6] border-[#5B3FD6] text-white font-bold'
                              : 'border-slate-200 hover:bg-slate-50 text-[#1E293B]'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      &gt;
                    </button>
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className="h-8 w-8 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      &gt;|
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>


      {/* Add / Edit Blocked Slot Modal */}
      <AnimatePresence>
        {isBlockModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E8ECF4] rounded-[24px] shadow-2xl w-full max-w-[720px] p-6 text-left relative overflow-hidden flex flex-col gap-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-[#1E293B]">
                    {editingBlock ? 'Edit Doctor Blocked Time' : 'Add Doctor Blocked Time'}
                  </h3>
                  <span className="text-xs text-[#64748B]">Temporarily block a time period.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBlockModalOpen(false)}
                  className="h-8 w-8 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Conflict / Server Error Alert */}
              {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-start gap-2 animate-shake">
                  <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Form Content */}
              <div className="grid grid-cols-2 gap-4">
                {/* Doctor Select (Readonly if editing or if selectedDoctorId is not ALL) */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1E293B]">Doctor</label>
                  <select
                    value={modalDoctorId}
                    onChange={(e) => setModalDoctorId(e.target.value)}
                    disabled={!!editingBlock}
                    className="h-10 px-3 bg-slate-50 border border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#1E293B] outline-none disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                  {validationErrors.doctor && (
                    <span className="text-[10px] font-bold text-red-500 mt-0.5">{validationErrors.doctor[0]}</span>
                  )}
                </div>

                {/* Block Date */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1E293B]">Block Date</label>
                  <input
                    type="date"
                    value={modalDate}
                    onChange={(e) => setModalDate(e.target.value)}
                    className={`h-10 px-3 bg-white border rounded-xl text-xs font-semibold text-[#1E293B] outline-none focus:border-[#5B3FD6] focus:ring-4 focus:ring-[#5B3FD6]/10
                      ${validationErrors.block_date ? 'border-red-500' : 'border-[#CBD5E1]'}
                    `}
                  />
                  {validationErrors.block_date && (
                    <span className="text-[10px] font-bold text-red-500 mt-0.5">{validationErrors.block_date[0]}</span>
                  )}
                </div>

                {/* Start Time */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1E293B]">Start Time</label>
                  <input
                    type="time"
                    value={modalStartTime}
                    onChange={(e) => setModalStartTime(e.target.value)}
                    className={`h-10 px-3 bg-white border rounded-xl text-xs font-semibold text-[#1E293B] outline-none focus:border-[#5B3FD6] focus:ring-4 focus:ring-[#5B3FD6]/10
                      ${validationErrors.start_time ? 'border-red-500' : 'border-[#CBD5E1]'}
                    `}
                  />
                  {validationErrors.start_time && (
                    <span className="text-[10px] font-bold text-red-500 mt-0.5">{validationErrors.start_time[0]}</span>
                  )}
                </div>

                {/* End Time */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1E293B]">End Time</label>
                  <input
                    type="time"
                    value={modalEndTime}
                    onChange={(e) => setModalEndTime(e.target.value)}
                    className={`h-10 px-3 bg-white border rounded-xl text-xs font-semibold text-[#1E293B] outline-none focus:border-[#5B3FD6] focus:ring-4 focus:ring-[#5B3FD6]/10
                      ${validationErrors.end_time ? 'border-red-500' : 'border-[#CBD5E1]'}
                    `}
                  />
                  {validationErrors.end_time && (
                    <span className="text-[10px] font-bold text-red-500 mt-0.5">{validationErrors.end_time[0]}</span>
                  )}
                </div>

                {/* Reason */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1E293B]">Reason</label>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {modalReason.length} / 1000
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Enter reason for blocking time..."
                    value={modalReason}
                    onChange={(e) => setModalReason(e.target.value.substring(0, 1000))}
                    className={`p-3 bg-white border rounded-xl text-xs font-semibold text-[#1E293B] outline-none focus:border-[#5B3FD6] focus:ring-4 focus:ring-[#5B3FD6]/10 resize-none
                      ${validationErrors.reason ? 'border-red-500' : 'border-[#CBD5E1]'}
                    `}
                  />
                  {validationErrors.reason && (
                    <span className="text-[10px] font-bold text-red-500 mt-0.5">{validationErrors.reason[0]}</span>
                  )}
                </div>
              </div>

              {/* Live Preview Card */}
              {modalDate && modalStartTime && modalEndTime && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
                    <Info size={13} className="text-[#5B3FD6]" />
                    Live Preview
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-slate-500 mt-1">
                    <div className="flex flex-col">
                      <span>Block Duration</span>
                      <span className="text-[#1E293B] font-bold mt-0.5">
                        {calculateTimeDuration(modalStartTime, modalEndTime)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span>Status</span>
                      <span className="text-[#3B82F6] font-bold mt-0.5">
                        {deriveStatus(modalDate, modalStartTime, modalEndTime)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span>Estimated Conflicts</span>
                      <span className="text-amber-500 font-bold mt-0.5 flex items-center gap-1">
                        Auto Checked
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsBlockModalOpen(false)}
                  className="h-10 px-5 rounded-xl border border-[#CBD5E1] text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveBlock}
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="h-10 px-5 rounded-xl bg-[#5B3FD6] hover:bg-[#4B2EC7] text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingBlock ? 'Save Changes' : 'Create Blocked Slot'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete/Cancel Confirmation Dialog */}
      <AnimatePresence>
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E8ECF4] rounded-[24px] shadow-2xl w-full max-w-[440px] p-6 text-left relative overflow-hidden flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 text-red-500">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-base font-bold text-[#1E293B]">Delete Blocked Slot?</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                This action cancels the blocked slot and allows appointments during this period.
              </p>
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="h-9 px-4 rounded-xl border border-[#CBD5E1] text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deleteMutation.isPending}
                  className="h-9 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {deleteMutation.isPending ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorBlockedTimePage;
