import { motion } from 'framer-motion';

export const AwardCard = ({ icon: Icon, title, description, presenter, year }) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="flex flex-col items-center justify-between text-center relative group w-full"
    >
      {/* Laurel Wreath and Icon Area */}
      <div className="relative w-28 h-28 flex items-center justify-center shrink-0 mb-4 select-none pointer-events-none">
        
        {/* Golden Laurel Wreath SVG */}
        <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full text-[#D4AF37] opacity-80 group-hover:scale-105 transition-transform duration-300">
          {/* Left Laurel Branch */}
          <path
            d="M 35 90 C 20 80, 15 55, 30 35 C 34 30, 42 24, 48 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Left Leaves */}
          <path d="M 28 80 L 18 84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 20 66 L 10 68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 18 50 L 8 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 23 36 L 15 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 34 26 L 30 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Laurel Branch */}
          <path
            d="M 85 90 C 100 80, 105 55, 90 35 C 86 30, 78 24, 72 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Right Leaves */}
          <path d="M 92 80 L 102 84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 100 66 L 110 68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 102 50 L 112 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 97 36 L 105 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 86 26 L 90 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

          {/* Bottom Ribbon connection */}
          <path d="M 50 95 Q 60 105 70 100 M 50 95 Q 40 105 30 100" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Award Icon inside */}
        <div className="w-14 h-14 rounded-full bg-[#FFF8E8] text-[#E65100] border-2 border-[#FFE0B2] flex items-center justify-center shadow-md z-10">
          <Icon className="w-6 h-6 stroke-[2.2]" />
        </div>
      </div>

      {/* Award Card Content */}
      <div className="bg-white/70 backdrop-blur-sm border border-amber-150/40 rounded-3xl p-4 shadow-[0_6px_20px_rgba(180,160,120,0.03)] flex flex-col items-center justify-center text-center w-full min-h-[140px] flex-grow select-text group-hover:bg-white group-hover:shadow-[0_12px_28px_rgba(180,160,120,0.08)] transition-all duration-300">
        <span className="text-[13px] font-black text-slate-800 font-display leading-tight mb-2 max-w-[150px]">
          {title}
        </span>
        <span className="text-[10px] text-slate-400 font-bold leading-normal max-w-[160px]">
          {description}
        </span>
        {presenter && (
          <span className="text-[9px] text-[#E65100] font-extrabold tracking-wide mt-2 block uppercase max-w-[150px]">
            {presenter}
          </span>
        )}
      </div>

      {/* Vertical connector line going to axis */}
      <div className="w-0.5 h-6 bg-amber-200/50 mt-4 group-hover:bg-[#E65100]/40 transition-colors" />

      {/* Timeline Node Point on Axis */}
      <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#E65100] shadow-sm z-20 group-hover:scale-125 transition-transform" />

      {/* Year */}
      <span className="text-xs sm:text-sm font-black text-slate-800 font-display mt-3.5 block tracking-wider leading-none">
        {year}
      </span>
    </motion.div>
  );
};

export default AwardCard;
