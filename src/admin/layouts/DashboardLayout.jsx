import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  HeartPulse,
  Users,
  UserCheck,
  Shield,
  Monitor,
  Globe,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Sun,
  ChevronDown,
  Search
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const DashboardLayout = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Exact navigation entries in the screenshot (excluding Patients)
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, isReal: true },
    { name: 'Appointments', path: '#', icon: Calendar, isReal: false },
    { name: 'Doctors', path: '#', icon: HeartPulse, isReal: false },
    { name: 'Users', path: '/admin/users', icon: UserCheck, isReal: true },
    { name: 'Security', path: '#', icon: Shield, isReal: false },
    { name: 'Sessions', path: '#', icon: Monitor, isReal: false },
    { name: 'Content Management', path: '#', icon: Globe, isReal: false },
    { name: 'Blogs', path: '#', icon: FileText, isReal: false },
    { name: 'Settings', path: '#', icon: Settings, isReal: false }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const renderNavLinks = (onItemClick = () => {}) => {
    return menuItems.map((item) => {
      const Icon = item.icon;
      const isActive = item.isReal && location.pathname.startsWith(item.path);

      if (item.isReal) {
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={onItemClick}
            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 relative ${
              isActive
                ? 'bg-admin-blue-50/70 text-admin-blue-600'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-admin-blue-600 rounded-r-lg" />
            )}
            <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-admin-blue-600' : 'text-slate-400'}`} />
            <span>{item.name}</span>
          </Link>
        );
      }

      // Placeholder items
      return (
        <button
          key={item.name}
          type="button"
          onClick={onItemClick}
          className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-850 hover:bg-slate-50 transition-all duration-200 text-left w-full cursor-pointer relative"
        >
          <Icon className="w-4.5 h-4.5 text-slate-400" />
          <span>{item.name}</span>
        </button>
      );
    });
  };

  return (
    <div className="w-screen h-screen bg-[#F8FAFC] flex font-body antialiased text-slate-800 overflow-hidden select-none">
      
      {/* 1. DESKTOP SIDEBAR (260px wide, White, border-r) */}
      <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-[#EAEAEA] justify-between fixed top-0 bottom-0 left-0 z-20 h-screen overflow-hidden select-none">
        <div className="flex flex-col gap-5 overflow-hidden">
          
          {/* Logo Section (Height: 90px, Left Logo, Right Text) */}
          <div className="h-[90px] px-6 border-b border-[#F1F5F9] flex items-center gap-3 flex-shrink-0">
            {/* Brain-Tree Logo SVG */}
            <div className="w-10 h-10 rounded-xl bg-admin-blue-50 border border-admin-blue-100 flex items-center justify-center text-admin-blue-600 shadow-sm flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
                <path d="M12 22V12m0 0C10 9 8 9 6 10m6-2c-2.5-3-5-1-6 2m12-2c2-3 4-3 6-2m-6 4c2-1 4-1 6-2M12 12c2-1.5 3-3.5 3-5.5a3 3 0 1 0-6 0c0 2 1 4 3 5.5z" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-extrabold tracking-wide text-slate-800 font-display leading-none">
                NEURO BLOOMS
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1 leading-none">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          {/* Navigation Links (Spacing: 8px, Item Height: 48px) */}
          <nav className="flex flex-col gap-2 px-3 overflow-y-auto pr-1 max-h-[calc(100vh-250px)]">
            {renderNavLinks()}
          </nav>
        </div>

        {/* Sidebar Footer (Profile Card + Logout) */}
        <div className="p-3 bg-white border-t border-[#F1F5F9] flex flex-shrink-0 flex-col gap-1.5">
          {/* Profile Card */}
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-admin-blue-50 border border-admin-blue-100 overflow-hidden flex-shrink-0">
                <img
                  src={user?.profile_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt={user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.name || "Admin" : "Admin"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold text-slate-800 leading-tight">
                  {user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.name || user.email : 'Krishna Admin'}
                </span>
                <span className="inline-flex self-start items-center text-[8px] font-black tracking-widest text-admin-blue-600 bg-admin-blue-50 px-1.5 py-0.5 rounded uppercase mt-0.5 leading-none">
                  {role || 'ADMIN'}
                </span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-px bg-slate-100/80 my-1" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-200 cursor-pointer text-left w-full"
          >
            <LogOut className="w-4.5 h-4.5 text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MOBILE SIDEBAR DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[260px] bg-white p-5 z-50 flex flex-col justify-between transition-transform duration-300 transform md:hidden border-r border-[#EAEAEA] ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 overflow-hidden">
          {/* Mobile Sidebar Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-admin-blue-50 border border-admin-blue-100 flex items-center justify-center text-admin-blue-600 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-none stroke-current stroke-2">
                  <path d="M12 22V12m0 0C10 9 8 9 6 10m6-2c-2.5-3-5-1-6 2m12-2c2-3 4-3 6-2m-6 4c2-1 4-1 6-2M12 12c2-1.5 3-3.5 3-5.5a3 3 0 1 0-6 0c0 2 1 4 3 5.5z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800">NEURO BLOOMS</span>
                <span className="text-[8px] font-black text-slate-400">ADMIN CONSOLE</span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 px-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {renderNavLinks(() => setIsMobileMenuOpen(false))}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-200 cursor-pointer text-left w-full"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* 3. MAIN CONTENT AREA (Fluid, 100vh, overflow hidden) */}
      <div className="flex-1 flex flex-col md:pl-[260px] h-screen overflow-hidden min-w-0">
        
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
