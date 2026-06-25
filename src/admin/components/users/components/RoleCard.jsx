import React from 'react';
import { Shield, HeartPulse, UserCircle2, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const RoleCard = ({ role, name, description, badge, badgeColor, icon: Icon, isSelected, onToggle }) => {
  
  // Custom theme colors for selected roles
  const getSelectedStyles = () => {
    if (role === 'ADMIN') return 'border-admin-blue-500 bg-admin-blue-50/20';
    if (role === 'DOCTOR') return 'border-emerald-500 bg-emerald-50/20';
    if (role === 'RECEPTIONIST') return 'border-purple-500 bg-purple-50/20';
    return 'border-slate-800 bg-slate-50';
  };

  const getActiveIndicatorColor = () => {
    if (role === 'ADMIN') return 'bg-admin-blue-600';
    if (role === 'DOCTOR') return 'bg-emerald-500';
    if (role === 'RECEPTIONIST') return 'bg-purple-600';
    return 'bg-slate-700';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={onToggle}
      className={`border rounded-[16px] p-4 flex gap-4 items-start cursor-pointer transition-all duration-200 text-left relative ${
        isSelected 
          ? getSelectedStyles()
          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/30'
      }`}
    >
      {/* Selection Checkbox Circle */}
      <div className="flex-shrink-0 mt-0.5 relative">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {}} // Controlled via card onClick
          className="sr-only"
        />
        {isSelected ? (
          <div className={`w-5 h-5 rounded-md ${getActiveIndicatorColor()} text-white flex items-center justify-center`}>
            <Check className="w-3.5 h-3.5 stroke-[3.5]" />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-md border border-slate-300 bg-white" />
        )}
      </div>

      {/* Role Icon Container */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
        role === 'ADMIN' ? 'bg-admin-blue-50 text-admin-blue-600' :
        role === 'DOCTOR' ? 'bg-emerald-50 text-emerald-600' :
        'bg-purple-50 text-purple-600'
      }`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0 pr-12">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-800 tracking-wide uppercase leading-none">
            {name}
          </span>
        </div>
        <span className="text-[10px] font-semibold text-slate-450 mt-1 leading-snug">
          {description}
        </span>
      </div>

      {/* Permission Badge - Top Right */}
      <span className={`absolute right-3 top-3 inline-flex items-center px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border ${badgeColor}`}>
        {badge}
      </span>
    </motion.div>
  );
};

export default RoleCard;
