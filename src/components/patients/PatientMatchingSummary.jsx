import { Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import PatientMatchScore from './PatientMatchScore';

export const PatientMatchingSummary = ({ bestScore = 92 }) => {
  // Determine match status tier
  const isHighConfidence = bestScore >= 90;
  const isMediumConfidence = bestScore >= 70 && bestScore < 90;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgba(79,94,84,0.015)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 select-none"
    >
      {/* Left side: Information and icon */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div className="flex flex-col text-left">
          <h2 className="text-base font-extrabold text-slate-800 tracking-tight font-display">
            We found possible matches for this request
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-1.5 leading-relaxed max-w-xl">
            Review the matches below or create a new patient if no suitable match exists.
          </p>
        </div>
      </div>

      {/* Right side: Score & Confidence Badge */}
      <div className="flex items-center gap-4.5 bg-slate-50/50 border border-slate-100/50 p-4 rounded-2xl w-full md:w-auto self-stretch md:self-auto justify-center md:justify-start">
        {/* Progress Score Ring */}
        <PatientMatchScore score={bestScore} size={76} strokeWidth={6.5} />
        
        {/* Confidence Tier details */}
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-display">
            Best Match Score
          </span>
          <span className="text-xs font-bold text-slate-700 mt-0.5">
            High match confidence
          </span>
          
          {/* Badge */}
          {isHighConfidence ? (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100/50 px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wide font-display mt-2 w-fit">
              <Sparkles className="w-2.5 h-2.5 fill-emerald-600" />
              <span>High Confidence</span>
            </span>
          ) : isMediumConfidence ? (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100/50 px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wide font-display mt-2 w-fit">
              <Sparkles className="w-2.5 h-2.5 fill-amber-600" />
              <span>Medium Confidence</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-100/50 px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wide font-display mt-2 w-fit">
              <Sparkles className="w-2.5 h-2.5 fill-orange-600" />
              <span>Low Confidence</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PatientMatchingSummary;
