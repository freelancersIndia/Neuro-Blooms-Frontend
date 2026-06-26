import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SidebarSection = ({ title, isCollapsed, children }) => {
  // Remember expanded state in localStorage
  const [isExpanded, setIsExpanded] = useState(() => {
    try {
      const saved = localStorage.getItem(`nb_sidebar_section_${title}`);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`nb_sidebar_section_${title}`, JSON.stringify(isExpanded));
    } catch (e) {
      console.warn('Failed to save sidebar expanded state', e);
    }
  }, [isExpanded, title]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // If collapsed, don't show headers, just render children directly
  if (isCollapsed) {
    return <div className="space-y-1.5 py-2">{children}</div>;
  }

  return (
    <div className="space-y-1.5 py-1">
      {/* Section Header */}
      <button
        type="button"
        onClick={toggleExpand}
        className="flex items-center justify-between w-full px-3.5 py-2 text-[10px] font-extrabold text-slate-400 hover:text-slate-650 transition-colors uppercase tracking-widest font-display select-none cursor-pointer"
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>

      {/* Children list (Animated Expand/Collapse) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden space-y-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarSection;
