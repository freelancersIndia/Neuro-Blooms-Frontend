import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  ChevronRight, 
  RefreshCw, 
  AlertCircle, 
  Check, 
  Clock, 
  GripVertical, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { clinicService } from '../services/clinic.service';
import WeeklyStatistics from '../components/WeeklyStatistics';
import WeeklySkeleton from '../components/WeeklySkeleton';
import OpenCloseSwitch from '../components/OpenCloseSwitch';
import WeeklyTimePicker from '../components/WeeklyTimePicker';
import StatusBadge from '../components/StatusBadge';
import WorkingHourBadge from '../components/WorkingHourBadge';
import InformationBanner from '../components/InformationBanner';

// Helper to convert weekday keys to friendly display names
const getWeekdayLabel = (day) => {
  return day.charAt(0) + day.slice(1).toLowerCase();
};

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

const getWorkingHoursString = (isOpen, opTime, clTime) => {
  if (!isOpen || !opTime || !clTime) return '0h 00m';
  const op = parseTimeToMinutes(opTime);
  const cl = parseTimeToMinutes(clTime);
  if (cl <= op) return '0h 00m';
  return formatMinutesToHoursMins(cl - op);
};

export const WeeklySchedulePage = () => {
  const queryClient = useQueryClient();
  const [openMobileCard, setOpenMobileCard] = useState({});

  // Form setup
  const { 
    control, 
    handleSubmit, 
    watch, 
    setValue, 
    reset, 
    formState: { isDirty, errors } 
  } = useForm({
    defaultValues: {
      schedules: []
    }
  });

  const { fields } = useFieldArray({
    control,
    name: 'schedules'
  });

  const formValues = watch();

  // Query to fetch schedule
  const { data: serverData, isLoading, isError, refetch } = useQuery({
    queryKey: ['weeklySchedule'],
    queryFn: clinicService.getWeeklySchedule,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Reset form when data is loaded
  useEffect(() => {
    if (serverData && serverData.length > 0) {
      reset({ schedules: serverData });
    }
  }, [serverData, reset]);

  // Mutation to update schedule
  const mutation = useMutation({
    mutationFn: clinicService.updateWeeklySchedule,
    onSuccess: (newData) => {
      toast.success('Weekly schedule updated successfully.');
      queryClient.setQueryData(['weeklySchedule'], newData);
      reset({ schedules: newData });
    },
    onError: (err) => {
      console.error('Failed to save schedule:', err);
      toast.error(err.message || 'Unable to save weekly schedule.');
    }
  });

  // Warn on unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Bulk Actions
  const handleOpenAll = () => {
    const schedules = watch('schedules');
    schedules.forEach((_, index) => {
      setValue(`schedules.${index}.is_open`, true, { shouldDirty: true, shouldValidate: true });
      setValue(`schedules.${index}.opening_time`, '09:00 AM', { shouldDirty: true, shouldValidate: true });
      setValue(`schedules.${index}.closing_time`, '06:00 PM', { shouldDirty: true, shouldValidate: true });
    });
    toast.success('All days opened with default hours (09:00 AM - 06:00 PM).');
  };

  const handleCloseAll = () => {
    const schedules = watch('schedules');
    schedules.forEach((_, index) => {
      setValue(`schedules.${index}.is_open`, false, { shouldDirty: true, shouldValidate: true });
      setValue(`schedules.${index}.opening_time`, null, { shouldDirty: true, shouldValidate: true });
      setValue(`schedules.${index}.closing_time`, null, { shouldDirty: true, shouldValidate: true });
    });
    toast.success('All days closed.');
  };

  const handleCopyMonday = () => {
    const schedules = watch('schedules');
    if (schedules.length === 0) return;
    const monday = schedules[0]; // MONDAY is always first
    
    // Copy to other weekdays: Tuesday (1), Wednesday (2), Thursday (3), Friday (4)
    for (let i = 1; i <= 4; i++) {
      setValue(`schedules.${i}.is_open`, monday.is_open, { shouldDirty: true, shouldValidate: true });
      setValue(`schedules.${i}.opening_time`, monday.opening_time, { shouldDirty: true, shouldValidate: true });
      setValue(`schedules.${i}.closing_time`, monday.closing_time, { shouldDirty: true, shouldValidate: true });
    }
    toast.success('Monday schedule copied to all weekdays (Tuesday - Friday).');
  };

  const handleResetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all changes to the last saved schedule?')) {
      reset({ schedules: serverData || [] });
      toast.success('Schedule reset to saved values.');
    }
  };

  const onSubmit = (formData) => {
    mutation.mutate(formData.schedules);
  };

  const toggleMobileCard = (index) => {
    setOpenMobileCard(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 text-left font-display">
        <div className="flex items-center gap-2.5 text-sm font-medium text-[#64748B]">
          <span>Home</span>
          <ChevronRight size={14} />
          <span>Administration</span>
          <ChevronRight size={14} />
          <span className="text-[#0F172A] font-semibold">Weekly Schedule</span>
        </div>
        <WeeklySkeleton />
      </div>
    );
  }

  if (isError || !formValues.schedules || formValues.schedules.length === 0) {
    return (
      <div className="w-full flex flex-col gap-6 text-left font-display items-center justify-center py-16 bg-white border border-[#E2E8F0] rounded-[20px] shadow-sm">
        <AlertTriangle className="text-red-500 w-12 h-12" />
        <h3 className="text-lg font-bold text-[#0F172A] mt-4">No weekly schedule available.</h3>
        <p className="text-sm text-[#64748B] mt-1">We encountered an issue loading the weekly schedule from the server.</p>
        <button
          onClick={() => refetch()}
          className="mt-6 h-11 px-6 rounded-xl bg-[#7C3AED] text-white font-bold text-sm hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Reload Schedule
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 text-left font-display">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2.5 text-sm font-medium text-[#64748B] select-none">
        <span>Home</span>
        <ChevronRight size={14} />
        <span>Administration</span>
        <ChevronRight size={14} />
        <span className="text-[#0F172A] font-semibold">Weekly Schedule</span>
      </div>

      {/* Unsaved Changes Banner */}
      {isDirty && (
        <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center gap-3 animate-fade-in text-amber-800 text-xs font-semibold select-none">
          <AlertCircle className="text-amber-600 flex-shrink-0" size={16} />
          <span>You have unsaved changes. Remember to save your configuration.</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5 select-none">
          <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">Weekly Schedule</h2>
          <span className="text-xs font-semibold text-[#64748B]">
            Configure the clinic's default operating days and working hours for the entire week.
          </span>
        </div>
        
        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!isDirty || mutation.isPending}
            onClick={handleResetToDefault}
            className="h-9 px-4 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B] bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Reset to Default
          </button>
          <button
            type="button"
            disabled={!isDirty || mutation.isPending}
            onClick={handleSubmit(onSubmit)}
            className="h-9 px-5 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm cursor-pointer"
          >
            {mutation.isPending ? (
              <>
                <RefreshCw className="animate-spin" size={14} />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <WeeklyStatistics schedules={formValues.schedules} />

      {/* Main Card */}
      <div className="w-full bg-white border border-[#E2E8F0] rounded-[20px] shadow-sm overflow-hidden flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Card Header & Bulk Actions */}
          <div className="p-5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EEF2F7]">
            <div className="flex flex-col text-left">
              <h3 className="text-base font-bold text-[#0F172A]">Weekly Schedule Configuration</h3>
              <p className="text-xs font-medium text-[#64748B] mt-0.5 leading-normal">
                Configure operating hours for each day of the week.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleOpenAll}
                disabled={mutation.isPending}
                className="h-8 px-3 rounded-xl border border-[#16A34A] text-xs font-bold text-[#16A34A] hover:bg-green-50/50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Open All Days
              </button>
              <button
                type="button"
                onClick={handleCloseAll}
                disabled={mutation.isPending}
                className="h-8 px-3 rounded-xl border border-[#DC2626] text-xs font-bold text-[#DC2626] hover:bg-red-50/50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Close All Days
              </button>
              <button
                type="button"
                onClick={handleCopyMonday}
                disabled={mutation.isPending}
                className="h-8 px-3 rounded-xl border border-[#2563EB] text-xs font-bold text-[#2563EB] hover:bg-blue-50/50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Copy Monday to Weekdays
              </button>
              <button
                type="button"
                onClick={() => refetch()}
                disabled={mutation.isPending}
                className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                title="Refresh"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Table (Desktop/Tablet) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EEF2F7] bg-[#F8FAFC]/50 sticky top-0 z-10">
                  <th className="py-3 px-8 text-xs font-bold text-[#64748B] uppercase tracking-wider w-1/5 bg-[#F8FAFC]">Day</th>
                  <th className="py-3 px-6 text-xs font-bold text-[#64748B] uppercase tracking-wider w-1/6 text-center bg-[#F8FAFC]">Open / Closed</th>
                  <th className="py-3 px-6 text-xs font-bold text-[#64748B] uppercase tracking-wider w-1/5 bg-[#F8FAFC]">Opening Time</th>
                  <th className="py-3 px-6 text-xs font-bold text-[#64748B] uppercase tracking-wider w-1/5 bg-[#F8FAFC]">Closing Time</th>
                  <th className="py-3 px-6 text-xs font-bold text-[#64748B] uppercase tracking-wider w-1/6 bg-[#F8FAFC]">Working Hours</th>
                  <th className="py-3 px-8 text-xs font-bold text-[#64748B] uppercase tracking-wider w-1/6 text-center bg-[#F8FAFC]">Status</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => {
                  const isOpen = watch(`schedules.${index}.is_open`);
                  const opTime = watch(`schedules.${index}.opening_time`);
                  const clTime = watch(`schedules.${index}.closing_time`);
                  
                  return (
                    <tr key={field.id} className="border-b border-[#F8FAFC] last:border-0 hover:bg-slate-50/40 transition-colors h-[54px]">
                      {/* Day Name */}
                      <td className="py-1.5 px-8 text-sm font-semibold text-[#0F172A]">
                        <div className="flex items-center gap-2">
                          <GripVertical size={16} className="text-[#94A3B8] cursor-grab active:cursor-grabbing" />
                          <span>{getWeekdayLabel(field.weekday)}</span>
                        </div>
                      </td>
                      
                      {/* Open/Closed Toggle */}
                      <td className="py-1.5 px-6 text-center">
                        <Controller
                          control={control}
                          name={`schedules.${index}.is_open`}
                          render={({ field: { value, onChange } }) => (
                            <OpenCloseSwitch
                              checked={value}
                              onChange={(val) => {
                                onChange(val);
                                if (!val) {
                                  setValue(`schedules.${index}.opening_time`, null);
                                  setValue(`schedules.${index}.closing_time`, null);
                                } else {
                                  setValue(`schedules.${index}.opening_time`, '09:00 AM');
                                  setValue(`schedules.${index}.closing_time`, '06:00 PM');
                                }
                              }}
                              disabled={mutation.isPending}
                            />
                          )}
                        />
                      </td>

                      {/* Opening Time */}
                      <td className="py-1.5 px-6">
                        <div className="flex flex-col gap-0.5 w-full max-w-[150px]">
                          <Controller
                            control={control}
                            name={`schedules.${index}.opening_time`}
                            rules={{
                              validate: (val) => {
                                if (isOpen && !val) return 'Opening time is required.';
                                return true;
                              }
                            }}
                            render={({ field: { value, onChange } }) => (
                              <WeeklyTimePicker
                                value={value}
                                onChange={onChange}
                                disabled={!isOpen || mutation.isPending}
                                error={!!errors.schedules?.[index]?.opening_time}
                              />
                            )}
                          />
                          {errors.schedules?.[index]?.opening_time && (
                            <span className="text-[10px] font-bold text-red-500">
                              {errors.schedules[index].opening_time.message}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Closing Time */}
                      <td className="py-1.5 px-6">
                        <div className="flex flex-col gap-0.5 w-full max-w-[150px]">
                          <Controller
                            control={control}
                            name={`schedules.${index}.closing_time`}
                            rules={{
                              validate: (val) => {
                                if (isOpen && !val) return 'Closing time is required.';
                                if (isOpen && val && opTime) {
                                  const op = parseTimeToMinutes(opTime);
                                  const cl = parseTimeToMinutes(val);
                                  if (cl <= op) return 'Must be after opening time.';
                                }
                                return true;
                              }
                            }}
                            render={({ field: { value, onChange } }) => (
                              <WeeklyTimePicker
                                value={value}
                                onChange={onChange}
                                disabled={!isOpen || mutation.isPending}
                                error={!!errors.schedules?.[index]?.closing_time}
                              />
                            )}
                          />
                          {errors.schedules?.[index]?.closing_time && (
                            <span className="text-[10px] font-bold text-red-500">
                              {errors.schedules[index].closing_time.message}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Working Hours */}
                      <td className="py-1.5 px-6">
                        <WorkingHourBadge hours={getWorkingHoursString(isOpen, opTime, clTime)} />
                      </td>

                      {/* Status */}
                      <td className="py-1.5 px-8 text-center">
                        <StatusBadge isOpen={isOpen} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Collapsible Cards */}
          <div className="md:hidden flex flex-col divide-y divide-[#EEF2F7]">
            {fields.map((field, index) => {
              const isOpen = watch(`schedules.${index}.is_open`);
              const opTime = watch(`schedules.${index}.opening_time`);
              const clTime = watch(`schedules.${index}.closing_time`);
              const isExpanded = !!openMobileCard[index];
              const hoursStr = getWorkingHoursString(isOpen, opTime, clTime);

              return (
                <div key={field.id} className="flex flex-col p-4 bg-white">
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <GripVertical size={16} className="text-[#94A3B8] flex-shrink-0" />
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-[#0F172A]">{getWeekdayLabel(field.weekday)}</span>
                        <span className="text-[11px] font-semibold text-[#94A3B8] mt-0.5">
                          {isOpen ? `${opTime} - ${clTime} (${hoursStr})` : 'Closed'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <StatusBadge isOpen={isOpen} />
                      <button
                        type="button"
                        onClick={() => toggleMobileCard(index)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 text-slate-500 hover:bg-slate-50"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Settings */}
                  {isExpanded && (
                    <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-dashed border-slate-100 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0F172A]">Open Day</span>
                        <Controller
                          control={control}
                          name={`schedules.${index}.is_open`}
                          render={({ field: { value, onChange } }) => (
                            <OpenCloseSwitch
                              checked={value}
                              onChange={(val) => {
                                onChange(val);
                                if (!val) {
                                  setValue(`schedules.${index}.opening_time`, null);
                                  setValue(`schedules.${index}.closing_time`, null);
                                } else {
                                  setValue(`schedules.${index}.opening_time`, '09:00 AM');
                                  setValue(`schedules.${index}.closing_time`, '06:00 PM');
                                }
                              }}
                              disabled={mutation.isPending}
                            />
                          )}
                        />
                      </div>

                      {isOpen && (
                        <div className="grid grid-cols-2 gap-4 text-left">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-[#64748B]">Opening Time</label>
                            <Controller
                              control={control}
                              name={`schedules.${index}.opening_time`}
                              rules={{
                                validate: (val) => {
                                  if (isOpen && !val) return 'Opening time is required.';
                                  return true;
                                }
                              }}
                              render={({ field: { value, onChange } }) => (
                                <WeeklyTimePicker
                                  value={value}
                                  onChange={onChange}
                                  disabled={mutation.isPending}
                                  error={!!errors.schedules?.[index]?.opening_time}
                                />
                              )}
                            />
                            {errors.schedules?.[index]?.opening_time && (
                              <span className="text-[10px] font-bold text-red-500">
                                {errors.schedules[index].opening_time.message}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-[#64748B]">Closing Time</label>
                            <Controller
                              control={control}
                              name={`schedules.${index}.closing_time`}
                              rules={{
                                validate: (val) => {
                                  if (isOpen && !val) return 'Closing time is required.';
                                  if (isOpen && val && opTime) {
                                    const op = parseTimeToMinutes(opTime);
                                    const cl = parseTimeToMinutes(val);
                                    if (cl <= op) return 'Must be after opening time.';
                                  }
                                  return true;
                                }
                              }}
                              render={({ field: { value, onChange } }) => (
                                <WeeklyTimePicker
                                  value={value}
                                  onChange={onChange}
                                  disabled={mutation.isPending}
                                  error={!!errors.schedules?.[index]?.closing_time}
                                />
                              )}
                            />
                            {errors.schedules?.[index]?.closing_time && (
                              <span className="text-[10px] font-bold text-red-500">
                                {errors.schedules[index].closing_time.message}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions Footer */}
          <div className="p-5 border-t border-[#EEF2F7] flex flex-col gap-4 bg-[#FCFDFE]">
            {/* Sticky Action Footer Bar */}
            <div className="flex items-center justify-end gap-3.5">
              <button
                type="button"
                disabled={!isDirty || mutation.isPending}
                onClick={handleResetToDefault}
                className="h-9 px-4 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B] bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Reset to Default
              </button>
              
              <button
                type="submit"
                disabled={!isDirty || mutation.isPending}
                className="h-9 px-5 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm cursor-pointer"
              >
                {mutation.isPending ? (
                  <>
                    <RefreshCw className="animate-spin" size={14} />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeeklySchedulePage;
