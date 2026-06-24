import React from 'react';
import { motion } from 'framer-motion';
import { Heart, User, Users, BookOpen, TrendingUp, RefreshCw } from 'lucide-react';
import Container from '../../components/common/Container';

export const CoreValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      desc: 'We treat every child with care, respect and empathy.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100/50',
    },
    {
      icon: User,
      title: 'Individualized Care',
      desc: 'Every child receives a personalized plan.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-100/50',
    },
    {
      icon: Users,
      title: 'Family Partnership',
      desc: 'Parents are active partners in every step of the journey.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-100/50',
    },
    {
      icon: BookOpen,
      title: 'Evidence-Based Practice',
      desc: 'Interventions backed by science and proven methods.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-100/50',
    },
    {
      icon: TrendingUp,
      title: 'Growth & Independence',
      desc: 'Helping children become confident and independent individuals.',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 border-rose-100/50',
    },
    {
      icon: RefreshCw,
      title: 'Continuous Improvement',
      desc: 'Always learning, improving and innovating for better outcomes.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 border-teal-100/50',
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
      
      {/* Background decoration dots */}
      <div className="absolute top-[35%] left-[2%] w-3 h-3 bg-[#EAF8FF] rounded-full animate-pulse" />
      <div className="absolute top-[65%] right-[2%] w-3 h-3 bg-[#FFF8E8] rounded-full animate-pulse" />

      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold tracking-wider text-xs uppercase block font-display">
            Our Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight font-display">
            Our Core Values
          </h2>
          <div className="h-1 w-12 bg-accent mt-2" />
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 w-full"
        >
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-2xl p-5 border ${item.bgColor} shadow-[0_8px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center group`}
              >
                {/* Icon Container */}
                <div className={`p-3 rounded-xl bg-white shadow-xs mb-4 shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                {/* Title */}
                <h4 className="text-sm sm:text-base font-black text-slate-800 font-display mb-2">
                  {item.title}
                </h4>
                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default CoreValuesSection;
