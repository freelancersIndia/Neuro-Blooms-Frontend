import { motion } from 'framer-motion';
import { UserRound } from 'lucide-react';
import DoctorProfileCard from './DoctorProfileCard';
import ExpertiseGrid from './ExpertiseGrid';
import AchievementStrip from './AchievementStrip';
import MissionQuoteCard from './MissionQuoteCard';

export const DoctorSection = () => {
  return (
    <section className="relative py-12 lg:py-16 bg-[#FFFFFF] overflow-hidden w-full flex flex-col justify-center">
      
      {/* --- FLOATING DECORATIONS --- */}
      
      {/* Top Left Paper Plane (Orange) */}
      <div className="absolute top-[8%] left-[4%] w-36 h-20 opacity-40 hidden lg:block select-none pointer-events-none">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="#F57C00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />
          <g transform="translate(140, 45) rotate(20) scale(0.7)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#F57C00" />
          </g>
        </svg>
      </div>

      {/* Top Right Orange Heart outline */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[8%] right-[15%] w-9 h-9 opacity-35 text-[#F57C00] pointer-events-none hidden lg:block"
        animate={{ y: [0, -4, 0], rotate: [0, 6, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
      </motion.svg>

      {/* Leaf Illustration (Top Right edge) */}
      <div className="absolute -top-4 -right-4 w-32 h-32 opacity-25 text-emerald-700 pointer-events-none hidden lg:block select-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M70,20 C50,20 30,35 25,55 C20,75 35,90 55,85 C75,80 90,60 90,40 C90,30 80,20 70,20 Z M45,75 C35,75 28,68 32,55 C36,42 50,32 65,36 C80,40 82,58 75,68 C68,78 55,75 45,75 Z" />
          <path d="M25,55 C20,35 35,15 55,10" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Subtle Dot patterns (Far left & right) */}
      <div className="absolute left-4 top-[40%] text-slate-200 opacity-40 hidden xl:block select-none pointer-events-none">
        <svg width="40" height="120" viewBox="0 0 40 120" fill="currentColor">
          <circle cx="10" cy="10" r="2.5" /><circle cx="30" cy="10" r="2.5" />
          <circle cx="10" cy="30" r="2.5" /><circle cx="30" cy="30" r="2.5" />
          <circle cx="10" cy="50" r="2.5" /><circle cx="30" cy="50" r="2.5" />
          <circle cx="10" cy="70" r="2.5" /><circle cx="30" cy="70" r="2.5" />
          <circle cx="10" cy="90" r="2.5" /><circle cx="30" cy="90" r="2.5" />
          <circle cx="10" cy="110" r="2.5" /><circle cx="30" cy="110" r="2.5" />
        </svg>
      </div>
      <div className="absolute right-4 top-[40%] text-slate-200 opacity-40 hidden xl:block select-none pointer-events-none">
        <svg width="40" height="120" viewBox="0 0 40 120" fill="currentColor">
          <circle cx="10" cy="10" r="2.5" /><circle cx="30" cy="10" r="2.5" />
          <circle cx="10" cy="30" r="2.5" /><circle cx="30" cy="30" r="2.5" />
          <circle cx="10" cy="50" r="2.5" /><circle cx="30" cy="50" r="2.5" />
          <circle cx="10" cy="70" r="2.5" /><circle cx="30" cy="70" r="2.5" />
          <circle cx="10" cy="90" r="2.5" /><circle cx="30" cy="90" r="2.5" />
          <circle cx="10" cy="110" r="2.5" /><circle cx="30" cy="110" r="2.5" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col space-y-7 md:space-y-9 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-2 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <UserRound className="h-4 w-4 text-[#3B8A4C]" />
            <span>Meet Our Expert</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
            Expert Care,{' '}
            <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
              Every Step of the Way
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-[680px] font-medium">
            Learn more about our founder and leading child development specialist.
          </p>
        </div>

        {/* Doctor Profile Card (3-Column layout inside) */}
        <div className="w-full">
          <DoctorProfileCard />
        </div>

        {/* Areas of Expertise Grid */}
        <div className="w-full">
          <ExpertiseGrid />
        </div>

        {/* Bottom Achievement Strip & Mission Quote Card row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch w-full">
          {/* Left Column: Achievement Strip */}
          <div className="lg:col-span-7 flex">
            <AchievementStrip />
          </div>

          {/* Right Column: Mission Quote Card */}
          <div className="lg:col-span-5 flex">
            <MissionQuoteCard />
          </div>
        </div>

      </div>

    </section>
  );
};

export default DoctorSection;
