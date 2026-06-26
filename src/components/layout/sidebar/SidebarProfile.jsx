import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export const SidebarProfile = ({ user, role, onLogout, isCollapsed }) => {
  const navigate = useNavigate();

  const displayName = user
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.name || user.email
    : 'Krishna Admin';

  const displayRole = role || 'Admin';

  const avatarUrl = user?.profile_image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <div className={`relative px-4 py-3 border-t border-slate-100/80 bg-white flex flex-shrink-0 flex-col select-none ${isCollapsed ? 'items-center justify-center' : ''}`}>
      
      {/* 1. COLLAPSED VIEW: Avatar with Hover Popover */}
      {isCollapsed ? (
        <div className="group relative py-2">
          {/* Avatar and Online Dot */}
          <div 
            onClick={() => navigate(`/admin/users/${user?.id || '1'}`)}
            className="relative w-11 h-11 rounded-2xl bg-purple-50/50 border border-purple-100/80 overflow-hidden flex-shrink-0 shadow-sm cursor-pointer hover:border-purple-300 hover:shadow-md transition-all duration-300"
          >
            <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>

          {/* Hover Action Popover */}
          <div className="absolute bottom-2 left-[56px] invisible opacity-0 group-hover:visible group-hover:opacity-100 bg-white border border-slate-100 rounded-2xl shadow-[0_15px_40px_rgba(79,94,84,0.12)] p-4 w-48 space-y-3 z-50 text-left transition-all duration-300 transform scale-95 origin-bottom-left group-hover:scale-100 border-l-2 border-l-[#7C3AED]">
            {/* Popover Header */}
            <div 
              onClick={() => navigate(`/admin/users/${user?.id || '1'}`)}
              className="flex flex-col text-left cursor-pointer group/popover-id"
            >
              <span className="text-xs font-black text-slate-800 leading-tight group-hover/popover-id:text-[#7C3AED] transition-colors truncate">
                {displayName}
              </span>
              <span className="inline-flex self-start items-center text-[8px] font-black tracking-widest text-[#7C3AED] bg-[#F5F3FF] px-1.5 py-0.5 rounded-md uppercase mt-1 leading-none border border-[#DDD6FE]/40">
                {displayRole}
              </span>
            </div>

            <div className="h-px bg-slate-100/70" />

            {/* Actions list */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50/50 cursor-pointer text-left w-full transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 2. EXPANDED VIEW: Rounded Profile Card */
        <div className="w-full py-1">
          {/* Card Body */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-purple-100/85 hover:bg-[#F5F3FF]/15 transition-all duration-300">
            <div 
              onClick={() => navigate(`/admin/users/${user?.id || '1'}`)}
              className="flex items-center gap-3 min-w-0 cursor-pointer group/identity flex-1"
            >
              <div className="relative w-10 h-10 rounded-2xl bg-purple-50/50 border border-purple-100/80 overflow-hidden flex-shrink-0 shadow-sm group-hover/identity:border-purple-300 group-hover/identity:shadow-sm transition-all duration-300">
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-50" />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-xs font-black text-slate-800 leading-tight truncate group-hover/identity:text-[#7C3AED] transition-colors">
                  {displayName}
                </span>
                <span className="inline-flex self-start items-center text-[8px] font-black tracking-widest text-[#7C3AED] bg-[#F5F3FF] px-1.5 py-0.5 rounded uppercase mt-1 leading-none border border-[#DDD6FE]/40">
                  {displayRole}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50/50 cursor-pointer transition-colors flex-shrink-0 flex items-center justify-center"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarProfile;

