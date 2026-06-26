import React from 'react';
import { motion } from 'framer-motion';
import { Download, Clock, Check, X } from 'lucide-react';

export const AppointmentStatistics = ({ stats }) => {
  const cardData = [
    {
      title: 'Total Requests',
      value: stats.total,
      shift: stats.totalShift,
      icon: Download,
      themeColor: 'text-blue-500 bg-blue-50 border-blue-100 hover:border-blue-200',
      iconBg: 'bg-blue-500/10 text-blue-600',
      shadowColor: 'hover:shadow-blue-500/5'
    },
    {
      title: 'Pending Review',
      value: stats.pending,
      shift: stats.pendingShift,
      icon: Clock,
      themeColor: 'text-amber-500 bg-amber-50 border-amber-100 hover:border-amber-200',
      iconBg: 'bg-amber-500/10 text-amber-600',
      shadowColor: 'hover:shadow-amber-500/5'
    },
    {
      title: 'Approved',
      value: stats.approved,
      shift: stats.approvedShift,
      icon: Check,
      themeColor: 'text-emerald-500 bg-emerald-50 border-emerald-100 hover:border-emerald-200',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
      shadowColor: 'hover:shadow-emerald-500/5'
    },
    {
      title: 'Rejected',
      value: stats.rejected,
      shift: stats.rejectedShift,
      icon: X,
      themeColor: 'text-rose-500 bg-rose-50 border-rose-100 hover:border-rose-200',
      iconBg: 'bg-rose-500/10 text-rose-600',
      shadowColor: 'hover:shadow-rose-500/5'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none"
    >
      {cardData.map((card, idx) => {
        const Icon = card.icon;
        
        return (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`bg-white border border-slate-100 p-5 rounded-[20px] shadow-[0_10px_25px_rgba(79,94,84,0.015)] hover:shadow-xl transition-all duration-300 ${card.shadowColor} flex items-center gap-4`}
          >
            {/* Round Icon */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`}>
              <Icon className="w-5.5 h-5.5 stroke-[2.25px]" />
            </div>

            {/* Content info */}
            <div className="flex flex-col text-left min-w-0">
              <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase font-display">
                {card.title}
              </span>
              <span className="text-2xl font-black text-slate-800 tracking-tight leading-tight mt-0.5 font-display">
                {card.value}
              </span>
              <span className={`text-[10px] font-extrabold mt-1 leading-none ${
                card.shift.startsWith('↑') 
                  ? card.title === 'Rejected' ? 'text-rose-500' : 'text-emerald-500'
                  : 'text-rose-500'
              }`}>
                {card.shift}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AppointmentStatistics;
