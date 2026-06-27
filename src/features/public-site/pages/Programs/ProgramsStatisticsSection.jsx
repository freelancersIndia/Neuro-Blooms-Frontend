import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, ShieldAlert, Star, Sparkles } from 'lucide-react';
import Container from '../../../../components/common/Container';

export const ProgramsStatisticsSection = () => {
  const stats = [
    {
      number: '23+',
      label: 'Years Experience',
      desc: 'Dedicated to child development care',
      icon: Award,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-100',
    },
    {
      number: '5000+',
      label: 'Children Supported',
      desc: 'Across Neuro Blooms programs',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-100',
    },
    {
      number: '1000+',
      label: 'Early Intervention Cases',
      desc: 'Helping children achieve their potential',
      icon: ShieldAlert,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-100',
    },
    {
      number: '4.9/5',
      label: 'Parent Satisfaction',
      desc: 'Built on trust, care & meaningful results',
      icon: Star,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 border-orange-100',
    },
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden w-full">
      {/* Background soft blurs */}
      <div className="absolute top-[30%] left-[10%] w-[30%] h-[30%] bg-blue-100/10 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[25%] h-[25%] bg-amber-100/10 rounded-full filter blur-3xl pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 fill-current" />
            <span>Our Impact in Numbers</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
            Our Impact in Numbers
          </h2>
          <div className="h-1 w-16 bg-amber-400 rounded-full mt-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center justify-between"
              >
                <div className="space-y-4">
                  {/* Icon Circle */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border ${stat.bgColor} ${stat.color}`}>
                    <Icon className="h-6 w-6 stroke-[2]" />
                  </div>

                  {/* Number */}
                  <div className={`text-4xl sm:text-5xl font-black font-display tracking-tight ${stat.color}`}>
                    {stat.number}
                  </div>

                  {/* Label & Description */}
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-800 font-display leading-snug">
                      {stat.label}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ProgramsStatisticsSection;
