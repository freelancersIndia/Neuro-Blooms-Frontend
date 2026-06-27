import { Quote } from 'lucide-react';

export const DoctorQuoteCard = () => {
  return (
    <div className="bg-white rounded-[28px] p-6 shadow-[0_15px_35px_rgba(79,94,84,0.06)] border border-slate-100/50 flex items-start gap-4 text-left relative z-10">
      <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center border border-[#A5D6A7]/20 shrink-0">
        <Quote className="w-5 h-5 fill-current rotate-180" />
      </div>
      <div className="space-y-2">
        <p className="text-sm sm:text-base italic text-[#2E7D32] font-semibold leading-relaxed">
          "Every child has a unique potential. Early support, right guidance and family partnership can transform their future."
        </p>
        <p className="text-xs sm:text-sm font-bold text-slate-700 font-display">
          — Dr. A. Jagadish
        </p>
      </div>
    </div>
  );
};

export default DoctorQuoteCard;
