import React from 'react';
import { Sun, CloudSun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const SlotSelector = ({ selectedSlot, onSelectSlot }) => {
  const timeSections = [
    {
      title: 'Morning',
      icon: <Sun className="h-4.5 w-4.5 text-[#3B8A4C]" />,
      slots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']
    },
    {
      title: 'Afternoon',
      icon: <CloudSun className="h-4.5 w-4.5 text-[#3B8A4C]" />,
      slots: ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM']
    },
    {
      title: 'Evening',
      icon: <Moon className="h-4.5 w-4.5 text-[#3B8A4C]" />,
      slots: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM']
    }
  ];

  // Mock booked slots from reference design
  const bookedSlots = ['02:00 PM', '06:30 PM'];

  return (
    <div className="space-y-4 text-left w-full">
      <h3 className="text-sm sm:text-base font-extrabold text-slate-800 font-display">
        Available Time Slots
      </h3>

      <div className="space-y-5">
        {timeSections.map((section) => (
          <div key={section.title} className="space-y-2.5">
            {/* Section Header */}
            <div className="flex items-center gap-1.5 text-slate-700 text-xs sm:text-sm font-bold font-display">
              {section.icon}
              <span>{section.title}</span>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-3 gap-2">
              {section.slots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedSlot === slot;

                let cardClass = "py-2 px-3 rounded-xl border flex flex-col items-center justify-center text-center select-none transition-all duration-200 min-h-[46px] cursor-pointer ";
                
                if (isBooked) {
                  cardClass += "bg-slate-100 border-slate-100 text-slate-400 pointer-events-none";
                } else if (isSelected) {
                  cardClass += "bg-[#3B8A4C] border-[#3B8A4C] text-white shadow-md shadow-emerald-950/15";
                } else {
                  cardClass += "bg-white border-[#3B8A4C]/20 hover:border-[#3B8A4C]/60 text-slate-700 hover:bg-emerald-50/10";
                }

                return (
                  <motion.div
                    key={slot}
                    whileHover={!isBooked && !isSelected ? { scale: 1.03 } : {}}
                    whileTap={!isBooked && !isSelected ? { scale: 0.97 } : {}}
                    onClick={() => !isBooked && onSelectSlot(slot)}
                    className={cardClass}
                  >
                    <span className="text-xs font-bold font-display">{slot}</span>
                    {isBooked && (
                      <span className="text-[7.5px] uppercase font-bold text-slate-400 leading-none mt-0.5">
                        Booked
                      </span>
                    )}
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
