import { motion } from 'framer-motion';
import { 
  Calendar, 
  MessageCircle, 
  Heart 
} from 'lucide-react';
import { CLINIC_INFO } from '../../utils/constants';
import { useAppointmentModal } from '../../context/AppointmentModalContext';

export const HeroSection = () => {
  const { openModal } = useAppointmentModal();

  return (
    <section className="relative min-h-screen bg-[#EAF8FF] text-slate-800 overflow-hidden flex flex-col justify-between pt-0 pb-16 lg:pb-24">
      
      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
      {/* Top Right soft yellow blob */}
      <div className="absolute top-0 right-0 w-[45%] h-[55%] bg-[#FFF9C4]/25 rounded-full filter blur-3xl pointer-events-none z-0" />
      {/* Mid Left soft blue blob */}
      <div className="absolute top-[35%] -left-[10%] w-[35%] h-[45%] bg-[#E3F2FD]/30 rounded-full filter blur-3xl pointer-events-none z-0" />
      {/* Center soft green blob */}
      <div className="absolute top-[20%] left-[40%] w-[30%] h-[30%] bg-emerald-100/10 rounded-full filter blur-3xl pointer-events-none z-0" />

      {/* --- HERO CONTENT GRID (2 COLUMNS) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex-grow flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Side: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-7 max-w-2xl lg:max-w-none mx-auto lg:mx-0"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm backdrop-blur-sm">
              <Heart className="h-4 w-4 fill-current text-rose-500 animate-pulse" />
              <span>Every Child Has Potential. We Help Them Bloom.</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 font-display tracking-tight leading-[1.12]">
              Helping Children <br className="hidden sm:inline" />
              <span className="text-[#3B8A4C] inline-block relative">
                Grow
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#3B8A4C]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,0 Q50,10 100,0" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              ,{' '}
              <span className="text-[#F57C00] inline-block relative">
                Learn
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#F57C00]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,0 Q50,10 100,0" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              {' '}&{' '}
              <span className="text-[#1E88E5] inline-block relative">
                Thrive
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#1E88E5]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,0 Q50,10 100,0" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal max-w-[580px]">
              Personalized Development Programs, Therapies, Parent Coaching &amp; Online Consultations designed to unlock your child's true potential.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal()}
                className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/15 hover:shadow-xl hover:shadow-emerald-950/25 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Appointment</span>
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={CLINIC_INFO.WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200/80 hover:border-emerald-500/30 hover:text-[#3B8A4C] font-bold px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto cursor-pointer"
              >
                <MessageCircle className="h-5 w-5 text-emerald-600 fill-emerald-500/20" />
                <span>Talk on WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
          
          {/* Right Side: Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 relative w-full max-w-[460px] sm:max-w-[540px] lg:max-w-none mx-auto lg:mx-0 flex justify-center items-center mt-6 lg:mt-0"
          >
            {/* Dashed background drawing circle */}
            <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] border-2 border-dashed border-[#A5D6A7]/50 rounded-full z-0 pointer-events-none transform -rotate-12 animate-[spin_60s_linear_infinite]" />

            {/* Hand-drawn blue heart outline */}
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute -top-12 left-[30%] w-14 h-14 opacity-40 text-[#1E88E5] z-0 pointer-events-none"
              animate={{
                y: [0, -6, 0],
                rotate: [0, 4, -4, 0],
                scale: [1, 1.03, 0.97, 1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
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

            {/* Floating leaf/bloom shape yellow */}
            <motion.div
              className="absolute -top-6 left-[62%] z-0 text-amber-400 w-8 h-8 opacity-75 pointer-events-none"
              animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
              </svg>
            </motion.div>

            {/* Floating leaf shape green */}
            <motion.div
              className="absolute top-[48%] -left-8 z-0 text-[#3B8A4C] w-10 h-10 opacity-30 pointer-events-none"
              animate={{ y: [0, 8, 0], rotate: [0, -12, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
              </svg>
            </motion.div>

            {/* Floating orange dot */}
            <div className="absolute top-[5%] right-[28%] w-3.5 h-3.5 bg-[#F57C00]/60 rounded-full animate-pulse z-0 pointer-events-none" />

            {/* Main Image Container */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[74%] aspect-[11/12] rounded-[40px_80px_50px_70px] overflow-hidden border-8 border-white shadow-2xl z-20 bg-emerald-50"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
                alt="Developmental specialist working with a child"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Secondary Image 1: Happy family portrait (Top Right) */}
            <motion.div
              animate={{ 
                y: [0, 6, 0],
                rotate: [5, 7, 5]
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[8%] -right-[3%] w-[42%] aspect-[4/3] rounded-3xl overflow-hidden border-6 border-white shadow-xl z-30 transform origin-bottom-left hover:scale-105 transition-transform duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400"
                alt="Happy family portrait"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Secondary Image 2: Child engaged in therapy activity (Bottom Right) */}
            <motion.div
              animate={{ 
                y: [0, -6, 0],
                rotate: [-4, -6, -4]
              }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[14%] -right-[6%] w-[42%] aspect-[4/3] rounded-3xl overflow-hidden border-6 border-white shadow-xl z-30 transform origin-top-left hover:scale-105 transition-transform duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400"
                alt="Child learning through play"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Smiling Flower Pot Illustration Sticker (Bottom Left of main image) */}
            <motion.div
              className="absolute bottom-[-4%] left-[54%] z-40 w-24 h-24 pointer-events-none"
              animate={{ 
                y: [0, -4, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                {/* Pot */}
                <path d="M40 85 L80 85 L74 110 L46 110 Z" fill="#D87A56" stroke="#fff" strokeWidth="2.5" />
                <rect x="35" y="80" width="50" height="7" rx="3" fill="#E08B69" stroke="#fff" strokeWidth="2" />
                
                {/* Stem */}
                <path d="M60 80 L60 55" stroke="#4CAF50" strokeWidth="6" strokeLinecap="round" />
                <path d="M60 71 Q52 64 47 67" stroke="#4CAF50" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M60 63 Q68 56 73 60" stroke="#4CAF50" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                
                {/* Flower Petals */}
                <circle cx="60" cy="24" r="10" fill="#FF7043" stroke="#fff" strokeWidth="2" />
                <circle cx="60" cy="66" r="10" fill="#FF7043" stroke="#fff" strokeWidth="2" />
                <circle cx="39" cy="45" r="10" fill="#FF7043" stroke="#fff" strokeWidth="2" />
                <circle cx="81" cy="45" r="10" fill="#FF7043" stroke="#fff" strokeWidth="2" />
                
                <circle cx="45" cy="31" r="10" fill="#FF7043" stroke="#fff" strokeWidth="2" />
                <circle cx="75" cy="59" r="10" fill="#FF7043" stroke="#fff" strokeWidth="2" />
                <circle cx="45" cy="59" r="10" fill="#FF7043" stroke="#fff" strokeWidth="2" />
                <circle cx="75" cy="31" r="10" fill="#FF7043" stroke="#fff" strokeWidth="2" />
                
                {/* Re-draw Center */}
                <circle cx="60" cy="45" r="15" fill="#FFCA28" stroke="#fff" strokeWidth="2.5" />
                <circle cx="60" cy="45" r="12.5" fill="#FFD54F" />
                
                {/* Eyes */}
                <circle cx="55" cy="42" r="2.5" fill="#3E2723" />
                <circle cx="65" cy="42" r="2.5" fill="#3E2723" />
                
                {/* Smile */}
                <path d="M54 48 Q60 54 66 48" stroke="#3E2723" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                
                {/* Rosy Cheeks */}
                <circle cx="50.5" cy="45.5" r="2" fill="#E91E63" opacity="0.6" />
                <circle cx="69.5" cy="45.5" r="2" fill="#E91E63" opacity="0.6" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
