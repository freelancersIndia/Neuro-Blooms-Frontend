import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const SidebarCollapseButton = ({ isCollapsed, onToggle }) => {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="hidden md:flex absolute top-8 right-[-14px] w-7.5 h-7.5 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer text-slate-400 hover:text-[#7C3AED] hover:border-[#7C3AED] transition-all z-50 focus:outline-none"
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      {isCollapsed ? (
        <ChevronRight className="w-4 h-4" />
      ) : (
        <ChevronLeft className="w-4 h-4" />
      )}
    </motion.button>
  );
};

export default SidebarCollapseButton;
