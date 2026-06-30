import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  RefreshCw, 
  GripVertical,
  Sun,
  Lock,
  Copy
} from 'lucide-react';
import toast from 'react-hot-toast';

import doctorsService from '../services/doctors.service';
import { clinicService } from '../../clinic-management/services/clinic.service';
import WeeklyTimePicker from '../../clinic-management/components/WeeklyTimePicker';

// Time parsing helpers
const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const parts = timeStr.split(' ');
  if (parts.length < 2) return 0;
  const time = parts[0];
  const modifier = parts[1];
  const timeParts = time.split(':');
  if (timeParts.length < 2) return 0;
  let hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
};

const formatMinutesToHoursMins = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
};

const getWorkingHoursString = (isWorking, opTime, clTime) => {
  if (!isWorking || !opTime || !clTime) return '0h 00m';
  const op = parseTimeToMinutes(opTime);
  const cl = parseTimeToMinutes(clTime);
  if (cl <= op) return '0h 00m';
  return formatMinutesToHoursMins(cl - op);
};

const getWeekdayLabel = (day) => {
  return day.charAt(0) + day.slice(1).toLowerCase();
};

export const DoctorWorkingDaysPage = () => {
  const queryClient = useQueryClient();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [workingDays, setWorkingDays] = useState([]);
  const [originalWorkingDays, setOriginalWorkingDays] = useState([]);

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
    if (doctors.length > 0 && !selectedDoctor) {
      setSelectedDoctor(doctors[0]);
    }
  }, [doctors, selectedDoctor]);

  // 2. Fetch doctor details (includes nested availability)
  const {
    data: doctorDetails,
    isLoading: isLoadingDetails,
    isError: isDetailsError,
    refetch: refetchDetails
  } = useQuery({
    queryKey: ['doctorDetails', selectedDoctor?.id],
    queryFn: () => doctorsService.getDoctorDetails(selectedDoctor.id),
    enabled: !!selectedDoctor?.id,
  });

  // 3. Fetch doctor working days
  const {
    data: serverWorkingDays,
    isLoading: isLoadingWorkingDays,
    isError: isWorkingDaysError,
    refetch: refetchWorkingDays
  } = useQuery({
    queryKey: ['doctorWorkingDays', selectedDoctor?.id],
    queryFn: () => doctorsService.getDoctorWorkingDays(selectedDoctor.id),
    enabled: !!selectedDoctor?.id,
  });

  // 4. Fetch clinic weekly schedule for validation
  const {
    data: clinicSchedule = []
  } = useQuery({
    queryKey: ['weeklySchedule'],
    queryFn: clinicService.getWeeklySchedule,
  });

  // Populate workingDays state when server working days load
  useEffect(() => {
    if (serverWorkingDays) {
      setWorkingDays(JSON.parse(JSON.stringify(serverWorkingDays)));
      setOriginalWorkingDays(JSON.parse(JSON.stringify(serverWorkingDays)));
    }
  }, [serverWorkingDays]);

  // Mutation to save schedule changes
  const saveMutation = useMutation({
    mutationFn: (payload) => doctorsService.updateDoctorWorkingDays(selectedDoctor.id, payload),
    onSuccess: (newData) => {
      toast.success('Doctor Working Days updated successfully.');
      queryClient.setQueryData(['doctorWorkingDays', selectedDoctor.id], newData);
      setWorkingDays(JSON.parse(JSON.stringify(newData)));
      setOriginalWorkingDays(JSON.parse(JSON.stringify(newData)));
    },
    onError: (err) => {
      const message = err.response?.data?.message || err.message || 'Failed to update working days.';
      toast.error(message);
    }
  });

  // Handlers for bulk actions
  const handleOpenAll = () => {
    const updated = workingDays.map(day => {
      // Find clinic schedule for this day to get default hours
      const clinicDay = clinicSchedule.find(d => d.weekday === day.weekday);
      const defaultOpen = clinicDay ? clinicDay.opening_time : '09:00 AM';
      const defaultClose = clinicDay ? clinicDay.closing_time : '05:00 PM';
      
      return {
        ...day,
        is_working: true,
        opening_time: day.opening_time || defaultOpen,
        closing_time: day.closing_time || defaultClose
      };
    });
    setWorkingDays(updated);
    toast.success('All days set to working.');
  };

  const handleCloseAll = () => {
    const updated = workingDays.map(day => ({
      ...day,
      is_working: false,
      opening_time: null,
      closing_time: null
    }));
    setWorkingDays(updated);
    toast.success('All days set to off.');
  };

  const handleCopyClinic = () => {
    if (clinicSchedule.length === 0) {
      toast.error('Clinic schedule not loaded.');
      return;
    }
    const updated = workingDays.map(day => {
      const clinicDay = clinicSchedule.find(d => d.weekday === day.weekday);
      if (clinicDay) {
        return {
          ...day,
          is_working: clinicDay.is_open,
          opening_time: clinicDay.is_open ? clinicDay.opening_time : null,
          closing_time: clinicDay.is_open ? clinicDay.closing_time : null
        };
      }
      return day;
    });
    setWorkingDays(updated);
    toast.success('Copied schedule from clinic operating hours.');
  };

  const handleReset = () => {
    setWorkingDays(JSON.parse(JSON.stringify(originalWorkingDays)));
    toast.success('Schedule reset to last saved state.');
  };

  const handleToggleWorking = (index) => {
    const updated = [...workingDays];
    const day = updated[index];
    day.is_working = !day.is_working;
    if (day.is_working) {
      const clinicDay = clinicSchedule.find(d => d.weekday === day.weekday);
      day.opening_time = clinicDay?.opening_time || '09:00 AM';
      day.closing_time = clinicDay?.closing_time || '05:00 PM';
    } else {
      day.opening_time = null;
      day.closing_time = null;
    }
    setWorkingDays(updated);
  };

  const handleTimeChange = (index, field, value) => {
    const updated = [...workingDays];
    updated[index][field] = value;
    setWorkingDays(updated);
  };

  const handleSave = () => {
    // Perform validation before sending to backend
    for (const day of workingDays) {
      if (day.is_working) {
        if (!day.opening_time || !day.closing_time) {
          toast.error(`Opening and closing times are required for ${getWeekdayLabel(day.weekday)}.`);
          return;
        }
        const openMin = parseTimeToMinutes(day.opening_time);
        const closeMin = parseTimeToMinutes(day.closing_time);
        if (closeMin <= openMin) {
          toast.error(`Closing time must be after opening time on ${getWeekdayLabel(day.weekday)}.`);
          return;
        }

        // Validate against clinic schedule
        const clinicDay = clinicSchedule.find(d => d.weekday === day.weekday);
        if (clinicDay) {
          if (!clinicDay.is_open) {
            toast.error(`Cannot set doctor working on ${getWeekdayLabel(day.weekday)} because the clinic is closed.`);
            return;
          }
          const clinicOpenMin = parseTimeToMinutes(clinicDay.opening_time);
          const clinicCloseMin = parseTimeToMinutes(clinicDay.closing_time);
          if (openMin < clinicOpenMin || closeMin > clinicCloseMin) {
            toast.error(
              `Working hours on ${getWeekdayLabel(day.weekday)} must fall within clinic operating hours (${clinicDay.opening_time} - ${clinicDay.closing_time}).`
            );
            return;
          }
        }
      }
    }

    saveMutation.mutate(workingDays);
  };

  // Calculations for stats
  const workingDaysCount = workingDays.filter(d => d.is_working).length;
  const totalMinutes = workingDays.reduce((acc, day) => {
    if (!day.is_working || !day.opening_time || !day.closing_time) return acc;
    return acc + (parseTimeToMinutes(day.closing_time) - parseTimeToMinutes(day.opening_time));
  }, 0);
  const totalHoursStr = formatMinutesToHoursMins(totalMinutes);

  const hasChanges = JSON.stringify(workingDays) !== JSON.stringify(originalWorkingDays);

  const isLoading = isLoadingDoctors || isLoadingDetails || isLoadingWorkingDays;
  const isError = isDoctorsError || isDetailsError || isWorkingDaysError;

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-4 text-left font-display select-none">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2.5 text-sm font-medium text-[#64748B] select-none flex-shrink-0">
          <span>Administration</span>
          <ChevronRight size={14} />
          <span>Scheduling</span>
          <ChevronRight size={14} />
          <span className="text-[#0F172A] font-semibold">Doctor Working Days</span>
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
          <div className="w-60 h-10 bg-slate-100 rounded-2xl" />
        </div>



        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-12 gap-4 flex-1">
          <div className="col-span-8 bg-white border border-slate-200/60 rounded-[24px] p-6 h-[400px] animate-pulse" />
          <div className="col-span-4 flex flex-col gap-4">
            <div className="bg-white border border-slate-200/60 rounded-[24px] p-6 h-[220px] animate-pulse" />
            <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-6 h-[160px] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center p-8 text-center font-display">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#EF4444] mb-4">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-lg font-bold text-[#0F172A]">Connection Failed</h3>
        <p className="text-xs text-[#64748B] mt-2 max-w-[360px] leading-relaxed">
          Failed to load doctor scheduling records. Please make sure the backend server is running.
        </p>
        <button
          onClick={() => {
            refetchDoctors();
            if (selectedDoctor) {
              refetchDetails();
              refetchWorkingDays();
            }
          }}
          className="mt-6 h-10 px-6 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-purple-700 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
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
        <span className="text-[#0F172A] font-semibold">Doctor Working Days</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#F3EEFF] text-[#7C3AED] flex items-center justify-center shadow-sm">
            <Calendar size={22} />
          </div>
          <div className="flex flex-col text-left">
            <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">Doctor Working Days</h2>
            <span className="text-xs font-semibold text-[#64748B] mt-0.5">
              Configure weekly working days and time windows for this doctor.
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
        {/* Weekly Working Schedule Table */}
        <div className="col-span-12">
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)] text-left flex flex-col justify-between h-full">
            <div>
              {/* Toolbar Section inside left card */}
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-sm font-bold text-[#0F172A]">Weekly Schedule</h3>
                <div className="flex items-center gap-2 select-none">
                  <button
                    type="button"
                    onClick={handleOpenAll}
                    className="h-8 px-3 rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#22C55E] bg-[#ECFDF5] hover:bg-[#D1FAE5] transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sun size={13} />
                    Open All Days
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseAll}
                    className="h-8 px-3 rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#EF4444] bg-[#FEF2F2] hover:bg-[#FEE2E2] transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock size={13} />
                    Close All Days
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyClinic}
                    className="h-8 px-3 rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#7C3AED] bg-[#F3EEFF] hover:bg-[#EBE3FF] transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy size={13} />
                    Copy From Clinic Schedule
                  </button>
                </div>
              </div>

              {/* Table Container */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-[#64748B] uppercase tracking-wider select-none">
                      <th className="py-2.5 px-3 w-8"></th>
                      <th className="py-2.5 px-3">Day</th>
                      <th className="py-2.5 px-3 text-center">Working Day</th>
                      <th className="py-2.5 px-3">Start Time</th>
                      <th className="py-2.5 px-3">End Time</th>
                      <th className="py-2.5 px-3 text-center">Working Hours</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-[#0F172A]">
                    {workingDays.map((day, idx) => (
                      <tr key={day.weekday} className="hover:bg-slate-50/50 transition-colors">
                        {/* Drag Handle Icon */}
                        <td className="py-2 px-3 text-slate-400">
                          <GripVertical size={14} className="cursor-grab" />
                        </td>
                        
                        {/* Weekday Label */}
                        <td className="py-2 px-3 font-bold text-slate-700">
                          {getWeekdayLabel(day.weekday)}
                        </td>

                        {/* Working Toggle Switch */}
                        <td className="py-2 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleWorking(idx)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 cursor-pointer ${
                              day.is_working ? 'bg-[#7C3AED]' : 'bg-slate-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 ${
                                day.is_working ? 'translate-x-4.5' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </td>

                        {/* Start Time Select */}
                        <td className="py-2 px-3 w-32">
                          <WeeklyTimePicker
                            value={day.opening_time}
                            onChange={(val) => handleTimeChange(idx, 'opening_time', val)}
                            disabled={!day.is_working}
                            placeholder="--:--"
                          />
                        </td>

                        {/* End Time Select */}
                        <td className="py-2 px-3 w-32">
                          <WeeklyTimePicker
                            value={day.closing_time}
                            onChange={(val) => handleTimeChange(idx, 'closing_time', val)}
                            disabled={!day.is_working}
                            placeholder="--:--"
                          />
                        </td>

                        {/* Working Hours Duration */}
                        <td className="py-2 px-3 text-center text-slate-500 font-medium w-24">
                          {getWorkingHoursString(day.is_working, day.opening_time, day.closing_time)}
                        </td>

                        {/* Status Badge */}
                        <td className="py-2 px-3 text-center w-24">
                          <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider ${
                            day.is_working 
                              ? 'bg-[#ECFDF5] text-[#10B981]' 
                              : 'bg-red-50 text-[#EF4444]'
                          }`}>
                            {day.is_working ? 'Working' : 'Off'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Footer actions inside card */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 flex-shrink-0">
              <span className="text-[10px] font-semibold text-[#64748B]">
                Last updated: May 20, 2026 10:30 AM By Dr. Sarah Johnson
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!hasChanges || saveMutation.isPending}
                  className="h-9 px-5 rounded-xl border border-[#CBD5E1] text-xs font-bold text-[#64748B] hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!hasChanges || saveMutation.isPending}
                  className="h-9 px-5 rounded-xl bg-[#6D28D9] text-xs font-bold text-white hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  {saveMutation.isPending ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorWorkingDaysPage;
