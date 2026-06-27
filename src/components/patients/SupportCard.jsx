import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

export const SupportCard = ({ onContactSupport }) => {
  return (
    <div className="border border-purple-200/80 bg-purple-50/20 rounded-[20px] p-5 select-none text-left space-y-4">
      {/* Icon & Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-650 flex-shrink-0 animate-pulse">
          <Heart className="w-4.5 h-4.5 fill-purple-500 text-purple-500" />
        </div>
        <h4 className="text-xs font-black text-slate-800 tracking-wider font-display uppercase">
          Need Help?
        </h4>
      </div>

      {/* Subtitle */}
      <p className="text-[11px] font-semibold text-slate-500 leading-relaxed">
        If you have any questions, contact the administrator or support team.
      </p>

      {/* Action button */}
      <button
        type="button"
        onClick={onContactSupport}
        className="w-full h-11 bg-white hover:bg-slate-50 border border-purple-250 text-purple-650 hover:text-purple-700 rounded-xl text-xs font-black shadow-sm font-display flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      >
        <span>Contact Support</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default SupportCard;
