import { motion } from 'framer-motion';
import { ShieldCheck, Users, HeartHandshake, Star } from 'lucide-react';

export const ImpactStatsGrid = () => {
  const stats = [
    {
      icon: ShieldCheck,
      value: '23+',
      label: 'Years Experience',
      desc: 'Dedicated to Child Development Care',
      colorClass: 'text-[#2E7D32] bg-[#E8F5E9] border-[#A5D6A7]/20',
      delay: 0.1,
    },
    {
      icon: Users,
      value: '5000+',
      label: 'Children Supported',
      desc: 'Across Neuro Developmental Programs',
      colorClass: 'text-[#1565C0] bg-[#E3F2FD] border-[#90CAF9]/20',
      delay: 0.2,
    },
    {
      icon: HeartHandshake,
      value: '1000+',
      label: 'Early Intervention Cases',
      desc: 'Helping Children Achieve Their Potential',
      colorClass: 'text-[#6A1B9A] bg-[#F3E5F5] border-[#E1BEE7]/20',
      delay: 0.3,
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'Parent Satisfaction',
      desc: 'Built on Trust, Care & Results',
      colorClass: 'text-[#E65100] bg-[#FFF3E0] border-[#FFE0B2]/20',
      delay: 0.4,
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
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_15px_45px_rgba(79,94,84,0.04)] border border-slate-100/80 w-full text-center space-y-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-display text-left">
        Making a Difference Every Day
      </h3>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(79,94,84,0.02)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(79,94,84,0.08)]"
            >
              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border shrink-0 mb-4 ${stat.colorClass}`}>
                <IconComponent className="w-6 h-6 stroke-[2.2]" />
              </div>
              
              {/* Stat text */}
              <span className={`text-2xl sm:text-3xl font-black font-display tracking-tight leading-none ${stat.colorClass.split(' ')[0]}`}>
                {stat.value}
              </span>
              
              <span className="text-xs sm:text-sm font-bold text-slate-800 font-display mt-2 leading-tight">
                {stat.label}
              </span>
              
              <p className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-relaxed mt-1 max-w-[150px] mx-auto">
                {stat.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ImpactStatsGrid;
