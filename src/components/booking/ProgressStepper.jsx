import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const ProgressStepper = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Doctor & Time' },
    { number: 2, label: 'Patient Details' },
    { number: 3, label: 'Confirmation' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 select-none px-4">
      <div className="flex items-center justify-between relative">
        {/* Background Track Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[4px] bg-slate-100 rounded-full -z-10" />

        {/* Animated Progress Line */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[4px] bg-booking-primary rounded-full -z-10"
          initial={{ width: '0%' }}
          animate={{
            width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />

        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div key={step.number} className="flex flex-col items-center relative">
              {/* Step Circle */}
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 relative ${
                  isCompleted
                    ? 'bg-booking-success border-booking-success text-white'
                    : isActive
                      ? 'bg-white border-booking-primary text-booking-primary shadow-lg shadow-booking-primary/20'
                      : 'bg-white border-slate-200 text-slate-400'
                }`}
                animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <Check className="w-5 h-5 stroke-[3]" />
                  </motion.div>
                ) : (
                  <span>{step.number}</span>
                )}

                {/* Micro-glow for active step */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-booking-primary/10 animate-ping -z-10" />
                )}
              </motion.div>

              {/* Step Label */}
              <span
                className={`text-xs font-semibold tracking-wide mt-3 text-center whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? 'text-booking-primary font-bold'
                    : isCompleted
                      ? 'text-booking-success'
                      : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStepper;
