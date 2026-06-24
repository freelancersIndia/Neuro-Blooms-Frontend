import { motion } from 'framer-motion';

export const ResearchCard = ({ icon: Icon, title, description, colorClasses }) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col items-center justify-start text-center shadow-[0_8px_30px_rgba(79,94,84,0.02)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(79,94,84,0.06)] min-h-[200px] w-full"
    >
      {/* Icon Circle */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border shrink-0 mb-4 transition-transform duration-300 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.text}`}>
        <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
      </div>

      {/* Title */}
      <span className="text-xs sm:text-[13px] font-extrabold text-slate-800 font-display leading-tight mb-2.5 max-w-[150px]">
        {title}
      </span>

      {/* Description */}
      <p className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default ResearchCard;
