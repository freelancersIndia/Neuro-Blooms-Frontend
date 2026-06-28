import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hospital, Info, ChevronRight, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { clinicService } from '../services/clinic.service';
import TimePickerField from '../components/TimePickerField';
import SearchableSelect from '../components/SearchableSelect';
import ToggleField from '../components/ToggleField';
import ClinicLogoUploader from '../components/ClinicLogoUploader';
import SkeletonLoader from '../components/SkeletonLoader';

const DEFAULT_SETTINGS = {
  clinic_name: 'Neuro Blooms Child Development Center',
  logo: null,
  timezone: 'Asia/Kolkata (IST)',
  opening_time: '09:00',
  closing_time: '18:00',
  slot_duration: '45 Minutes',
  booking_window: 20,
  allow_same_day_booking: true,
  max_daily_appointments: 25,
};

const SLOT_DURATIONS = [
  '15 Minutes',
  '20 Minutes',
  '30 Minutes',
  '45 Minutes',
  '60 Minutes',
  '90 Minutes',
  '120 Minutes',
];

export const ClinicSettingsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUsingDefaults, setIsUsingDefaults] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [formData, setFormData] = useState(DEFAULT_SETTINGS);
  const [originalSettings, setOriginalSettings] = useState(DEFAULT_SETTINGS);
  const [errors, setErrors] = useState({});

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await clinicService.getSettings();
        if (data) {
          setFormData(data);
          setOriginalSettings(data);
          setIsUsingDefaults(false);
          setIsPreviewMode(false);
        } else {
          setIsUsingDefaults(true);
        }
      } catch (err) {
        console.warn('Unable to load clinic settings from server. Operating in local preview mode.', err);
        setIsPreviewMode(true);
        setIsUsingDefaults(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Form dirty state check
  const isFormDirty = () => {
    return Object.keys(originalSettings).some((key) => {
      if (key === 'logo') {
        const orig = originalSettings[key];
        const curr = formData[key];
        if (orig instanceof File && curr instanceof File) return orig.name !== curr.name;
        return orig !== curr;
      }
      return originalSettings[key] !== formData[key];
    });
  };

  // Warn before navigating away if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isFormDirty()) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, originalSettings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field-specific error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleLogoChange = (file, fileError) => {
    if (fileError) {
      setErrors((prev) => ({ ...prev, logo: fileError }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));
    setErrors((prev) => ({ ...prev, logo: null }));
  };

  // Field validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.clinic_name || formData.clinic_name.trim() === '') {
      newErrors.clinic_name = 'Clinic Name is required.';
    } else if (formData.clinic_name.length > 150) {
      newErrors.clinic_name = 'Clinic Name cannot exceed 150 characters.';
    }

    if (!formData.timezone) {
      newErrors.timezone = 'Timezone is required.';
    }

    if (!formData.opening_time) {
      newErrors.opening_time = 'Opening time is required.';
    }

    if (!formData.closing_time) {
      newErrors.closing_time = 'Closing time is required.';
    } else if (formData.opening_time) {
      const [opHour, opMin] = formData.opening_time.split(':').map(Number);
      const [clHour, clMin] = formData.closing_time.split(':').map(Number);
      const totalOpMin = opHour * 60 + opMin;
      const totalClMin = clHour * 60 + clMin;

      if (totalClMin <= totalOpMin) {
        newErrors.closing_time = 'Closing time must be after opening time.';
      }
    }

    const bookingWindow = parseInt(formData.booking_window, 10);
    if (isNaN(bookingWindow) || bookingWindow <= 0) {
      newErrors.booking_window = 'Booking window must be greater than zero.';
    } else if (bookingWindow > 365) {
      newErrors.booking_window = 'Booking window cannot exceed 365 days.';
    }

    const maxAppointments = parseInt(formData.max_daily_appointments, 10);
    if (isNaN(maxAppointments) || maxAppointments <= 0) {
      newErrors.max_daily_appointments = 'Maximum appointments must be greater than zero.';
    } else if (maxAppointments > 200) {
      newErrors.max_daily_appointments = 'Maximum appointments cannot exceed 200.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to discard your unsaved changes?')) {
      setFormData(originalSettings);
      setErrors({});
      toast.success('Settings reset to saved values.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please correct the validation errors first.');
      return;
    }

    setIsSaving(true);
    try {
      if (isPreviewMode) {
        // Preview mode mock save
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setOriginalSettings(formData);
        setIsUsingDefaults(false);
        toast.success('Settings updated successfully (Local Preview Mode)');
      } else {
        const savedData = await clinicService.updateSettings(formData);
        if (savedData) {
          setFormData(savedData);
          setOriginalSettings(savedData);
          setIsUsingDefaults(false);
          toast.success('Settings updated successfully.');
        }
      }
    } catch (err) {
      console.error('Failed to save clinic settings:', err);
      toast.error(err.message || 'Unable to save clinic settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 text-left font-display">
      {/* Breadcrumb Section */}
      <div className="flex items-center gap-2.5 text-sm font-medium text-[#64748B] select-none">
        <span>Home</span>
        <ChevronRight size={14} />
        <span>Administration</span>
        <ChevronRight size={14} />
        <span className="text-[#0F172A] font-semibold">Clinic Settings</span>
      </div>

      {/* Main Container Card */}
      <div className="w-full bg-white border border-[#E2E8F0] rounded-[20px] shadow-sm overflow-hidden flex flex-col">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <form onSubmit={handleSave} className="flex flex-col">
            {/* Card Header inside form card */}
            <div className="p-6 pb-4 flex items-start gap-4 border-b border-[#EEF2F7]">
              <div className="w-12 h-12 rounded-2xl bg-[#F3EEFF] flex items-center justify-center text-[#7C3AED] flex-shrink-0 shadow-sm border border-slate-100">
                <Hospital size={22} strokeWidth={2.2} />
              </div>
              <div className="flex flex-col text-left">
                <h3 className="text-lg font-bold text-[#0F172A]">Clinic Settings</h3>
                <p className="text-xs font-medium text-[#64748B] mt-0.5 leading-normal">
                  Configure global clinic information and appointment scheduling settings for the entire clinic.
                </p>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 pt-4 flex flex-col gap-5">
              {/* Sensible defaults banner warning if never configured */}
              {isUsingDefaults && (
                <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-xs font-semibold animate-fade-in">
                  <AlertCircle className="text-amber-600 flex-shrink-0" size={16} />
                  <span>Using default clinic configuration. Save to make these settings active.</span>
                </div>
              )}

              {/* Offline warning flag */}
              {isPreviewMode && (
                <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-2xl text-purple-800 text-xs font-semibold">
                  <AlertCircle className="text-purple-600 flex-shrink-0" size={16} />
                  <span>Backend settings API offline. Displaying local preview mode details.</span>
                </div>
              )}

              {/* Form grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Section 1: Clinic Name */}
                <div className="md:col-span-2">
                  <div className="flex flex-col gap-1.5 w-full text-left font-display">
                    <label className="text-xs font-bold text-[#0F172A]">
                      Clinic Name <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#64748B] -mt-1 leading-normal">
                      Enter the official name of your clinic.
                    </span>
                    <input
                      type="text"
                      name="clinic_name"
                      value={formData.clinic_name}
                      onChange={handleChange}
                      disabled={isSaving}
                      placeholder="Neuro Blooms Child Development Center"
                      className={`w-full h-10 px-4 bg-white border rounded-xl text-xs font-semibold text-[#0f172a] placeholder-[#94a3b8] transition-all duration-150 outline-none
                        ${isSaving ? 'bg-slate-100 border-[#E2E8F0] cursor-not-allowed text-slate-400' : 'border-[#CBD5E1] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10'}
                        ${errors.clinic_name ? 'border-red-500 hover:border-red-500 focus:border-red-500' : ''}
                      `}
                    />
                    {errors.clinic_name && (
                      <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                        {errors.clinic_name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Section 3: Timezone */}
                <div>
                  <SearchableSelect
                    label="Timezone"
                    required={true}
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    error={errors.timezone}
                    disabled={isSaving}
                    helperText="Select your clinic timezone."
                  />
                </div>

                {/* Section 2: Clinic Logo (uploader component) */}
                <div className="md:row-span-3">
                  <ClinicLogoUploader
                    logo={formData.logo}
                    onChange={handleLogoChange}
                    error={errors.logo}
                    disabled={isSaving}
                  />
                </div>

                {/* Section 4: Opening Time */}
                <div>
                  <TimePickerField
                    label="Opening Time"
                    required={true}
                    name="opening_time"
                    value={formData.opening_time}
                    onChange={handleChange}
                    error={errors.opening_time}
                    disabled={isSaving}
                    helperText="Daily opening time of the clinic."
                  />
                </div>

                {/* Section 5: Closing Time */}
                <div>
                  <TimePickerField
                    label="Closing Time"
                    required={true}
                    name="closing_time"
                    value={formData.closing_time}
                    onChange={handleChange}
                    error={errors.closing_time}
                    disabled={isSaving}
                    helperText="Daily closing time of the clinic."
                  />
                </div>

                {/* Section 6: Slot Duration */}
                <div>
                  <div className="flex flex-col gap-1.5 w-full text-left font-display">
                    <label className="text-xs font-bold text-[#0F172A]">
                      Slot Duration <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#64748B] -mt-1 leading-normal">
                      Duration of each appointment slot.
                    </span>
                    <select
                      name="slot_duration"
                      value={formData.slot_duration}
                      onChange={handleChange}
                      disabled={isSaving}
                      className="w-full h-10 px-4 bg-white border border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#0f172a] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10 transition-all duration-150 outline-none cursor-pointer"
                    >
                      {SLOT_DURATIONS.map((dur) => (
                        <option key={dur} value={dur}>
                          {dur}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Section 7: Booking Window */}
                <div>
                  <div className="flex flex-col gap-1.5 w-full text-left font-display">
                    <label className="text-xs font-bold text-[#0F172A]">
                      Booking Window (Days) <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#64748B] -mt-1 leading-normal">
                      Patients can book appointments up to X days in advance.
                    </span>
                    <div className="relative">
                      <input
                        type="number"
                        name="booking_window"
                        min="1"
                        max="365"
                        value={formData.booking_window}
                        onChange={handleChange}
                        disabled={isSaving}
                        className={`w-full h-10 pl-4 pr-16 bg-white border rounded-xl text-xs font-semibold text-[#0f172a] placeholder-[#94a3b8] transition-all duration-150 outline-none
                          ${isSaving ? 'bg-slate-100 border-[#E2E8F0] cursor-not-allowed text-slate-400' : 'border-[#CBD5E1] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10'}
                          ${errors.booking_window ? 'border-red-500 hover:border-red-500 focus:border-red-500' : ''}
                        `}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#94A3B8] pointer-events-none uppercase">
                        Days
                      </div>
                    </div>
                    {errors.booking_window && (
                      <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                        {errors.booking_window}
                      </span>
                    )}
                  </div>
                </div>

                {/* Section 8: Allow Same Day Booking */}
                <div>
                  <ToggleField
                    label="Allow Same Day Booking"
                    description="Allow patients to book appointments for today."
                    name="allow_same_day_booking"
                    value={formData.allow_same_day_booking}
                    onChange={handleChange}
                    disabled={isSaving}
                  />
                </div>

                {/* Section 9: Maximum Daily Appointments */}
                <div>
                  <div className="flex flex-col gap-1.5 w-full text-left font-display">
                    <label className="text-xs font-bold text-[#0F172A]">
                      Maximum Daily Appointments <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#64748B] -mt-1 leading-normal">
                      Maximum number of appointments allowed per doctor per day.
                    </span>
                    <input
                      type="number"
                      name="max_daily_appointments"
                      min="1"
                      max="200"
                      value={formData.max_daily_appointments}
                      onChange={handleChange}
                      disabled={isSaving}
                      className={`w-full h-10 px-4 bg-white border rounded-xl text-xs font-semibold text-[#0f172a] placeholder-[#94a3b8] transition-all duration-150 outline-none
                        ${isSaving ? 'bg-slate-100 border-[#E2E8F0] cursor-not-allowed text-slate-400' : 'border-[#CBD5E1] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10'}
                        ${errors.max_daily_appointments ? 'border-red-500 hover:border-red-500 focus:border-red-500' : ''}
                      `}
                    />
                    {errors.max_daily_appointments && (
                      <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                        {errors.max_daily_appointments}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar at the bottom of the card */}
            <div className="bg-white border-t border-[#EEF2F7] px-6 py-4 flex justify-end gap-3">
              <button
                type="button"
                disabled={isSaving || !isFormDirty()}
                onClick={handleReset}
                className="h-10 inline-flex items-center justify-center px-5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B] bg-white hover:bg-slate-50 transition-colors focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isSaving || !isFormDirty()}
                className="h-10 inline-flex items-center justify-center px-6 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-purple-700 transition-colors focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="animate-spin" size={14} />
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ClinicSettingsPage;
