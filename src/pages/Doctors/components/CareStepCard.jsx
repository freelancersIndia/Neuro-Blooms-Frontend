import { motion } from 'framer-motion';

export const CareStepCard = ({ number, icon: Icon, title, description, colorClasses }) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative bg-white border border-slate-100 rounded-[24px] p-5 pt-8 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(79,94,84,0.02)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(79,94,84,0.06)] h-[220px] w-full"
    >
      {/* Number Badge at Top */}
      <span className="absolute -top-3 px-3 py-1 bg-white border-2 border-[#A5D6A7] text-[#2E7D32] rounded-full text-xs font-black font-display shadow-sm">
        {number}
      </span>

      {/* Icon Circle */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border shrink-0 mb-4 transition-transform duration-300 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.text}`}>
        <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
      </div>

      {/* Step Name */}
      <span className="text-xs sm:text-sm font-extrabold text-slate-800 font-display leading-tight mb-2">
        {title}
      </span>

      {/* Description */}
      <p className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-relaxed max-w-[170px] mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default CareStepCard;
