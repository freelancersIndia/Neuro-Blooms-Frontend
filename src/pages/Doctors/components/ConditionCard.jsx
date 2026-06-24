import { motion } from 'framer-motion';

export const ConditionCard = ({ icon: Icon, title, colorClasses }) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white border border-slate-100 rounded-[20px] p-4 flex items-center gap-3.5 shadow-[0_6px_25px_rgba(79,94,84,0.02)] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(79,94,84,0.06)] w-full text-left"
    >
      {/* Icon Circle (Left) */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 transition-transform duration-300 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.text}`}>
        <Icon className="w-5 h-5 stroke-[2.2]" />
      </div>

      {/* Content (Right) */}
      <span className="text-xs sm:text-[13px] font-extrabold text-slate-800 font-display leading-snug">
        {title}
      </span>
    </motion.div>
  );
};

export default ConditionCard;
