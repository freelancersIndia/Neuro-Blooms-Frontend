import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Clock, User, Sparkles, Home, PlusCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/bookingStore';
import { ROUTES } from '../../utils/routes';

export const SuccessScreen = ({ submissionData, onReset }) => {
  const [countdown, setCountdown] = React.useState(5);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/'; // Reload and redirect to landing page
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Generate 50 colorful confetti particles with random trajectories
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#14B8A6'];
  const confettiParticles = Array.from({ length: 50 }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 180;
    const duration = 1.2 + Math.random() * 1.5;
    return {
      id: i,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 8,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 20, // offset slightly upward
      rotation: Math.random() * 360,
      duration,
      delay: Math.random() * 0.2,
    };
  });

  return (
    <div className="relative max-w-2xl mx-auto px-4 py-8 text-center overflow-visible">
      {/* Confetti Explosion Layer */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
        {confettiParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-md"
            style={{
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
            }}
            initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
            animate={{
              x: p.x,
              y: [0, p.y * 0.5, p.y, p.y + 120], // parabolic path with gravity fall
              scale: [0, 1, 1, 0.5],
              rotate: p.rotation + 360,
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Success Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="glass-panel border-booking-success/20 bg-white/80 p-8 rounded-[32px] shadow-2xl shadow-slate-200/50 space-y-6 relative z-10"
      >
        {/* Success Icon Badge */}
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.2 }}
            className="bg-booking-success text-white p-5 rounded-full shadow-lg shadow-booking-success/20 flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </motion.div>
          
          {/* Sparkles around icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1 -right-1 text-booking-warning"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Intake Request Logged!</h3>
          <p className="text-sm font-medium text-slate-500 max-w-md mx-auto leading-relaxed">
            Your appointment request has been submitted successfully. A confirmation email has been dispatched to your inbox.
          </p>
        </div>

        {/* Expected Notification Banner */}
        <div className="bg-booking-primary-soft/40 border border-booking-primary-soft/70 px-4 py-3 rounded-2xl max-w-md mx-auto text-left flex items-start gap-3">
          <Info className="w-4 h-4 text-booking-primary shrink-0 mt-0.5" />
          <p className="text-[11px] font-semibold text-booking-primary leading-normal">
            <strong>Next Steps:</strong> Our child support coordinators will review this request and contact you within 24 hours to finalize your child's booking.
          </p>
        </div>

        {/* Receipt Details Card */}
        <div className="bg-slate-50/50 border border-slate-100 p-6 rounded-[24px] text-left space-y-4 max-w-md mx-auto shadow-inner">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
            Booking Request Receipt
          </h4>
          
          <div className="text-xs space-y-3 font-semibold text-slate-600">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Request Number:</span>
              <span className="font-mono font-bold text-booking-primary bg-white px-2.5 py-1 rounded-lg border border-slate-100 shadow-sm">
                {submissionData?.request_number || 'REQ-PENDING'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-400">Child's Name:</span>
              <span className="text-slate-800">
                {submissionData?.child_first_name} {submissionData?.child_last_name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Preferred Date:</span>
              <div className="flex items-center gap-1.5 text-slate-800">
                <Calendar className="w-3.5 h-3.5 text-booking-secondary" />
                <span>{submissionData?.preferred_date}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Preferred Time:</span>
              <div className="flex items-center gap-1.5 text-slate-800">
                <Clock className="w-3.5 h-3.5 text-booking-secondary" />
                <span>{submissionData?.preferred_time_slot}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-booking-warning-soft text-booking-warning border border-booking-warning-soft/50">
                Pending Approval
              </span>
            </div>
          </div>
        </div>

        {/* Redirection Countdown */}
        <div className="pt-6 text-center border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500">
            Redirecting to home page in{' '}
            <span className="text-booking-primary font-extrabold text-sm bg-booking-primary-soft px-2.5 py-1 rounded-lg border border-booking-primary-soft/50 inline-block animate-pulse">
              {countdown}
            </span>{' '}
            seconds...
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default SuccessScreen;
