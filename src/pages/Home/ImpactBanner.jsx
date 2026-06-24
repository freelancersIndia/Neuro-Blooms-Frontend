import React from 'react';
import { Heart, Target, HeartHandshake, ShieldCheck, Users } from 'lucide-react';
import ValuePointCard from './ValuePointCard';

export const ImpactBanner = () => {
  const valuePoints = [
    {
      icon: Target,
      title: 'Personalized Care',
      description: 'Every child gets a plan built just for them.',
      colorClass: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]/20',
    },
    {
      icon: HeartHandshake,
      title: 'Family Partnership',
      description: 'We work together with parents at every step.',
      colorClass: 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]/20',
    },
    {
      icon: ShieldCheck,
      title: 'Evidence-Based',
      description: 'Our therapies are backed by research and results.',
      colorClass: 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]/20',
    },
    {
      icon: Users,
      title: 'Compassionate Team',
      description: "A team that truly cares about your child's future.",
      colorClass: 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]/20',
    },
  ];

  return (
    <div className="w-full relative z-20">
      <div className="bg-white rounded-[40px] p-6 sm:p-8 lg:p-7 shadow-[0_12px_40px_rgba(79,94,84,0.06)] border border-slate-100/60 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: Large Organic Rounded Image */}
          <div className="lg:col-span-3 flex justify-center relative w-full max-w-[200px] sm:max-w-[240px] lg:max-w-none mx-auto lg:mx-0">
            {/* Dashed outer border frame */}
            <div className="absolute inset-0 border-2 border-dashed border-[#A5D6A7]/40 rounded-[40px_70px_35px_65px] transform rotate-6 scale-105 pointer-events-none z-0" />
            
            {/* Main Image */}
            <div className="w-[90%] aspect-square rounded-[35px_65px_40px_70px] overflow-hidden border-4 border-white shadow-md relative z-10 bg-emerald-50">
              <img
                src="/images/statistics/parent_child_learning.png"
                alt="Parent and Child Learning Together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* CENTER COLUMN: Text and Heart Badge */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 px-2 sm:px-4">
            
            {/* Green Heart Badge Container */}
            <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#A5D6A7]/20">
              <Heart className="w-6 h-6 fill-current" />
            </div>

            {/* Heading and Description */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-display tracking-tight leading-snug">
                Every milestone{' '}
                <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
                  matters to us.
                </span>
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                We're proud to make a difference in the lives of children and families every single day.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: 4 Value Points (2x2 Grid) with Left Separator */}
          <div className="lg:col-span-5 w-full lg:border-l lg:border-slate-100 lg:pl-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
              {valuePoints.map((point, index) => (
                <ValuePointCard
                  key={index}
                  icon={point.icon}
                  title={point.title}
                  description={point.description}
                  colorClass={point.colorClass}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ImpactBanner;
