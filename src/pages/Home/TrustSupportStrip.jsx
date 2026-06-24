import React from 'react';
import { Headphones, ShieldCheck, Users, HeartHandshake } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Headphones,
    title: 'Quick Response',
    description: 'We reply within 24 hours',
    colorClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]/20',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Care',
    description: "Your child's well-being is our priority",
    colorClass: 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]/20',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Our team is here to guide you',
    colorClass: 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]/20',
  },
  {
    icon: HeartHandshake,
    title: 'Compassionate Team',
    description: 'We care, we listen, we support',
    colorClass: 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]/20',
  },
];

export const TrustSupportStrip = () => {
  return (
    <div className="bg-white rounded-[36px] p-6 shadow-[0_12px_36px_rgba(79,94,84,0.06)] border border-slate-100/60 w-full select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        {TRUST_ITEMS.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-4 px-2 sm:px-4 ${
                idx !== TRUST_ITEMS.length - 1 ? 'lg:border-r lg:border-slate-100' : ''
              }`}
            >
              {/* Icon Container */}
              <div className={`w-11 h-11 rounded-full flex items-center justify-center border shadow-sm flex-shrink-0 ${item.colorClass}`}>
                <IconComponent className="w-5.5 h-5.5 stroke-[2.2]" />
              </div>

              {/* Text info */}
              <div className="flex flex-col text-left leading-snug">
                <h4 className="text-xs sm:text-sm font-black text-slate-800 font-display">
                  {item.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-0.5 leading-normal">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustSupportStrip;
