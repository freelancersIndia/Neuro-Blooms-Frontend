import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Download, FileX, AlertTriangle, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

import AppointmentStatistics from '../../components/appointments/AppointmentStatistics';
import AppointmentFilters from '../../components/appointments/AppointmentFilters';
import AppointmentRequestsTable from '../../components/appointments/AppointmentRequestsTable';
import AppointmentRequestDrawer from '../../components/appointments/AppointmentRequestDrawer';
import Pagination from '../../components/appointments/Pagination';
import useAppointmentRequests from '../../hooks/useAppointmentRequests';

export const AppointmentRequestsPage = () => {
  const {
    requests,
    totalCount,
    selectedRequest,
    setSelectedRequest,
    filters,
    setFilters,
    resetFilters,
    stats,
    currentPage,
    pageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    isLoading,
    error,
    clearError,
    triggerRefresh,
    triggerErrorState,
    approveRequest,
    rejectRequest,
    exportRequests
  } = useAppointmentRequests();

  // Scroll to top of table on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleRefresh = () => {
    triggerRefresh();
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 600)),
      {
        loading: 'Refreshing requests...',
        success: 'Appointment requests list updated.',
        error: 'Failed to refresh.'
      },
      {
        style: {
          minWidth: '220px',
          fontSize: '12px',
          fontWeight: 'bold',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }
      }
    );
  };

  const handleExport = async () => {
    try {
      await toast.promise(
        (async () => {
          const res = await exportRequests();
          if (res && res.data) {
            const blob = new Blob([res.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', 'appointment_requests.csv');
            a.click();
            window.URL.revokeObjectURL(url);
          }
        })(),
        {
          loading: 'Exporting requests...',
          success: 'Requests exported as CSV successfully!',
          error: (err) => `Failed to export: ${err.message || err}`
        },
        {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '12px',
            border: '1px solid #E2E8F0'
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (req) => {
    try {
      await toast.promise(
        approveRequest(req.id),
        {
          loading: 'Approving request...',
          success: 'Appointment request approved successfully!',
          error: (err) => `Approval failed: ${err.message || err}`
        },
        {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '12px',
            border: '1px solid #E2E8F0'
          }
        }
      );
      if (selectedRequest && selectedRequest.id === req.id) {
        setSelectedRequest(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (req) => {
    const reason = window.prompt('Please enter the reason for rejection:');
    if (reason === null) return; // User cancelled
    
    if (!reason.trim()) {
      toast.error('Rejection reason cannot be empty.', {
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }
      });
      return;
    }

    try {
      await toast.promise(
        rejectRequest({ id: req.id, reason: reason.trim() }),
        {
          loading: 'Rejecting request...',
          success: 'Appointment request rejected successfully!',
          error: (err) => `Rejection failed: ${err.message || err}`
        },
        {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '12px',
            border: '1px solid #E2E8F0'
          }
        }
      );
      if (selectedRequest && selectedRequest.id === req.id) {
        setSelectedRequest(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Header button layout animations
  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  // 1. SKELETON LOADER STATE
  const renderSkeletons = () => {
    return (
      <div className="space-y-6 animate-pulse select-none">
        {/* Statistics Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, idx) => (
            <div key={`stat-skel-${idx}`} className="bg-white border border-slate-100 p-5 rounded-[20px] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-150 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-2.5 bg-slate-200 rounded w-16" />
                <div className="h-5 bg-slate-200 rounded w-10" />
                <div className="h-2 bg-slate-200 rounded w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Filters Skeleton */}
        <div className="bg-white border border-slate-100 p-5 rounded-[20px] shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, idx) => (
              <div key={`filt-skel-${idx}`} className="space-y-1.5">
                <div className="h-2 bg-slate-200 rounded w-12" />
                <div className="h-8 bg-slate-100 rounded-xl w-full" />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2.5 pt-2">
            <div className="h-9 bg-slate-100 rounded-xl w-20" />
            <div className="h-9 bg-slate-200 rounded-xl w-28" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white border border-slate-100 rounded-[20px] shadow-sm overflow-hidden">
          <div className="bg-slate-50/50 border-b border-slate-100 p-4 flex gap-4">
            {[...Array(6)].map((_, idx) => (
              <div key={`th-skel-${idx}`} className="h-3 bg-slate-200 rounded flex-1" />
            ))}
          </div>
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, idx) => (
              <div key={`tr-skel-${idx}`} className="flex gap-4 items-center">
                <div className="h-3 bg-slate-100 rounded flex-1" />
                <div className="h-8 bg-slate-100 rounded-xl flex-1" />
                <div className="h-3 bg-slate-100 rounded flex-1" />
                <div className="h-5 bg-slate-150 rounded-xl flex-1" />
                <div className="h-3 bg-slate-100 rounded flex-1" />
                <div className="h-8 bg-slate-150 rounded-xl flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 2. ERROR STATE
  const renderError = () => {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-slate-100 rounded-[20px] shadow-[0_10px_35px_rgba(79,94,84,0.012)] max-w-lg mx-auto select-none mt-12">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-5 shadow-sm">
          <AlertTriangle className="w-7 h-7 stroke-[2.25px]" />
        </div>
        <h3 className="text-sm font-black text-slate-800 tracking-tight font-display mb-2">
          Unable to Load Requests
        </h3>
        <p className="text-xs font-semibold text-slate-400 text-center leading-relaxed mb-6 max-w-sm">
          {error}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={clearError}
            className="border border-slate-200 hover:border-slate-350 hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-550 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-all duration-200 font-display"
          >
            Retry Fetch
          </button>
        </div>
      </div>
    );
  };

  // 3. EMPTY STATE
  const renderEmpty = () => {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border border-slate-100 rounded-[20px] shadow-[0_10px_35px_rgba(79,94,84,0.012)] select-none">
        <div className="w-16 h-16 rounded-2xl bg-purple-50/60 border border-purple-100/50 flex items-center justify-center text-[#7C3AED] mb-5 shadow-sm">
          <FileX className="w-7 h-7 stroke-[2.25px]" />
        </div>
        <h3 className="text-sm font-black text-slate-800 tracking-tight font-display mb-1.5">
          No Appointment Requests Found
        </h3>
        <p className="text-xs font-semibold text-slate-400 text-center max-w-sm leading-relaxed mb-6">
          New consultation requests submitted through the public website will appear here for review.
        </p>
        <button
          type="button"
          onClick={resetFilters}
          className="bg-purple-50 hover:bg-purple-100 text-[#7C3AED] px-5 py-2.5 rounded-xl text-xs font-black border border-purple-100/60 hover:border-purple-200/50 shadow-xs cursor-pointer transition-colors font-display"
        >
          Reset Search Filters
        </button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none max-w-7xl mx-auto">
      {/* Page Header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 select-none"
      >
        <div className="flex flex-col text-left">
          <h2 className="text-xl md:text-2xl font-black text-[#0F172A] tracking-tight font-display leading-tight">
            Appointment Requests
          </h2>
          <p className="text-[11px] md:text-xs font-semibold text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Review and manage consultation requests submitted through the public website before creating appointments.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Debug/Error State Tester */}
          <button
            type="button"
            onClick={triggerErrorState}
            className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-400 hover:text-rose-500 shadow-sm cursor-pointer transition-colors flex items-center justify-center"
            title="Simulate Error State"
            aria-label="Simulate connection error"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            className="flex items-center gap-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-550 hover:text-slate-800 transition-colors shadow-sm cursor-pointer h-[38px]"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Refresh</span>
          </button>

          {/* Export Button */}
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4.5 py-2.5 rounded-xl text-xs font-black shadow-[0_4px_12px_rgba(124,58,237,0.15)] hover:shadow-[0_6px_16px_rgba(124,58,237,0.25)] transition-all duration-200 cursor-pointer h-[38px] font-display"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Requests</span>
          </button>
        </div>
      </motion.div>

      {/* Conditional states rendering */}
      {isLoading ? (
        renderSkeletons()
      ) : error ? (
        renderError()
      ) : (
        <>
          {/* 1. Statistics Row */}
          <AppointmentStatistics stats={stats} />

          {/* 2. Filter panel Card */}
          <AppointmentFilters
            filters={filters}
            onApplyFilters={setFilters}
            onResetFilters={resetFilters}
          />

          {/* 3. Table or Empty View */}
          {requests.length === 0 ? (
            renderEmpty()
          ) : (
            <div className="flex flex-col">
              <AppointmentRequestsTable
                requests={requests}
                onViewRequest={setSelectedRequest}
                onApproveRequest={handleApprove}
                onRejectRequest={handleReject}
              />
              
              {/* Pagination footer */}
              <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          )}

          {/* Right Details Drawer overlay */}
          <AppointmentRequestDrawer
            isOpen={!!selectedRequest}
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </>
      )}
    </div>
  );
};

export default AppointmentRequestsPage;
