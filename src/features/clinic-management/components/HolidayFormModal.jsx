import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X, Loader2 } from 'lucide-react';

export const HolidayFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  holiday = null, // if provided, we are in edit mode
  isSaving = false
}) => {
  const isEditMode = !!holiday;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      holiday_name: '',
      holiday_date: '',
      description: ''
    }
  });

  // Populate form in edit mode
  useEffect(() => {
    if (isOpen) {
      if (holiday) {
        reset({
          holiday_name: holiday.holiday_name || '',
          holiday_date: holiday.holiday_date || '',
          description: holiday.description || ''
        });
      } else {
        reset({
          holiday_name: '',
          holiday_date: '',
          description: ''
        });
      }
    }
  }, [isOpen, holiday, reset]);

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const descriptionVal = watch('description') || '';
  const charCount = descriptionVal.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0F172A]/55 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-fade-in">
      {/* Modal Container */}
      <div 
        className="w-full max-w-[640px] bg-white border border-[#E2E8F0] rounded-[24px] shadow-2xl overflow-hidden flex flex-col font-display animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#EEF2F7] flex items-center justify-between select-none">
          <h3 id="modal-title" className="text-lg font-bold text-[#0F172A]">
            {isEditMode ? 'Edit Clinic Holiday' : 'Add Clinic Holiday'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="w-8 h-8 rounded-lg border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition-colors outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3AED]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-6 text-left">
          {/* Holiday Name */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-[#0F172A]">
              Holiday Name <span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="holiday_name"
              rules={{
                required: 'Holiday name is required.',
                maxLength: {
                  value: 150,
                  message: 'Name cannot exceed 150 characters.'
                },
                validate: (val) => val.trim() !== '' || 'Holiday name cannot be blank.'
              }}
              render={({ field: { value, onChange } }) => (
                <input
                  type="text"
                  value={value}
                  onChange={onChange}
                  disabled={isSaving}
                  placeholder="e.g. Independence Day"
                  className={`w-full h-11 px-4 bg-white border rounded-xl text-xs font-semibold text-[#0f172a] placeholder-[#94a3b8] transition-all duration-150 outline-none
                    ${isSaving ? 'bg-slate-50 border-[#E2E8F0] cursor-not-allowed text-slate-400' : 'border-[#CBD5E1] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10'}
                    ${errors.holiday_name ? 'border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
                  `}
                />
              )}
            />
            {errors.holiday_name && (
              <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-0.5">
                {errors.holiday_name.message}
              </span>
            )}
          </div>

          {/* Holiday Date */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-bold text-[#0F172A]">
              Holiday Date <span className="text-red-500">*</span>
            </label>
            <Controller
              control={control}
              name="holiday_date"
              rules={{
                required: 'Holiday date is required.'
              }}
              render={({ field: { value, onChange } }) => (
                <input
                  type="date"
                  value={value}
                  onChange={onChange}
                  disabled={isSaving}
                  className={`w-full h-11 px-4 bg-white border rounded-xl text-xs font-semibold text-[#0f172a] transition-all duration-150 outline-none
                    ${isSaving ? 'bg-slate-50 border-[#E2E8F0] cursor-not-allowed text-slate-400' : 'border-[#CBD5E1] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10'}
                    ${errors.holiday_date ? 'border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
                  `}
                />
              )}
            />
            {errors.holiday_date && (
              <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-0.5">
                {errors.holiday_date.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0F172A]">Description</label>
              <span className="text-[10px] font-bold text-slate-400">
                {charCount} / 500
              </span>
            </div>
            <Controller
              control={control}
              name="description"
              rules={{
                maxLength: {
                  value: 500,
                  message: 'Description cannot exceed 500 characters.'
                }
              }}
              render={({ field: { value, onChange } }) => (
                <textarea
                  value={value}
                  onChange={onChange}
                  disabled={isSaving}
                  rows={4}
                  placeholder="Describe the holiday or specify operational modifications..."
                  className={`w-full p-4 bg-white border rounded-xl text-xs font-semibold text-[#0f172a] placeholder-[#94a3b8] transition-all duration-150 outline-none resize-none
                    ${isSaving ? 'bg-slate-50 border-[#E2E8F0] cursor-not-allowed text-slate-400' : 'border-[#CBD5E1] hover:border-slate-400 focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10'}
                    ${errors.description ? 'border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
                  `}
                />
              )}
            />
            {errors.description && (
              <span className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-0.5">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3.5 mt-2 border-t border-[#EEF2F7] pt-6">
            <button
              type="button"
              disabled={isSaving}
              onClick={onClose}
              className="h-11 px-5 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#64748B] bg-white hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!isValid || isSaving}
              className="h-11 px-6 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  Saving...
                </>
              ) : (
                isEditMode ? 'Save Changes' : 'Create Holiday'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HolidayFormModal;
