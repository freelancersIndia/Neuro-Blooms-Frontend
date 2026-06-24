import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useAppointmentModal } from '../../context/AppointmentModalContext';

export const BottomCTA = () => {
  const { openModal } = useAppointmentModal();

  // Hands holding heart SVG icon
  const heartHandsIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      <path d="M3 14c2-1 4-1 6 0M21 14c-2-1-4-1-6 0" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-[32px] p-6 lg:p-7 shadow-[0_15px_45px_rgba(79,94,84,0.06)] border border-slate-100/60 w-full relative z-10"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        
        {/* Left Side: Slogans & Icon */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#3B8A4C] shadow-sm flex-shrink-0">
            {heartHandsIcon}
          </div>
          <div className="space-y-0.5">
            <h4 className="text-slate-800 text-lg font-bold font-display leading-tight">
              We're with you at every step.
            </h4>
            <p className="text-slate-500 text-sm font-normal">
              Your child's growth is our mission.
            </p>
          </div>
        </div>

        {/* Divider line on desktop */}
        <div className="hidden lg:block w-px h-10 bg-slate-200" />

        {/* Right Side: Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="text-slate-600 text-sm font-semibold font-display">
            Ready to take the first step?
          </span>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal()}
            className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-sm"
          >
            <Calendar className="h-4 w-4" />
            <span>Book an Appointment</span>
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
};

export default BottomCTA;
