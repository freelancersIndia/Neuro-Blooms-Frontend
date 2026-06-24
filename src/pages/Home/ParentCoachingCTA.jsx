import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Laptop, ArrowRight } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.012 2C6.5 2 2.012 6.5 2.012 12c0 2.1.6 4 1.8 5.6L2.1 22l4.6-1.5c1.6 1 3.4 1.5 5.3 1.5 5.5 0 10-4.5 10-10S17.5 2 12.012 2zm5.7 13.9c-.2.6-1.2 1.1-1.7 1.2-.5.1-1.1.2-3.3-.7-2.8-1.2-4.6-4.1-4.7-4.3 0-.2-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.9.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.4.2.5.8 2 .9 2.2.1.2.1.4 0 .6-.1.2-.2.3-.4.6-.2.2-.4.5-.6.6-.2.2-.4.4-.2.8.2.4.9 1.5 1.9 2.4 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.7-.1.2-.2.9-1 1.1-1.4.2-.3.4-.3.7-.2.3.1 1.7.8 2 1 .3.2.5.3.6.4.1.2.1.8-.1 1.4z" />
  </svg>
);

export const ParentCoachingCTA = () => {
  const avatarImage = "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=150";

  return (
    <motion.div 
      className="bg-white rounded-[32px] sm:rounded-[36px] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-slate-100/60 p-4 sm:p-5 lg:py-4.5 lg:px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-5 relative z-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {/* LEFT SIDE: Avatar + Slogan */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full lg:w-auto">
        <img 
          src={avatarImage} 
          alt="Happy mother and child" 
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-emerald-100 object-cover shadow-sm flex-shrink-0"
          loading="lazy"
        />
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight leading-tight">
            You don't have to do it alone.{' '}
            <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
              We're here to walk with you.
            </span>
          </h4>
          <p className="text-xs sm:text-[13px] text-slate-500 font-medium">
            Together, we can help your child{' '}
            <span className="text-[#3B8A4C] font-extrabold">grow</span>,{' '}
            <span className="text-orange-500 font-extrabold">learn</span> and{' '}
            <span className="text-blue-500 font-extrabold">thrive</span>.
          </p>
        </div>
      </div>

      {/* vertical divider line for desktop */}
      <div className="hidden lg:block w-[1px] h-14 bg-slate-100"></div>

      {/* RIGHT SIDE: 3 features in row + WhatsApp button below */}
      <div className="flex flex-col sm:flex-row lg:flex-col items-center xl:flex-row gap-5 lg:gap-3 xl:gap-5 w-full lg:w-auto justify-end">
        {/* 3 Pills */}
        <div className="flex flex-row justify-center gap-4 text-left sm:justify-start">
          {/* Personalized Coaching */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(46,125,50,0.08)]">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-slate-700 leading-tight">
              Personalized<br/>Coaching
            </div>
          </div>
          
          {/* Flexible Sessions */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(234,88,12,0.08)]">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-slate-700 leading-tight">
              Flexible<br/>Sessions
            </div>
          </div>

          {/* In-Person & Online */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(37,99,235,0.08)]">
              <Laptop className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-slate-700 leading-tight">
              In-Person &<br/>Online Options
            </div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/919876543210?text=Hi%20Neuro%20Blooms,%20I%20am%20interested%20in%20learning%20more%20about%20your%20Parent%20Coaching%20Program."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#2563EB] hover:from-[#1E3A8A] hover:to-[#2563EB] text-white px-5 py-2.5 rounded-full text-[13px] font-extrabold shadow-[0_4px_12px_rgba(46,125,50,0.2)] hover:shadow-lg transition-all group flex-shrink-0"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <WhatsAppIcon className="w-4 h-4 text-white fill-current" />
          <span>Talk to Our Team on WhatsApp</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>

    </motion.div>
  );
};

export default ParentCoachingCTA;
