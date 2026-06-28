import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X, Loader2, Info } from 'lucide-react';
import { calculateDurationInMinutes, formatDuration } from './BreakDurationBadge';

export const BreakFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  breakData = null,
  isSaving = false,
  isReadOnly = false,
  backendErrors = {},
  title = ''
}) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      break_name: '',
      weekday: 'MONDAY',
      start_time: '',
      end_time: ''
    }
  });

  // Reset form when modal opens or breakData changes
  useEffect(() => {
    if (isOpen) {
      clearErrors();
      if (breakData) {
        // Strip seconds if present in backend time (e.g. "13:00:00" -> "13:00")
        const formatTime = (t) => t ? t.substring(0, 5) : '';
        reset({
          break_name: breakData.break_name || '',
          weekday: breakData.weekday || 'MONDAY',
          start_time: formatTime(breakData.start_time),
          end_time: formatTime(breakData.end_time)
        });
      } else {
        reset({
          break_name: '',
          weekday: 'MONDAY',
          start_time: '',
          end_time: ''
        });
      }
    }
  }, [isOpen, breakData, reset, clearErrors]);

  // Sync backend errors
  useEffect(() => {
    if (backendErrors && Object.keys(backendErrors).length > 0) {
      Object.keys(backendErrors).forEach((key) => {
        if (key === 'non_field_errors') {
          // Map general overlaps / operating hours to end_time or break_name
          setError('end_time', {
            type: 'backend',
            message: backendErrors[key][0]
          });
        } else {
          setError(key, {
            type: 'backend',
            message: backendErrors[key][0]
          });
        }
      });
    }
  }, [backendErrors, setError]);

  // Watch fields for duration calculation
  const startTimeVal = watch('start_time');
  const endTimeVal = watch('end_time');

  const durationDiff = calculateDurationInMinutes(startTimeVal, endTimeVal);
  const calculatedDuration = durationDiff > 0 ? formatDuration(durationDiff) : '--';

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const weekdays = [
    { value: 'MONDAY', label: 'Monday' },
    { value: 'TUESDAY', label: 'Tuesday' },
    { value: 'WEDNESDAY', label: 'Wednesday' },
    { value: 'THURSDAY', label: 'Thursday' },
    { value: 'FRIDAY', label: 'Friday' },
    { value: 'SATURDAY', label: 'Saturday' },
    { value: 'SUNDAY', label: 'Sunday' }
  ];

  return (
    <div className="fixed inset-0 bg-[#0F172A]/55 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-fade-in">
      <div 
        className="w-full max-w-[650px] bg-white border border-[#E5E7EB] rounded-[24px] shadow-2xl overflow-hidden flex flex-col font-display animate-scale-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#EEF2F7] flex items-center justify-between select-none">
          <h3 className="text-lg font-bold text-[#111827]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="w-8 h-8 rounded-lg border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition-colors outline-none cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-6 text-left">
          {/* Break Name */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-[#111827]">Break Name</label>
            <Controller
              control={control}
              name="break_name"
              rules={{
                maxLength: {
                  value: 100,
                  message: 'Break name cannot exceed 100 characters.'
                }
              }}
              render={({ field: { value, onChange } }) => (
                <input
                  type="text"
                  value={value}
                  onChange={onChange}
                  disabled={isSaving || isReadOnly}
                  placeholder="e.g. Lunch Break"
                  className="w-full h-11 px-4 bg-white border border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#111827] placeholder-[#9CA3AF] hover:border-slate-400 focus:border-[#6D28D9] focus:ring-4 focus:ring-[#6D28D9]/10 transition-all duration-150 outline-none disabled:bg-slate-50 disabled:text-slate-400"
                />
              )}
            />
            {errors.break_name && (
              <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.break_name.message}</span>
            )}
          </div>

          {/* Weekday */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-[#111827]">Weekday</label>
            <Controller
              control={control}
              name="weekday"
              rules={{ required: 'Weekday is required.' }}
              render={({ field: { value, onChange } }) => (
                <select
                  value={value}
                  onChange={onChange}
                  disabled={isSaving || isReadOnly}
                  className="w-full h-11 px-3 bg-white border border-[#CBD5E1] rounded-xl text-xs font-bold text-[#4B5563] hover:border-slate-400 focus:border-[#6D28D9] focus:ring-4 focus:ring-[#6D28D9]/10 transition-all duration-150 outline-none disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
                >
                  {weekdays.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.weekday && (
              <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.weekday.message}</span>
            )}
          </div>

          {/* Time Picker Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#111827]">Start Time</label>
              <Controller
                control={control}
                name="start_time"
                rules={{ required: 'Start time is required.' }}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="time"
                    value={value}
                    onChange={onChange}
                    disabled={isSaving || isReadOnly}
                    className={`w-full h-11 px-4 bg-white border rounded-xl text-xs font-semibold text-[#111827] outline-none transition-all
                      ${errors.start_time ? 'border-red-500 focus:border-red-500' : 'border-[#CBD5E1] focus:border-[#6D28D9]'}
                      disabled:bg-slate-50 disabled:text-slate-400
                    `}
                  />
                )}
              />
              {errors.start_time && (
                <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.start_time.message}</span>
              )}
            </div>

            {/* End Time */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#111827]">End Time</label>
              <Controller
                control={control}
                name="end_time"
                rules={{
                  required: 'End time is required.',
                  validate: (val) => {
                    if (!startTimeVal) return true;
                    return calculateDurationInMinutes(startTimeVal, val) > 0 || 'End time must be after start time.';
                  }
                }}
                render={({ field: { value, onChange } }) => (
                  <input
                    type="time"
                    value={value}
                    onChange={onChange}
                    disabled={isSaving || isReadOnly}
                    className={`w-full h-11 px-4 bg-white border rounded-xl text-xs font-semibold text-[#111827] outline-none transition-all
                      ${errors.end_time ? 'border-red-500 focus:border-red-500' : 'border-[#CBD5E1] focus:border-[#6D28D9]'}
                      disabled:bg-slate-50 disabled:text-slate-400
                    `}
                  />
                )}
              />
              {errors.end_time && (
                <span className="text-[10px] font-bold text-red-500 mt-0.5">{errors.end_time.message}</span>
              )}
            </div>
          </div>

          {/* Duration Preview */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-[#111827]">Duration Preview</label>
            <input
              type="text"
              value={calculatedDuration}
              readOnly
              disabled
              className="w-full h-11 px-4 bg-slate-50 border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#4B5563] outline-none cursor-not-allowed"
            />
          </div>

          {/* Validation Notice Info Box */}
          <div className="flex gap-3 p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl items-start select-none">
            <div className="text-[#6D28D9] mt-0.5 flex-shrink-0">
              <Info size={16} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-[#111827]">Validation Notice</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 mt-2">
                <span className="text-[10px] font-semibold text-[#4B5563] flex items-center gap-1">
                  <span className="text-green-600 font-bold">✓</span> Be inside operating hours
                </span>
                <span className="text-[10px] font-semibold text-[#4B5563] flex items-center gap-1">
                  <span className="text-green-600 font-bold">✓</span> Not overlap other breaks
                </span>
                <span className="text-[10px] font-semibold text-[#4B5563] flex items-center gap-1">
                  <span className="text-green-600 font-bold">✓</span> End after start time
                </span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3.5 mt-2 border-t border-[#EEF2F7] pt-6">
            <button
              type="button"
              disabled={isSaving}
              onClick={onClose}
              className="h-11 px-5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B] bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isReadOnly ? 'Close' : 'Cancel'}
            </button>
            
            {!isReadOnly && (
              <button
                type="submit"
                disabled={!isValid || isSaving}
                className="h-11 px-6 rounded-xl bg-[#6D28D9] text-xs font-bold text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Saving...
                  </>
                ) : (
                  'Save Break'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
