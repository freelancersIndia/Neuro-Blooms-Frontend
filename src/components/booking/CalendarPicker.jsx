import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info, HelpCircle } from 'lucide-react';
import { useAvailableDates } from '../../hooks/useAvailableDates';
import { useBookingStore } from '../../store/bookingStore';

export const CalendarPicker = () => {
  const doctor = useBookingStore((state) => state.doctor);
  const selectedDate = useBookingStore((state) => state.date);
  const setDate = useBookingStore((state) => state.setDate);

  const { data: datesResponse, isLoading, error } = useAvailableDates(doctor?.id);
  const availableDates = datesResponse?.data || [];

  // Local state for calendar navigation (current month and year view)
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-100 rounded-[24px] bg-slate-50/50 text-slate-400 text-center min-h-[350px]">
        <CalendarIcon className="w-12 h-12 stroke-[1.5] text-slate-300 mb-3" />
        <p className="text-sm font-semibold">Select a doctor first</p>
        <p className="text-xs text-slate-400 max-w-[200px] mt-1">
          Calendar availability will automatically load after choosing a clinician.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4 text-left min-h-[350px]">
        <div className="flex justify-between items-center">
          <div className="h-6 w-32 bg-slate-200 rounded-md animate-pulse" />
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-8 w-8 bg-slate-200 rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-100 rounded-md animate-pulse" />
          ))}
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-10 bg-slate-200/60 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-booking-error/20 rounded-[24px] bg-booking-error-soft/30 text-booking-error text-center min-h-[350px]">
        <AlertCircle className="w-10 h-10 mb-2" />
        <p className="text-sm font-bold">Failed to load calendar</p>
        <p className="text-xs text-slate-500 max-w-[240px] mt-1">
          Please check your network connection and try again.
        </p>
      </div>
    );
  }

  // Map API dates for quick lookup
  const dateMap = new Map();
  availableDates.forEach((d) => {
    dateMap.set(d.date, d);
  });

  // Calendar calculations
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday, 1 = Monday...

  // Weekdays header
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate day cells
  const dayCells = [];
  // Empty cells for padding before the 1st of the month
  for (let i = 0; i < firstDayIndex; i++) {
    dayCells.push(null);
  }
  // Month days
  for (let day = 1; day <= daysInMonth; day++) {
    dayCells.push(day);
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Helper to format date string
  const formatDateString = (day) => {
    if (!day) return '';
    const m = String(currentMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  // Status Styling Configuration
  const statusStyles = {
    AVAILABLE: {
      bg: 'bg-booking-primary-soft hover:bg-booking-primary hover:text-white border-booking-primary text-booking-primary cursor-pointer',
      tooltip: 'Available for booking',
    },
    FULLY_BOOKED: {
      bg: 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60',
      tooltip: 'Fully Booked - No slots available',
    },
    DOCTOR_OFF: {
      bg: 'bg-red-50 border-red-100 text-red-400 cursor-not-allowed opacity-60',
      tooltip: 'Doctor off duty on this weekday',
    },
    HOLIDAY: {
      bg: 'bg-amber-50 border-amber-200 text-amber-600 cursor-not-allowed opacity-75',
      tooltip: 'Clinic Holiday',
    },
    CLINIC_CLOSED: {
      bg: 'bg-slate-200 border-slate-300 text-slate-500 cursor-not-allowed opacity-60',
      tooltip: 'Clinic Closed',
    },
    ON_LEAVE: {
      bg: 'bg-purple-50 border-purple-100 text-purple-400 cursor-not-allowed opacity-60',
      tooltip: 'Doctor on leave',
    },
    NOT_ACCEPTING_APPOINTMENTS: {
      bg: 'bg-red-100 border-red-200 text-red-600 cursor-not-allowed opacity-60',
      tooltip: 'Doctor not accepting bookings',
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <CalendarIcon className="w-3.5 h-3.5 text-booking-secondary" />
          Select Appointment Date
        </h4>
        
        {/* Month Navigation */}
        <div className="flex items-center gap-1 bg-white border border-slate-100 p-1 rounded-xl shadow-sm">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-700 min-w-[90px] text-center">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm">
        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-1.5 mb-3 text-center">
          {weekdays.map((day) => (
            <div key={day} className="text-[10px] font-bold text-slate-400 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {dayCells.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="h-10" />;
            }

            const dateStr = formatDateString(day);
            const apiData = dateMap.get(dateStr);
            const status = apiData?.status || 'CLINIC_CLOSED'; // Fallback if not returned
            const message = apiData?.message || statusStyles[status]?.tooltip || 'Unavailable';

            const isSelected = selectedDate === dateStr;
            const isAvailable = status === 'AVAILABLE';

            const config = statusStyles[status] || {
              bg: 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed',
              tooltip: 'Unavailable',
            };

            return (
              <div key={dateStr} className="relative group">
                <motion.button
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => setDate(dateStr)}
                  className={`w-full h-10 rounded-xl flex items-center justify-center text-xs font-bold border transition-all relative ${
                    isSelected
                      ? 'bg-booking-primary border-booking-primary text-white shadow-md shadow-booking-primary/25 z-10'
                      : config.bg
                  }`}
                  whileHover={isAvailable ? { scale: 1.06 } : {}}
                  whileTap={isAvailable ? { scale: 0.95 } : {}}
                >
                  {day}
                  
                  {/* Pulse animation for selected date */}
                  {isSelected && (
                    <span className="absolute inset-0 rounded-xl border-2 border-white/20 animate-ping pointer-events-none" />
                  )}
                </motion.button>

                {/* Styled Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none min-w-[150px]">
                  <div className="bg-slate-800 text-white text-[10px] font-semibold py-1.5 px-2.5 rounded-lg shadow-md text-center leading-normal">
                    {message}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center pt-2 text-[10px] text-slate-500 font-semibold bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-booking-primary-soft border border-booking-primary" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200" />
          <span>Fully Booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-red-50 border border-red-100" />
          <span>Doctor Off</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-amber-50 border border-amber-200" />
          <span>Holiday</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-md bg-purple-50 border border-purple-100" />
          <span>Leave</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;
