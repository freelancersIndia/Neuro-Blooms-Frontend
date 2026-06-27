import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, MessageCircle, CalendarRange, BookOpen, Smile, Flame, Heart, Activity, ShieldAlert, Fingerprint, Sparkles } from 'lucide-react';
import Container from '../../../../components/common/Container';

export const ConditionsSupportedSection = () => {
  const conditions = [
    {
      title: 'Autism Spectrum Disorder',
      icon: Brain,
      color: '#3B8A4C',
      bgColor: 'bg-emerald-50 text-[#3B8A4C] border-emerald-100',
    },
    {
      title: 'ADHD',
      icon: Zap,
      color: '#1E88E5',
      bgColor: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'Speech Delay',
      icon: MessageCircle,
      color: '#E91E63',
      bgColor: 'bg-pink-50 text-pink-600 border-pink-100',
    },
    {
      title: 'Developmental Delay',
      icon: CalendarRange,
      color: '#F57C00',
      bgColor: 'bg-orange-50 text-orange-500 border-orange-100',
    },
    {
      title: 'Learning Disabilities',
      icon: BookOpen,
      color: '#8E24AA',
      bgColor: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      title: 'Behavioral Concerns',
      icon: Smile,
      color: '#00796B',
      bgColor: 'bg-teal-50 text-teal-600 border-teal-100',
    },
    {
      title: 'Hyperactivity',
      icon: Flame,
      color: '#D48C00',
      bgColor: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      title: 'Emotional Regulation Issues',
      icon: Heart,
      color: '#E53935',
      bgColor: 'bg-red-50 text-red-600 border-red-100',
    },
    {
      title: 'Cerebral Palsy',
      icon: Activity,
      color: '#43A047',
      bgColor: 'bg-green-50 text-green-600 border-green-100',
    },
    {
      title: 'High-Risk Newborn Follow-up',
      icon: ShieldAlert,
      color: '#0288D1',
      bgColor: 'bg-sky-50 text-sky-600 border-sky-100',
    },
    {
      title: 'Genetic Disorders',
      icon: Fingerprint,
      color: '#5C6BC0',
      bgColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      title: 'Neuro Developmental Disabilities',
      icon: Sparkles,
      color: '#AB47BC',
      bgColor: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="relative py-20 bg-[#F5FBFF] overflow-hidden w-full">
      {/* Decorative Blob */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue-100/15 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[5%] right-0 w-[30%] h-[30%] bg-emerald-100/10 rounded-full filter blur-3xl pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
            Conditions Supported
          </h2>
          <div className="h-1 w-16 bg-amber-400 rounded-full mt-2" />
        </div>

        {/* 2 Column Layout (Left: Image, Right: Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          {/* Left: Mother & Child Image */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border-8 border-white shadow-2xl h-full min-h-[350px] lg:min-h-auto bg-emerald-50"
            >
              <img
                src="/images/testimonials/mother_child.png"
                alt="Mother playing and communicating with her child"
                className="w-full h-full object-cover absolute inset-0"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-left leading-tight z-10">
                <p className="text-lg font-bold font-display">Targeted Developmental Therapy</p>
                <p className="text-xs text-slate-200/90 mt-1 font-medium">Empowering children to overcome developmental challenges.</p>
              </div>
            </motion.div>
          </div>

          {/* Right: 3 Column Grid of Condition Cards */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {conditions.map((cond, idx) => {
                const Icon = cond.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex items-center gap-3.5 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 text-left"
                  >
                    <div className={`p-2.5 rounded-xl border shrink-0 ${cond.bgColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 leading-snug">
                      {cond.title}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ConditionsSupportedSection;
