import React from 'react';
import { ShieldCheck, Shield, UserPlus, UserMinus, Edit3, Settings, Clock } from 'lucide-react';

const formatActivityTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const getActivityConfig = (type) => {
  switch (type) {
    case 'ROLE_CREATED':
      return {
        icon: ShieldCheck,
        color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        label: 'Role Created',
      };
    case 'PERMISSIONS_UPDATED':
      return {
        icon: Shield,
        color: 'text-blue-600 bg-blue-50 border-blue-100',
        label: 'Permissions Updated',
      };
    case 'USERS_ASSIGNED':
      return {
        icon: UserPlus,
        color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
        label: 'Users Assigned',
      };
    case 'USERS_REMOVED':
      return {
        icon: UserMinus,
        color: 'text-red-600 bg-red-50 border-red-100',
        label: 'Users Removed',
      };
    case 'ROLE_UPDATED':
      return {
        icon: Edit3,
        color: 'text-amber-600 bg-amber-50 border-amber-100',
        label: 'Role Updated',
      };
    default:
      return {
        icon: Settings,
        color: 'text-slate-600 bg-slate-50 border-slate-100',
        label: 'System Event',
      };
  }
};

export const RoleActivityTimeline = ({ logs = [] }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
        <Clock className="w-8 h-8 text-slate-300 mb-2" />
        <span className="text-xs font-semibold">No activity recorded.</span>
        <span className="text-[10px] font-semibold text-slate-400 mt-0.5">Activities concerning this role will appear here.</span>
      </div>
    );
  }

  return (
    <div className="relative border-l border-slate-100 pl-6 ml-4 py-2 flex flex-col gap-8 text-left">
      {logs.map((log, idx) => {
        const config = getActivityConfig(log.type);
        const IconComponent = config.icon;

        return (
          <div key={log.id || idx} className="relative group">
            {/* Timeline dot and icon */}
            <div className={`absolute -left-[42px] top-0 w-8 h-8 rounded-full border flex items-center justify-center shadow-sm z-10 ${config.color}`}>
              <IconComponent className="w-4 h-4" />
            </div>

            {/* Content card */}
            <div className="flex flex-col gap-1 bg-white p-4 border border-slate-200/80 rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.01)] group-hover:shadow-[0_4px_12px_rgba(15,23,42,0.02)] transition-all duration-200">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <span className="text-xs font-bold text-slate-900">
                  {config.label}
                </span>
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatActivityTime(log.timestamp)}
                </span>
              </div>
              
              <p className="text-[11px] font-semibold text-slate-500 leading-normal mt-0.5">
                {log.message}
              </p>
              
              <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400">Performed by:</span>
                <span className="text-[10px] font-black text-slate-700 font-mono bg-slate-50 border border-slate-150 px-1.5 py-0.5 rounded">
                  {log.performed_by}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoleActivityTimeline;
