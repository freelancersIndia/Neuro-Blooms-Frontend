import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export const DoctorHeroImage = ({ image, name }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:justify-start">
      {/* Background circles & dashed outline */}
      <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center">
        
        {/* Dashed outer outline */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-10px] sm:inset-[-12px] md:inset-[-15px] border-2 border-dashed border-[#A5D6A7]/40 rounded-full z-0 pointer-events-none"
        />
        
        {/* Organic Transparent White Circle Background */}
        <div className="absolute inset-0 rounded-full bg-white/40 border-8 border-white/60 backdrop-blur-sm shadow-[0_15px_35px_rgba(79,94,84,0.05)] z-0" />
        
        {/* Doctor Image - placed and cropped within the circular placeholder */}
        <div className="absolute inset-0 rounded-full overflow-hidden z-10 border-8 border-white/80 shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)]">
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover object-[55%_center] select-none pointer-events-none"
          />
        </div>

        {/* Floating Experience Card (Bottom Left, overlapping image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute bottom-[2%] -left-[4%] sm:-left-[6%] md:-left-[8%] bg-white rounded-[24px] sm:rounded-[28px] p-3 sm:p-4 md:p-5 shadow-[0_20px_45px_rgba(79,94,84,0.12)] border border-slate-100 flex items-center gap-3 z-20 max-w-[210px] sm:max-w-[240px] md:max-w-[260px] text-left"
        >
          {/* Green Shield Icon Circle */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center border border-[#A5D6A7]/20 shadow-sm shrink-0">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>
          
          <div className="leading-tight flex flex-col">
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#2E7D32] font-display">21+</span>
            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-800 font-display mt-0.5 leading-snug">Years of Dedicated Experience</span>
            <span className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-400 font-medium tracking-wide mt-1">Dedicated Child Development Care</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorHeroImage;
