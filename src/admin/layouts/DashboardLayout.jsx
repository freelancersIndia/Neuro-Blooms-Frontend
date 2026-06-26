import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  ChevronDown,
  Search
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Sidebar } from '../../components/layout/sidebar';

export const DashboardLayout = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('nb_sidebar_collapsed');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nb_sidebar_collapsed', JSON.stringify(isSidebarCollapsed));
    } catch (e) {
      console.warn('Failed to save sidebar collapsed state', e);
    }
  }, [isSidebarCollapsed]);

  // Helper to determine greeting based on India/Kolkata timezone
  const getGreeting = () => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        hour12: false
      });
      const hour = parseInt(formatter.format(new Date()), 10);
      
      if (hour >= 5 && hour < 12) return 'Good Morning';
      if (hour >= 12 && hour < 17) return 'Good Afternoon';
      return 'Good Evening';
    } catch (e) {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return 'Good Morning';
      if (hour >= 12 && hour < 17) return 'Good Afternoon';
      return 'Good Evening';
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="w-screen h-screen bg-[#F8FAFC] flex font-body antialiased text-slate-800 overflow-hidden select-none">
      
      {/* Redesigned Premium Sidebar */}
      <Sidebar
        user={user}
        role={role}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
        badges={{ appointmentRequests: 18, whatsapp: 3, activeSessions: 2 }}
      />

      {/* 3. MAIN CONTENT AREA (Fluid, 100vh, overflow hidden, dynamic transitions) */}
      <div
        className={`flex-1 flex flex-col h-screen overflow-hidden min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'md:pl-[88px]' : 'md:pl-[280px]'
        }`}
      >
        
        {/* Header Section (Height: 72px) */}
        <header className="h-[72px] bg-white border-b border-[#EAEAEA] px-6 py-4 flex items-center justify-between sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-1 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 md:hidden cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Left Side: Greeting */}
            <div className="flex flex-col text-left">
              <h1 className="text-lg md:text-xl font-black text-[#0F172A] tracking-tight font-display leading-tight">
                {getGreeting()}, {user?.first_name || user?.name?.split(' ')[0] || 'Krishna'} 👋
              </h1>
              <p className="text-[10px] md:text-xs font-semibold text-slate-400 mt-0.5 leading-none hidden sm:block">
                Welcome back to Neuro Blooms Administration Portal
              </p>
            </div>
          </div>

          {/* Right Side: Search + Controls */}
          <div className="flex items-center gap-3.5">
            
            {/* Search Bar (Width: 320px) */}
            <div className="relative items-center hidden md:flex">
              <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-[320px] bg-slate-50/75 hover:bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-12 py-2 text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10 transition-all duration-200"
              />
              <span className="absolute right-3 inline-flex items-center gap-0.5 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md text-[9px] font-bold text-slate-400 shadow-sm leading-none font-mono">
                ⌘ K
              </span>
            </div>

            {/* Notification Button */}
            <button className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-100 shadow-sm transition-all duration-150 relative cursor-pointer flex items-center justify-center" aria-label="View notifications">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            <div className="w-px h-6 bg-slate-200 hidden sm:block" />

            {/* Admin Profile Avatar */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-admin-blue-50 border border-admin-blue-100 overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0">
                <img
                  src={user?.profile_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt={user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.name || "Admin" : "Admin"}
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors hidden sm:block" />
            </div>

          </div>
        </header>

        {/* Main Slot Container (Padding: 24px, Flex Column, Gap: 18px, Overflow: Auto) */}
        <main className="flex-1 p-6 overflow-y-auto flex flex-col gap-[18px]">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;
