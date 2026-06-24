import React from 'react';
import ProgramHero from './ProgramHero';
import DevelopmentTimeline from './DevelopmentTimeline';
import ProgramValueStrip from './ProgramValueStrip';

export const DevelopmentProgramSection = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-[#FFFFFF] overflow-hidden w-full">
      
      {/* Background Decorative blobs */}
      <div className="absolute top-[10%] left-[-8%] w-[35%] h-[35%] bg-emerald-100/15 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-8%] w-[35%] h-[35%] bg-[#FFF9C4]/15 rounded-full filter blur-3xl pointer-events-none z-0" />

      {/* Centered Main Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* Top Hero Column */}
        <ProgramHero />

        {/* Timeline Journey */}
        <DevelopmentTimeline />

        {/* Bottom Values Strip */}
        <ProgramValueStrip />

      </div>

    </section>
  );
};

export default DevelopmentProgramSection;
