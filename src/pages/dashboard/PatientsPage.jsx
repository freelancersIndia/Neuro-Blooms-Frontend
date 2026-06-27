import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { X, Calendar, Phone, Stethoscope, Mail, MapPin, Heart, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { usePatients } from '../../hooks/usePatients';
import PatientsHeader from '../../components/patients/PatientsHeader';
import PatientStatistics from '../../components/patients/PatientStatistics';
import PatientToolbar from '../../components/patients/PatientToolbar';
import PatientsTable from '../../components/patients/PatientsTable';
import Pagination from '../../components/patients/Pagination';
import EmptyState from '../../components/patients/EmptyState';
import ErrorState from '../../components/patients/ErrorState';
import { PatientsLoadingSkeleton } from '../../components/patients/LoadingSkeleton';

export const PatientsPage = () => {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);

  // Core custom state hook
  const {
    filters,
    setFilters,
    page,
    setPage,
    pageSize,
    setPageSize,
    sorting,
    selectedRows,
    patients,
    pagination,
    statistics,
    isLoading,
    isError,
    refetch,
    selectedDetailsId,
    setSelectedDetailsId,
    patientDetails,
    isDetailsLoading,
    updateStatus,
    deletePatient,
    handleSelectAll,
    handleSelectRow,
    handleSort
  } = usePatients();

  const handleExport = async () => {
    setIsExporting(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Generating export spreadsheet...',
        success: 'Patient list exported successfully as CSV.',
        error: 'Failed to export patient records.'
      },
      {
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          borderRadius: '12px'
        }
      }
    );
    setTimeout(() => setIsExporting(false), 1500);
  };

  const handleAddPatient = () => {
    toast.success('Navigating to Add Patient form (Demo only)', {
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        borderRadius: '12px'
      }
    });
  };

  const handleImport = () => {
    toast.success('Bulk Import modal trigger (Demo only)', {
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        borderRadius: '12px'
      }
    });
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setPage(1); // reset to page 1 on search/filter changes
  };

  const handleStatusChange = async (patientId, newStatus) => {
    try {
      await toast.promise(
        updateStatus(patientId, newStatus),
        {
          loading: 'Updating status...',
          success: `Patient status updated to ${newStatus}.`,
          error: (err) => `Failed to update status: ${err.message || err}`
        },
        {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '12px'
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePatient = async (patientId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete patient record ${patientId}? This will soft-delete the profile.`);
    if (!confirmDelete) return;

    try {
      await toast.promise(
        deletePatient(patientId),
        {
          loading: 'Archiving patient profile...',
          success: 'Patient archived successfully.',
          error: (err) => `Failed to archive patient: ${err.message || err}`
        },
        {
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            borderRadius: '12px'
          }
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseDetails = () => {
    setSelectedDetailsId(null);
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-[#F8FAFC] min-h-screen">
        <PatientsLoadingSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  // Format dynamic status values
  const formatStatus = (s) => {
    const map = {
      'ACTIVE': 'Active',
      'UNDER_TREATMENT': 'Under Treatment',
      'TREATMENT_COMPLETED': 'Treatment Completed',
      'INACTIVE': 'Inactive'
    };
    return map[s] || s;
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-6">
      
      {/* 1. Header Section */}
      <PatientsHeader
        onImport={handleImport}
        onExport={handleExport}
        onAddPatient={handleAddPatient}
        isExporting={isExporting}
      />

      {/* 2. Statistics Grid Cards */}
      <PatientStatistics stats={statistics} />

      {/* 3. Toolbar Section */}
      <PatientToolbar
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* 4. Full-Width Main Content Layout */}
      <div className="w-full">
        {patients.length === 0 ? (
          <EmptyState onCreatePatient={handleAddPatient} />
        ) : (
          <div className="flex flex-col">
            <PatientsTable
              patients={patients}
              selectedRows={selectedRows}
              onSelectRow={handleSelectRow}
              onSelectAll={handleSelectAll}
              sorting={sorting}
              onSort={handleSort}
              onView={(pat) => setSelectedDetailsId(pat.realId || pat.id)}
              onStatusChange={handleStatusChange}
              onDelete={handleDeletePatient}
            />
            <Pagination
              currentPage={page}
              pageSize={pageSize}
              totalCount={pagination.count}
              totalPages={pagination.total_pages}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      {/* Patient Profile Detail Modal overlay */}
      <AnimatePresence>
        {selectedDetailsId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetails}
              className="absolute inset-0 bg-slate-900"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-2xl max-w-md w-full overflow-hidden z-10 relative flex flex-col text-left"
            >
              {isDetailsLoading ? (
                <div className="p-10 flex flex-col items-center justify-center min-h-[320px]">
                  <div className="w-10 h-10 border-4 border-slate-100 border-t-purple-600 rounded-full animate-spin" />
                  <span className="text-xs font-bold text-slate-400 mt-4.5 font-display">Loading profile details...</span>
                </div>
              ) : patientDetails ? (
                <>
                  {/* Modal Header */}
                  <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-purple-600 tracking-wider font-display">
                        {patientDetails.patient_id}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-800 mt-0.5 tracking-tight font-display">
                        Patient Profile
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleCloseDetails}
                      className="w-8 h-8 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0">
                        <img
                          src={
                            patientDetails.gender === 'FEMALE'
                              ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                              : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                          }
                          alt={patientDetails.child_first_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-sm font-extrabold text-slate-800 tracking-tight font-display">
                          {patientDetails.child_first_name} {patientDetails.child_last_name}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                          {patientDetails.gender === 'FEMALE' ? 'Female' : 'Male'} • {patientDetails.age} Years (DOB: {patientDetails.date_of_birth})
                        </span>
                        <span className="inline-flex items-center bg-purple-50 text-purple-700 px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wide font-display mt-2 w-fit">
                          {formatStatus(patientDetails.current_status)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      {/* Clinical info */}
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="font-bold text-slate-400">Assigned Clinician</span>
                        <span className="font-extrabold text-slate-700 flex items-center gap-1.5 mt-0.5">
                          <Stethoscope className="w-3.5 h-3.5 text-slate-350" />
                          <span>{patientDetails.assigned_doctor?.name || 'Unassigned'}</span>
                        </span>
                      </div>

                      {patientDetails.primary_diagnosis && (
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="font-bold text-slate-400">Diagnosis</span>
                          <span className="font-extrabold text-slate-700 mt-0.5">
                            {patientDetails.primary_diagnosis}
                          </span>
                        </div>
                      )}

                      {patientDetails.notes && (
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="font-bold text-slate-400">Clinical Notes</span>
                          <span className="font-semibold text-slate-500 mt-0.5 leading-relaxed">
                            {patientDetails.notes}
                          </span>
                        </div>
                      )}

                      <div className="border-t border-slate-50 my-2" />

                      {/* Parent details */}
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="font-bold text-slate-400">Parent / Guardian</span>
                        <span className="font-extrabold text-slate-700 mt-0.5">
                          {patientDetails.parent_first_name} {patientDetails.parent_last_name}{' '}
                          <span className="text-[10px] font-semibold text-slate-400">
                            ({patientDetails.relationship_to_child === 'FATHER' ? 'Father' : 'Mother'})
                          </span>
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 text-xs">
                        <span className="font-bold text-slate-400">Parent Contact</span>
                        <span className="font-extrabold text-slate-700 flex items-center gap-1.5 mt-0.5 font-display">
                          <Phone className="w-3.5 h-3.5 text-slate-350" />
                          <span>{patientDetails.mobile_number}</span>
                        </span>
                        {patientDetails.email && (
                          <span className="font-extrabold text-slate-700 flex items-center gap-1.5 mt-1 font-display">
                            <Mail className="w-3.5 h-3.5 text-slate-350" />
                            <span>{patientDetails.email}</span>
                          </span>
                        )}
                      </div>

                      {patientDetails.address && (
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="font-bold text-slate-400">Home Address</span>
                          <span className="font-semibold text-slate-650 flex items-start gap-1.5 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-350 flex-shrink-0 mt-0.5" />
                            <span>{patientDetails.address}</span>
                          </span>
                        </div>
                      )}

                      {patientDetails.emergency_contact_name && (
                        <div className="flex flex-col gap-1 text-xs border-t border-slate-50 pt-3">
                          <span className="font-bold text-slate-400">Emergency Contact</span>
                          <span className="font-extrabold text-slate-700 mt-0.5">
                            {patientDetails.emergency_contact_name}{' '}
                            <span className="text-[10px] font-semibold text-slate-400">({patientDetails.emergency_contact_phone})</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 border-t border-slate-50 bg-slate-50/50 flex gap-2.5">
                    <button
                      type="button"
                      onClick={handleCloseDetails}
                      className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-colors font-display text-center"
                    >
                      Close Profile
                    </button>
                  </div>
                </>
              ) : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PatientsPage;
