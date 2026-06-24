import { motion } from 'framer-motion';
import { Star, Baby, BrainCircuit, BookOpen, Users, Hand, Heart, ShieldCheck } from 'lucide-react';
import SpecialInterestCard from './SpecialInterestCard';
import Container from '../../../components/common/Container';

export const SpecialInterestsSection = () => {
  const interests = [
    {
      icon: Baby,
      title: '0–1000 Days Development',
      colorClasses: {
        text: 'text-[#2E7D32]',
        bg: 'bg-[#E8F5E9]',
        border: 'border-[#A5D6A7]/20',
      },
    },
    {
      icon: BrainCircuit,
      title: 'Neuroplasticity in Early Childhood',
      colorClasses: {
        text: 'text-[#1565C0]',
        bg: 'bg-[#E3F2FD]',
        border: 'border-[#90CAF9]/20',
      },
    },
    {
      icon: Baby,
      title: 'High-Risk Newborn Follow-up',
      colorClasses: {
        text: 'text-[#6A1B9A]',
        bg: 'bg-[#F3E5F5]',
        border: 'border-[#E1BEE7]/20',
      },
    },
    {
      icon: BookOpen,
      title: 'Universal Nurture Curriculum (0–5 Yrs)',
      colorClasses: {
        text: 'text-[#E65100]',
        bg: 'bg-[#FFF3E0]',
        border: 'border-[#FFE0B2]/20',
      },
    },
    {
      icon: Users,
      title: 'Responsive & Dynamic Parenting',
      colorClasses: {
        text: 'text-[#C2185B]',
        bg: 'bg-[#FCE4EC]',
        border: 'border-[#F8BBD0]/20',
      },
    },
    {
      icon: Hand,
      title: 'Multi Sensory Integration (MSI) Therapy',
      colorClasses: {
        text: 'text-[#6A1B9A]',
        bg: 'bg-[#F3E5F5]',
        border: 'border-[#E1BEE7]/20',
      },
    },
    {
      icon: Heart,
      title: 'Positive Parenting',
      colorClasses: {
        text: 'text-[#C2185B]',
        bg: 'bg-[#FCE4EC]',
        border: 'border-[#F8BBD0]/20',
      },
    },
    {
      icon: Users,
      title: 'Family Therapy',
      colorClasses: {
        text: 'text-[#00796B]',
        bg: 'bg-[#E0F2F1]',
        border: 'border-[#B2DFDB]/20',
      },
    },
    {
      icon: BrainCircuit,
      title: 'Trauma Focused Cognitive Behavior Management (CBT)',
      colorClasses: {
        text: 'text-[#E65100]',
        bg: 'bg-[#FFF3E0]',
        border: 'border-[#FFE0B2]/20',
      },
    },
    {
      icon: ShieldCheck,
      title: 'Prevention of Developmental Disabilities',
      colorClasses: {
        text: 'text-[#2E7D32]',
        bg: 'bg-[#E8F5E9]',
        border: 'border-[#A5D6A7]/20',
      },
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
        {/* Warm Cream Rounded Container */}
        <div className="relative bg-[#FFF8E8] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(30,41,59,0.03)] border border-amber-100/60 overflow-hidden">
          
          {/* --- DECORATIONS --- */}
          {/* Floating Red/Pink Heart Outline (Bottom Right) */}
          <motion.div
            animate={{ scale: [1, 1.06, 1], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[14%] right-[8%] text-[#EC407A]/25 pointer-events-none hidden sm:block z-0"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* Paper Plane Doodle & Trail (Top Left) */}
          <div className="absolute top-[12%] left-[4%] opacity-[0.25] text-[#F57C00] pointer-events-none hidden lg:block z-0 select-none">
            <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {/* Dotted curve trail */}
              <path d="M 10 70 Q 40 80 60 50 T 90 40" strokeDasharray="3 3" />
              {/* Paper Plane */}
              <g transform="translate(90, 20) rotate(-15)">
                <path d="M 0 0 L 25 10 L 10 15 Z" fill="none" />
                <path d="M 10 15 L 10 22 L 15 17" fill="none" />
              </g>
            </svg>
          </div>

          {/* Column Layout */}
          <div className="space-y-8 sm:space-y-10 relative z-10 text-center flex flex-col items-center">
            
            {/* Header Area */}
            <div className="flex flex-col items-center space-y-4 max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FFF3E0] border border-[#FFE0B2]/30 text-[#E65100] rounded-full text-xs font-extrabold tracking-wider uppercase shadow-sm">
                <Star className="h-3.5 w-3.5 text-[#E65100] fill-current" />
                <span>SPECIAL INTERESTS</span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 font-display tracking-tight">
                  Focused on Early Development & Lifelong Impact
                </h2>
                <div className="w-14 h-1.5 bg-[#E65100] rounded-full mx-auto" />
              </div>

              <p className="text-sm sm:text-base text-slate-500 font-bold leading-relaxed">
                Dedicated to the early years, neurodevelopment and family-centered care for holistic growth and well-being.
              </p>
            </div>

            {/* Grid of Cards */}
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 w-full"
            >
              {interests.map((interest, index) => (
                <SpecialInterestCard
                  key={index}
                  icon={interest.icon}
                  title={interest.title}
                  colorClasses={interest.colorClasses}
                />
              ))}
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default SpecialInterestsSection;
