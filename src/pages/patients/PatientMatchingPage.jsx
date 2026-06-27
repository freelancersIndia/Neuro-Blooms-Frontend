import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { X, Calendar, Phone } from 'lucide-react';

import { usePatientMatches, useLinkPatient, useSearchPatients, useCreatePatient, usePatientPreview, mapPatientPreviewToUI } from '../../hooks/usePatientMatches';
import PatientMatchingHeader from '../../components/patients/PatientMatchingHeader';
import PatientMatchingSummary from '../../components/patients/PatientMatchingSummary';
import ManualPatientSearch from '../../components/patients/ManualPatientSearch';
import MatchingPatientCard from '../../components/patients/MatchingPatientCard';
import PatientSummarySidebar from '../../components/patients/PatientSummarySidebar';
import EmptyMatchingState from '../../components/patients/EmptyMatchingState';
import CreatePatientCTA from '../../components/patients/CreatePatientCTA';
import LoadingSkeleton from '../../components/patients/LoadingSkeleton';

export const PatientMatchingPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchFilters, setSearchFilters] = useState({ searchQuery: '', searchType: 'Mobile Number' });
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Detail modal ID
  const [selectedPatientScore, setSelectedPatientScore] = useState(null);

  // React Query Hooks
  const { data, isLoading, isError, refetch } = usePatientMatches(requestId);
  const linkPatientMutation = useLinkPatient();
  const createPatientMutation = useCreatePatient();

  // Call manual search query when searchQuery is entered
  const { data: searchResults, isLoading: isSearchLoading } = useSearchPatients(
    searchFilters.searchQuery,
    searchFilters.searchType
  );

  // Patient preview from backend
  const { data: previewData, isLoading: isPreviewLoading } = usePatientPreview(selectedPatientId);

  const selectedPatient = useMemo(() => {
    return mapPatientPreviewToUI(previewData, selectedPatientScore);
  }, [previewData, selectedPatientScore]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    toast.promise(
      new Promise((resolve) => {
        setTimeout(async () => {
          await refetch();
          resolve();
        }, 1000);
      }),
      {
        loading: 'Refreshing search results...',
        success: 'Duplicate detection rerun completed successfully.',
        error: 'Failed to refresh.'
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
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleManualSearch = ({ searchQuery, searchType }) => {
    setSearchFilters({ searchQuery, searchType });
    if (searchQuery) {
      toast.success(`Searching patients by ${searchType}...`, {
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }
      });
    }
  };

  const handleLinkPatient = async (patient) => {
    const confirmLink = window.confirm(
      `Are you sure you want to link patient ${patient.name} (${patient.id}) to appointment request ${requestId}?`
    );
    if (!confirmLink) return;

    try {
      await toast.promise(
        linkPatientMutation.mutateAsync({ requestId, patientId: patient.id }),
        {
          loading: 'Linking patient...',
          success: (res) => res.message,
          error: (err) => `Failed to link: ${err.message || err}`
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
      // Navigate receptionist back to requests page after linking
      navigate('/admin/appointments/requests');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNewPatient = async () => {
    const confirmCreate = window.confirm(
      `Are you sure you want to create a new patient profile from this appointment request?`
    );
    if (!confirmCreate) return;

    try {
      await toast.promise(
        createPatientMutation.mutateAsync(requestId),
        {
          loading: 'Creating patient profile...',
          success: (res) => res.message,
          error: (err) => `Failed to create patient: ${err.message || err}`
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
      // Navigate receptionist back to requests page after creating
      navigate('/admin/appointments/requests');
    } catch (err) {
      console.error(err);
    }
  };

  const isMatchesLoading = isLoading || (!!searchFilters.searchQuery.trim() && isSearchLoading);

  if (isMatchesLoading) {
    return (
      <div className="p-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[400px] select-none text-left">
        <div className="bg-white border border-rose-100 rounded-[20px] p-8 text-center max-w-md mx-auto shadow-sm my-10">
          <div className="text-rose-500 text-sm font-black font-display uppercase tracking-wider">
            Unable to load patient matches
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-2.5 leading-relaxed">
            The system encountered an issue fetching duplicate match candidates for this request. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-colors font-display"
          >
            Retry Search
          </button>
        </div>
      </div>
    );
  }

  const { request } = data;

  // Switched from local filtering to backend search integration
  const displayMatches = searchFilters.searchQuery.trim()
    ? (searchResults || [])
    : (data?.matches || []);

  // Determine highest match score
  const bestScore = displayMatches.length > 0 ? Math.max(...displayMatches.map((m) => m.score || 0)) : 0;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Left Side: Dynamic Workspace Area */}
        <div className="xl:col-span-3 space-y-6">
          {/* Header */}
          <PatientMatchingHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

          {/* Summary Alert */}
          {displayMatches.length > 0 && !searchFilters.searchQuery.trim() && (
            <PatientMatchingSummary bestScore={bestScore} matchCount={displayMatches.length} />
          )}

          {/* Manual Search */}
          <ManualPatientSearch onSearch={handleManualSearch} />

          {/* Match Listings */}
          <div className="space-y-4.5">
            <div className="flex flex-col text-left">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight font-display">
                {searchFilters.searchQuery.trim() ? 'Manual Search Results' : 'Possible Matching Patients'} ({displayMatches.length})
              </h3>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5 font-display uppercase tracking-wider">
                {searchFilters.searchQuery.trim() ? 'Registry patients matching search criteria' : 'Patients are ranked by match score'}
              </p>
            </div>

            {displayMatches.length === 0 ? (
              <EmptyMatchingState onCreatePatient={handleCreateNewPatient} />
            ) : (
              <div className="flex flex-col gap-4">
                {displayMatches.map((patient, index) => (
                  <MatchingPatientCard
                    key={patient.id}
                    patient={patient}
                    isBestMatch={index === 0 && patient.score >= 90}
                    onLink={handleLinkPatient}
                    onView={(pat) => {
                      setSelectedPatientId(pat.realId || pat.id);
                      setSelectedPatientScore(pat.score);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bottom CTA to Create Patient */}
          {displayMatches.length > 0 && <CreatePatientCTA onCreatePatient={handleCreateNewPatient} />}
        </div>

        {/* Right Side: Sticky Request Details Panel */}
        <div className="xl:col-span-1 xl:sticky xl:top-6">
          <PatientSummarySidebar request={request} />
        </div>
      </div>

      {/* Patient Detail modal overlay */}
      <AnimatePresence>
        {selectedPatientId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPatientId(null)}
              className="absolute inset-0 bg-slate-900"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-2xl max-w-md w-full overflow-hidden z-10 relative flex flex-col text-left"
            >
              {isPreviewLoading ? (
                <div className="p-10 flex flex-col items-center justify-center min-h-[320px]">
                  <div className="w-10 h-10 border-4 border-slate-100 border-t-purple-600 rounded-full animate-spin" />
                  <span className="text-xs font-bold text-slate-400 mt-4.5 font-display">Loading profile preview...</span>
                </div>
              ) : selectedPatient ? (
                <>
                  {/* Modal Header */}
                  <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-purple-600 tracking-wider font-display">
                        {selectedPatient.id}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-800 mt-0.5 tracking-tight font-display">
                        Patient Profile
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPatientId(null)}
                      className="w-8 h-8 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0">
                        <img
                          src={selectedPatient.avatar}
                          alt={selectedPatient.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-sm font-extrabold text-slate-800 tracking-tight font-display">
                          {selectedPatient.name}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                          {selectedPatient.gender} • {selectedPatient.age}
                        </span>
                        {selectedPatient.score !== null && selectedPatient.score !== undefined && (
                          <span className="inline-flex items-center bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wide font-display mt-2 w-fit">
                            Match Score: {selectedPatient.score}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Patient Information sections */}
                    <div className="space-y-3.5">
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="font-bold text-slate-400">Date of Birth</span>
                        <span className="font-extrabold text-slate-700 flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          <span>{selectedPatient.dob}</span>
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="font-bold text-slate-400">Last Clinic Visit</span>
                        <span className="font-extrabold text-slate-700 flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          <span>{selectedPatient.lastVisit}</span>
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 text-xs border-t border-slate-50 pt-3">
                        <span className="font-bold text-slate-400">Parent Info</span>
                        <span className="font-extrabold text-slate-700 mt-0.5">
                          {selectedPatient.parentName} <span className="text-[10px] font-semibold text-slate-400">({selectedPatient.relationship})</span>
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 text-xs">
                        <span className="font-bold text-slate-400">Parent Contact</span>
                        <span className="font-extrabold text-slate-700 flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3.5 h-3.5 text-slate-300" />
                          <span>{selectedPatient.parentPhone}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="p-4 border-t border-slate-50 bg-slate-50/50 flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPatientId(null);
                        handleLinkPatient(selectedPatient);
                      }}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-colors font-display text-center"
                    >
                      Link This Patient
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPatientId(null)}
                      className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer font-display text-center"
                    >
                      Close
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

export default PatientMatchingPage;
