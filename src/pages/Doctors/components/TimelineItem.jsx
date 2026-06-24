import { motion } from 'framer-motion';

export const TimelineItem = ({ icon: Icon, title, description, colorClasses, isLast }) => {
  return (
    <div className="relative flex gap-4 sm:gap-6 items-start pb-8 last:pb-0 group">
      {/* Vertical Connecting Line segment (only if not last) */}
      {!isLast && (
        <div className="absolute left-6 sm:left-7 top-12 bottom-0 w-0.5 bg-slate-200 group-hover:bg-[#3B8A4C]/30 transition-colors duration-300 pointer-events-none" />
      )}

      {/* Circle Icon Badge */}
      <div 
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center border-2 shadow-sm shrink-0 z-10 transition-transform duration-300 group-hover:scale-110 ${colorClasses.border} ${colorClasses.text}`}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ x: 6, transition: { duration: 0.2 } }}
        className="flex-grow bg-white/40 backdrop-blur-sm border border-slate-100/50 rounded-2xl p-4 sm:p-5 shadow-[0_4px_15px_rgba(79,94,84,0.02)] transition-all duration-300 hover:bg-white hover:shadow-[0_10px_25px_rgba(79,94,84,0.06)] text-left"
      >
        <h4 className={`text-sm sm:text-base font-extrabold font-display leading-tight ${colorClasses.text}`}>
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed mt-1">
          {description}
        </p>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
