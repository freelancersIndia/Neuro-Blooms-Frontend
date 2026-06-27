import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import DoctorQuoteCard from './DoctorQuoteCard';
import ImpactStatsGrid from './ImpactStatsGrid';
import Container from '../../../../../components/common/Container';

export const DoctorAboutSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-white w-full overflow-hidden select-none">
      <Container>
        {/* Rounded Main Section Container */}
        <div className="relative bg-[#EAF8FF] rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-12 shadow-[0_15px_40px_rgba(30,41,59,0.04)] border border-slate-100/60 overflow-hidden">
          
          {/* --- DECORATIONS (DESIGN MATCH) --- */}
          {/* Floating Pink Heart (Bottom Left) */}
          <motion.div
            animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[24%] left-[4%] text-[#EC407A]/25 pointer-events-none hidden sm:block z-0"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* Floating Yellow Circle Outline (Bottom Left) */}
          <div className="absolute bottom-[16%] left-[2%] w-4 h-4 rounded-full border-4 border-[#FFCA28]/35 pointer-events-none hidden sm:block z-0" />

          {/* Faded Stethoscope Line Art (Right of left column) */}
          <div className="absolute top-[20%] left-[45%] opacity-[0.04] text-[#1E88E5] pointer-events-none hidden lg:block z-0 select-none">
            <svg width="180" height="240" viewBox="0 0 240 320" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M120 40 c-30 0-50 20-50 50 v40 c0 30 20 50 50 50 s50-20 50-50 v-40 c0-30-20-50-50-50 z" />
              <path d="M120 180 v60 c0 20-15 35-35 35 h-20 c-20 0-35-15-35-35 v-20" />
              <path d="M120 180 v60 c0 20 15 35 35 35 h 20 c 20 0 35-15 35-35 v-20" />
              <circle cx="30" cy="220" r="12" />
              <circle cx="210" cy="220" r="12" />
            </svg>
          </div>

          {/* 2-Column Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column (55%): About Content */}
            <div className="lg:col-span-7 flex flex-col text-left space-y-6 sm:space-y-8">
              
              <div className="space-y-4">
                {/* About Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E8F5E9] border border-[#A5D6A7]/30 text-[#2E7D32] rounded-full text-xs font-extrabold tracking-wider uppercase shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-[#3B8A4C] fill-current" />
                  <span>ABOUT THE DOCTOR</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 font-display tracking-tight">
                    About Dr. A. Jagadish
                  </h2>
                  <div className="w-14 h-1.5 bg-[#3B8A4C] rounded-full" />
                </div>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                <p>
                  Dr. A. Jagadish is a distinguished Child Development Specialist with{' '}
                  <span className="text-[#2E7D32] font-bold">23+ years</span> of experience in Early
                  Intervention and Neuro Developmental Disabilities.
                </p>
                <p>
                  He is affiliated with Apollo Hospital, Apollo Cradle, and Apokos Hospital,
                  Hyderabad. As a National Faculty on Early Intervention for Neuro Developmental
                  Disabilities, he specializes in developmental assessment, autism spectrum disorders,
                  ADHD, learning disabilities, cerebral palsy, and high-risk newborn developmental
                  follow-up.
                </p>
                <p>
                  His patient-centered approach focuses on early diagnosis, individualized intervention
                  planning, family empowerment, and long-term developmental outcomes for children.
                </p>
              </div>

              {/* Quote Card placement */}
              <div className="pt-2">
                <DoctorQuoteCard />
              </div>

            </div>

            {/* Right Column (45%): Stats Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <ImpactStatsGrid />
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default DoctorAboutSection;
