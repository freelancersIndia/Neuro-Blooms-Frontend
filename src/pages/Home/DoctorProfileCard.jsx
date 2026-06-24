import React from 'react';
import { motion } from 'framer-motion';
import DoctorQualifications from './DoctorQualifications';
import DoctorOverview from './DoctorOverview';

export const DoctorProfileCard = () => {
  // Smiling friendly male pediatrician portrait
  const doctorPhoto = "/images/doctor/dr_a_jagadish.png";

  return (
    <div className="w-full relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        
        {/* COLUMN 1: Doctor Photo */}
        <div className="md:col-span-4 lg:col-span-3 flex justify-center relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-none mx-auto md:mx-0">
          
          {/* Dashed background frame outline */}
          <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[98%] h-[98%] border-2 border-dashed border-[#A5D6A7]/40 rounded-[45px_85px_40px_75px] z-0 pointer-events-none transform -rotate-6" />

          {/* Portrait Image Container */}
          <div className="w-[92%] aspect-[9/10] rounded-[40px_80px_45px_70px] overflow-hidden border-8 border-white shadow-2xl z-10 bg-[#E8F5E9]/30 flex-shrink-0">
            <img 
              src={doctorPhoto} 
              alt="Dr. A. Jagadish" 
              className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-500" 
            />
          </div>

          {/* Floating Experience Badge (Bottom Left) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute bottom-[2%] -left-[4%] bg-white rounded-2xl py-2 px-3.5 shadow-[0_10px_25px_rgba(79,94,84,0.1)] border border-slate-100/80 flex items-center gap-2.5 z-20"
          >
            <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#3B8A4C] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <div className="leading-tight flex flex-col text-left">
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 font-display">23+ Years</span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">Experience</span>
            </div>
          </motion.div>

        </div>

        {/* COLUMN 2: Doctor Credentials & Qualifications */}
        <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-center bg-white rounded-[32px] p-6 lg:p-7 shadow-[0_15px_45px_rgba(79,94,84,0.03)] border border-slate-150/40">
          <DoctorQualifications />
        </div>

        {/* COLUMN 3: Location, Biography & Button */}
        <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-center bg-white rounded-[32px] p-6 lg:p-7 shadow-[0_15px_45px_rgba(79,94,84,0.03)] border border-slate-150/40">
          <DoctorOverview />
        </div>

      </div>
    </div>
  );
};

export default DoctorProfileCard;
