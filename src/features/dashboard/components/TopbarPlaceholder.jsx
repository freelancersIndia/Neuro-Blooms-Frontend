import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../../auth/hooks/useAuth';

export const TopbarPlaceholder = ({ onMobileMenuOpen }) => {
  const { user } = useAuth();

  const displayName = user
    ? user.first_name || user.name?.split(' ')[0] || 'Admin'
    : 'Admin';

  const avatarUrl = user?.profile_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <header className="h-[72px] bg-white border-b border-[#EAEAEA] px-6 py-4 flex items-center justify-between sticky top-0 z-10 flex-shrink-0 select-none">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMobileMenuOpen}
          className="p-2 -ml-1 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-slate-800 md:hidden cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right Side: Search + Controls */}
      <div className="flex items-center gap-3.5">
        
        {/* Disabled Search Bar */}
        <div className="relative items-center hidden md:flex opacity-50 cursor-not-allowed">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            disabled
            placeholder="Search disabled during updates..."
            className="w-[280px] bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-400 placeholder:text-slate-400 focus:outline-none cursor-not-allowed"
          />
        </div>

        {/* Notification Button */}
        <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-slate-100 shadow-sm transition-all duration-150 relative cursor-not-allowed" disabled aria-label="View notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-slate-300 rounded-full ring-2 ring-white" />
        </button>

        <div className="w-px h-6 bg-slate-200 hidden sm:block" />

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 group">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-purple-50 border border-purple-100 overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0">
            <img
              src={avatarUrl}
              alt="Admin Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </header>
  );
};

export default TopbarPlaceholder;
