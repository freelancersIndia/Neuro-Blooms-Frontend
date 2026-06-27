import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LayoutDashboard, LogOut, ChevronDown, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { useAuth } from '../../auth/hooks/useAuth';
import { menuConfig } from './sidebarConfig';

// Dynamic Icon Renderer
const DynamicIcon = ({ name, className = '', size = 20, style = {} }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} size={size} strokeWidth={2} style={style} />;
};

// Helper to determine soft themed colors for active states based on hex input
const getSoftThemeColors = (hex) => {
  const mapping = {
    '#7C3AED': { bg: '#F3EEFF', text: '#7C3AED', dot: '#7C3AED' }, // Purple
    '#3B82F6': { bg: '#EFF6FF', text: '#3B82F6', dot: '#3B82F6' }, // Blue
    '#6366F1': { bg: '#EEF2FF', text: '#6366F1', dot: '#6366F1' }, // Indigo
    '#10B981': { bg: '#ECFDF5', text: '#10B981', dot: '#10B981' }, // Emerald
    '#0D9488': { bg: '#F0FDFA', text: '#0D9488', dot: '#0D9488' }, // Teal
    '#06B6D4': { bg: '#ECFEFF', text: '#06B6D4', dot: '#06B6D4' }, // Cyan
    '#F97316': { bg: '#FFF7ED', text: '#F97316', dot: '#F97316' }, // Orange
    '#F43F5E': { bg: '#FFF1F2', text: '#F43F5E', dot: '#F43F5E' }, // Rose
    '#8B5CF6': { bg: '#F5F3FF', text: '#8B5CF6', dot: '#8B5CF6' }  // Violet
  };
  return mapping[hex] || { bg: '#F8FAFC', text: '#7C3AED', dot: '#7C3AED' };
};

export const Sidebar = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose
}) => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Accordion expanded groups state
  const [expandedGroups, setExpandedGroups] = useState({});

  // Active hover group for collapsed flyout popover
  const [hoveredGroup, setHoveredGroup] = useState(null);

  // Active hover item for dynamic color transition
  const [hoveredItemId, setHoveredItemId] = useState(null);

  // Auto-expand group containing current active path on mount/navigation
  useEffect(() => {
    const activeGroup = {};
    menuConfig.forEach(section => {
      section.items.forEach(item => {
        if (item.children) {
          const hasActiveChild = item.children.some(child => child.path === location.pathname);
          if (hasActiveChild) {
            activeGroup[item.id] = true;
          }
        }
      });
    });
    setExpandedGroups(prev => ({ ...prev, ...activeGroup }));
  }, [location.pathname]);

  const handleToggleGroup = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const displayName = user
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.name || user.email
    : 'Super User';

  const displayRole = role === 'ADMIN' ? 'Super Admin' : role || 'Staff';

  const avatarUrl = user?.profile_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  // Staggered animation configuration for sub-menu links
  const containerVariants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.25, ease: 'easeOut' },
        opacity: { duration: 0.2, ease: 'linear' },
        staggerChildren: 0.04,
        delayChildren: 0.05
      }
    },
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.2, ease: 'easeIn' },
        opacity: { duration: 0.15, ease: 'linear' }
      }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 220, damping: 16 }
    },
    collapsed: {
      y: -8,
      opacity: 0,
      scale: 0.96
    }
  };

  // Sidebar brand/logo renderer
  const renderBrand = () => (
    <div className={`relative flex items-center pt-8 px-6 pb-6 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
      <div className="flex items-center gap-3 overflow-hidden">
        {/* SVG Brain-Tree Logo */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 3 }}
          className="w-11 h-11 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-center shadow-sm flex-shrink-0 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-7.5 h-7.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22V12" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M12 15C10 13.5 8.5 13 6.5 14" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 15C14 13.5 15.5 13 17.5 14" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 12C10.5 9.5 8 9 6.5 10" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 12C13.5 9.5 16 9 17.5 10" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="6" r="3" fill="#7C3AED" />
            <circle cx="6" cy="9.5" r="2.5" fill="#A855F7" />
            <circle cx="18" cy="9.5" r="2.5" fill="#A855F7" />
            <circle cx="6.5" cy="14" r="2" fill="#10B981" />
            <circle cx="17.5" cy="14" r="2" fill="#10B981" />
            <circle cx="12" cy="11.5" r="1.5" fill="#34D399" />
          </svg>
        </motion.div>

        {!isCollapsed && (
          <div className="flex flex-col text-left font-display">
            <h1 className="text-xl font-bold leading-none tracking-tight text-[#0F172A]">
              NEURO<span className="text-[#10B981] ml-1">Blooms</span>
            </h1>
            <span className="text-xs font-semibold tracking-wider text-[#64748B] mt-1.5 leading-none">
              HMS Console
            </span>
          </div>
        )}
      </div>

      {/* Collapse / Expand Toggle Button for Desktop */}
      <motion.button
        whileHover={{ scale: 1.08, rotate: isCollapsed ? 12 : -12 }}
        onClick={onToggleCollapse}
        className="hidden md:flex absolute -right-5 top-9 z-50 h-10 w-10 items-center justify-center rounded-full border border-[#EEF2F7] bg-white text-slate-500 shadow-md transition-colors hover:text-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </motion.button>
    </div>
  );

  // Sidebar content (navigation items)
  const renderNavItems = () => (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7 scrollbar-thin select-none">
      {/* Dashboard Top Link */}
      <div>
        <NavLink
          to="/admin/dashboard"
          onClick={() => {
            if (isMobileOpen) onMobileClose();
          }}
          className={({ isActive }) =>
            `flex items-center h-14 rounded-2xl px-4 gap-4 w-full transition-all duration-200 text-sm font-semibold font-display select-none cursor-pointer outline-none relative ${
              isActive
                ? 'bg-[#F3EEFF] text-[#7C3AED]'
                : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute left-0 top-1/4 w-1 h-1/2 bg-[#7C3AED] rounded-r"
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
              <LayoutDashboard size={22} className={isActive ? 'text-[#7C3AED]' : 'text-[#64748B]'} />
              {!isCollapsed && <span>Dashboard</span>}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap z-50 shadow-md">
                  Dashboard
                </div>
              )}
            </>
          )}
        </NavLink>
      </div>

      {/* Dividers & Configuration Sections */}
      {menuConfig.map((section, idx) => (
        <div key={section.section} className="space-y-3">
          {/* Section Divider */}
          {idx > 0 && <div className="border-t border-[#F1F5F9] my-4 mx-1" />}

          {/* Section Header Label */}
          {!isCollapsed ? (
            <h3 className="px-4 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] font-display">
              {section.section}
            </h3>
          ) : (
            <div className="h-4 border-b border-[#F1F5F9]/50 mx-2" />
          )}

          {/* Section Menu Items */}
          <div className="space-y-1.5">
            {section.items.map((item) => {
              const isGroupExpanded = !!expandedGroups[item.id];
              const isAnyChildActive = item.children.some(child => child.path === location.pathname);
              const isHovered = hoveredItemId === item.id;
              const themeColors = getSoftThemeColors(item.color);

              return (
                <div
                  key={item.id}
                  className="relative group/item"
                  onMouseEnter={() => {
                    if (isCollapsed) setHoveredGroup(item.id);
                    setHoveredItemId(item.id);
                  }}
                  onMouseLeave={() => {
                    if (isCollapsed) setHoveredGroup(null);
                    setHoveredItemId(null);
                  }}
                >
                  {/* Accordion Group Trigger Row */}
                  <button
                    onClick={() => !isCollapsed && handleToggleGroup(item.id)}
                    aria-expanded={isGroupExpanded}
                    className={`w-full flex items-center justify-between h-13 rounded-xl px-4 text-left transition-all duration-200 text-sm font-semibold font-display focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 ${
                      isAnyChildActive
                        ? 'text-[#0F172A]'
                        : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Dynamic Colorized Icon with Micro-Hover Animation */}
                      <div className="transition-transform duration-200 group-hover/item:scale-110">
                        <DynamicIcon
                          name={item.icon}
                          size={21}
                          style={{
                            color: (isAnyChildActive || isHovered) ? item.color : '#94A3B8',
                            transition: 'color 0.2s ease'
                          }}
                        />
                      </div>
                      {!isCollapsed && <span>{item.title}</span>}
                    </div>

                    {!isCollapsed && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-250 ${
                          isGroupExpanded ? 'rotate-180 text-[#7C3AED]' : 'text-[#94A3B8]'
                        }`}
                        style={{
                          color: isGroupExpanded ? item.color : undefined
                        }}
                      />
                    )}
                  </button>

                  {/* Expanded Sub-items (Desktop Expanded View with spring animations) */}
                  {!isCollapsed && (
                    <AnimatePresence initial={false}>
                      {isGroupExpanded && (
                        <motion.div
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={containerVariants}
                          className="overflow-hidden"
                        >
                          <div className="mt-1 pl-12 space-y-1">
                            {item.children.map((child) => {
                              const isChildActive = child.path === location.pathname;
                              return (
                                <motion.div key={child.path} variants={itemVariants}>
                                  <NavLink
                                    to={child.path}
                                    onClick={() => {
                                      if (isMobileOpen) onMobileClose();
                                    }}
                                    className={`flex items-center h-10 px-4 rounded-xl text-xs font-semibold font-display transition-colors duration-150`}
                                    style={
                                      isChildActive
                                        ? { backgroundColor: themeColors.bg, color: themeColors.text }
                                        : { color: '#64748B' }
                                    }
                                  >
                                    {/* Indented Indicator Bullet */}
                                    <span
                                      className="w-1.5 h-1.5 rounded-full mr-3.5 flex-shrink-0 transition-all duration-200"
                                      style={{
                                        backgroundColor: isChildActive ? themeColors.dot : '#E2E8F0',
                                        scale: isChildActive ? 1.2 : 1
                                      }}
                                    />
                                    <span>{child.title}</span>
                                  </NavLink>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Hover Popover Flyout (Desktop Collapsed View) */}
                  {isCollapsed && hoveredGroup === item.id && (
                    <div className="absolute left-full top-0 ml-3 w-56 bg-white border border-[#EEF2F7] shadow-xl rounded-2xl p-2.5 z-50 animate-fade-in font-display">
                      <div
                        className="px-3.5 py-2 border-b border-slate-50 text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: item.color }}
                      >
                        {item.title}
                      </div>
                      <div className="mt-1.5 space-y-0.5">
                        {item.children.map((child) => {
                          const isChildActive = child.path === location.pathname;
                          return (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              onClick={() => {
                                if (isMobileOpen) onMobileClose();
                              }}
                              className={`flex items-center h-10 px-3.5 rounded-xl text-xs font-semibold transition-all duration-150`}
                              style={
                                isChildActive
                                  ? { backgroundColor: themeColors.bg, color: themeColors.text }
                                  : { color: '#64748B' }
                              }
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full mr-3 transition-colors duration-200"
                                style={{
                                  backgroundColor: isChildActive ? themeColors.dot : '#E2E8F0'
                                }}
                              />
                              <span>{child.title}</span>
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  // Pinned User Profile Card & Logout Button
  const renderFooter = () => (
    <div className="p-4 space-y-3 border-t border-[#EEF2F7]">
      {/* User Card */}
      <div className={`bg-[#F8FAFC] border border-[#EEF2F7] rounded-[20px] p-3 flex items-center transition-all duration-300 ${
        isCollapsed ? 'justify-center p-2' : 'justify-between'
      }`}>
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Avatar image */}
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 shadow-sm border border-white"
          />

          {!isCollapsed && (
            <div className="flex flex-col text-left overflow-hidden font-display">
              <span className="text-xs font-bold text-[#0F172A] truncate">
                {displayName}
              </span>
              <div className="flex items-center mt-1">
                <span className="text-[9px] font-bold text-[#7C3AED] bg-[#F3EEFF] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {displayRole}
                </span>
              </div>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <button className="p-1 rounded-lg text-slate-400 hover:bg-slate-200/50 hover:text-slate-600 focus:outline-none transition-colors">
            <MoreVertical size={16} />
          </button>
        )}
      </div>

      {/* Logout Action Button */}
      <button
        onClick={handleLogout}
        className={`w-full flex items-center h-13 rounded-xl px-4 gap-4 text-sm font-semibold font-display transition-all duration-200 focus:outline-none ${
          isCollapsed
            ? 'justify-center text-slate-400 hover:bg-red-50 hover:text-[#DC2626]'
            : 'text-slate-500 hover:bg-[#FEF2F2] hover:text-[#DC2626]'
        }`}
      >
        <LogOut size={20} />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Sidebar Container Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 bg-white border-r border-[#EEF2F7] flex flex-col z-50 transition-all duration-300 ease-in-out select-none shadow-[0_8px_40px_rgba(15,23,42,0.04)] ${
          isCollapsed ? 'w-[84px]' : 'w-[300px]'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {renderBrand()}
        {renderNavItems()}
        {renderFooter()}
      </aside>
    </>
  );
};

export default Sidebar;
