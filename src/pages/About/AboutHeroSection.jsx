import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppointmentModal } from '../../context/AppointmentModalContext';
import Container from '../../components/common/Container';

export const AboutHeroSection = () => {
  const { openModal } = useAppointmentModal();
  const navigate = useNavigate();

  // Floating Trust Cards Data
  const trustCards = [
    {
      icon: Award,
      color: 'text-[#2E7D32]',
      bgColor: 'bg-emerald-50 border-emerald-100',
      title: '23+',
      desc: 'Years Experience',
    },
    {
      icon: ShieldCheck,
      color: 'text-[#1E88E5]',
      bgColor: 'bg-blue-50 border-blue-100',
      title: 'Evidence-Based',
      desc: 'Care',
    },
    {
      icon: Heart,
      color: 'text-[#8E24AA]',
      bgColor: 'bg-purple-50 border-purple-100',
      title: 'Parent-Centered',
      desc: 'Approach',
    },
    {
      icon: Sparkles,
      color: 'text-[#F57C00]',
      bgColor: 'bg-orange-50 border-orange-100',
      title: 'Early Intervention',
      desc: 'Experts',
    },
  ];

  return (
    <section className="relative bg-[#EAF8FF] text-slate-800 overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[40%] h-[50%] bg-[#FFF9C4]/20 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[30%] -left-[10%] w-[30%] h-[40%] bg-blue-100/25 rounded-full filter blur-3xl pointer-events-none z-0" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl lg:max-w-none mx-auto lg:mx-0"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EDE7F6] border border-[#D1C4E9]/50 text-[#5E35B1] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm backdrop-blur-sm">
              <Heart className="h-4 w-4 fill-current text-rose-400 animate-pulse" />
              <span>ABOUT NEURO BLOOMS</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 font-display tracking-tight leading-[1.12]">
              Helping Children <br className="hidden sm:inline" />
              <span className="text-[#3B8A4C] inline-block relative">
                Grow
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#3B8A4C]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,0 Q50,10 100,0" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              ,{' '}
              <span className="text-[#F57C00] inline-block relative font-bold">
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

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              Every child deserves the opportunity to reach their fullest potential. Through early intervention, personalized care and parent partnership, we help children build confidence, skills and independence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal()}
                className="bg-[#3B8A4C] hover:bg-[#327540] text-white font-bold px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/10 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Appointment</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/doctor')}
                className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-emerald-500/30 hover:text-[#3B8A4C] font-bold px-8 py-4 rounded-full inline-flex items-center justify-center gap-2.5 transition-all duration-300 shadow-sm w-full sm:w-auto cursor-pointer"
              >
                <User className="h-5 w-5 text-[#3B8A4C]" />
                <span>Meet Dr. Jagadish</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Image and Floating Cards */}
          <div className="lg:col-span-5 relative w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto lg:mx-0 flex flex-col md:flex-row items-center gap-6 justify-center">
            
            {/* Image container in rounded organic shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full aspect-square md:w-[65%] rounded-[50%_50%_40%_60%/_60%_40%_60%_40%] overflow-hidden border-8 border-white shadow-2xl bg-[#E8F5E9] flex-shrink-0"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
                alt="Developmental specialist working with a child"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating Trust Cards Stack */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-4 w-full md:w-[35%] shrink-0"
            >
              {trustCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, x: 4 }}
                    className={`flex items-center gap-3 p-3 bg-white rounded-2xl border ${card.bgColor} shadow-sm transition-all duration-300 w-full`}
                  >
                    <div className={`p-2 rounded-xl bg-white shadow-xs shrink-0`}>
                      <Icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                    <div className="text-left leading-tight">
                      <div className="text-xs sm:text-sm font-extrabold text-slate-800">{card.title}</div>
                      <div className="text-[10px] sm:text-xs text-slate-500 font-medium">{card.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Doodles */}
            {/* Paper Plane Doodle */}
            <div className="absolute -top-12 -left-8 w-24 h-12 opacity-35 hidden md:block select-none pointer-events-none z-0">
              <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M10,65 Q80,15 140,45" stroke="#1E88E5" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 4" />
                <g transform="translate(140, 45) rotate(20) scale(0.6)">
                  <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#1E88E5" />
                </g>
              </svg>
            </div>

            {/* Orange Dot */}
            <div className="absolute top-[10%] left-[5%] w-3 h-3 bg-[#F57C00] rounded-full animate-ping z-0 pointer-events-none" />
            <div className="absolute top-[10%] left-[5%] w-3 h-3 bg-[#F57C00] rounded-full z-0 pointer-events-none" />

          </div>

        </div>
      </Container>
    </section>
  );
};

export default AboutHeroSection;
