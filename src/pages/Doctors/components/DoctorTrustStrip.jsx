import { motion } from 'framer-motion';
import { GraduationCap, Users, Heart, Baby } from 'lucide-react';

const TRUST_CARDS = [
  {
    icon: GraduationCap,
    title: 'AIIMS Certified',
    desc: 'Master Trainer in Autism Tools (AIIMS, New Delhi)',
    colorClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]/30',
  },
  {
    icon: Users,
    title: 'National Faculty',
    desc: 'Early Intervention for Neuro Developmental Disabilities',
    colorClass: 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]/30',
  },
  {
    icon: Heart,
    title: '23+ Years',
    desc: 'of Experience in Child Development & Early Intervention',
    colorClass: 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]/30',
  },
  {
    icon: Baby,
    title: 'NICU Specialist',
    desc: 'Certified in Developmentally Supportive Care (Bayley-Pearson Academy, USA)',
    colorClass: 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]/30',
  },
];

export const DoctorTrustStrip = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.1,
            duration: 0.6,
          }
        }
      }}
      className="bg-white rounded-[32px] shadow-[0_15px_45px_rgba(79,94,84,0.04)] border border-slate-100/80 p-5 sm:p-6 lg:p-7 w-full relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
    >
      {TRUST_CARDS.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0 }
            }}
            className="flex items-start gap-4 text-left p-2"
          >
            {/* Colored Icon Circle */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm shrink-0 ${card.colorClass}`}>
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>
            
            {/* Text Information */}
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-extrabold text-slate-800 font-display leading-tight">
                {card.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold leading-relaxed">
                {card.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default DoctorTrustStrip;
