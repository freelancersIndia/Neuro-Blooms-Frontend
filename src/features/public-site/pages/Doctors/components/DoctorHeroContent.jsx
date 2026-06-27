import { motion } from 'framer-motion';
import { Star, ShieldCheck, MapPin, MessageCircle, Calendar, Phone, ArrowRight } from 'lucide-react';
import { useAppointmentModal } from '../../../../../context/AppointmentModalContext';
import { CLINIC_INFO } from '../../../../../utils/constants';

export const DoctorHeroContent = () => {
  const { openModal } = useAppointmentModal();

  const infoItems = [
    { icon: ShieldCheck, text: '23+ Years of Experience' },
    { icon: MapPin, text: 'Jubilee Hills, Hyderabad' },
    { icon: MessageCircle, text: 'Languages: English  •  Hindi  •  Telugu' },
    { icon: Calendar, text: 'Available: MON - SAT' },
  ];

  return (
    <div className="flex flex-col text-left space-y-4 lg:space-y-6 max-w-xl">
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/30 text-[#2E7D32] rounded-full text-xs font-extrabold tracking-wider uppercase shadow-sm"
      >
        <Star className="h-3.5 w-3.5 text-[#3B8A4C] fill-current" />
        <span>Child Development Specialist</span>
      </motion.div>

      {/* Title & Designation */}
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 font-display tracking-tight leading-none"
        >
          Dr. A. Jagadish
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-1.5"
        >
          <span className="text-base sm:text-lg lg:text-xl font-bold text-[#3B8A4C] block font-display">
            Pediatrician <span className="text-slate-350 mx-1">|</span> Child Development Specialist
          </span>
          <span className="text-sm sm:text-base text-slate-500 font-semibold block leading-tight">
            Neonatal & Paediatric Early Interventionist
          </span>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-slate-200/60" />

      {/* Info List */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
          }
        }}
        className="space-y-2.5 sm:space-y-3.5"
      >
        {infoItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
              className="flex items-center gap-3 text-xs sm:text-sm md:text-base text-slate-650 font-semibold"
            >
              <div className="w-8 h-8 rounded-full bg-white text-[#3B8A4C] flex items-center justify-center border border-slate-100/80 shadow-sm shrink-0">
                <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <span>{item.text}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 pt-2"
      >
        {/* Book Appointment */}
        <button
          onClick={() => openModal()}
          className="bg-[#2E7D32] hover:bg-[#256228] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] group cursor-pointer"
        >
          <Calendar className="h-4.5 w-4.5" />
          <span>Book Appointment</span>
          <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        {/* Call Now */}
        <a
          href={`tel:${CLINIC_INFO.PHONE}`}
          className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98] cursor-pointer"
        >
          <Phone className="h-4.5 w-4.5 text-[#3B8A4C]" />
          <span>Call Now</span>
        </a>
      </motion.div>
    </div>
  );
};

export default DoctorHeroContent;
