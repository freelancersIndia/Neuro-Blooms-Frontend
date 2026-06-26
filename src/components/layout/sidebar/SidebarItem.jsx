import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import SidebarBadge from './SidebarBadge';

export const SidebarItem = ({ label, icon: Icon, route, badgeCount, isCollapsed, onClick }) => {
  return (
    <NavLink
      to={route}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex items-center h-12 rounded-[14px] px-3.5 transition-all duration-200 text-xs font-extrabold font-display select-none cursor-pointer outline-none ${
          isCollapsed ? 'justify-center w-12 mx-auto gap-0' : 'gap-3 w-full'
        } ${
          isActive
            ? 'bg-[#F5F3FF] text-[#7C3AED]'
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active Left Indicator */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute left-0 w-1.5 h-6 bg-[#7C3AED] rounded-r-lg"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}

          {/* Icon */}
          <Icon
            className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
              isActive ? 'text-[#7C3AED]' : 'text-slate-400 group-hover:text-slate-600'
            }`}
          />

          {/* Label (Hidden in Collapsed Mode) */}
          {!isCollapsed && (
            <span className="truncate transition-opacity duration-200">{label}</span>
          )}

          {/* Notification Badge */}
          <SidebarBadge count={badgeCount} isCollapsed={isCollapsed} />

          {/* Tooltip on Hover in Collapsed Mode */}
          {isCollapsed && (
            <div className="absolute left-[72px] invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-[#0F172A] text-white text-[10px] font-black tracking-wider uppercase px-3 py-2 rounded-xl shadow-lg transition-all duration-300 transform scale-95 group-hover:scale-100 whitespace-nowrap z-50 font-display flex items-center gap-2 border border-slate-800/80">
              <span>{label}</span>
              {badgeCount > 0 && (
                <span className="bg-[#7C3AED] text-white px-1.5 py-0.5 rounded-full text-[9px] font-black min-w-[16px] text-center">
                  {badgeCount}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;
