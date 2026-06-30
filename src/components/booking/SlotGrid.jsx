import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Info, AlertTriangle } from 'lucide-react';
import { useAvailableSlots } from '../../hooks/useAvailableSlots';
import { useBookingStore } from '../../store/bookingStore';

export const SlotGrid = () => {
  const doctor = useBookingStore((state) => state.doctor);
  const date = useBookingStore((state) => state.date);
  const selectedSlot = useBookingStore((state) => state.slot);
  const setSlot = useBookingStore((state) => state.setSlot);

  const { data: slotsResponse, isLoading, error } = useAvailableSlots(doctor?.id, date);

  // Robust parsing to support both new and old API response structures
  const slots = Array.isArray(slotsResponse?.data)
    ? slotsResponse.data
    : (slotsResponse?.data?.available_slots || []);

  if (!doctor || !date) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-100 rounded-[24px] bg-slate-50/50 text-slate-400 text-center min-h-[160px]">
        <Clock className="w-8 h-8 stroke-[1.5] text-slate-300 mb-2" />
        <p className="text-xs font-semibold">Select a date first</p>
        <p className="text-[10px] text-slate-400 max-w-[220px] mt-0.5">
          Available time slots will appear here once a date is selected.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3 text-left">
        <div className="h-5 w-24 bg-slate-200 rounded-md animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-11 bg-slate-200/60 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2.5 p-4 border border-booking-error/15 bg-booking-error-soft/40 text-booking-error rounded-2xl text-xs font-semibold">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>Failed to load time slots. Please try again.</span>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border border-dashed border-slate-100 rounded-[24px] bg-slate-50/30 text-slate-400 text-center min-h-[160px]">
        <Info className="w-8 h-8 stroke-[1.5] text-slate-300 mb-2" />
        <p className="text-xs font-bold text-slate-500">No slots available</p>
        <p className="text-[10px] text-slate-400 max-w-[200px] mt-0.5">
          There are no available slots for this date. Please choose another date.
        </p>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <div className="space-y-3 text-left">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-booking-secondary" />
        Select Time Slot
      </h4>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1.5 bg-slate-50/50 rounded-3xl border border-slate-100/50"
      >
        {slots.map((slot) => {
          const isSelected = selectedSlot?.start_time === slot.start_time;

          return (
            <motion.div key={slot.start_time} variants={itemVariants}>
              <motion.button
                type="button"
                onClick={() => setSlot(slot)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold border transition-all duration-150 cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'bg-booking-primary border-booking-primary text-white shadow-md shadow-booking-primary/20'
                    : 'bg-white text-slate-700 border-slate-100 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {slot.display || `${slot.start_time} - ${slot.end_time}`}
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SlotGrid;
