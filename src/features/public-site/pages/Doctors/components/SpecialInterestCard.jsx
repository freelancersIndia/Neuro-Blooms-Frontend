import { motion } from 'framer-motion';

export const SpecialInterestCard = ({ icon: Icon, title, colorClasses }) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white border border-slate-100 rounded-[24px] p-6 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(79,94,84,0.02)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(79,94,84,0.06)] h-[170px] w-full"
    >
      {/* Icon Circle */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border shrink-0 mb-4 transition-transform duration-300 ${colorClasses.bg} ${colorClasses.border} ${colorClasses.text}`}>
        <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
      </div>

      {/* Title */}
      <span className="text-xs sm:text-[13px] font-extrabold text-slate-800 font-display leading-tight max-w-[130px] mx-auto">
        {title}
      </span>
    </motion.div>
  );
};

export default SpecialInterestCard;
