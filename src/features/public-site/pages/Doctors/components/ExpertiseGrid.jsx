import { motion } from 'framer-motion';
import { Brain, BrainCircuit, BookOpen, Accessibility, Users, HeartHandshake, Baby, ClipboardList, MessageSquare, Network } from 'lucide-react';
import ExpertiseCard from './ExpertiseCard';
import Container from '../../../../../components/common/Container';

export const ExpertiseGrid = () => {
  const items = [
    {
      icon: Brain,
      title: 'Autism Spectrum Disorder',
      colorClasses: {
        text: 'text-[#2E7D32]',
        bg: 'bg-[#E8F5E9]',
        border: 'border-[#A5D6A7]/20',
      },
    },
    {
      icon: BrainCircuit,
      title: 'ADHD',
      colorClasses: {
        text: 'text-[#1565C0]',
        bg: 'bg-[#E3F2FD]',
        border: 'border-[#90CAF9]/20',
      },
    },
    {
      icon: BookOpen,
      title: 'Learning Disabilities',
      colorClasses: {
        text: 'text-[#6A1B9A]',
        bg: 'bg-[#F3E5F5]',
        border: 'border-[#E1BEE7]/20',
      },
    },
    {
      icon: Accessibility,
      title: 'Cerebral Palsy',
      colorClasses: {
        text: 'text-[#E65100]',
        bg: 'bg-[#FFF3E0]',
        border: 'border-[#FFE0B2]/20',
      },
    },
    {
      icon: Users,
      title: 'Behavior Disorders',
      colorClasses: {
        text: 'text-[#C2185B]',
        bg: 'bg-[#FCE4EC]',
        border: 'border-[#F8BBD0]/20',
      },
    },
    {
      icon: HeartHandshake,
      title: 'Parent Coaching',
      colorClasses: {
        text: 'text-[#6A1B9A]',
        bg: 'bg-[#F3E5F5]',
        border: 'border-[#E1BEE7]/20',
      },
    },
    {
      icon: Baby,
      title: 'Early Intervention',
      colorClasses: {
        text: 'text-[#E65100]',
        bg: 'bg-[#FFF3E0]',
        border: 'border-[#FFE0B2]/20',
      },
    },
    {
      icon: ClipboardList,
      title: 'Developmental Assessment',
      colorClasses: {
        text: 'text-[#2E7D32]',
        bg: 'bg-[#E8F5E9]',
        border: 'border-[#A5D6A7]/20',
      },
    },
    {
      icon: MessageSquare,
      title: 'Family Counselling',
      colorClasses: {
        text: 'text-[#1565C0]',
        bg: 'bg-[#E3F2FD]',
        border: 'border-[#90CAF9]/20',
      },
    },
    {
      icon: Network,
      title: 'Neuro Development Support',
      colorClasses: {
        text: 'text-[#00796B]',
        bg: 'bg-[#E0F2F1]',
        border: 'border-[#B2DFDB]/20',
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
        {/* Large White Rounded Container with shadow */}
        <div className="relative bg-white rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-12 shadow-[0_15px_45px_rgba(79,94,84,0.03)] border border-slate-100/60 overflow-hidden">
          
          {/* --- DECORATIONS (DESIGN MATCH) --- */}
          {/* Floating Pink Heart (Top Right) */}
          <motion.div
            animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[8%] right-[14%] text-[#EC407A]/20 pointer-events-none hidden sm:block z-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* Floating Yellow Circle Outline (Top Right/Center) */}
          <div className="absolute top-[16%] right-[44%] w-4.5 h-4.5 rounded-full border-4 border-[#FFCA28]/30 pointer-events-none hidden sm:block z-0" />

          {/* Faded Kids Outline (Top Right) */}
          <div className="absolute top-[6%] right-[22%] opacity-[0.06] text-[#1E88E5] pointer-events-none hidden lg:block z-0 select-none">
            <svg width="180" height="150" viewBox="0 0 240 200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="175" cy="65" r="18" />
              <path d="M175 83 v45 m-20 40 20-40 20 40 m-40-25 20-15 18-10" />
              <circle cx="75" cy="72" r="18" />
              <path d="M75 90 v38 m-20 42 20-42 18 42 M55 108 l20-15 20 12" />
              <path d="M95 105 Q115 115 135 98" />
            </svg>
          </div>

          {/* Column Layout */}
          <div className="space-y-8 sm:space-y-10 relative z-10">
            
            {/* Header Area */}
            <div className="flex flex-col text-left space-y-4 max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8F5E9] border border-[#A5D6A7]/30 text-[#2E7D32] rounded-full text-xs font-extrabold tracking-wider uppercase shadow-sm self-start">
                <Brain className="h-3.5 w-3.5 text-[#3B8A4C] fill-current" />
                <span>AREAS OF EXPERTISE</span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 font-display tracking-tight leading-tight">
                  Expertise That Makes<br className="hidden sm:inline" /> a Real Difference
                </h2>
                <div className="w-14 h-1.5 bg-[#3B8A4C] rounded-full" />
              </div>

              <p className="text-sm sm:text-base text-slate-500 font-bold leading-relaxed">
                Years of focused practice in child development and early intervention, helping children reach their fullest potential.
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
              {items.map((item, index) => (
                <ExpertiseCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  colorClasses={item.colorClasses}
                />
              ))}
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default ExpertiseGrid;
