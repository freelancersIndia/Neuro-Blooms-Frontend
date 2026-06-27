import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Navigation } from 'lucide-react';
import { useAppointmentModal } from '../../../../context/AppointmentModalContext';

export const LocationMap = () => {
  const { openModal } = useAppointmentModal();

  return (
    <div className="bg-white rounded-[32px] p-6 lg:p-7 shadow-[0_15px_45px_rgba(79,94,84,0.08)] border border-slate-100/60 w-full select-none text-left flex flex-col">
      
      {/* Header Area */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#A5D6A7]/20">
          <MapPin className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="flex flex-col leading-snug">
          <h4 className="text-base sm:text-lg font-black text-slate-800 font-display">
            Find Us Here
          </h4>
          <p className="text-xs text-slate-400 font-semibold">
            Visit our child development center
          </p>
        </div>
      </div>

      {/* Map Embed Container */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex-grow" style={{ minHeight: '280px' }}>
        <iframe
          title="Neuro Blooms Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0080755991487!2d80.20929431482196!3d13.085694990785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sAnna%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
          className="w-full h-full absolute inset-0"
          style={{ border: 0, minHeight: '280px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Address Line */}
      <div className="flex items-center gap-2.5 mt-4 px-1">
        <Navigation className="w-4 h-4 text-[#3B8A4C] flex-shrink-0" />
        <p className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed">
          123 Green Park Road, Anna Nagar, Chennai, Tamil Nadu 600040
        </p>
      </div>

      {/* Schedule an Appointment Button */}
      <motion.button
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => openModal()}
        className="w-full bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] hover:from-[#327540] hover:to-[#255C31] text-white font-bold py-3 px-6 rounded-full inline-flex items-center justify-center gap-2.5 shadow-md shadow-emerald-950/10 hover:shadow-lg hover:shadow-emerald-950/20 transition-all duration-300 cursor-pointer mt-5 text-xs sm:text-sm"
      >
        <Calendar className="w-4 h-4" />
        <span>Schedule an Appointment</span>
      </motion.button>

    </div>
  );
};

export default LocationMap;
