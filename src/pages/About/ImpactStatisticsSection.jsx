import React from 'react';
import { motion } from 'framer-motion';
import { Users, HeartPulse, Heart, Star } from 'lucide-react';
import Container from '../../components/common/Container';

export const ImpactStatisticsSection = () => {
  const cards = [
    {
      icon: Users,
      value: '23+',
      label: 'Years Experience',
      sub: 'Dedicated to child development care',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      blobColor: 'bg-emerald-200/20',
    },
    {
      icon: HeartPulse,
      value: '5000+',
      label: 'Children Supported',
      sub: 'Across neuro-developmental programs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      blobColor: 'bg-blue-200/20',
    },
    {
      icon: Heart,
      value: '1000+',
      label: 'Early Intervention Cases',
      sub: 'Helping children achieve their potential',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      blobColor: 'bg-purple-200/20',
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Parent Satisfaction',
      sub: 'Built on trust, care & meaningful results',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      blobColor: 'bg-orange-200/20',
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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden select-none">
      
      {/* Background doodles */}
      <div className="absolute top-[30%] left-[10%] w-20 h-10 opacity-20 hidden lg:block select-none pointer-events-none">
        <svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,20 Q50,5 90,20" stroke="#3B8A4C" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
        </svg>
      </div>

      <Container className="relative z-10">
        
        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="relative bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_35px_rgba(79,94,84,0.02)] hover:shadow-[0_15px_40px_rgba(79,94,84,0.06)] transition-all duration-300 flex flex-col justify-between text-left min-h-[200px] overflow-hidden group"
              >
                
                {/* Large Background Blur Blob */}
                <div className={`absolute -top-12 -right-12 w-28 h-28 rounded-full filter blur-xl ${card.blobColor} -z-10 group-hover:scale-110 transition-transform duration-300`} />
                
                <div className="space-y-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${card.bgColor} ${card.color} flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className="w-6 h-6 fill-current text-current opacity-90" />
                  </div>
                  
                  {/* Metric Value */}
                  <div className="text-3xl sm:text-4xl font-black text-slate-800 font-display tracking-tight leading-none">
                    {card.value}
                  </div>
                </div>

                <div className="space-y-1 mt-6">
                  {/* Label */}
                  <h4 className="text-sm sm:text-base font-black text-slate-800 font-display leading-tight">
                    {card.label}
                  </h4>
                  {/* Subtext */}
                  <p className="text-xs text-slate-400 font-semibold leading-tight">
                    {card.sub}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </Container>
    </section>
  );
};

export default ImpactStatisticsSection;
