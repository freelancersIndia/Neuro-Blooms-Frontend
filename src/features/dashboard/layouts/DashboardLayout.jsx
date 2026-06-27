import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopbarPlaceholder from '../components/TopbarPlaceholder';

export const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('nb_admin_sidebar_collapsed');
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleToggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('nb_admin_sidebar_collapsed', String(next));
      } catch (e) {
        console.error('LocalStorage write failed:', e);
      }
      return next;
    });
  };

  return (
    <div className="w-screen h-screen bg-[#F8FAFC] flex font-body antialiased text-slate-800 overflow-hidden select-none">
      {/* Refactored Enterprise Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Viewport Container */}
      <div className={`flex-1 flex flex-col h-screen overflow-hidden min-w-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'md:pl-[84px]' : 'md:pl-[300px]'
      }`}>
        <TopbarPlaceholder onMobileMenuOpen={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
