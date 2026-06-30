import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Check, ChevronRight } from 'lucide-react';
import { useAppointmentModal } from '../../context/AppointmentModalContext';

// Custom Booking Flow Components
import ProgressStepper from '../booking/ProgressStepper';
import DoctorSelector from '../booking/DoctorSelector';
import CalendarPicker from '../booking/CalendarPicker';
import SlotGrid from '../booking/SlotGrid';
import PatientForm from '../booking/PatientForm';
import AppointmentSummary from '../booking/AppointmentSummary';
import SuccessScreen from '../booking/SuccessScreen';

// State & Hooks
import { useBookingStore } from '../../store/bookingStore';

export const AppointmentModal = () => {
  const { isOpen, closeModal } = useAppointmentModal();
  const { step, doctor, date, slot, setStep, resetStore } = useBookingStore();
  const modalRef = useRef(null);

  // Local state to store submission receipt data
  const [submissionData, setSubmissionData] = useState(null);

  // Reset store and local state when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      resetStore();
      setSubmissionData(null);
    }
  }, [isOpen, resetStore]);

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
    resetStore();
    setSubmissionData(null);
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  // Step 1 Validation
  const isDoctorSelected = !!doctor;
  const isDateSelected = !!date;
  const isSlotSelected = !!slot;
  const isStep1Valid = isDoctorSelected && isDateSelected && isSlotSelected;

  // Slide transitions for step changes
  const stepVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.25, ease: 'easeIn' } },
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 backdrop-blur-[12px] p-4 sm:p-6 overflow-y-auto"
        onClick={handleBackdropClick}
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-booking-bg rounded-[32px] shadow-[0_25px_60px_rgba(15,23,42,0.15)] border border-slate-100/50 w-full max-w-[1200px] max-h-[92vh] flex flex-col overflow-hidden relative"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100/50 rounded-full transition-all z-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-white flex flex-col items-center justify-center text-center space-y-4 shrink-0">
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-[10px] font-bold text-booking-secondary uppercase tracking-widest bg-booking-secondary-soft px-3 py-1 rounded-full border border-booking-secondary-soft/50 mb-1">
                Intake Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-display">
                {step === 1 && 'Book an Intake Appointment'}
                {step === 2 && 'Consultation Questionnaire'}
                {step === 3 && 'Confirm Selection'}
                {step === 4 && 'Request Received'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-semibold max-w-lg">
                {step === 1 && 'Select a clinician, date, and available time slot.'}
                {step === 2 && "Provide details to help our specialists understand your child's goals."}
                {step === 3 && 'Please review your selections before confirming.'}
                {step === 4 && 'Your appointment request is pending review.'}
              </p>
            </div>

            {/* Stepper */}
            {step < 4 && <ProgressStepper currentStep={step} />}
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="flex-grow overflow-y-auto p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="modal-step1"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left Column: Doctor Selection */}
                  <div className="lg:col-span-5 bg-white border border-slate-100/80 rounded-[32px] p-6 shadow-xl shadow-slate-100/30">
                    <DoctorSelector />
                  </div>

                  {/* Right Column: Calendar and Slots */}
                  <div className="lg:col-span-7 space-y-6 bg-white border border-slate-100/80 rounded-[32px] p-6 shadow-xl shadow-slate-100/30">
                    <CalendarPicker />
                    <SlotGrid />

                    {/* Step 1 Actions */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                      {/* Checklist */}
                      <div className="flex flex-wrap gap-3 text-[10px] font-bold text-slate-400 select-none">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            isDoctorSelected ? 'bg-booking-success/10 border-booking-success text-booking-success' : 'border-slate-200 text-slate-300'
                          }`}>
                            {isDoctorSelected ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '1'}
                          </span>
                          <span className={isDoctorSelected ? 'text-booking-success' : ''}>Doctor Selected</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            isDateSelected ? 'bg-booking-success/10 border-booking-success text-booking-success' : 'border-slate-200 text-slate-300'
                          }`}>
                            {isDateSelected ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '2'}
                          </span>
                          <span className={isDateSelected ? 'text-booking-success' : ''}>Date Chosen</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            isSlotSelected ? 'bg-booking-success/10 border-booking-success text-booking-success' : 'border-slate-200 text-slate-300'
                          }`}>
                            {isSlotSelected ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '3'}
                          </span>
                          <span className={isSlotSelected ? 'text-booking-success' : ''}>Time Slot Selected</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={!isStep1Valid}
                        onClick={() => setStep(2)}
                        className="w-full sm:w-auto h-11 px-6 rounded-xl bg-booking-primary hover:bg-booking-primary-light text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
                      >
                        Next: Details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="modal-step2"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <PatientForm />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="modal-step3"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <AppointmentSummary
                    onSubmissionSuccess={(data) => {
                      setSubmissionData(data);
                      setStep(4);
                    }}
                  />
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="modal-step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SuccessScreen submissionData={submissionData} onReset={handleClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Secure Footer */}
          <div className="py-2.5 bg-slate-50 text-center text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1.5 border-t border-slate-100 shrink-0">
            <Lock className="h-3.5 w-3.5 text-slate-400" />
            <span>Your information is secure and confidential under HIPAA standards</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AppointmentModal;
