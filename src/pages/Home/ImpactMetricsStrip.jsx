import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Smile, TrendingUp, Award } from 'lucide-react';

export const ImpactMetricsStrip = () => {
  const metrics = [
    {
      id: 1,
      type: "headline",
      icon: Heart,
      headline: "Making a difference",
      subHeadline: "every single day",
      iconBg: "bg-[#E8F5E9]",
      iconText: "text-[#2E7D32]",
      textColor: "text-[#2E7D32]"
    },
    {
      id: 2,
      type: "stat",
      icon: Users,
      value: "1000+",
      label: "Families Supported",
      iconBg: "bg-[#E8F5E9]",
      iconText: "text-[#2E7D32]",
      statColor: "text-slate-800"
    },
    {
      id: 3,
      type: "stat",
      icon: Smile,
      value: "1500+",
      label: "Children Impacted",
      iconBg: "bg-orange-50",
      iconText: "text-orange-500",
      statColor: "text-slate-800"
    },
    {
      id: 4,
      type: "stat",
      icon: TrendingUp,
      value: "85%",
      label: "Achieved Their Goals",
      iconBg: "bg-blue-50",
      iconText: "text-blue-500",
      statColor: "text-slate-800"
    },
    {
      id: 5,
      type: "stat",
      icon: Award,
      value: "4.9/5",
      label: "Parent Satisfaction",
      iconBg: "bg-purple-50",
      iconText: "text-purple-500",
      statColor: "text-slate-800"
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-[32px] sm:rounded-[36px] shadow-[0_12px_40px_rgba(0,0,0,0.02)] border border-slate-100/60 p-4 sm:p-5 lg:p-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Desktop: 5 columns divided, Tablet: 3+2, Mobile: stacked */}
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-5 gap-y-6 md:gap-y-8 lg:gap-y-0 items-center justify-between text-left lg:divide-x lg:divide-slate-100">
        
        {metrics.map((item, index) => {
          // Column spans for tablet responsive layouts
          // Item 1: span 2 (mobile), span 6 (tablet), span 1 (desktop)
          // Item 2, 3: span 1 (mobile), span 2 (tablet), span 1 (desktop)
          // Item 4, 5: span 1 (mobile), span 3 (tablet), span 1 (desktop)
          let colClass = "col-span-1 px-3 sm:px-4 flex items-center gap-3 justify-start";
          if (item.id === 1) {
            colClass = "col-span-2 md:col-span-6 lg:col-span-1 px-3 sm:px-4 flex items-center gap-3 justify-center lg:justify-start pb-4 md:pb-6 lg:pb-0 border-b border-slate-100 md:border-b-0 lg:border-b-0";
          } else if (item.id === 2 || item.id === 3) {
            colClass = "col-span-1 md:col-span-3 lg:col-span-1 px-3 sm:px-4 flex items-center gap-3 justify-start";
          } else if (item.id === 4 || item.id === 5) {
            colClass = "col-span-1 md:col-span-3 lg:col-span-1 px-3 sm:px-4 flex items-center gap-3 justify-start mt-2 md:mt-0 lg:mt-0";
          }

          const Icon = item.icon;

          if (item.type === "headline") {
            return (
              <div key={item.id} className={colClass}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.iconBg} ${item.iconText} shadow-sm`}>
                  <Icon className="w-5 h-5 fill-current opacity-90" />
                </div>
                <div className="text-left font-display">
                  <span className="block text-xs sm:text-sm font-extrabold text-slate-700 leading-tight">
                    {item.headline}
                  </span>
                  <span className={`block text-xs sm:text-sm font-extrabold leading-none mt-0.5 ${item.textColor}`}>
                    {item.subHeadline}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div key={item.id} className={colClass}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg} ${item.iconText} shadow-sm`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <span className={`block text-lg sm:text-xl font-black tracking-tight leading-none ${item.statColor}`}>
                  {item.value}
                </span>
                <span className="block text-[10px] sm:text-[11px] font-bold text-slate-500 mt-1 leading-tight">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}

      </div>
    </motion.div>
  );
};

export default ImpactMetricsStrip;
