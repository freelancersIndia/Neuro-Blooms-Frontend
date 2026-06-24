import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Baby, 
  Award, 
  Clock, 
  UserCheck, 
  Heart, 
  Star 
} from 'lucide-react';
import StatisticCard from './StatisticCard';
import ImpactBanner from './ImpactBanner';

const STATS_DATA = [
  {
    icon: Users,
    targetValue: 1000,
    suffix: '+',
    title: 'Families Supported',
    description: 'Trusted by families across our community.',
    decimals: 0,
    themeColor: 'green',
  },
  {
    icon: Baby,
    targetValue: 1500,
    suffix: '+',
    title: 'Children Impacted',
    description: 'Helping children grow, learn & thrive.',
    decimals: 0,
    themeColor: 'orange',
  },
  {
    icon: TrendingUp,
    targetValue: 85,
    suffix: '%',
    title: 'Achieved Their Goals',
    description: 'Children showing meaningful progress.',
    decimals: 0,
    themeColor: 'blue',
  },
  {
    icon: Award,
    targetValue: 4.9,
    suffix: '/5',
    title: 'Parent Satisfaction',
    description: 'Rated by parents who trust us.',
    decimals: 1,
    themeColor: 'purple',
  },
  {
    icon: Clock,
    targetValue: 8,
    suffix: '+',
    title: 'Years of Excellence',
    description: 'Years of dedicated service in child development.',
    decimals: 0,
    themeColor: 'gold',
  },
  {
    icon: UserCheck,
    targetValue: 10,
    suffix: '+',
    title: 'Expert Therapists',
    description: 'Experienced professionals dedicated to your child.',
    decimals: 0,
    themeColor: 'teal',
  },
];

export const StatisticsSection = () => {
  // Container stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="relative w-full bg-[#F5F9FF] overflow-hidden py-12 md:py-16 lg:py-6 xl:py-8 lg:h-screen lg:max-h-[920px] lg:min-h-[860px] flex flex-col justify-between select-none">
      
      {/* --- FLOATING DECORATIONS & LEAVES --- */}
      
      {/* Top Left Leaf Illustration */}
      <div className="absolute top-[8%] left-[2%] opacity-25 w-12 h-12 text-[#3B8A4C] pointer-events-none hidden lg:block select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Top Right Leaf Illustration */}
      <div className="absolute top-[8%] right-[2%] opacity-25 w-12 h-12 text-[#3B8A4C] pointer-events-none hidden lg:block select-none transform scale-x-[-1]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Bottom Left Leaf Illustration */}
      <div className="absolute bottom-[2%] left-[1.5%] opacity-20 w-16 h-16 text-[#3B8A4C] pointer-events-none hidden lg:block select-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Bottom Right Leaf Illustration */}
      <div className="absolute bottom-[2%] right-[1.5%] opacity-20 w-16 h-16 text-[#3B8A4C] pointer-events-none hidden lg:block select-none transform scale-x-[-1]">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.33,18C12,18 17.5,14.5 19,12C20.5,9.5 20.5,5 20.5,5C20.5,5 16,5 13.5,6.5C11,8 10,13.5 10,13.5C10,13.5 12,11.5 15,11.5C18,11.5 17,8 17,8Z" />
        </svg>
      </div>

      {/* Left Purple Star Outline */}
      <motion.svg
        viewBox="0 0 24 24"
        className="absolute top-[28%] left-[2.5%] w-6 h-6 opacity-35 text-[#AB47BC] pointer-events-none hidden xl:block select-none"
        animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2.2" fill="none" />
      </motion.svg>

      {/* Left Blue Dot */}
      <div className="absolute top-[40%] left-[2%] w-3 h-3 bg-[#1E88E5]/40 rounded-full hidden xl:block pointer-events-none select-none" />

      {/* Right Orange Heart Outline */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute top-[24%] right-[22%] w-8 h-8 opacity-45 text-[#F57C00] pointer-events-none hidden xl:block select-none"
        animate={{ y: [0, -6, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M50,85 C50,85 15,60 15,35 C15,15 35,10 50,30 C65,10 85,15 85,35 C85,60 50,85 50,85 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="5 3"
        />
      </motion.svg>

      {/* Right Paper Plane Trail */}
      <div className="absolute top-[26%] right-[3%] w-32 h-16 opacity-30 hidden xl:block select-none pointer-events-none z-0">
        <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M10,65 Q80,15 140,45" stroke="#3B8A4C" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
          <g transform="translate(140, 45) rotate(20) scale(0.6)">
            <path d="M0,0 L18,-5 L9,14 L7,8 L0,0 Z" fill="#3B8A4C" />
          </g>
        </svg>
      </div>

      {/* Right Green/Blue Dot */}
      <div className="absolute top-[38%] right-[1.8%] w-3 h-3 bg-[#3B8A4C]/40 rounded-full hidden xl:block pointer-events-none select-none" />

      {/* --- DECORATIVE ORGANIC IMAGE - TOP LEFT --- */}
      <div className="absolute top-[10%] left-[3%] w-[130px] h-[130px] xl:w-[170px] xl:h-[170px] hidden md:block">
        {/* Soft green organic dashed outline */}
        <div className="absolute inset-0 border-2 border-dashed border-[#A5D6A7]/50 rounded-[40px_70px_35px_65px] transform rotate-6 scale-105 pointer-events-none z-0" />
        {/* Main image container */}
        <div className="w-full h-full rounded-[35px_65px_40px_70px] overflow-hidden border-4 border-white shadow-md relative z-10 bg-emerald-50">
          <img 
            src="/images/statistics/child_playing.png" 
            alt="Child Playing With Educational Toys" 
            className="w-full h-full object-cover" 
          />
        </div>
        {/* Overlapping Trending Up Badge */}
        <div className="absolute bottom-[-6px] right-[-6px] bg-[#3B8A4C] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md border-2 border-white z-20">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* --- DECORATIVE ORGANIC IMAGE - TOP RIGHT --- */}
      <div className="absolute top-[10%] right-[3%] w-[130px] h-[130px] xl:w-[170px] xl:h-[170px] hidden md:block">
        {/* Soft green organic dashed outline */}
        <div className="absolute inset-0 border-2 border-dashed border-[#A5D6A7]/50 rounded-[65px_35px_70px_40px] transform -rotate-6 scale-105 pointer-events-none z-0" />
        {/* Main image container */}
        <div className="w-full h-full rounded-[70px_40px_65px_35px] overflow-hidden border-4 border-white shadow-md relative z-10 bg-[#E3F2FD]">
          <img 
            src="/images/statistics/child_thumbs_up.png" 
            alt="Happy Child Giving Thumbs Up" 
            className="w-full h-full object-cover" 
          />
        </div>
        {/* Overlapping Heart Badge */}
        <div className="absolute bottom-[-6px] left-[-6px] bg-amber-400 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md border-2 border-white z-20">
          <Heart className="w-4 h-4 fill-current text-white" />
        </div>
      </div>

      {/* --- HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center justify-center space-y-3 lg:space-y-2.5 mt-2 lg:mt-0"
      >
        {/* Badge Rounded Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E8F5E9]/80 border border-[#A5D6A7]/40 text-[#2E7D32] rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-sm backdrop-blur-sm">
          <TrendingUp className="h-4 w-4 text-[#3B8A4C]" />
          <span>Our Impact</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-slate-800 font-display tracking-tight leading-none">
          Real Numbers,{' '}
          <span className="bg-gradient-to-r from-[#3B8A4C] to-[#2E7D32] bg-clip-text text-transparent">
            Real Impact
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed max-w-[700px] font-medium px-4">
          Behind every number is a child who is growing, learning, and unlocking their full potential.
        </p>
      </motion.div>

      {/* --- STATISTICS CARDS GRID --- */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-6 lg:my-3">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5"
        >
          {STATS_DATA.map((card, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <StatisticCard card={card} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- BOTTOM IMPACT BANNER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-4 mt-2 lg:mt-0"
      >
        <ImpactBanner />
      </motion.div>

    </section>
  );
};

export default StatisticsSection;
