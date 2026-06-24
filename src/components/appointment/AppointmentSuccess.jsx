import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export const AppointmentSuccess = ({ onClose }) => {
  // Generate random confetti shapes
  const confettiCount = 35;
  const colors = ['#3B8A4C', '#F57C00', '#1E88E5', '#AB47BC', '#EC407A', '#FFD54F'];

  const confetti = Array.from({ length: confettiCount }).map((_, i) => {
    const size = Math.random() * 8 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = Math.random() * 3 + 2.5;

    return {
      id: i,
      style: {
        position: 'absolute',
        top: '-20px',
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        opacity: Math.random() * 0.7 + 0.3,
        transform: `rotate(${Math.random() * 360}deg)`,
      },
      animate: {
        y: ['0vh', '80vh'],
        x: [0, (Math.random() - 0.5) * 120],
        rotate: [0, Math.random() * 720],
      },
      transition: {
        duration: duration,
        delay: delay,
        ease: 'easeOut',
        repeat: Infinity,
      }
    };
  });

  return (
    <div className="relative flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto w-full min-h-[380px] overflow-hidden bg-white select-none">
      
      {/* Confetti Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {confetti.map((c) => (
          <motion.div 
            key={c.id} 
            style={c.style} 
            animate={c.animate}
            transition={c.transition}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-6">
        
        {/* Animated Green Check Circle */}
        <motion.div 
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1.1, 1], opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-20 h-20 rounded-full bg-[#3B8A4C] text-white flex items-center justify-center shadow-lg shadow-emerald-800/20"
        >
          <Check className="w-10 h-10 stroke-[3.5]" />
        </motion.div>

        {/* Text Headers */}
        <div className="space-y-2.5">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#3B8A4C] font-display">
            Appointment Request Submitted!
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto font-normal">
            Thank you for reaching out to us.<br />
            Our team will review your request and contact you shortly to confirm your appointment.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold text-sm px-6 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </motion.button>
        </div>

      </div>

    </div>
  );
};

export default AppointmentSuccess;
