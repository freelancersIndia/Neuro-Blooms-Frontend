import React from 'react';
import { Calendar } from 'lucide-react';

export const AppointmentHeroContent = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
      
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm">
        <Calendar className="h-4 w-4 text-[#3B8A4C]" />
        <span>Book an Appointment</span>
      </div>

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 font-display tracking-tight leading-tight px-2">
        Take the First Step <br />
        Toward a{' '}
        <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
          Brighter Future
        </span>
      </h2>

      {/* Subheading */}
      <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed font-semibold max-w-[580px] px-4">
        Early support can make a world of difference. <br className="hidden sm:inline" />
        Book a consultation with our experts today.
      </p>

    </div>
  );
};

export default AppointmentHeroContent;
