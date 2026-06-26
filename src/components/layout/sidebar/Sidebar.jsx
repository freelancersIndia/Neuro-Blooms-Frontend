import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SIDEBAR_CONFIG from '../../../constants/sidebar';
import SidebarHeader from './SidebarHeader';
import SidebarSection from './SidebarSection';
import SidebarItem from './SidebarItem';
import SidebarProfile from './SidebarProfile';
import SidebarFooter from './SidebarFooter';
import SidebarCollapseButton from './SidebarCollapseButton';

export const Sidebar = ({
  user,
  role = 'ADMIN',
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose,
  onLogout,
  badges = { appointmentRequests: 18, whatsapp: 3, activeSessions: 2 }
}) => {
  const location = useLocation();

  // Close mobile drawer automatically when route changes
  useEffect(() => {
    if (isMobileOpen && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  // Check if current user role is authorized to see a menu item or section
  const isAuthorized = (itemRoles) => {
    if (!itemRoles || !role) return true;
    // Normalized uppercase matching
    return itemRoles.map(r => r.toUpperCase()).includes(role.toUpperCase());
  };

  // Helper to render section items
  const renderItems = (items) => {
    return items
      .filter((item) => isAuthorized(item.roles))
      .map((item) => (
        <SidebarItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          route={item.route}
          badgeCount={badges[item.badgeKey] || 0}
          isCollapsed={isCollapsed}
        />
      ));
  };

  // Sidebar sections filter by authorization
  const visibleConfig = SIDEBAR_CONFIG.filter((section) => isAuthorized(section.roles));

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (Visible on md screens and up) */}
      <motion.aside
        animate={{ width: isCollapsed ? 88 : 280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col bg-white border-r border-slate-100 shadow-[0_15px_50px_rgba(79,94,84,0.015)] fixed top-0 bottom-0 left-0 z-40 h-screen select-none overflow-visible"
      >
        {/* Floating Collapse Button */}
        <SidebarCollapseButton isCollapsed={isCollapsed} onToggle={onToggleCollapse} />

        {/* Sidebar Brand Header */}
        <SidebarHeader isCollapsed={isCollapsed} />

        {/* Scrollable Navigation links list */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden py-4 px-3 space-y-4 pr-1">
          {visibleConfig.map((section, idx) => {
            // Dashboard / Top-level
            if (section.type === 'top-level') {
              return (
                <SidebarItem
                  key={section.category}
                  label={section.category}
                  icon={section.icon}
                  route={section.route}
                  isCollapsed={isCollapsed}
                />
              );
            }

            // Normal collapsible sections
            return (
              <SidebarSection
                key={section.category}
                title={section.category}
                isCollapsed={isCollapsed}
              >
                {renderItems(section.items)}
              </SidebarSection>
            );
          })}
        </div>

        {/* User Card Profile bottom panel */}
        <SidebarProfile
          user={user}
          role={role}
          onLogout={onLogout}
          isCollapsed={isCollapsed}
        />

        {/* Sidebar Footer copyright text */}
        <SidebarFooter isCollapsed={isCollapsed} />
      </motion.aside>

      {/* 2. MOBILE DRAWER SIDEBAR (Visible on small screens) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-slate-900 z-50 md:hidden backdrop-blur-xs"
            />

            {/* Mobile Off-canvas Drawer Container */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed top-0 bottom-0 left-0 w-[280px] bg-white z-50 flex flex-col justify-between shadow-[5px_0_30px_rgba(15,23,42,0.15)] md:hidden h-full overflow-hidden"
            >
              <div className="flex flex-col h-full overflow-hidden">
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between pr-4 border-b border-slate-100 flex-shrink-0">
                  <SidebarHeader isCollapsed={false} />
                  <button
                    onClick={onMobileClose}
                    className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                    aria-label="Close mobile sidebar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Scrollable links list (always expanded) */}
                <div className="flex-grow overflow-y-auto py-5 px-4 space-y-4">
                  {visibleConfig.map((section) => {
                    if (section.type === 'top-level') {
                      return (
                        <SidebarItem
                          key={section.category}
                          label={section.category}
                          icon={section.icon}
                          route={section.route}
                          isCollapsed={false}
                        />
                      );
                    }

                    return (
                      <SidebarSection
                        key={section.category}
                        title={section.category}
                        isCollapsed={false}
                      >
                        {renderItems(section.items)}
                      </SidebarSection>
                    );
                  })}
                </div>

                {/* Mobile User Profile panel */}
                <SidebarProfile
                  user={user}
                  role={role}
                  onLogout={onLogout}
                  isCollapsed={false}
                />

                {/* Mobile footer */}
                <SidebarFooter isCollapsed={false} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
