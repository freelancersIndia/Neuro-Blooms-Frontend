import { motion } from 'framer-motion';

export const MembershipCard = ({ logoSvg, title, subtitle }) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white border border-slate-100/80 rounded-3xl p-5 flex flex-col items-center justify-between text-center shadow-[0_8px_30px_rgba(79,94,84,0.02)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(79,94,84,0.06)] min-h-[200px] w-full"
    >
      {/* Logo Wrapper */}
      <div className="w-24 h-24 flex items-center justify-center shrink-0 mb-4 select-none pointer-events-none">
        {logoSvg}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <span className="text-xs sm:text-[13px] font-extrabold text-slate-800 font-display leading-tight block">
          {title}
        </span>
        {subtitle && (
          <span className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-relaxed block">
            {subtitle}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default MembershipCard;
