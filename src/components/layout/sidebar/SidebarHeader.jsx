import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const SidebarHeader = ({ isCollapsed }) => {
  return (
    <Link
      to="/admin/dashboard"
      className={`flex items-center gap-3 py-6 px-4 flex-shrink-0 border-b border-slate-100/80 transition-all duration-300 select-none outline-none ${
        isCollapsed ? 'justify-center' : ''
      }`}
    >
      {/* Brain-Tree Brand Logo SVG */}
      <div className="w-11 h-11 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-center shadow-sm flex-shrink-0 relative transition-transform duration-300 hover:scale-105">
        <svg viewBox="0 0 24 24" className="w-7.5 h-7.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tree trunk */}
          <path d="M12 22V12" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Tree branches */}
          <path d="M12 15C10 13.5 8.5 13 6.5 14" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 15C14 13.5 15.5 13 17.5 14" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 12C10.5 9.5 8 9 6.5 10" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 12C13.5 9.5 16 9 17.5 10" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          
          {/* Leaves/Brain nodes (Purple) */}
          <circle cx="12" cy="6" r="3" fill="#7C3AED" />
          <circle cx="6" cy="9.5" r="2.5" fill="#A78BFA" />
          <circle cx="18" cy="9.5" r="2.5" fill="#A78BFA" />
          
          {/* Leaves/Brain nodes (Green) */}
          <circle cx="6.5" cy="14" r="2" fill="#10B981" />
          <circle cx="17.5" cy="14" r="2" fill="#10B981" />
          <circle cx="12" cy="11.5" r="1.5" fill="#34D399" />
        </svg>
      </div>

      {/* Brand Name & Subtitle */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col text-left overflow-hidden"
        >
          <span className="text-sm font-black tracking-wide text-slate-800 font-display leading-tight flex items-center gap-1">
            <span className="text-[#7C3AED]">Neuro</span>
            <span className="text-[#10B981]">Blooms</span>
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1 leading-none">
            Child Development Center
          </span>
        </motion.div>
      )}
    </Link>
  );
};

export default SidebarHeader;
