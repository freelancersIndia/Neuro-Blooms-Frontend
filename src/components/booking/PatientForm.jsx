import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, Calendar, Heart, ShieldAlert,
  CheckCircle2, ChevronRight, ArrowLeft, HelpCircle, MessageSquare
} from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { patientInfoSchema } from '../../schemas/bookingSchema';

export const PatientForm = () => {
  const patientInfo = useBookingStore((state) => state.patientInfo);
  const setPatientInfo = useBookingStore((state) => state.setPatientInfo);
  const setStep = useBookingStore((state) => state.setStep);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    trigger,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(patientInfoSchema),
    defaultValues: patientInfo,
  });

  const onSubmit = (data) => {
    setPatientInfo(data);
    setStep(3);
  };

  const onBack = () => {
    // Save current form state before going back
    const currentValues = watch();
    setPatientInfo(currentValues);
    setStep(1);
  };

  // Watch textareas for character counters
  const primaryConcernText = watch('primary_concern') || '';
  const additionalNotesText = watch('additional_notes') || '';

  // Constants
  const relationshipOptions = [
    { value: 'MOTHER', label: 'Mother' },
    { value: 'FATHER', label: 'Father' },
    { value: 'GUARDIAN', label: 'Guardian' },
    { value: 'GRANDPARENT', label: 'Grandparent' },
    { value: 'OTHER', label: 'Other' },
  ];

  const genderOptions = [
    { value: 'MALE', label: 'Male' },
    { value: 'FEMALE', label: 'Female' },
    { value: 'OTHER', label: 'Other' },
    { value: 'PREFER_NOT_TO_SAY', label: 'Prefer Not To Say' },
  ];

  const appointmentTypeOptions = [
    { value: 'INITIAL_CONSULTATION', label: 'Initial Consultation' },
    { value: 'DEVELOPMENT_ASSESSMENT', label: 'Development Assessment' },
    { value: 'FOLLOW_UP', label: 'Follow Up' },
    { value: 'REVIEW', label: 'Review' },
  ];

  const referralOptions = [
    { value: 'Google Search', label: 'Google Search' },
    { value: 'Pediatrician Referral', label: 'Pediatrician Referral' },
    { value: 'School Referral', label: 'School Referral' },
    { value: 'Friend or Family', label: 'Friend or Family' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Other', label: 'Other' },
  ];

  // Helper to render input field with icon, floating behavior, success check, and shake animation
  const renderField = ({
    label,
    name,
    type = 'text',
    icon: Icon,
    placeholder = '',
    required = false,
    options = null,
    isTextArea = false,
    maxLength = 2000,
    charCount = 0,
  }) => {
    const hasError = !!errors[name];
    const isTouched = !!touchedFields[name];
    const isValidEntry = isTouched && !hasError;

    const shakeVariants = {
      shake: {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      }
    };

    return (
      <motion.div
        animate={hasError ? 'shake' : ''}
        variants={shakeVariants}
        className="flex flex-col relative w-full group"
      >
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          {label} {required && <span className="text-booking-error">*</span>}
        </span>

        <div className="relative flex items-center">
          {Icon && !isTextArea && (
            <Icon className={`absolute left-4 w-4.5 h-4.5 transition-colors duration-200 ${
              hasError ? 'text-booking-error' : isValidEntry ? 'text-booking-success' : 'text-slate-400 group-focus-within:text-booking-primary'
            }`} />
          )}

          {options ? (
            <select
              {...register(name)}
              className={`w-full bg-white border-2 rounded-xl py-3 px-4 text-xs font-semibold focus:outline-none transition-all duration-200 appearance-none cursor-pointer ${
                hasError
                  ? 'border-booking-error focus:border-booking-error focus:ring-2 focus:ring-booking-error/10'
                  : isValidEntry
                    ? 'border-booking-success focus:border-booking-primary focus:ring-2 focus:ring-booking-primary/10'
                    : 'border-slate-100 focus:border-booking-primary focus:ring-2 focus:ring-booking-primary/10 hover:border-slate-200'
              }`}
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : isTextArea ? (
            <textarea
              {...register(name)}
              placeholder={placeholder}
              rows={4}
              maxLength={maxLength}
              className={`w-full bg-white border-2 rounded-xl py-3 px-4 text-xs font-medium focus:outline-none transition-all duration-200 resize-none ${
                hasError
                  ? 'border-booking-error focus:border-booking-error focus:ring-2 focus:ring-booking-error/10'
                  : isValidEntry
                    ? 'border-booking-success focus:border-booking-primary focus:ring-2 focus:ring-booking-primary/10'
                    : 'border-slate-100 focus:border-booking-primary focus:ring-2 focus:ring-booking-primary/10 hover:border-slate-200'
              }`}
            />
          ) : (
            <input
              type={type}
              {...register(name)}
              placeholder={placeholder}
              className={`w-full bg-white border-2 rounded-xl py-3 pr-10 text-xs font-semibold focus:outline-none transition-all duration-200 ${
                Icon ? 'pl-11' : 'pl-4'
              } ${
                hasError
                  ? 'border-booking-error focus:border-booking-error focus:ring-2 focus:ring-booking-error/10'
                  : isValidEntry
                    ? 'border-booking-success focus:border-booking-primary focus:ring-2 focus:ring-booking-primary/10'
                    : 'border-slate-100 focus:border-booking-primary focus:ring-2 focus:ring-booking-primary/10 hover:border-slate-200'
              }`}
            />
          )}

          {/* Success Checkmark Inside Inputs */}
          {isValidEntry && !options && !isTextArea && (
            <CheckCircle2 className="absolute right-4 w-4.5 h-4.5 text-booking-success animate-fade-in" />
          )}

          {/* Custom Dropdown Arrow for Selects */}
          {options && (
            <div className="absolute right-4 pointer-events-none text-slate-400 group-focus-within:text-booking-primary">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          )}
        </div>

        {/* Character Counter for Textareas */}
        {isTextArea && (
          <div className="flex justify-end mt-1 text-[9px] font-bold text-slate-400">
            {charCount} / {maxLength} characters
          </div>
        )}

        {/* Error Message */}
        <AnimatePresence>
          {hasError && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[10px] font-semibold text-booking-error mt-1 flex items-center gap-1"
            >
              <ShieldAlert className="w-3 h-3" />
              {errors[name]?.message}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-slate-100 rounded-[24px] shadow-xl shadow-slate-100/30 p-6 sm:p-8 max-w-4xl mx-auto space-y-8 text-left"
    >
      {/* Parent Info Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-2">
          <User className="w-4 h-4 text-booking-secondary" />
          Parent / Guardian Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {renderField({
            label: 'Parent First Name',
            name: 'parent_first_name',
            icon: User,
            placeholder: 'e.g. Jane',
            required: true,
          })}
          {renderField({
            label: 'Parent Last Name',
            name: 'parent_last_name',
            icon: User,
            placeholder: 'e.g. Doe',
            required: true,
          })}
          {renderField({
            label: 'Relationship to Child',
            name: 'relationship_to_child',
            required: true,
            options: relationshipOptions,
          })}
          {renderField({
            label: 'Email Address',
            name: 'email',
            type: 'email',
            icon: Mail,
            placeholder: 'e.g. jane.doe@example.com',
            required: true,
          })}
          {renderField({
            label: 'Mobile Number',
            name: 'mobile_number',
            type: 'tel',
            icon: Phone,
            placeholder: 'e.g. 9876543210',
            required: true,
          })}
          {renderField({
            label: 'Alternate Mobile Number',
            name: 'alternate_mobile_number',
            type: 'tel',
            icon: Phone,
            placeholder: 'e.g. 9876543211 (Optional)',
          })}
        </div>
      </div>

      {/* Child Info Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-2">
          <Heart className="w-4 h-4 text-booking-error" />
          Child Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {renderField({
            label: "Child's First Name",
            name: 'child_first_name',
            icon: User,
            placeholder: 'e.g. Jimmy',
            required: true,
          })}
          {renderField({
            label: "Child's Last Name",
            name: 'child_last_name',
            icon: User,
            placeholder: 'e.g. Doe',
            required: true,
          })}
          {renderField({
            label: 'Date of Birth',
            name: 'date_of_birth',
            type: 'date',
            icon: Calendar,
            required: true,
          })}
          {renderField({
            label: 'Gender',
            name: 'gender',
            required: true,
            options: genderOptions,
          })}
        </div>
      </div>

      {/* Appointment & Clinical Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b border-slate-50 pb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-booking-primary" />
          Appointment Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {renderField({
            label: 'Preferred Appointment Type',
            name: 'appointment_type',
            required: true,
            options: appointmentTypeOptions,
          })}
          {renderField({
            label: 'Referral Source',
            name: 'referral_source',
            options: referralOptions,
          })}
          <div className="md:col-span-2">
            {renderField({
              label: 'Primary Support Concerns',
              name: 'primary_concern',
              placeholder: 'Please describe your child\'s communication preferences, sensory concerns, or support goals.',
              required: true,
              isTextArea: true,
              charCount: primaryConcernText.length,
            })}
          </div>
          <div className="md:col-span-2">
            {renderField({
              label: 'Additional Notes',
              name: 'additional_notes',
              placeholder: 'Any additional details or special requests you would like our intake team to know (Optional).',
              isTextArea: true,
              charCount: additionalNotesText.length,
            })}
          </div>
        </div>
      </div>

      {/* Button Controls */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="h-11 px-5 rounded-xl border-2 border-slate-100 text-xs font-bold text-slate-500 hover:bg-slate-50 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Schedule
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="h-11 px-6 rounded-xl bg-booking-primary hover:bg-booking-primary-light text-white text-xs font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-booking-primary/10"
        >
          Continue to Confirmation
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
