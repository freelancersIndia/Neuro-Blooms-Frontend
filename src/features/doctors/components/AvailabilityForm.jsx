import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Clock, RefreshCw, Save } from 'lucide-react';

const availabilitySchema = z.object({
  accepting_appointments: z.boolean(),
  consultation_duration: z.number().refine(
    (val) => [15, 20, 30, 45, 60, 90, 120].includes(val),
    { message: 'Must be one of: 15, 20, 30, 45, 60, 90, 120' }
  ),
  max_daily_patients: z.number()
    .min(1, 'Must be between 1 and 100')
    .max(100, 'Must be between 1 and 100'),
});

const formatTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date)) return isoString;
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  
  return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
};

export const AvailabilityForm = ({ initialData, onSave, isSaving, lastUpdated, onValuesChange }) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, errors },
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      accepting_appointments: true,
      consultation_duration: 45,
      max_daily_patients: 10,
    },
  });

  // Watch values for live preview updates in parent component
  const currentValues = watch();

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(currentValues);
    }
  }, [currentValues.accepting_appointments, currentValues.consultation_duration, currentValues.max_daily_patients, onValuesChange]);

  useEffect(() => {
    if (initialData) {
      reset({
        accepting_appointments: initialData.accepting_appointments,
        consultation_duration: initialData.consultation_duration,
        max_daily_patients: initialData.max_daily_patients,
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white border border-[#E2E8F0] rounded-[24px] shadow-sm p-6 flex flex-col justify-between h-full text-left"
    >
      <div className="space-y-5">
        <h3 className="text-sm font-bold text-[#0F172A] select-none">
          Availability Preferences
        </h3>

        {/* Section 1: Accepting Appointments */}
        <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-[#EEF2F7] rounded-2xl transition-all duration-200">
          <div className="flex flex-col gap-0.5 text-left max-w-[70%]">
            <span className="text-xs font-bold text-[#0F172A] select-none">
              Accept Appointments
            </span>
            <span className="text-[10px] font-semibold text-[#64748B] leading-relaxed">
              Allow patients to book appointments with this doctor.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Controller
              name="accepting_appointments"
              control={control}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className={`w-11 h-6 rounded-full transition-colors duration-300 relative focus:outline-none cursor-pointer ${
                    field.value ? 'bg-[#7C3AED]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${
                      field.value ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              )}
            />
            <span
              className={`text-[10px] font-bold min-w-[120px] select-none transition-colors duration-200 ${
                currentValues.accepting_appointments ? 'text-[#10B981]' : 'text-[#EF4444]'
              }`}
            >
              {currentValues.accepting_appointments ? 'Yes, accepting appointments' : 'No, not accepting appointments'}
            </span>
          </div>
        </div>

        {/* Section 2: Consultation Duration */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#0F172A] select-none">
            Consultation Duration
          </label>
          <span className="text-[10px] font-semibold text-[#64748B] -mt-1 select-none">
            Duration of a single appointment slot.
          </span>

          <Controller
            name="consultation_duration"
            control={control}
            render={({ field }) => (
              <div className="relative w-full max-w-[320px]">
                <select
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className={`w-full h-10 px-3 bg-white border rounded-xl text-xs font-bold text-[#334155] outline-none transition-all cursor-pointer select-none
                    ${errors.consultation_duration ? 'border-[#EF4444] focus:ring-1 focus:ring-[#EF4444]' : 'border-[#E2E8F0] focus:ring-1 focus:ring-[#7C3AED]'}
                  `}
                >
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                  <option value={120}>120 minutes</option>
                </select>
              </div>
            )}
          />
          <span className="text-[9px] font-bold text-[#7C3AED] select-none">
            Allowed values: 15, 20, 30, 45, 60, 90, 120 minutes
          </span>
          {errors.consultation_duration && (
            <span className="text-[9px] font-bold text-[#EF4444] select-none">
              {errors.consultation_duration.message}
            </span>
          )}
        </div>

        {/* Section 3: Maximum Daily Patients */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#0F172A] select-none">
            Maximum Daily Patients
          </label>
          <span className="text-[10px] font-semibold text-[#64748B] -mt-1 select-none">
            Maximum number of patients this doctor can see per day.
          </span>

          <Controller
            name="max_daily_patients"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-[#E2E8F0] rounded-xl h-10 overflow-hidden bg-white w-32">
                  <button
                    type="button"
                    onClick={() => field.onChange(Math.max(1, field.value - 1))}
                    className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 border-r border-[#E2E8F0] text-sm font-bold cursor-pointer select-none transition-colors"
                  >
                    —
                  </button>
                  <span className="flex-1 text-center text-xs font-extrabold text-[#0F172A] select-none">
                    {field.value}
                  </span>
                  <button
                    type="button"
                    onClick={() => field.onChange(Math.min(100, field.value + 1))}
                    className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 border-l border-[#E2E8F0] text-sm font-bold cursor-pointer select-none transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          />
          <span className="text-[9px] font-bold text-[#7C3AED] select-none">
            Allowed: 1 – 100 patients
          </span>
          {errors.max_daily_patients && (
            <span className="text-[9px] font-bold text-[#EF4444] select-none">
              {errors.max_daily_patients.message}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Row / Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] mt-4 select-none">
        <div className="flex items-center gap-2 text-left">
          <Clock size={14} className="text-[#94A3B8]" />
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-[#64748B] leading-none">
              Last Updated
            </span>
            <span className="text-[9px] font-semibold text-[#94A3B8] mt-0.5">
              {lastUpdated?.updated_at ? formatTime(lastUpdated.updated_at) : '--'}
            </span>
            <span className="text-[8px] font-semibold text-[#94A3B8]">
              By {lastUpdated?.updated_by || 'System'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => reset()}
            disabled={!isDirty || isSaving}
            className="h-9 px-4 rounded-xl border border-slate-200 text-xs font-bold text-[#4B5563] hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!isDirty || isSaving}
            className="h-9 px-6 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-purple-700 transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
          >
            {isSaving ? (
              <RefreshCw size={13} className="animate-spin" />
            ) : (
              <Save size={13} />
            )}
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default AvailabilityForm;
