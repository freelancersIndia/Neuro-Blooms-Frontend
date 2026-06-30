import React from 'react';
import { Sun, CloudSun, Moon, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../common/LoadingSpinner';

// Helper to convert "HH:MM" to "HH:MM AM/PM"
const formatTime12h = (time24) => {
  if (!time24) return '';
  const [hourStr, minStr] = time24.split(':');
  const hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minStr} ${ampm}`;
};

export const SlotSelector = ({ selectedSlot, onSelectSlot, availableSlots = [], loadingSlots, hasSelectedDoctorAndDate, message }) => {
  if (!hasSelectedDoctorAndDate) {
    return (
      <div className="space-y-4 text-left w-full">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-800 font-display">
          Available Time Slots
        </h3>
        <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 min-h-[150px] justify-center text-center">
          <Info size={16} className="text-slate-400" />
          <span>Please select a doctor and a date to view available time slots.</span>
        </div>
      </div>
    );
  }

  if (loadingSlots) {
    return (
      <div className="space-y-4 text-left w-full">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-800 font-display">
          Available Time Slots
        </h3>
        <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl p-6 min-h-[200px]">
          <LoadingSpinner size="md" />
          <span className="text-xs text-slate-400 font-semibold mt-3">Fetching live availability...</span>
        </div>
      </div>
    );
  }

  if (availableSlots.length === 0) {
    return (
      <div className="space-y-4 text-left w-full">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-800 font-display">
          Available Time Slots
        </h3>
        <div className="flex items-center gap-2.5 text-xs font-semibold text-rose-500 bg-rose-50/40 border border-dashed border-rose-100 rounded-2xl p-6 min-h-[150px] justify-center text-center">
          <Info size={16} className="text-rose-400" />
          <span>{message || 'No slots available for this doctor on the selected date. Please choose another date or doctor.'}</span>
        </div>
      </div>
    );
  }

  // Categorize slots by time of day
  const morningSlots = [];
  const afternoonSlots = [];
  const eveningSlots = [];

  availableSlots.forEach((slot) => {
    const hour = parseInt(slot.start.split(':')[0], 10);
    if (hour < 12) {
      morningSlots.push(slot);
    } else if (hour < 17) {
      afternoonSlots.push(slot);
    } else {
      eveningSlots.push(slot);
    }
  });

  const sections = [
    { title: 'Morning', icon: <Sun className="h-4.5 w-4.5 text-[#3B8A4C]" />, slots: morningSlots },
    { title: 'Afternoon', icon: <CloudSun className="h-4.5 w-4.5 text-[#3B8A4C]" />, slots: afternoonSlots },
    { title: 'Evening', icon: <Moon className="h-4.5 w-4.5 text-[#3B8A4C]" />, slots: eveningSlots },
  ].filter(sec => sec.slots.length > 0);

  return (
    <div className="space-y-4 text-left w-full">
      <h3 className="text-sm sm:text-base font-extrabold text-slate-800 font-display">
        Available Time Slots
      </h3>

      <div className="space-y-5">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2.5">
            {/* Section Header */}
            <div className="flex items-center gap-1.5 text-slate-700 text-xs sm:text-sm font-bold font-display">
              {section.icon}
              <span>{section.title}</span>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-3 gap-2">
              {section.slots.map((slot) => {
                const isSelected = selectedSlot === slot.start;

                let cardClass = "py-2.5 px-3 rounded-xl border flex flex-col items-center justify-center text-center select-none transition-all duration-200 min-h-[46px] cursor-pointer ";
                
                if (isSelected) {
                  cardClass += "bg-[#3B8A4C] border-[#3B8A4C] text-white shadow-md shadow-emerald-950/15";
                } else {
                  cardClass += "bg-white border-[#3B8A4C]/20 hover:border-[#3B8A4C]/60 text-slate-700 hover:bg-emerald-50/10";
                }

                return (
                  <motion.div
                    key={slot.start}
                    whileHover={!isSelected ? { scale: 1.03 } : {}}
                    whileTap={!isSelected ? { scale: 0.97 } : {}}
                    onClick={() => onSelectSlot(slot.start)}
                    className={cardClass}
                  >
                    <span className="text-xs font-bold font-display">{formatTime12h(slot.start)}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotSelector;
