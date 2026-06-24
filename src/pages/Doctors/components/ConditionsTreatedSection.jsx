import { motion } from 'framer-motion';
import { Shield, HeartPulse, BrainCircuit, Cpu, BookOpen, Accessibility, TrendingUp, SmilePlus, Baby, Brain, Dna, Footprints, Sprout, Users, Apple, Droplet } from 'lucide-react';
import ConditionCard from './ConditionCard';
import Container from '../../../components/common/Container';

export const ConditionsTreatedSection = () => {
  const conditions = [
    {
      icon: HeartPulse,
      title: 'Autism Spectrum Disorder (ASD)',
      colorClasses: {
        text: 'text-[#2E7D32]',
        bg: 'bg-[#E8F5E9]',
        border: 'border-[#A5D6A7]/20',
      },
    },
    {
      icon: BrainCircuit,
      title: 'Attention Deficit Hyperactivity Disorder (ADHD)',
      colorClasses: {
        text: 'text-[#1565C0]',
        bg: 'bg-[#E3F2FD]',
        border: 'border-[#90CAF9]/20',
      },
    },
    {
      icon: Cpu,
      title: 'Attention Deficit Disorder (ADD)',
      colorClasses: {
        text: 'text-[#6A1B9A]',
        bg: 'bg-[#F3E5F5]',
        border: 'border-[#E1BEE7]/20',
      },
    },
    {
      icon: BookOpen,
      title: 'Specific Learning Disabilities (SLD)',
      colorClasses: {
        text: 'text-[#E65100]',
        bg: 'bg-[#FFF3E0]',
        border: 'border-[#FFE0B2]/20',
      },
    },
    {
      icon: Accessibility,
      title: 'Cerebral Palsy (CP)',
      colorClasses: {
        text: 'text-[#1565C0]',
        bg: 'bg-[#E3F2FD]',
        border: 'border-[#90CAF9]/20',
      },
    },
    {
      icon: TrendingUp,
      title: 'Developmental Delay',
      colorClasses: {
        text: 'text-[#E65100]',
        bg: 'bg-[#FFF3E0]',
        border: 'border-[#FFE0B2]/20',
      },
    },
    {
      icon: SmilePlus,
      title: 'Behavior Disorders',
      colorClasses: {
        text: 'text-[#C2185B]',
        bg: 'bg-[#FCE4EC]',
        border: 'border-[#F8BBD0]/20',
      },
    },
    {
      icon: Baby,
      title: 'Birth Defects',
      colorClasses: {
        text: 'text-[#2E7D32]',
        bg: 'bg-[#E8F5E9]',
        border: 'border-[#A5D6A7]/20',
      },
    },
    {
      icon: Brain,
      title: 'Neuro Developmental Disabilities',
      colorClasses: {
        text: 'text-[#6A1B9A]',
        bg: 'bg-[#F3E5F5]',
        border: 'border-[#E1BEE7]/20',
      },
    },
    {
      icon: Dna,
      title: 'Congenital Diseases',
      colorClasses: {
        text: 'text-[#C2185B]',
        bg: 'bg-[#FCE4EC]',
        border: 'border-[#F8BBD0]/20',
      },
    },
    {
      icon: Footprints,
      title: 'Low Birth Weight Follow-up',
      colorClasses: {
        text: 'text-[#00796B]',
        bg: 'bg-[#E0F2F1]',
        border: 'border-[#B2DFDB]/20',
      },
    },
    {
      icon: Sprout,
      title: 'Nutritional Concerns',
      colorClasses: {
        text: 'text-[#E65100]',
        bg: 'bg-[#FFF3E0]',
        border: 'border-[#FFE0B2]/20',
      },
    },
    {
      icon: Users,
      title: 'Parenting Issues & Doubts',
      colorClasses: {
        text: 'text-[#C2185B]',
        bg: 'bg-[#FCE4EC]',
        border: 'border-[#F8BBD0]/20',
      },
    },
    {
      icon: Apple,
      title: 'Child Nutrition Guidance',
      colorClasses: {
        text: 'text-[#2E7D32]',
        bg: 'bg-[#E8F5E9]',
        border: 'border-[#A5D6A7]/20',
      },
    },
    {
      icon: Droplet,
      title: 'Urinary Incontinence in Children',
      colorClasses: {
        text: 'text-[#1565C0]',
        bg: 'bg-[#E3F2FD]',
        border: 'border-[#90CAF9]/20',
      },
    },
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 bg-white w-full overflow-hidden select-none">
      <Container>
        {/* Rounded Soft Blue Container */}
        <div className="relative bg-[#F5FBFF] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(30,41,59,0.03)] border border-slate-100/60 overflow-hidden">
          
          {/* --- DECORATIONS --- */}
          {/* Floating Blue Heart (Top Left) */}
          <motion.div
            animate={{ y: [0, -3, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[14%] left-[10%] text-[#1E88E5]/20 pointer-events-none hidden sm:block z-0"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* Dotted Curved Path (Top Left) */}
          <svg className="absolute top-[8%] left-[2%] w-32 h-32 text-[#1E88E5]/15 pointer-events-none hidden lg:block z-0" fill="none" viewBox="0 0 100 100">
            <path d="M 10 90 Q 30 10 90 20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
          </svg>

          {/* Floating Teal Ring (Mid Right) */}
          <div className="absolute top-[32%] right-[16%] w-7 h-7 rounded-full border-4 border-[#009688]/25 pointer-events-none hidden sm:block z-0" />

          {/* Column Layout */}
          <div className="space-y-8 sm:space-y-10 relative z-10 text-center flex flex-col items-center">
            
            {/* Header Area */}
            <div className="flex flex-col items-center space-y-4 max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E3F2FD] border border-[#90CAF9]/30 text-[#1565C0] rounded-full text-xs font-extrabold tracking-wider uppercase shadow-sm">
                <Shield className="h-3.5 w-3.5 text-[#1565C0] fill-current" />
                <span>CONDITIONS TREATED</span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 font-display tracking-tight">
                  Comprehensive Care for Every Child
                </h2>
                <div className="w-14 h-1.5 bg-[#1565C0] rounded-full mx-auto" />
              </div>

              <p className="text-sm sm:text-base text-slate-500 font-bold leading-relaxed">
                Expert evaluation, diagnosis and intervention for a wide range of developmental and neuro developmental conditions.
              </p>
            </div>

            {/* Grid of Cards */}
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 w-full"
            >
              {conditions.map((cond, index) => (
                <ConditionCard
                  key={index}
                  icon={cond.icon}
                  title={cond.title}
                  colorClasses={cond.colorClasses}
                />
              ))}
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default ConditionsTreatedSection;
