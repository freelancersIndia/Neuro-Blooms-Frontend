import React from 'react';
import { Calendar, MessageCircle, ClipboardCheck, Rocket, ShieldCheck, Heart } from 'lucide-react';

const STEPS = [
  {
    icon: Calendar,
    title: 'Easy',
    titleLine2: 'Scheduling',
    description: 'Book in just 2 minutes',
    colorClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]/20',
  },
  {
    icon: MessageCircle,
    title: 'Free',
    titleLine2: 'Consultation',
    description: "Understand your child's needs",
    colorClass: 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]/20',
  },
  {
    icon: ClipboardCheck,
    title: 'Personalized',
    titleLine2: 'Assessment',
    description: 'Tailored plan for your child',
    colorClass: 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]/20',
  },
  {
    icon: Rocket,
    title: 'Start Your',
    titleLine2: 'Journey',
    description: 'Begin a brighter tomorrow',
    colorClass: 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]/20',
  },
];

export const JourneyCard = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-[0_15px_45px_rgba(79,94,84,0.08)] border border-slate-100/60 w-full overflow-hidden flex flex-col justify-between select-none">
      
      {/* Top Section Padding */}
      <div className="p-6 md:p-7 flex flex-col space-y-5">
        
        {/* Top Label */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <span className="text-xs sm:text-sm font-black text-[#2E7D32] font-display">
            Your Journey Starts Here
          </span>
        </div>

        {/* Divider dashed line */}
        <div className="border-t border-dashed border-slate-100" />

        {/* 4 Step Process Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-2">
          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center px-2 sm:px-4 ${
                  idx !== STEPS.length - 1 ? 'lg:border-r lg:border-slate-100' : ''
                }`}
              >
                {/* Colored circle badge for icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-sm mb-3 ${step.colorClass}`}>
                  <IconComponent className="w-5 h-5 stroke-[2.2]" />
                </div>

                {/* Step labels */}
                <h5 className="text-[11px] sm:text-xs font-black text-slate-800 leading-snug font-display">
                  {step.title} <br className="hidden sm:inline" />
                  {step.titleLine2}
                </h5>
                
                <p className="text-[10px] text-slate-400 mt-1 leading-normal font-normal max-w-[120px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Light Green Strip */}
      <div className="bg-[#E8F5E9] text-[#2E7D32] py-3 px-6 rounded-b-[32px] flex items-center justify-between text-xs sm:text-[13px] font-bold border-t border-[#A5D6A7]/20 select-none">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
          <span>Your child's potential is our priority. Let's unlock it together.</span>
        </div>
        <Heart className="w-4 h-4 text-[#2E7D32] hidden sm:block" />
      </div>

    </div>
  );
};

export default JourneyCard;
