import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useAppointmentModal } from '../../../../context/AppointmentModalContext';

export const ProgramsHeroSection = () => {
  const { openModal } = useAppointmentModal();

  const scrollToOverview = () => {
    const element = document.getElementById('programs-overview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trustChips = [
    {
      icon: Award,
      title: '23+',
      desc: 'Years Experience',
      bgColor: 'bg-emerald-50 border-emerald-100/60',
      iconColor: 'text-[#3B8A4C] bg-emerald-100/50',
    },
    {
      icon: ShieldCheck,
      title: 'Evidence-Based',
      desc: 'Care',
      bgColor: 'bg-blue-50 border-blue-100/60',
      iconColor: 'text-blue-600 bg-blue-100/50',
    },
    {
      icon: Heart,
      title: 'Parent',
      desc: 'Partnership',
      bgColor: 'bg-pink-50 border-pink-100/60',
      iconColor: 'text-[#E91E63] bg-pink-100/50',
    },
    {
      icon: Sparkles,
      title: 'Early Intervention',
      desc: 'Experts',
      bgColor: 'bg-orange-50 border-orange-100/60',
      iconColor: 'text-orange-500 bg-orange-100/50',
    },
  ];

  return (
    <section className="relative min-h-[85vh] bg-[#EAF8FF] text-slate-800 overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16 flex flex-col justify-between">
      {/* Background Soft Blobs */}
      <div className="absolute top-0 right-0 w-[45%] h-[55%] bg-[#FFF9C4]/25 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[30%] -left-[10%] w-[35%] h-[45%] bg-[#E3F2FD]/30 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[35%] w-[30%] h-[30%] bg-emerald-100/10 rounded-full filter blur-3xl pointer-events-none z-0" />

      {/* Doodles & Decorators */}
      {/* Floating Orange Dot */}
      <div className="absolute top-[12%] left-[45%] w-3 h-3 bg-orange-400 rounded-full animate-ping z-0 pointer-events-none" />
      <div className="absolute top-[12%] left-[45%] w-3 h-3 bg-orange-400 rounded-full z-0 pointer-events-none" />
      
      {/* Dotted path leading to a paper plane */}
      <div className="absolute top-[8%] right-[40%] w-36 h-20 opacity-30 hidden xl:block select-none pointer-events-none z-0">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="#9C27B0" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 4" />
          <g transform="translate(140, 45) rotate(20) scale(0.6)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#9C27B0" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl lg:max-w-none mx-auto lg:mx-0"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EDE7F6] border border-[#D1C4E9]/50 text-[#5E35B1] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-xs backdrop-blur-xs">
              <Heart className="h-3.5 w-3.5 fill-current text-rose-500 animate-pulse" />
              <span>OUR PROGRAMS</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 font-display tracking-tight leading-[1.12]">
              Helping Children Move <br className="hidden sm:inline" />
              From{' '}
              <span className="inline-block relative">
                Struggle
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#3B8A4C]/20 rounded-full" />
              </span>{' '}
              to{' '}
              <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent inline-block relative font-black">
                Success
                <svg className="absolute -bottom-2.5 left-0 w-full h-2.5 text-[#3B8A4C]/35" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal max-w-[600px]">
              Evidence-based developmental programs, early intervention strategies, and parent coaching designed to help children achieve meaningful progress.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal()}
                className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/15 hover:shadow-xl transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Appointment</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToOverview}
                className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200/80 hover:border-emerald-500/30 hover:text-[#3B8A4C] font-bold px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xs hover:shadow-md w-full sm:w-auto cursor-pointer"
              >
                <span>Explore Programs</span>
                <ArrowRight className="h-5 w-5 text-emerald-600" />
              </motion.button>
            </div>

            {/* Trust Chips Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-6 w-full max-w-3xl">
              {trustChips.map((chip, idx) => {
                const Icon = chip.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 p-3.5 bg-white rounded-2xl border ${chip.bgColor} shadow-xs transition-all duration-300 w-full`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 shadow-2xs ${chip.iconColor}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col justify-center leading-tight">
                      <span className="text-xs sm:text-sm font-extrabold text-slate-800 font-display">
                        {chip.title}
                      </span>
                      <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                        {chip.desc}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          
          {/* Right Column: Composite Doctor + Parent + Child Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-none mx-auto lg:mx-0 flex justify-center items-center mt-6 lg:mt-0"
          >
            {/* Dashed outer decorative circle */}
            <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[98%] h-[98%] border-2 border-dashed border-[#A5D6A7]/40 rounded-full z-0 pointer-events-none transform -rotate-12 animate-[spin_80s_linear_infinite]" />

            {/* Main organic shape layout container */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[85%] aspect-[4/3] rounded-[40px_80px_50px_70px] overflow-hidden border-8 border-white shadow-2xl z-10 bg-emerald-50"
            >
              <img
                src="/images/doctor/doctor_office_playroom.png"
                alt="Doctor consulting parent and child playing with blocks"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600';
                }}
              />
            </motion.div>

            {/* Bottom floating flower doodle */}
            <motion.div
              className="absolute bottom-[-10px] left-[5%] z-20 w-16 h-16 pointer-events-none opacity-90"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                <circle cx="50" cy="50" r="12" fill="#FFCA28" stroke="#fff" strokeWidth="2" />
                <path d="M50 20 C42 30 58 30 50 20 Z" fill="#FF7043" stroke="#fff" strokeWidth="1.5" />
                <path d="M50 80 C42 70 58 70 50 80 Z" fill="#FF7043" stroke="#fff" strokeWidth="1.5" />
                <path d="M20 50 C30 42 30 58 20 50 Z" fill="#FF7043" stroke="#fff" strokeWidth="1.5" />
                <path d="M80 50 C70 42 70 58 80 50 Z" fill="#FF7043" stroke="#fff" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="6" fill="#FFF" />
              </svg>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProgramsHeroSection;
