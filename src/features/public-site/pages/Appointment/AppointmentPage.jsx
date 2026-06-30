import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Sparkles, Calendar, Clock, AlertCircle } from 'lucide-react';
import Container from '../../../../components/common/Container';
import SectionTitle from '../../../../components/common/SectionTitle';

// Custom Booking Flow Components
import ProgressStepper from '../../../../components/booking/ProgressStepper';
import DoctorSelector from '../../../../components/booking/DoctorSelector';
import CalendarPicker from '../../../../components/booking/CalendarPicker';
import SlotGrid from '../../../../components/booking/SlotGrid';
import PatientForm from '../../../../components/booking/PatientForm';
import AppointmentSummary from '../../../../components/booking/AppointmentSummary';
import SuccessScreen from '../../../../components/booking/SuccessScreen';

// State & Hooks
import { useBookingStore } from '../../../../store/bookingStore';

export const AppointmentPage = () => {
  const { step, doctor, date, slot, setStep } = useBookingStore();
  
  // Local state to manage the final submission success view
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

  const handleSubmissionSuccess = (data) => {
    setSubmissionData(data);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmissionData(null);
  };

  // Step 1 Validation Checkmarks
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
    <div className="py-12 bg-booking-bg min-h-screen font-body overflow-x-hidden relative">
      {/* Premium Floating Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-booking-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-booking-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="max-w-6xl relative z-10">
        <div className="text-center space-y-2 mb-8">
          <SectionTitle
            subtitle="Intake Portal"
            title="Book an Intake Appointment"
          />
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our expert multidisciplinary team is here to support your child's developmental journey.
          </p>
        </div>

        {/* 1. Progress Stepper */}
        {!isSubmitted && <ProgressStepper currentStep={step} />}

        {/* 2. Step Wizard Container */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <SuccessScreen submissionData={submissionData} onReset={handleReset} />
              </motion.div>
            ) : (
              <div className="w-full">
                {/* STEP 1: Doctor, Date & Time Selection */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto"
                  >
                    {/* Left Panel: Doctor Dropdown & Card */}
                    <div className="lg:col-span-5 bg-white border border-slate-100/80 rounded-[32px] p-6 shadow-xl shadow-slate-100/40">
                      <DoctorSelector />
                    </div>

                    {/* Right Panel: Calendar and Time Slot Chips */}
                    <div className="lg:col-span-7 space-y-6 bg-white border border-slate-100/80 rounded-[32px] p-6 shadow-xl shadow-slate-100/40">
                      <CalendarPicker />
                      <SlotGrid />

                      {/* Step 1 Validation Checkmarks & Continue Control */}
                      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        
                        {/* Interactive Checklist Indicators */}
                        <div className="flex flex-wrap gap-3 text-[10px] font-bold text-slate-400 select-none">
                          <div className="flex items-center gap-1.5">
                            <motion.span
                              animate={{ scale: isDoctorSelected ? [1, 1.2, 1] : 1 }}
                              className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                isDoctorSelected
                                  ? 'bg-booking-success/10 border-booking-success text-booking-success'
                                  : 'border-slate-200 text-slate-300'
                              }`}
                            >
                              {isDoctorSelected ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '1'}
                            </motion.span>
                            <span className={isDoctorSelected ? 'text-booking-success' : ''}>Doctor Selected</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <motion.span
                              animate={{ scale: isDateSelected ? [1, 1.2, 1] : 1 }}
                              className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                isDateSelected
                                  ? 'bg-booking-success/10 border-booking-success text-booking-success'
                                  : 'border-slate-200 text-slate-300'
                              }`}
                            >
                              {isDateSelected ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '2'}
                            </motion.span>
                            <span className={isDateSelected ? 'text-booking-success' : ''}>Date Chosen</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <motion.span
                              animate={{ scale: isSlotSelected ? [1, 1.2, 1] : 1 }}
                              className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                isSlotSelected
                                  ? 'bg-booking-success/10 border-booking-success text-booking-success'
                                  : 'border-slate-200 text-slate-300'
                              }`}
                            >
                              {isSlotSelected ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '3'}
                            </motion.span>
                            <span className={isSlotSelected ? 'text-booking-success' : ''}>Time Slot Selected</span>
                          </div>
                        </div>

                        {/* Continue Button */}
                        <button
                          type="button"
                          disabled={!isStep1Valid}
                          onClick={() => setStep(2)}
                          className="w-full sm:w-auto h-11 px-6 rounded-xl bg-booking-primary hover:bg-booking-primary-light text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-booking-primary/15"
                        >
                          Next: Patient Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Patient and Family Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <PatientForm />
                  </motion.div>
                )}

                {/* STEP 3: Summary and Submission */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <AppointmentSummary onSubmissionSuccess={handleSubmissionSuccess} />
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
};

export default AppointmentPage;
