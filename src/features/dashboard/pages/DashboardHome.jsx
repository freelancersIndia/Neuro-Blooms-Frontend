import React from 'react';
import { motion } from 'framer-motion';
import { Info, Compass } from 'lucide-react';
import Logo from '../../../components/common/Logo';

export const DashboardHome = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-xl w-full text-center flex flex-col items-center gap-6"
      >
        {/* Large Logo Container with pulse background */}
        <div className="relative flex items-center justify-center p-6 bg-white/70 backdrop-blur-md rounded-3xl border border-purple-100 shadow-[0_20px_50px_rgba(124,58,237,0.06)]">
          <div className="absolute inset-0 bg-purple-200/10 rounded-3xl blur-xl animate-pulse" />
          <Logo className="w-20 h-20 relative z-10" />
        </div>

        {/* Welcome Headers */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full self-center">
            Redesigned System Foundation
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight font-display mt-2">
            Neuro Blooms Admin Dashboard
          </h2>
          <p className="text-xs md:text-sm font-semibold text-slate-400 mt-1">
            Hospital Management System Console
          </p>
        </div>

        {/* Divider line */}
        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full" />

        {/* Simple Premium Glassmorphic Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full bg-white/80 border border-slate-100/80 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
            <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-black text-slate-800 flex items-center gap-1.5 leading-tight">
              <Info className="w-4 h-4 text-purple-500 flex-shrink-0" />
              Under Active Development
            </span>
            <p className="text-xs font-semibold text-slate-500 leading-relaxed mt-1">
              Dashboard modules will be implemented phase by phase. The authentication and security layers are fully operational.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
