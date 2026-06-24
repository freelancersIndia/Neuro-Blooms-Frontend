import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search, BookOpen, Users, Heart, TrendingUp, ArrowRight } from 'lucide-react';
import Container from '../../components/common/Container';

export const HowWeHelpSection = () => {
  const steps = [
    {
      icon: ClipboardList,
      title: 'Assessment',
      desc: 'Comprehensive evaluation to understand your child\'s developmental needs.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100',
    },
    {
      icon: Search,
      title: 'Diagnosis',
      desc: 'Accurate diagnosis using evidence-based tools and expert analysis.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-100',
    },
    {
      icon: BookOpen,
      title: 'Intervention Planning',
      desc: 'Personalized intervention plans tailored to your child\'s strengths.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-100',
    },
    {
      icon: Users,
      title: 'Parent Coaching',
      desc: 'Empowering parents with training, resources and practical strategies.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-100',
    },
    {
      icon: Heart,
      title: 'Development Programs',
      desc: 'Targeted therapies and activities for measurable developmental progress.',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 border-rose-100',
    },
    {
      icon: TrendingUp,
      title: 'Progress Monitoring',
      desc: 'Continuous tracking and adjustment to ensure lasting outcomes.',
      color: 'text-[#14B8A6]',
      bgColor: 'bg-[#F2FBF9] border-[#2DD4BF]/30',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden select-none">
      
      {/* Background doodles */}
      <div className="absolute top-[25%] left-[5%] w-3 h-3 bg-rose-500/10 rounded-full animate-pulse z-0 pointer-events-none" />
      <div className="absolute bottom-[25%] right-[5%] w-3 h-3 bg-emerald-500/10 rounded-full animate-pulse z-0 pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold tracking-wider text-xs uppercase block font-display">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight font-display">
            How We Help Children
          </h2>
          <div className="h-1 w-12 bg-accent mt-2" />
        </div>

        {/* Timeline Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={idx}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="flex flex-col items-center text-center relative group"
                >
                  
                  {/* Step Icon Container */}
                  <div className={`w-16 h-16 rounded-full border ${step.bgColor} ${step.color} flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-110 mb-5 relative bg-white`}>
                    <Icon className="w-7 h-7" />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                      {idx + 1}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm sm:text-base font-black text-slate-800 font-display leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed font-normal px-2">
                    {step.desc}
                  </p>

                  {/* Connecting Arrow (Desktop: Left-to-Right, except the last one) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-8 left-[calc(100%-8px)] w-16 items-center justify-center text-slate-300 z-0">
                      <ArrowRight className="w-5 h-5 animate-[pulse_2s_infinite]" />
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            );
          })}
        </motion.div>

      </Container>
    </section>
  );
};

export default HowWeHelpSection;
