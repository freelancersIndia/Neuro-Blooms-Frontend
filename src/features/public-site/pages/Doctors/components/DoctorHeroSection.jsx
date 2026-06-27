import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import DoctorHeroImage from './DoctorHeroImage';
import DoctorHeroContent from './DoctorHeroContent';
import DoctorTrustStrip from './DoctorTrustStrip';
import { ROUTES } from '../../../../../utils/routes';

export const DoctorHeroSection = ({ doctor }) => {
  return (
    <section className="relative w-full bg-[#EAF8FF] px-4 sm:px-6 lg:px-8 py-6 lg:py-8 overflow-hidden select-none lg:min-h-screen lg:h-screen lg:max-h-[840px] flex flex-col justify-between border-b border-slate-100">
      
      {/* --- FLOATING DECORATIONS (DESIGN MATCH) --- */}
      
      {/* Top Left Light Blue Circle */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], y: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] left-[5%] w-7 h-7 rounded-full border-4 border-[#1E88E5]/20 pointer-events-none hidden lg:block z-0"
      />

      {/* Mid Left Green Semi-Circle */}
      <div className="absolute top-[32%] left-[1.5%] w-14 h-7 rounded-t-full bg-[#3B8A4C]/15 rotate-90 pointer-events-none hidden lg:block z-0" />

      {/* Mid Left Orange Circle */}
      <div className="absolute top-[48%] left-[4%] w-4.5 h-4.5 rounded-full bg-[#FFCA28]/30 pointer-events-none hidden lg:block z-0" />

      {/* Top Right Pink Heart */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[8%] right-[11%] w-8 h-8 text-[#EC407A]/25 pointer-events-none hidden lg:block z-0"
        animate={{ y: [0, -6, 0], rotate: [0, 6, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="currentColor"
        />
      </motion.svg>

      {/* Top Right Orange Circle Outline */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[13%] right-[7%] w-6 h-6 rounded-full border-4 border-[#F57C00]/25 pointer-events-none hidden lg:block z-0"
      />

      {/* Right Side Dotted Curved Path */}
      <svg className="absolute top-[10%] right-[3%] w-44 h-44 text-[#1E88E5]/15 pointer-events-none hidden lg:block z-0" fill="none" viewBox="0 0 100 100">
        <path d="M 10 10 Q 70 20 80 80" stroke="currentColor" strokeWidth="2.2" strokeDasharray="5 5" strokeLinecap="round" />
      </svg>

      {/* Bottom Right Two Children Playing Line Art */}
      <div className="absolute bottom-[22%] right-[2%] opacity-[0.06] text-[#1E88E5] pointer-events-none hidden lg:block z-0 select-none">
        <svg width="220" height="180" viewBox="0 0 240 200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Boy */}
          <circle cx="175" cy="65" r="18" />
          <path d="M175 83 v45 m-20 40 20-40 20 40 m-40-25 20-15 18-10" />
          {/* Girl */}
          <circle cx="75" cy="72" r="18" />
          <path d="M75 90 v38 m-20 42 20-42 18 42 M55 108 l20-15 20 12" />
          {/* Connecting Hand-in-Hand Line */}
          <path d="M95 105 Q115 115 135 98" />
        </svg>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between relative z-10">
        
        {/* Breadcrumb: Home > Doctor > Dr. A. Jagadish */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-bold select-none mb-4 sm:mb-6 relative z-30">
          <Link to={ROUTES.HOME} className="hover:text-[#3B8A4C] transition-colors flex items-center gap-1.5">
            <Home className="h-4 w-4 text-[#3B8A4C] fill-current" />
            <span>Home</span>
          </Link>
          <span className="text-slate-350 select-none">&gt;</span>
          <span className="text-slate-500">Doctor</span>
          <span className="text-slate-350 select-none">&gt;</span>
          <span className="text-slate-800">Dr. A. Jagadish</span>
        </nav>

        {/* 2-Column Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow lg:py-2">
          {/* Left Column: Image Area */}
          <div className="lg:col-span-5 flex justify-center h-full items-center">
            <DoctorHeroImage image={doctor.image} name={doctor.name} />
          </div>
          
          {/* Right Column: Hero Content */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start h-full items-center pl-0 lg:pl-6">
            <DoctorHeroContent />
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div className="w-full pt-6">
          <DoctorTrustStrip />
        </div>

      </div>

    </section>
  );
};

export default DoctorHeroSection;
