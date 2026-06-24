import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { CloudDivider } from '../../../components/common/SectionDivider';
import Container from '../../../components/common/Container';

export const BlogHeroSection = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories = []
}) => {
  return (
    <section className="relative bg-[#EAF8FF] pt-12 sm:pt-16 lg:pt-20 pb-0 overflow-hidden select-none">
      
      {/* Floating Background Shapes */}
      {/* Pink Heart Outline/Solid */}
      <motion.div
        className="absolute top-[15%] left-[45%] opacity-40 text-rose-400 pointer-events-none hidden lg:block"
        animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>

      {/* Yellow Ring */}
      <motion.div
        className="absolute bottom-[20%] left-[38%] w-6 h-6 border-4 border-amber-400 rounded-full opacity-60 pointer-events-none hidden lg:block"
        animate={{ y: [0, 8, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Green Ring */}
      <motion.div
        className="absolute top-[25%] right-[5%] w-8 h-8 border-4 border-emerald-400 rounded-full opacity-60 pointer-events-none hidden lg:block"
        animate={{ y: [0, -6, 0], rotate: [0, -120, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Content & Filters */}
          <div className="lg:col-span-7 text-left space-y-6 lg:pb-12 z-10">
            
            {/* Purple Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 bg-purple-50 border border-purple-100/60 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              Knowledge Center
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[52px] font-black text-slate-800 font-display tracking-tight leading-[1.1]"
            >
              Insights for Parents,<br />
              <span className="text-[#0E7A4B]">Caregivers & Families</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-[620px] font-medium"
            >
              Explore expert articles on child development, autism, ADHD, early intervention, parenting, learning difficulties, and developmental milestones.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full max-w-xl"
            >
              <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white text-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 placeholder-slate-400 text-sm sm:text-base"
              />
            </motion.div>

            {/* Category Filter Horizontal Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full pt-2"
            >
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border cursor-pointer active:scale-95 ${
                        isActive
                          ? 'bg-[#0E7A4B] text-white border-[#0E7A4B] shadow-md shadow-[#0E7A4B]/10 hover:bg-[#0c663e]'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200/60 shadow-sm'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Right Column - Illustration & Doctor */}
          <div className="lg:col-span-5 relative h-[320px] sm:h-[400px] lg:h-[460px] flex items-end justify-center lg:justify-end">
            
            {/* Hand-Drawn Kids Play Doodle Graphic */}
            <div className="absolute inset-0 opacity-[0.08] text-slate-800 flex items-center justify-center pointer-events-none select-none">
              <svg width="340" height="280" viewBox="0 0 240 200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full transform scale-110">
                {/* Heart */}
                <path d="M120 40 Q130 20 145 35 T120 75 T95 50 T120 40 Z" fill="#F43F5E" stroke="none" opacity="0.4" />
                {/* Boy */}
                <circle cx="75" cy="72" r="18" />
                <path d="M75 90 v38 m-20 42 20-42 18 42 M55 108 l20-15 20 12" />
                {/* Girl */}
                <circle cx="165" cy="68" r="18" />
                <path d="M165 86 v40 m-20 42 20-42 18 42 m-38-24 l20-15 20 12" />
                <path d="M145 100 Q165 95 185 100" />
                {/* Connection line */}
                <path d="M93 108 L145 110" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Doctor Portrait Image */}
            <motion.img
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              src="/images/doctor/dr_a_jagadish.png"
              alt="Dr. A. Jagadish"
              className="max-h-[290px] sm:max-h-[360px] lg:max-h-[430px] w-auto object-contain z-10 origin-bottom select-none pointer-events-none filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
            />

          </div>

        </div>
      </Container>

      {/* Cloud Divider Transition */}
      <CloudDivider fromColor="#EAF8FF" toColor="#FFFFFF" height={100} />
    </section>
  );
};

export default BlogHeroSection;
