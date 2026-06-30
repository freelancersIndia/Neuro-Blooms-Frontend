import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, XCircle, ShieldCheck, Users, UserCheck } from 'lucide-react';

const AnimatedCounter = ({ to, duration = 0.8 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(to, 10);
    if (isNaN(end)) {
      setCount(to);
      return;
    }
    if (end === 0) {
      setCount(0);
      return;
    }

    const range = end - start;
    const stepTime = Math.max(Math.abs(Math.floor((duration * 1000) / range)), 15);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [to, duration]);

  return <>{count}</>;
};

export const RoleStatsCards = ({ stats, isLoading }) => {
  const cardData = [
    {
      title: 'Total Roles',
      value: stats?.total_roles ?? 0,
      icon: Shield,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      shadow: 'hover:shadow-indigo-100/50',
    },
    {
      title: 'Active Roles',
      value: stats?.active_roles ?? 0,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      shadow: 'hover:shadow-emerald-100/50',
    },
    {
      title: 'Inactive Roles',
      value: stats?.inactive_roles ?? 0,
      icon: XCircle,
      color: 'text-red-600 bg-red-50 border-red-100',
      shadow: 'hover:shadow-red-100/50',
    },
    {
      title: 'System Roles',
      value: stats?.system_roles ?? 0,
      icon: ShieldCheck,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      shadow: 'hover:shadow-blue-100/50',
    },
    {
      title: 'Custom Roles',
      value: stats?.custom_roles ?? 0,
      icon: Users,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      shadow: 'hover:shadow-purple-100/50',
    },
    {
      title: 'Assigned Users',
      value: stats?.total_assigned_users ?? 0,
      icon: UserCheck,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      shadow: 'hover:shadow-amber-100/50',
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 w-full">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-[20px] p-6 flex flex-col gap-4 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="w-20 h-4 bg-slate-100 rounded-full" />
              <div className="w-10 h-10 bg-slate-100 rounded-xl" />
            </div>
            <div className="w-12 h-8 bg-slate-100 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 w-full"
    >
      {cardData.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            className={`bg-white border border-slate-200/80 rounded-[20px] p-6 flex flex-col justify-between gap-4 shadow-[0_2px_8px_rgba(15,23,42,0.01)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.04)] transition-all duration-300 ${card.shadow}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 tracking-tight">
                {card.title}
              </span>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${card.color}`}>
                <IconComponent className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-black text-slate-900 font-display tracking-tight">
                <AnimatedCounter to={card.value} />
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default RoleStatsCards;
