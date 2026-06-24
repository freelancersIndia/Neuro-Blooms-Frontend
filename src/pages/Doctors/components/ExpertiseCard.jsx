import { motion } from 'framer-motion';

export const ExpertiseCard = ({ icon: Icon, title, colorClasses }) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(79,94,84,0.02)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(79,94,84,0.06)] h-[150px] w-full"
    >
      {/* Icon Circle */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border shrink-0 mb-3.5 transition-transform duration-300 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.text}`}>
        <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
      </div>

      {/* Title */}
      <span className="text-xs sm:text-sm font-extrabold text-slate-800 font-display leading-tight max-w-[120px] mx-auto">
        {title}
      </span>
    </motion.div>
  );
};

export default ExpertiseCard;
