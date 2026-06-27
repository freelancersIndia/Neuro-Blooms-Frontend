import React from 'react';
import { motion } from 'framer-motion';
import { Users, ThumbsUp, ShieldCheck, Award } from 'lucide-react';

export const TrustMetricsStrip = () => {
  const metrics = [
    {
      icon: Users,
      value: '1000+',
      label: 'Happy Families',
      bgClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]/25',
      textClass: 'text-[#2E7D32]',
    },
    {
      icon: ThumbsUp,
      value: '4.9/5',
      label: 'Average Rating',
      bgClass: 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]/25',
      textClass: 'text-[#E65100]',
    },
    {
      icon: ShieldCheck,
      value: 'Trusted by',
      label: 'Parents',
      bgClass: 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]/25',
      textClass: 'text-[#1565C0]',
    },
    {
      icon: Award,
      value: 'Proven',
      label: 'Results',
      bgClass: 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]/25',
      textClass: 'text-[#6A1B9A]',
    },
  ];

  return (
    <div className="w-full relative z-20">
      <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 lg:p-6 shadow-[0_12px_40px_rgba(79,94,84,0.06)] border border-slate-100/60 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 lg:gap-0 items-center justify-items-center">
          {metrics.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-4 w-full px-4 sm:px-6 md:px-8 justify-start lg:justify-center ${
                  index !== metrics.length - 1 ? 'lg:border-r lg:border-slate-100' : ''
                }`}
              >
                {/* Circle Icon Container */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 border ${item.bgClass}`}
                >
                  <IconComponent className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[2]" />
                </div>
                
                {/* Text Metric Values */}
                <div className="flex flex-col min-w-0">
                  <span className={`text-lg sm:text-xl md:text-2xl font-black font-display tracking-tight leading-none ${item.textClass}`}>
                    {item.value}
                  </span>
                  <span className="text-slate-500 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-1.5 leading-none">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrustMetricsStrip;
