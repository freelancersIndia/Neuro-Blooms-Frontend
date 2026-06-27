import React from 'react';
import { Users, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

const FEATURES = [
  {
    icon: Users,
    title: 'Expert',
    titleLine2: 'Therapists',
    colorClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]/20',
  },
  {
    icon: Award,
    title: 'Personalized',
    titleLine2: 'Care Plans',
    colorClass: 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]/20',
  },
  {
    icon: ShieldCheck,
    title: 'Evidence-',
    titleLine2: 'Based Therapy',
    colorClass: 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]/20',
  },
  {
    icon: HeartHandshake,
    title: 'Compassionate',
    titleLine2: 'Support',
    colorClass: 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]/20',
  },
];

export const TrustFeatures = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-2 w-full max-w-lg mx-auto">
      {FEATURES.map((item, idx) => {
        const IconComponent = item.icon;
        return (
          <div key={idx} className="flex flex-col items-center text-center space-y-2.5">
            {/* Circle icon container */}
            <div className={`w-11 h-11 rounded-full flex items-center justify-center border shadow-sm ${item.colorClass}`}>
              <IconComponent className="w-5 h-5 stroke-[2.2]" />
            </div>

            {/* Two-line text label */}
            <div className="leading-tight text-slate-700 text-[11px] sm:text-xs font-bold font-display">
              <div>{item.title}</div>
              <div>{item.titleLine2}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrustFeatures;
