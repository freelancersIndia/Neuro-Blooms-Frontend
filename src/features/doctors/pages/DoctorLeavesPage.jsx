import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Search,
  Download,
  FilterX,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Palmtree,
  User,
  Info
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
  return date.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();
};

const calculateDuration = (start, end) => {
  if (!start || !end) return 0;
  const sDate = new Date(start);
  const eDate = new Date(end);
  const diffTime = Math.abs(eDate - sDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};

// Derive status based on current date
const deriveStatus = (startStr, endStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startStr);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endStr);
  end.setHours(0, 0, 0, 0);

  if (today < start) return 'UPCOMING';
  if (today > end) return 'COMPLETED';
  return 'ONGOING';
};

export const DoctorLeavesPage = () => {
  const queryClient = useQueryClient();
  const [selectedDoctorId, setSelectedDoctorId] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows as in mockup
  
  // Modal states
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null); // null for create, leave object for edit
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [leaveToDelete, setLeaveToDelete] = useState(null);

  // Form states inside modal
  const [modalDoctorId, setModalDoctorId] = useState('');
  const [modalStartDate, setModalStartDate] = useState('');
  const [modalEndDate, setModalEndDate] = useState('');
  const [modalReason, setModalReason] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

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

  // 3. Fetch leaves
  const {
    data: rawLeaves = [],
    isLoading: isLoadingLeaves,
    isError: isLeavesError,
    refetch: refetchLeaves
  } = useQuery({
    queryKey: ['doctorLeaves', selectedDoctorId, doctors],
    queryFn: async () => {
      if (selectedDoctorId === 'ALL') {
        if (doctors.length === 0) return [];
        const promises = doctors.map(async (doc) => {
          try {
            const leaves = await doctorsService.getDoctorLeaves(doc.id);
            return leaves.map(leave => ({
              ...leave,
              doctor_details: doc
            }));
          } catch (e) {
            console.error(`Failed to fetch leaves for doctor ${doc.id}:`, e);
            return [];
          }
        });
        const results = await Promise.all(promises);
        return results.flat();
      } else {
        const leaves = await doctorsService.getDoctorLeaves(selectedDoctorId);
        const doc = doctors.find(d => d.id === selectedDoctorId);
        return leaves.map(leave => ({
          ...leave,
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
  }, [searchQuery, filterStatus, startDateFilter, endDateFilter, selectedDoctorId]);

  // Mutations
  const createMutation = useMutation({
    mutationFn: ({ doctorId, payload }) => doctorsService.createDoctorLeave(doctorId, payload),
    onSuccess: () => {
      toast.success('Doctor leave created successfully.');
      queryClient.invalidateQueries({ queryKey: ['doctorLeaves'] });
      setIsLeaveModalOpen(false);
      resetModalForm();
    },
    onError: (err) => {
      const errorsObj = err.response?.data || {};
      setValidationErrors(errorsObj);
      const message = errorsObj.non_field_errors?.[0] || err.message || 'Failed to create leave.';
      toast.error(message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ doctorId, leaveId, payload }) => doctorsService.updateDoctorLeave(doctorId, leaveId, payload),
    onSuccess: () => {
      toast.success('Doctor leave updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['doctorLeaves'] });
      setIsLeaveModalOpen(false);
      resetModalForm();
    },
    onError: (err) => {
      const errorsObj = err.response?.data || {};
      setValidationErrors(errorsObj);
      const message = errorsObj.non_field_errors?.[0] || err.message || 'Failed to update leave.';
      toast.error(message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: ({ doctorId, leaveId }) => doctorsService.deleteDoctorLeave(doctorId, leaveId),
    onSuccess: () => {
      toast.success('Doctor leave cancelled successfully.');
      queryClient.invalidateQueries({ queryKey: ['doctorLeaves'] });
      setIsDeleteConfirmOpen(false);
      setLeaveToDelete(null);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to cancel leave.');
    }
  });

  // Modal form reset
  const resetModalForm = () => {
    setEditingLeave(null);
    setModalStartDate('');
    setModalEndDate('');
    setModalReason('');
    setValidationErrors({});
    if (selectedDoctorId !== 'ALL') {
      setModalDoctorId(selectedDoctorId);
    }
  };

  // Open modal for creating
  const handleOpenCreateModal = () => {
    resetModalForm();
    setIsLeaveModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (leave) => {
    setEditingLeave(leave);
    setModalDoctorId(leave.doctor);
    setModalStartDate(leave.start_date);
    setModalEndDate(leave.end_date);
    setModalReason(leave.reason || '');
    setValidationErrors({});
    setIsLeaveModalOpen(true);
  };

  // Save handler (create or edit)
  const handleSaveLeave = () => {
    const errors = {};
    if (!modalDoctorId) errors.doctor = ['Doctor selection is required.'];
    if (!modalStartDate) errors.start_date = ['Start date is required.'];
    if (!modalEndDate) errors.end_date = ['End date is required.'];
    if (!modalReason.trim()) errors.reason = ['Reason is required.'];
    
    if (modalStartDate && modalEndDate && modalStartDate > modalEndDate) {
      errors.end_date = ['End date must be on or after start date.'];
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const payload = {
      start_date: modalStartDate,
      end_date: modalEndDate,
      reason: modalReason
    };

    if (editingLeave) {
      updateMutation.mutate({
        doctorId: editingLeave.doctor,
        leaveId: editingLeave.id,
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
    if (leaveToDelete) {
      deleteMutation.mutate({
        doctorId: leaveToDelete.doctor,
        leaveId: leaveToDelete.id
      });
    }
  };

  const handleOpenDeleteConfirm = (leave) => {
    setLeaveToDelete(leave);
    setIsDeleteConfirmOpen(true);
  };

  // Filter and Search Logic
  const filteredLeaves = useMemo(() => {
    return rawLeaves.filter(leave => {
      const reasonMatch = leave.reason?.toLowerCase().includes(searchQuery.toLowerCase());
      const doctorMatch = leave.doctor_details?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          leave.doctor_details?.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchQuery = !searchQuery || reasonMatch || doctorMatch;

      const status = deriveStatus(leave.start_date, leave.end_date);
      const matchStatus = filterStatus === 'ALL' || status === filterStatus;

      let matchDate = true;
      if (startDateFilter) {
        matchDate = matchDate && leave.end_date >= startDateFilter;
      }
      if (endDateFilter) {
        matchDate = matchDate && leave.start_date <= endDateFilter;
      }

      return matchQuery && matchStatus && matchDate;
    });
  }, [rawLeaves, searchQuery, filterStatus, startDateFilter, endDateFilter]);

  // Statistics Calculations
  const stats = useMemo(() => {
    const totalActive = rawLeaves.length;
    let upcoming = 0;
    let totalDays = 0;
    let thisMonth = 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const uniqueDoctorsOnLeave = new Set();

    rawLeaves.forEach(leave => {
      const status = deriveStatus(leave.start_date, leave.end_date);
      if (status === 'UPCOMING') upcoming++;
      if (status === 'ONGOING') {
        uniqueDoctorsOnLeave.add(leave.doctor);
      }

      totalDays += calculateDuration(leave.start_date, leave.end_date);

      const start = new Date(leave.start_date);
      if (start.getMonth() === currentMonth && start.getFullYear() === currentYear) {
        thisMonth++;
      }
    });

    return {
      totalActive,
      upcoming,
      thisMonth,
      totalDays,
      doctorsOnLeave: uniqueDoctorsOnLeave.size
    };
  }, [rawLeaves]);

  // Pagination Math
  const totalRows = filteredLeaves.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const paginatedLeaves = useMemo(() => {
    return filteredLeaves.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredLeaves, startIndex, rowsPerPage]);

  // Export CSV Helper
  const handleExportCSV = () => {
    if (filteredLeaves.length === 0) {
      toast.error('No records to export.');
      return;
    }
    const headers = ['Doctor Name', 'Start Date', 'End Date', 'Duration (Days)', 'Reason', 'Status'];
    const rows = filteredLeaves.map(leave => [
      leave.doctor_details?.name || leave.doctor_details?.full_name || 'Unknown',
      leave.start_date,
      leave.end_date,
      calculateDuration(leave.start_date, leave.end_date),
      leave.reason || '',
      deriveStatus(leave.start_date, leave.end_date)
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `doctor_leaves_export_${new Date().toISOString().split('T')[0]}.csv`);
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
    toast.success('Filters cleared.');
  };

  const isPageLoading = isLoadingDoctors || isLoadingLeaves;

  if (isPageLoading) {
    return (
      <div className="w-full flex flex-col gap-4 text-left font-display select-none">
        <div className="flex items-center gap-2.5 text-sm font-medium text-[#64748B] select-none flex-shrink-0">
          <span>Administration</span>
          <ChevronRight size={14} />
          <span>Scheduling</span>
          <ChevronRight size={14} />
          <span className="text-[#0F172A] font-semibold">Doctor Leaves</span>
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
        <div className="bg-white border border-slate-200/60 rounded-[24px] p-6 h-[400px] animate-pulse" />
      </div>
    );
  }

  if (isDoctorsError || isLeavesError) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center p-8 text-center font-display">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#EF4444] mb-4">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-lg font-bold text-[#1E293B]">Connection Failed</h3>
        <p className="text-xs text-[#64748B] mt-2 max-w-[360px] leading-relaxed">
          Failed to load doctor leave records. Please make sure the backend server is running.
        </p>
        <button
          onClick={() => {
            refetchDoctors();
            refetchLeaves();
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
    <div className="w-full flex flex-col gap-4 text-left font-display select-none">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2.5 text-sm font-medium text-[#64748B] select-none flex-shrink-0">
        <span>Administration</span>
        <ChevronRight size={14} />
        <span>Scheduling</span>
        <ChevronRight size={14} />
        <span className="text-[#0F172A] font-semibold">Doctor Leaves</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#F3EEFF] text-[#5B3FD6] flex items-center justify-center shadow-sm">
            <Palmtree size={22} />
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-xl font-bold tracking-tight text-[#1E293B]">Doctor Leaves</h2>
            <span className="text-xs font-semibold text-[#64748B] mt-0.5">
              Manage planned leaves and absences for doctors. Leaves automatically block appointment slots.
            </span>
          </div>
        </div>

        {/* Schedule Leave Button */}
        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="h-11 px-5 rounded-xl bg-[#5B3FD6] hover:bg-[#4B2EC7] text-xs font-bold text-white transition-all duration-150 flex items-center gap-2 shadow-[0_4px_12px_rgba(91,63,214,0.15)] hover:shadow-[0_6px_16px_rgba(91,63,214,0.25)] cursor-pointer"
        >
          <Plus size={15} />
          Schedule Leave
        </button>
      </div>

      {/* Doctor Selection Card */}
      <div className="bg-white border border-[#E8ECF4] rounded-[20px] p-4 flex items-center justify-between shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
        {selectedDoctorId === 'ALL' ? (
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
              <User size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#1E293B]">All Clinic Doctors</span>
              <span className="text-[11px] font-semibold text-[#64748B] mt-0.5">
                Displaying aggregated leaves and schedules across the entire team.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3.5">
            <img
              src={doctorProfile?.profile_image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120&h=120'}
              alt={doctorProfile?.full_name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1E293B]">{doctorProfile?.full_name}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold ${
                  doctorProfile?.availability?.accepting_appointments 
                    ? 'bg-[#ECFDF5] text-[#10B981]' 
                    : 'bg-red-50 text-[#EF4444]'
                }`}>
                  <span className={`w-1 h-1 rounded-full ${
                    doctorProfile?.availability?.accepting_appointments ? 'bg-[#10B981]' : 'bg-[#EF4444]'
                  }`} />
                  {doctorProfile?.availability?.accepting_appointments ? 'Accepting' : 'Not Accepting'}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#64748B] mt-0.5">
                {doctorProfile?.qualification} • {doctorProfile?.specialization} • {doctorProfile?.experience} Years Experience
              </span>
            </div>
          </div>
        )}

        {/* Doctor selector dropdown */}
        <div className="flex flex-col text-right">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5 select-none">
            Filter by Doctor
          </label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="h-10 px-3.5 bg-white border border-[#CBD5E1] hover:border-slate-400 rounded-xl text-xs font-bold text-[#1E293B] outline-none cursor-pointer focus:ring-2 focus:ring-[#5B3FD6]/10 min-w-[200px]"
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
      <div className="bg-white border border-[#E8ECF4] rounded-[20px] p-3.5 flex items-center justify-between gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
        {/* Left: Search input */}
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search leave reason..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 bg-slate-50 border border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#1E293B] placeholder-slate-400 focus:border-[#5B3FD6] focus:bg-white focus:ring-4 focus:ring-[#5B3FD6]/10 outline-none transition-all duration-150"
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
              className="h-9 px-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#1E293B] outline-none"
            />
            <span className="text-xs font-bold text-slate-400">to</span>
            <input
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              className="h-9 px-2.5 bg-white border border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#1E293B] outline-none"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 px-3 bg-white border border-[#CBD5E1] rounded-xl text-xs font-bold text-[#1E293B] outline-none cursor-pointer min-w-[120px]"
          >
            <option value="ALL">All Status</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <button
            type="button"
            onClick={() => refetchLeaves()}
            className="h-9 w-9 rounded-xl border border-[#CBD5E1] hover:bg-slate-50 flex items-center justify-center text-slate-500 cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw size={14} />
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            className="h-9 px-3.5 rounded-xl border border-[#CBD5E1] hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} />
            Export
          </button>
          {(searchQuery || filterStatus !== 'ALL' || startDateFilter || endDateFilter) && (
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

      {/* Doctor Leave Table Card */}
      <div className="bg-white border border-[#E8ECF4] rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.02)] p-5">
        {paginatedLeaves.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Calendar size={32} />
            </div>
            <h3 className="text-base font-bold text-[#1E293B]">No Leave Records Found</h3>
            <p className="text-xs text-[#64748B] mt-2 max-w-[360px] leading-relaxed">
              No planned leaves match your filter parameters. Schedule a new leave to block booking dates.
            </p>
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="mt-5 h-9 px-5 rounded-xl bg-[#5B3FD6] hover:bg-[#4B2EC7] text-xs font-bold text-white transition-all duration-150 shadow-sm cursor-pointer"
            >
              Schedule First Leave
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-[#64748B] uppercase tracking-wider select-none">
                    <th className="py-3 px-4">Doctor</th>
                    <th className="py-3 px-4">Leave Period</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4">Created At</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold text-[#1E293B]">
                  {paginatedLeaves.map((leave) => {
                    const duration = calculateDuration(leave.start_date, leave.end_date);
                    const status = deriveStatus(leave.start_date, leave.end_date);
                    
                    return (
                      <tr key={leave.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="py-3.5 px-4 w-60">
                          <div className="flex items-center gap-3">
                            <img
                              src={leave.doctor_details?.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120&h=120'}
                              alt={leave.doctor_details?.name}
                              className="w-9 h-9 rounded-xl object-cover border border-slate-100"
                            />
                            <div className="flex flex-col text-left">
                              <span className="font-bold text-[#1E293B]">{leave.doctor_details?.name || leave.doctor_details?.full_name}</span>
                              <span className="text-[10px] font-semibold text-[#64748B] mt-0.5">{leave.doctor_details?.specialty || leave.doctor_details?.specialization || 'Therapist'}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 w-60">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col text-left">
                              <span className="font-bold text-[#1E293B]">{formatDate(leave.start_date)}</span>
                              <span className="text-[9px] font-bold text-slate-400 mt-0.5">{getDayOfWeek(leave.start_date)}</span>
                            </div>
                            <ChevronRight size={14} className="text-slate-400" />
                            <div className="flex flex-col text-left">
                              <span className="font-bold text-[#1E293B]">{formatDate(leave.end_date)}</span>
                              <span className="text-[9px] font-bold text-slate-400 mt-0.5">{getDayOfWeek(leave.end_date)}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 w-28">
                          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EDE9FE] text-[#5B3FD6]">
                            {duration} {duration === 1 ? 'Day' : 'Days'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 max-w-[280px]">
                          <div className="line-clamp-2 text-left text-slate-600 font-medium leading-relaxed" title={leave.reason}>
                            {leave.reason}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center w-28">
                          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider ${
                            status === 'UPCOMING' ? 'bg-[#EFF6FF] text-[#3B82F6]' :
                            status === 'ONGOING' ? 'bg-[#ECFDF5] text-[#10B981]' :
                            'bg-[#F1F5F9] text-[#64748B]'
                          }`}>
                            {status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 font-medium w-40">
                          {leave.created_at ? new Date(leave.created_at).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          }) : '--'}
                        </td>

                        <td className="py-3.5 px-4 text-right w-36">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(leave)}
                              className="h-8 w-8 rounded-lg border border-[#E8ECF4] hover:bg-slate-50 text-slate-500 hover:text-[#5B3FD6] flex items-center justify-center transition-colors cursor-pointer"
                              title="Edit Leave"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDeleteConfirm(leave)}
                              className="h-8 w-8 rounded-lg border border-[#E8ECF4] hover:bg-red-50 text-slate-500 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                              title="Cancel Leave"
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
                  <span className="text-[#1E293B] font-bold">{totalRows}</span> leaves
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
                      className="h-8 px-2 bg-white border border-slate-200 rounded-lg outline-none cursor-pointer"
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

      {/* Add / Edit Leave Modal */}
      <AnimatePresence>
        {isLeaveModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E8ECF4] rounded-[24px] shadow-2xl w-full max-w-[700px] p-6 text-left relative overflow-hidden flex flex-col gap-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-[#1E293B]">
                    {editingLeave ? 'Edit Doctor Leave' : 'Schedule Doctor Leave'}
                  </h3>
                  <span className="text-xs text-[#64748B]">Configure doctor unavailable dates.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="h-8 w-8 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Content */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1E293B]">Doctor</label>
                  <select
                    value={modalDoctorId}
                    onChange={(e) => setModalDoctorId(e.target.value)}
                    disabled={!!editingLeave}
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

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1E293B]">Start Date</label>
                  <input
                    type="date"
                    value={modalStartDate}
                    onChange={(e) => setModalStartDate(e.target.value)}
                    className={`h-10 px-3 bg-white border rounded-xl text-xs font-semibold text-[#1E293B] outline-none focus:border-[#5B3FD6] focus:ring-4 focus:ring-[#5B3FD6]/10
                      ${validationErrors.start_date ? 'border-red-500' : 'border-[#CBD5E1]'}
                    `}
                  />
                  {validationErrors.start_date && (
                    <span className="text-[10px] font-bold text-red-500 mt-0.5">{validationErrors.start_date[0]}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1E293B]">End Date</label>
                  <input
                    type="date"
                    value={modalEndDate}
                    onChange={(e) => setModalEndDate(e.target.value)}
                    className={`h-10 px-3 bg-white border rounded-xl text-xs font-semibold text-[#1E293B] outline-none focus:border-[#5B3FD6] focus:ring-4 focus:ring-[#5B3FD6]/10
                      ${validationErrors.end_date ? 'border-red-500' : 'border-[#CBD5E1]'}
                    `}
                  />
                  {validationErrors.end_date && (
                    <span className="text-[10px] font-bold text-red-500 mt-0.5">{validationErrors.end_date[0]}</span>
                  )}
                </div>

                <div className="col-span-2 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1E293B]">Reason</label>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {modalReason.length} / 1000
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Enter reason for leave..."
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
              {modalStartDate && modalEndDate && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
                    <Info size={13} className="text-[#5B3FD6]" />
                    Live Preview
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-slate-500 mt-1">
                    <div className="flex flex-col">
                      <span>Leave Duration</span>
                      <span className="text-[#1E293B] font-bold mt-0.5">
                        {calculateDuration(modalStartDate, modalEndDate)} Days
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span>Status</span>
                      <span className="text-[#3B82F6] font-bold mt-0.5">
                        {deriveStatus(modalStartDate, modalEndDate)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span>Estimated Conflicts</span>
                      <span className="text-amber-500 font-bold mt-0.5 flex items-center gap-1">
                        Auto Blocked
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="h-10 px-5 rounded-xl border border-[#CBD5E1] text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveLeave}
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="h-10 px-5 rounded-xl bg-[#5B3FD6] hover:bg-[#4B2EC7] text-xs font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Leave'
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
                <h3 className="text-base font-bold text-[#1E293B]">Cancel Doctor Leave?</h3>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                This leave will be cancelled and appointments can once again be scheduled for these dates.
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

export default DoctorLeavesPage;
