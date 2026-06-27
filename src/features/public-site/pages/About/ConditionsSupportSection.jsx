import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Baby, BookOpen, MessageSquare, Smile, Accessibility, HeartPulse, Users, Apple } from 'lucide-react';
import Container from '../../../../components/common/Container';

export const ConditionsSupportSection = () => {
  const items = [
    {
      icon: Brain,
      title: 'Autism Spectrum Disorder',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100',
    },
    {
      icon: Zap,
      title: 'ADHD',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-100',
    },
    {
      icon: Baby,
      title: 'Developmental Delay',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-100',
    },
    {
      icon: BookOpen,
      title: 'Learning Disabilities',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-100',
    },
    {
      icon: MessageSquare,
      title: 'Speech & Language Challenges',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 border-rose-100',
    },
    {
      icon: Smile,
      title: 'Behavioral Concerns',
      color: 'text-[#14B8A6]',
      bgColor: 'bg-[#F2FBF9] border-[#2DD4BF]/30',
    },
    {
      icon: Accessibility,
      title: 'Cerebral Palsy',
      color: 'text-[#0F766E]',
      bgColor: 'bg-[#F0FDFA] border-teal-100',
    },
    {
      icon: HeartPulse,
      title: 'High-Risk Newborn Follow-Up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-100',
    },
    {
      icon: Users,
      title: 'Parenting Support',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-100',
    },
    {
      icon: Apple,
      title: 'Child Nutrition Guidance',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 border-rose-100',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative py-20 bg-[#F5FBFF] overflow-hidden select-none">
      
      {/* Background doodles */}
      <div className="absolute top-[15%] left-[2%] w-3 h-3 bg-emerald-500/10 rounded-full animate-ping z-0 pointer-events-none" />
      <div className="absolute bottom-[15%] right-[2%] w-3 h-3 bg-purple-500/10 rounded-full animate-ping z-0 pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold tracking-wider text-xs uppercase block font-display">
            Areas of Focus
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight font-display">
            Conditions We Support
          </h2>
          <div className="h-1 w-12 bg-accent mt-2" />
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full"
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center justify-center min-h-[140px] group cursor-pointer"
              >
                {/* Icon */}
                <div className={`p-3 rounded-full ${item.bgColor} ${item.color} shrink-0 mb-4 transition-transform duration-300 group-hover:scale-110 shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>
                {/* Title */}
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-display leading-tight group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h4>
              </motion.div>
            );
          })}
        </motion.div>

      </Container>
    </section>
  );
};

export default ConditionsSupportSection;
