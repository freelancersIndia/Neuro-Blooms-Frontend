import React from 'react';
import { motion } from 'framer-motion';

export const SidebarBadge = ({ count, isCollapsed }) => {
  if (!count || isCollapsed) return null;

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-black bg-[#F5F3FF] text-[#7C3AED] rounded-full min-w-[20px] border border-[#DDD6FE]/40 font-display"
    >
      {count}
    </motion.span>
  );
};

export default SidebarBadge;
