import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Info, CalendarCheck } from 'lucide-react';
import { useAppointmentModal } from '../../context/AppointmentModalContext';
import StepIndicator from './StepIndicator';
import Step1SlotSelection from './Step1SlotSelection';
import Step2Questionnaire from './Step2Questionnaire';
import Step3AppointmentSummary from './Step3AppointmentSummary';
import AppointmentSuccess from './AppointmentSuccess';
import { submitConsultationRequest } from '../../services/appointment.service';
import toast from 'react-hot-toast';

export const AppointmentModal = () => {
  const { isOpen, closeModal } = useAppointmentModal();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 5, 22)); // Default: June 22, 2026
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form values state to sync with Step 3 Summary
  const [formValues, setFormValues] = useState({
    parentFirstName: '',
    parentLastName: '',
    parentRelationship: '',
    parentName: '',
    phone: '',
    alternativePhone: '',
    email: '',
    childFirstName: '',
    childLastName: '',
    childName: '',
    childGender: '',
    childAge: '',
    childDob: '',
    appointmentType: '',
    primaryConcern: '',
    otherConcernDetails: '',
    referralSource: '',
    consentAccurate: false,
    consentPrivacy: false,
    consentTerms: false,
    consultationReason: '',
    concerns: [],
    noticePeriod: '',
    previousTherapy: '',
    schoolingStatus: '',
    notes: '',
  });

  const modalRef = useRef(null);

  // Listen for ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    closeModal();
    // Reset modal state
    setStep(1);
    setSelectedSlot('');
    setShowSuccess(false);
    setIsSubmitting(false);
    setFormValues({
      parentFirstName: '',
      parentLastName: '',
      parentRelationship: '',
      parentName: '',
      phone: '',
      alternativePhone: '',
      email: '',
      childFirstName: '',
      childLastName: '',
      childName: '',
      childGender: '',
      childAge: '',
      childDob: '',
      appointmentType: '',
      primaryConcern: '',
      otherConcernDetails: '',
      referralSource: '',
      consentAccurate: false,
      consentPrivacy: false,
      consentTerms: false,
      consultationReason: '',
      concerns: [],
      noticePeriod: '',
      previousTherapy: '',
      schoolingStatus: '',
      notes: '',
    });
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleNextStep1 = () => {
    if (selectedSlot) {
      setStep(2);
    }
  };

  const handleFormValuesChange = (newValues) => {
    setFormValues(prev => ({ ...prev, ...newValues }));
  };

  // Submit Step 2 form -> Save values and advance to Step 3 Summary
  const handleQuestionnaireSubmit = (data) => {
    setFormValues(prev => ({ ...prev, ...data }));
    setStep(3);
  };

  // Confirm Step 3 -> final API payload submission and loader state
  const handleFinalConfirm = () => {
    setIsSubmitting(true);
    
    // Map appointment type to Constant
    let appointment_type = 'INITIAL_CONSULTATION';
    if (formValues.appointmentType === 'Development Assessment') {
      appointment_type = 'DEVELOPMENT_ASSESSMENT';
    }

    // Handle "Other" concern details in additional notes
    let additional_notes = formValues.notes || '';
    if (formValues.primaryConcern === 'Other') {
      additional_notes = `[Specific Concern: ${formValues.otherConcernDetails}] ${additional_notes}`.trim();
    }

    const payload = {
      parent_first_name: formValues.parentFirstName,
      parent_last_name: formValues.parentLastName,
      relationship_to_child: formValues.parentRelationship,
      mobile_number: formValues.phone,
      alternate_mobile_number: formValues.alternativePhone || '',
      email: formValues.email || '',
      child_first_name: formValues.childFirstName,
      child_last_name: formValues.childLastName,
      date_of_birth: formValues.childDob,
      gender: formValues.childGender,
      appointment_type: appointment_type,
      primary_concern: formValues.primaryConcern,
      preferred_date: selectedDate.toISOString().split('T')[0],
      preferred_time_slot: selectedSlot,
      additional_notes: additional_notes,
      referral_source: formValues.referralSource || ''
    };

    console.log("Submit Appointment Request Payload:", payload);

    submitConsultationRequest(payload)
      .then((data) => {
        setIsSubmitting(false);
        // Show success toast with request number
        toast.success(`Request submitted successfully! Tracking Number: ${data.data?.request_number || ''}`, {
          duration: 6000
        });
        setShowSuccess(true);
      })
      .catch((error) => {
        setIsSubmitting(false);
        
        // Handle validation errors (HTTP 400) or Conflict (HTTP 409) or other errors
        if (error.status === 409) {
          toast.error("A consultation request already exists for this child on the selected date.", {
            duration: 6000
          });
        } else if (error.errors) {
          // Display validation errors dictionary nicely
          const errorDetails = Object.entries(error.errors)
            .map(([field, messages]) => `${field.replace(/_/g, ' ')}: ${messages.join(', ')}`)
            .join(' | ');
          toast.error(`Validation Failed: ${errorDetails}`, {
            duration: 7000
          });
        } else {
          toast.error(error.message || 'Failed to submit consultation request. Please try again.', {
            duration: 5000
          });
        }
      });
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[10px] p-4 sm:p-6 overflow-y-auto"
        onClick={handleBackdropClick}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white rounded-[32px] shadow-[0_25px_60px_rgba(79,94,84,0.18)] border border-slate-100 w-full max-w-[1400px] max-h-[90vh] flex flex-col overflow-hidden relative"
        >
          {/* Close Button Top Right */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 hover:bg-slate-50 rounded-full transition-all z-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* SUCCESS SCREEN OVERLAY */}
          {showSuccess ? (
            <div className="flex-grow flex items-center justify-center p-6 sm:p-10">
              <AppointmentSuccess onClose={handleClose} />
            </div>
          ) : (
            <>
              {/* Modal Header */}
              <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
                <div className="flex flex-col items-center justify-center space-y-1 mt-2">
                  {step === 2 && (
                    <span className="text-[11px] font-bold text-[#3B8A4C] uppercase tracking-wider mb-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/50 font-display">
                      Step 2 of 4
                    </span>
                  )}
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-display">
                    {step === 1 && 'Book an Appointment'}
                    {step === 2 && 'Consultation Questionnaire'}
                    {step === 3 && 'Appointment Summary'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed max-w-xl">
                    {step === 1 && 'Choose a convenient date and available time slot.'}
                    {step === 2 && "Please provide a few details so our doctor can better understand your child's needs before the appointment."}
                    {step === 3 && 'Please review your details before confirming.'}
                  </p>
                </div>

                {/* Step Progress Indicator */}
                <StepIndicator currentStep={step} />
              </div>

              {/* Modal Body Scroll Container */}
              <div className="flex-grow overflow-y-auto p-6 sm:p-8">
                {/* STEP 1: Date & Slot Selection */}
                {step === 1 && (
                  <Step1SlotSelection 
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    selectedSlot={selectedSlot}
                    onSelectSlot={setSelectedSlot}
                  />
                )}

                {/* STEP 2: Questionnaire Form */}
                {step === 2 && (
                  <Step2Questionnaire 
                    onSubmit={handleQuestionnaireSubmit}
                    onFormValuesChange={handleFormValuesChange}
                    defaultValues={formValues}
                  />
                )}

                {/* STEP 3: Summary & Confirmation */}
                {step === 3 && (
                  <Step3AppointmentSummary 
                    selectedDate={selectedDate}
                    selectedSlot={selectedSlot}
                    formValues={formValues}
                  />
                )}
              </div>

              {/* Modal Footer (Action Panel) */}
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                
                {/* Step 1 Actions */}
                {step === 1 && (
                  <>
                    <div className="flex items-center gap-1.5 text-[#2E7D32] text-[11px] sm:text-xs font-semibold text-left">
                      <Info className="h-4 w-4 text-[#3B8A4C] flex-shrink-0" />
                      <span>All timings are in IST (Indian Standard Time)</span>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-end">
                      {/* Legend */}
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-600 select-none">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded border border-[#3B8A4C]/35 bg-white" />
                          <span>Available</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded bg-[#3B8A4C] border border-[#3B8A4C]" />
                          <span>Selected</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded bg-slate-100 border border-slate-100" />
                          <span>Booked</span>
                        </div>
                      </div>

                      {/* Next Button */}
                      <motion.button
                        whileHover={selectedSlot ? { scale: 1.03 } : {}}
                        whileTap={selectedSlot ? { scale: 0.97 } : {}}
                        onClick={handleNextStep1}
                        disabled={!selectedSlot}
                        className={`font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-sm transition-all duration-300 cursor-pointer ${
                          selectedSlot 
                            ? 'bg-[#3B8A4C] hover:bg-[#327540] text-white hover:shadow-md' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        }`}
                      >
                        <span>Next</span>
                        <span>&rarr;</span>
                      </motion.button>
                    </div>
                  </>
                )}

                {/* Step 2 Actions */}
                {step === 2 && (
                  <>
                    <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      <span>All details are secure under clinical privacy policies</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleBack}
                        type="button"
                        className="border border-[#3B8A4C] text-[#3B8A4C] hover:bg-emerald-50/15 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                      >
                        ← Back
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        form="questionnaire-form"
                        type="submit"
                        className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer font-display"
                      >
                        <span>Continue</span>
                        <span>→</span>
                      </motion.button>
                    </div>
                  </>
                )}

                {/* Step 3 Actions */}
                {step === 3 && (
                  <>
                    <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Please review all details before confirming</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleBack}
                        type="button"
                        className="border border-[#3B8A4C] text-[#3B8A4C] hover:bg-emerald-50/15 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer"
                      >
                        &larr; Back
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleFinalConfirm}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] hover:shadow-[0_6px_20px_rgba(59,138,76,0.25)] text-white font-bold text-xs sm:text-sm px-7 py-2.5 rounded-full inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <CalendarCheck className="h-4.5 w-4.5 text-white" />
                            <span>Confirm Appointment</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </>
                )}

              </div>

              {/* Trust Secure Tagline Footer */}
              <div className="py-2 bg-slate-100/40 text-center text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1.5 border-t border-slate-100">
                <Lock className="h-3 w-3 text-slate-400" />
                <span>Your information is secure and confidential</span>
              </div>
            </>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AppointmentModal;
