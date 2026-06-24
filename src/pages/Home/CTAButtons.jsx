import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Phone, ArrowRight } from 'lucide-react';
import { useAppointmentModal } from '../../context/AppointmentModalContext';

export const CTAButtons = () => {
  const navigate = useNavigate();
  const { openModal } = useAppointmentModal();

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const parentAvatars = [
    '/images/testimonials/priya_sharma.png',
    '/images/testimonials/rahul_verma.png',
    '/images/testimonials/neha_kapoor.png',
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">
      
      {/* Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
        
        {/* Primary Button */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal()}
          className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold py-3.5 px-6 rounded-full inline-flex items-center justify-center gap-2.5 shadow-md shadow-emerald-950/10 hover:shadow-lg hover:shadow-emerald-950/20 transition-all duration-300 w-full sm:w-auto cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          <span>Book Appointment Now</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </motion.button>

        {/* Secondary Phone Button */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCall}
          className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-[#3B8A4C]/70 rounded-full py-2.5 px-6 inline-flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#3B8A4C] flex items-center justify-center flex-shrink-0">
            <Phone className="w-4 h-4 fill-current text-[#3B8A4C]" />
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
              Call Us Now
            </span>
            <span className="text-xs sm:text-sm font-black text-[#3B8A4C] font-display">
              +91 98765 43210
            </span>
          </div>
        </motion.button>

      </div>

      {/* Social Proof Group */}
      <div className="flex items-center gap-3 select-none">
        
        {/* Avatars Stack */}
        <div className="flex -space-x-2.5">
          {parentAvatars.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Parent testimonial avatar ${i + 1}`}
              className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
            />
          ))}
        </div>

        {/* Trust Text */}
        <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-semibold">
          Trusted by 1000+ families to support their child's growth.
        </p>

      </div>

    </div>
  );
};

export default CTAButtons;
