import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { useDoctors } from '../../hooks/useDoctors';
import { useBookingStore } from '../../store/bookingStore';
import DoctorCard from './DoctorCard';

export const DoctorSelector = () => {
  const { data: doctorsResponse, isLoading, error, refetch } = useDoctors();
  const selectedDoctor = useBookingStore((state) => state.doctor);
  const setDoctor = useBookingStore((state) => state.setDoctor);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const doctors = doctorsResponse?.data || [];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (doctor) => {
    if (doctor.accepts_appointments) {
      setDoctor(doctor);
      setIsOpen(false);
    }
  };

  // Skeleton loader for the selector
  if (isLoading) {
    return (
      <div className="space-y-4 text-left">
        <div>
          <div className="h-6 w-36 bg-slate-200 rounded-md animate-pulse mb-1" />
          <div className="h-4 w-64 bg-slate-100 rounded-md animate-pulse" />
        </div>
        <div className="h-14 w-full bg-slate-200 rounded-2xl animate-pulse border border-slate-200" />
        <div className="h-64 w-full bg-slate-100 rounded-[24px] animate-pulse border border-slate-100" />
      </div>
    );
  }

  // Error State with Retry Button
  if (error) {
    return (
      <div className="glass-panel border-booking-error/20 bg-booking-error-soft/50 p-6 rounded-[24px] text-center space-y-4 text-left">
        <div className="inline-flex p-3 bg-booking-error-soft text-booking-error rounded-full">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-800">Failed to Load Clinicians</h4>
          <p className="text-xs text-slate-500">We encountered a network error while fetching our specialists.</p>
        </div>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-booking-error text-white text-xs font-bold rounded-xl hover:bg-booking-error-light transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-booking-secondary" />
          Choose Your Doctor
        </label>
        <p className="text-xs text-slate-500">Select a specialist for your child's consultation.</p>
      </div>

      {/* Custom Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3.5 bg-white border-2 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
            isOpen
              ? 'border-booking-primary shadow-lg shadow-booking-primary/5'
              : 'border-slate-100 shadow-sm hover:border-slate-300'
          }`}
        >
          {selectedDoctor ? (
            <div className="flex items-center gap-3">
              <img
                src={selectedDoctor.profile_image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=60&h=60'}
                alt={selectedDoctor.full_name}
                className="w-8 h-8 rounded-full object-cover border border-slate-100"
              />
              <div>
                <p className="text-xs font-bold text-slate-800">{selectedDoctor.full_name}</p>
                <p className="text-[10px] font-medium text-slate-400">{selectedDoctor.specialization}</p>
              </div>
            </div>
          ) : (
            <span className="text-xs font-medium text-slate-400">Select a doctor...</span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-booking-primary' : ''
            }`}
          />
        </button>

        {/* Dropdown Options Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl max-h-80 overflow-y-auto"
            >
              {doctors.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">No active doctors found.</div>
              ) : (
                <div className="p-2 space-y-1">
                  {doctors.map((doctor) => {
                    const isSelected = selectedDoctor?.id === doctor.id;
                    const isAccepting = doctor.accepts_appointments;

                    return (
                      <div
                        key={doctor.id}
                        onClick={() => handleSelect(doctor)}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-150 ${
                          !isAccepting
                            ? 'opacity-50 cursor-not-allowed bg-slate-50/50'
                            : isSelected
                              ? 'bg-booking-primary-soft text-booking-primary cursor-pointer'
                              : 'hover:bg-slate-50 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={doctor.profile_image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=60&h=60'}
                            alt={doctor.full_name}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-100"
                          />
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-slate-800">{doctor.full_name}</span>
                            <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                              {doctor.specialization}
                            </span>
                            <span className="text-[9px] font-medium text-slate-500 mt-0.5">
                              {doctor.qualification}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <span className="text-[9px] font-bold bg-white px-2 py-0.5 rounded border border-slate-100 text-booking-primary">
                            {doctor.experience} yrs exp
                          </span>
                          {!isAccepting && (
                            <span className="text-[8px] font-bold text-booking-error bg-booking-error-soft px-1.5 py-0.5 rounded">
                              Not Accepting
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Doctor Profile Card */}
      <AnimatePresence mode="wait">
        {selectedDoctor && (
          <motion.div
            key={selectedDoctor.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <DoctorCard doctor={selectedDoctor} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorSelector;
