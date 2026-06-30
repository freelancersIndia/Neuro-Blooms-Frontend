import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronRight, Calendar, AlertTriangle, RefreshCw, User } from 'lucide-react';
import toast from 'react-hot-toast';

import doctorsService from '../services/doctors.service';
import AvailabilityForm from '../components/AvailabilityForm';
import AvailabilitySummary from '../components/AvailabilitySummary';

// Skeleton Loader components for premium shimmer effect

const SkeletonForm = () => (
  <div className="w-full h-full bg-white border border-slate-200/60 rounded-[24px] p-6 flex flex-col justify-between animate-pulse">
    <div className="space-y-6">
      <div className="h-4 bg-slate-200 rounded w-1/4" />
      <div className="h-16 bg-slate-100 rounded-2xl" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-10 bg-slate-100 rounded-xl w-3/4" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-1/3" />
        <div className="h-10 bg-slate-100 rounded-xl w-32" />
      </div>
    </div>
    <div className="h-12 bg-slate-100 rounded-xl mt-6" />
  </div>
);

const SkeletonSummary = () => (
  <div className="w-full h-full flex flex-col gap-4 animate-pulse">
    <div className="bg-slate-100 rounded-[24px] p-5 flex-1 min-h-[160px] border border-slate-200/60" />
    <div className="bg-slate-100 rounded-[24px] p-5 flex-1 min-h-[160px] border border-slate-200/60" />
  </div>
);

export const DoctorAvailabilityPage = () => {
  const queryClient = useQueryClient();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formValues, setFormValues] = useState(null);

  // 1. Fetch doctors list
  const {
    data: doctors = [],
    isLoading: isLoadingDoctors,
    isError: isDoctorsError,
    error: doctorsError,
    refetch: refetchDoctors
  } = useQuery({
    queryKey: ['doctorsList'],
    queryFn: doctorsService.getDoctorsList,
  });

  // Set initial doctor when list loads
  useEffect(() => {
    if (doctors.length > 0 && !selectedDoctor) {
      setSelectedDoctor(doctors[0]);
    }
  }, [doctors, selectedDoctor]);

  // 2. Fetch availability for selected doctor
  const {
    data: availability,
    isLoading: isLoadingAvailability,
    isError: isAvailabilityError,
    error: availabilityError,
    refetch: refetchAvailability
  } = useQuery({
    queryKey: ['doctorAvailability', selectedDoctor?.id],
    queryFn: () => doctorsService.getDoctorAvailability(selectedDoctor.id),
    enabled: !!selectedDoctor?.id,
    retry: 1
  });

  // Fetch doctor details (includes nested availability)
  const {
    data: doctorDetails,
    isLoading: isLoadingDetails
  } = useQuery({
    queryKey: ['doctorDetails', selectedDoctor?.id],
    queryFn: () => doctorsService.getDoctorDetails(selectedDoctor.id),
    enabled: !!selectedDoctor?.id,
  });

  // 3. Mutation for updating availability
  const updateMutation = useMutation({
    mutationFn: (payload) => doctorsService.updateDoctorAvailability(selectedDoctor.id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['doctorAvailability', selectedDoctor.id] });
      toast.success('Doctor availability updated successfully.');
    },
    onError: (err) => {
      // Handles inline display/general alerts
      const message = err.response?.data?.message || 'Failed to update availability settings.';
      toast.error(message);
    }
  });

  const handleSave = (data) => {
    updateMutation.mutate(data);
  };

  // Switch doctor trigger
  const handleDoctorSelect = (doc) => {
    setSelectedDoctor(doc);
  };

  // Loading / Spinner State
  const isLoading = isLoadingDoctors || (!!selectedDoctor && (isLoadingAvailability || isLoadingDetails));

  // Check for specific error status codes
  const errorStatus = availabilityError?.response?.status || doctorsError?.response?.status;
  const isForbidden = errorStatus === 403;
  const isNotFound = errorStatus === 404;
  const isServerError = errorStatus >= 500 || isDoctorsError || (isAvailabilityError && !isNotFound && !isForbidden);

  // Render 500 Server Error State
  if (isServerError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center font-display">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#EF4444] mb-4">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-lg font-bold text-[#0F172A]">Server Connection Failed</h3>
        <p className="text-xs text-[#64748B] mt-2 max-w-[360px] leading-relaxed">
          Could not connect to the doctor scheduling service. Please check your connection or try again.
        </p>
        <button
          onClick={() => {
            refetchDoctors();
            if (selectedDoctor) refetchAvailability();
          }}
          className="mt-6 h-9 px-5 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-purple-700 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <RefreshCw size={14} />
          Retry Connection
        </button>
      </div>
    );
  }

  // Render 403 Forbidden State
  if (isForbidden) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center font-display">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#F59E0B] mb-4">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-lg font-bold text-[#0F172A]">Access Denied</h3>
        <p className="text-xs text-[#64748B] mt-2 max-w-[360px] leading-relaxed">
          You don't have permission to modify doctor availability settings.
        </p>
      </div>
    );
  }

  // Render 404 Not Found / Empty State
  if (isNotFound || (!isLoading && selectedDoctor && !availability)) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center font-display">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <Calendar size={32} />
        </div>
        <h3 className="text-lg font-bold text-[#0F172A]">Availability Not Configured</h3>
        <p className="text-xs text-[#64748B] mt-2 max-w-[360px] leading-relaxed">
          Default availability preferences will be created automatically when saved.
        </p>
        <button
          onClick={() => {
            // Trigger save with default values
            handleSave({
              accepting_appointments: true,
              consultation_duration: 45,
              max_daily_patients: 10
            });
          }}
          className="mt-6 h-9 px-5 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-purple-700 transition-colors cursor-pointer shadow-sm"
        >
          Configure Availability
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 text-left font-display select-none">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2.5 text-sm font-medium text-[#64748B] select-none flex-shrink-0">
        <span>Home</span>
        <ChevronRight size={14} />
        <span>Doctors</span>
        <ChevronRight size={14} />
        <span className="text-[#0F172A] font-semibold">Doctor Availability</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3 select-none">
          <div className="w-11 h-11 rounded-2xl bg-[#F3EEFF] text-[#7C3AED] flex items-center justify-center shadow-sm">
            <Calendar size={22} />
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">Doctor Availability</h2>
            <span className="text-xs font-semibold text-[#64748B] mt-0.5">
              Configure appointment preferences, consultation duration and patient capacity.
            </span>
          </div>
        </div>
      </div>

      {/* Doctor Information Card */}
      <div className="bg-white border border-[#E8ECF4] rounded-[20px] p-4 flex items-center justify-between shadow-[0_8px_30px_rgba(15,23,42,0.03)] h-[110px]">
        <div className="flex items-center gap-4">
          <img
            src={doctorDetails?.profile_image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120&h=120'}
            alt={doctorDetails?.full_name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
          />
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#1E293B]">{doctorDetails?.full_name}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold bg-green-50 text-green-700">
                Active
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#64748B] mt-0.5">
              {doctorDetails?.specialization} • <span className="text-[#5B3FD6] font-bold">{doctorDetails?.qualification}</span> • {doctorDetails?.experience} Years Exp.
            </span>
          </div>

          <div className="h-8 w-[1px] bg-slate-100 mx-2" />

          <div className="flex items-center gap-6 text-xs font-semibold text-slate-500">
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Consultation</span>
              <span className="text-[#1E293B] font-bold mt-0.5">{doctorDetails?.availability?.consultation_duration || 30} mins</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Max Patients</span>
              <span className="text-[#1E293B] font-bold mt-0.5">{doctorDetails?.availability?.max_daily_patients || 15} Patients</span>
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

        {/* Doctor selector dropdown */}
        <div className="flex flex-col text-right">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5 select-none">
            Select Doctor
          </label>
          <select
            value={selectedDoctor?.id || ''}
            onChange={(e) => {
              const doc = doctors.find(d => d.id === e.target.value);
              if (doc) setSelectedDoctor(doc);
            }}
            className="h-10 px-3.5 bg-white border border-[#E5E7EB] hover:border-slate-400 rounded-xl text-xs font-bold text-[#1E293B] outline-none cursor-pointer focus:ring-2 focus:ring-[#5B3FD6]/10 min-w-[220px]"
          >
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>
      </div>



      {/* Main Content Splitted Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Side: Form Card */}
        <div className="col-span-8">
          {isLoading ? (
            <SkeletonForm />
          ) : (
            <AvailabilityForm
              initialData={availability}
              onSave={handleSave}
              isSaving={updateMutation.isPending}
              lastUpdated={{
                updated_at: availability?.last_updated_at,
                updated_by: availability?.last_updated_by
              }}
              onValuesChange={setFormValues}
            />
          )}
        </div>

        {/* Right Side: Preview & Info Cards */}
        <div className="col-span-4">
          {isLoading ? (
            <SkeletonSummary />
          ) : (
            <AvailabilitySummary
              formValues={formValues}
              bookings={availability?.today_bookings || 6}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailabilityPage;
