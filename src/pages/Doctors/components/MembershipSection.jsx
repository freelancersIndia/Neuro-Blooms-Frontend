import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import MembershipCard from './MembershipCard';
import Container from '../../../components/common/Container';

export const MembershipSection = () => {
  const memberships = [
    {
      title: 'Indian Academy of Pediatrics (IAP)',
      subtitle: '',
      logoSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#E53935]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50 22 C38 34, 45 55, 50 68 C55 55, 62 34, 50 22 Z M50 68 L50 78 M42 78 L58 78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="42" r="6" fill="currentColor" />
          <path d="M42 50 C40 45, 45 42, 48 44" stroke="#4CAF50" strokeWidth="2" fill="none" />
          <path d="M58 50 C60 45, 55 42, 52 44" stroke="#4CAF50" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
    {
      title: 'Indian Academy of Cerebral Palsy (IACP)',
      subtitle: '',
      logoSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#2E7D32]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="36" cy="40" r="6" fill="currentColor" />
          <circle cx="64" cy="40" r="6" fill="currentColor" />
          <path d="M36 50 Q50 65 64 50" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M25 65 Q50 78 75 65" stroke="#1565C0" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M50 46 L50 56" stroke="currentColor" strokeWidth="3" />
        </svg>
      ),
    },
    {
      title: 'Indian Early Pediatrics Association (IEPA)',
      subtitle: '',
      logoSvg: (
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#1565C0]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="50" cy="36" r="6" fill="currentColor" />
          <path d="M38 64 Q50 52 62 64" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M45 46 L55 46 M50 41 L50 51" stroke="#E53935" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="48" r="4.5" fill="currentColor" />
          <circle cx="68" cy="48" r="4.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'National Centre for Disease Control Program (NCDP)',
      subtitle: '',
      logoSvg: (
        <svg viewBox="0 0 120 100" className="w-full h-full text-[#6A1B9A]">
          <rect x="10" y="25" width="100" height="50" rx="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" className="font-extrabold text-2xl font-display" fill="currentColor">
            NCDP
          </text>
          <path d="M25 68 L95 68" stroke="#E65100" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      ),
    },
    {
      title: 'I-CANCL',
      subtitle: '(Initiative for Cancer Care & Support for Children)',
      logoSvg: (
        <svg viewBox="0 0 120 100" className="w-full h-full text-[#E65100]">
          <rect x="8" y="22" width="104" height="56" rx="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" className="font-extrabold text-[21px] tracking-tight font-display" fill="#E53935">
            i-CANCL
          </text>
          <path d="M42 62 Q60 54 78 62" stroke="#1565C0" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 bg-white w-full overflow-hidden select-none">
      <Container>
        {/* Rounded Soft Blue Container */}
        <div className="relative bg-[#F5FBFF] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(30,41,59,0.03)] border border-slate-100/60 overflow-hidden">
          
          {/* --- DECORATIONS --- */}
          {/* Floating Circle (Top Left) */}
          <div className="absolute top-[18%] left-[8%] w-5 h-5 rounded-full border-4 border-[#009688]/20 pointer-events-none hidden sm:block z-0" />
          
          {/* Floating Orange Outline (Bottom Left) */}
          <div className="absolute bottom-[20%] left-[4%] w-4 h-4 rounded-full border-4 border-[#FFCA28]/25 pointer-events-none hidden sm:block z-0" />

          {/* Floating Blue Heart (Top Right) */}
          <div className="absolute top-[14%] right-[22%] text-[#1E88E5]/15 pointer-events-none hidden sm:block z-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Floating Pink Heart (Bottom Right) */}
          <div className="absolute bottom-[16%] right-[6%] text-[#EC407A]/15 pointer-events-none hidden sm:block z-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Column Layout */}
          <div className="space-y-8 sm:space-y-12 relative z-10 text-center flex flex-col items-center">
            
            {/* Header Area */}
            <div className="flex flex-col items-center space-y-4 max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E3F2FD] border border-[#90CAF9]/30 text-[#1565C0] rounded-full text-xs font-extrabold tracking-wider uppercase shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-[#1565C0] fill-none stroke-[2.5]" />
                <span>PROFESSIONAL MEMBERSHIPS</span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 font-display tracking-tight">
                  Trusted. Recognized. Respected.
                </h2>
                <div className="w-14 h-1.5 bg-[#1565C0] rounded-full mx-auto" />
              </div>

              <p className="text-sm sm:text-base text-slate-500 font-bold leading-relaxed">
                Proud member of leading national organizations in child health and developmental care.
              </p>
            </div>

            {/* Grid of Memberships */}
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 w-full"
            >
              {memberships.map((membership, index) => (
                <MembershipCard
                  key={index}
                  logoSvg={membership.logoSvg}
                  title={membership.title}
                  subtitle={membership.subtitle}
                />
              ))}
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default MembershipSection;
