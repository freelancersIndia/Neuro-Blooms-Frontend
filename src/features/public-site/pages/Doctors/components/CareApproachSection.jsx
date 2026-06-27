import { motion } from 'framer-motion';
import { Shield, ClipboardCheck, Search, BookOpen, Users, HeartHandshake, TrendingUp, ChevronRight } from 'lucide-react';
import CareStepCard from './CareStepCard';
import Container from '../../../../../components/common/Container';

export const CareApproachSection = () => {
  const steps = [
    {
      number: '01',
      icon: ClipboardCheck,
      title: 'Assessment',
      description: "Comprehensive evaluation to understand your child's developmental needs.",
      colorClasses: {
        text: 'text-[#2E7D32]',
        bg: 'bg-[#E8F5E9]',
        border: 'border-[#A5D6A7]/20',
      },
    },
    {
      number: '02',
      icon: Search,
      title: 'Diagnosis',
      description: 'Accurate diagnosis using evidence-based tools and expert analysis.',
      colorClasses: {
        text: 'text-[#1565C0]',
        bg: 'bg-[#E3F2FD]',
        border: 'border-[#90CAF9]/20',
      },
    },
    {
      number: '03',
      icon: BookOpen,
      title: 'Individualized Plan',
      description: "Personalized intervention plan tailored to your child's strengths.",
      colorClasses: {
        text: 'text-[#6A1B9A]',
        bg: 'bg-[#F3E5F5]',
        border: 'border-[#E1BEE7]/20',
      },
    },
    {
      number: '04',
      icon: Users,
      title: 'Parent Coaching',
      description: 'Empowering parents with training, guidance and strategies.',
      colorClasses: {
        text: 'text-[#E65100]',
        bg: 'bg-[#FFF3E0]',
        border: 'border-[#FFE0B2]/20',
      },
    },
    {
      number: '05',
      icon: HeartHandshake,
      title: 'Intervention',
      description: 'Targeted therapies and developmental programs for measurable progress.',
      colorClasses: {
        text: 'text-[#C2185B]',
        bg: 'bg-[#FCE4EC]',
        border: 'border-[#F8BBD0]/20',
      },
    },
    {
      number: '06',
      icon: TrendingUp,
      title: 'Progress Monitoring',
      description: 'Continuous tracking and adjustment to ensure lasting outcomes.',
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
          
          {/* --- DECORATIONS --- */}
          {/* Faded Heart (Top Left) */}
          <div className="absolute top-[12%] left-[4%] text-[#EC407A]/15 pointer-events-none hidden sm:block z-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Paper Plane Trail (Top Right) */}
          <div className="absolute top-[10%] right-[4%] opacity-[0.2] text-[#3B8A4C] pointer-events-none hidden lg:block z-0 select-none">
            <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M 10 70 Q 40 80 60 50 T 90 40" strokeDasharray="3 3" />
              <g transform="translate(90, 20) rotate(-15)">
                <path d="M 0 0 L 25 10 L 10 15 Z" fill="none" />
                <path d="M 10 15 L 10 22 L 15 17" fill="none" />
              </g>
            </svg>
          </div>

          {/* Column Layout */}
          <div className="space-y-8 sm:space-y-12 relative z-10 text-center flex flex-col items-center">
            
            {/* Header Area */}
            <div className="flex flex-col items-center space-y-4 max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8F5E9] border border-[#A5D6A7]/30 text-[#2E7D32] rounded-full text-xs font-extrabold tracking-wider uppercase shadow-sm">
                <Shield className="h-3.5 w-3.5 text-[#2E7D32] fill-current" />
                <span>MY CARE APPROACH</span>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 font-display tracking-tight">
                  A Compassionate, Evidence-Based Approach
                </h2>
                <div className="w-14 h-1.5 bg-[#2E7D32] rounded-full mx-auto" />
              </div>

              <p className="text-sm sm:text-base text-slate-500 font-bold leading-relaxed">
                Every child is unique. My approach ensures personalized care at every step to support their growth and development.
              </p>
            </div>

            {/* Grid of Steps */}
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 w-full relative"
            >
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-center justify-center w-full">
                  <CareStepCard
                    number={step.number}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    colorClasses={step.colorClasses}
                  />
                  
                  {/* Chevron Right (Rendered between steps on desktop) */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-[50%] right-[-18px] -translate-y-1/2 w-7 h-7 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]/30 flex items-center justify-center z-20 pointer-events-none hidden lg:flex shadow-sm">
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default CareApproachSection;
