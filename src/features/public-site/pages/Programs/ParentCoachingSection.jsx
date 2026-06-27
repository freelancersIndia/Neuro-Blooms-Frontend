import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareCode, Users, Activity, HelpCircle } from 'lucide-react';
import ParentCoachingTimeline from './ParentCoachingTimeline';
import ParentCoachingBenefitsSection from './ParentCoachingBenefitsSection';
import Container from '../../../../components/common/Container';

export const ParentCoachingSection = () => {
  const helpAreas = [
    { title: 'Speech Delays', color: 'bg-emerald-50 text-[#3B8A4C] border-emerald-100' },
    { title: 'Developmental Delays', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { title: 'Attention Issues', color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { title: 'Hyperactivity', color: 'bg-orange-50 text-orange-500 border-orange-100' },
    { title: 'Behavior Concerns', color: 'bg-red-50 text-red-600 border-red-100' },
    { title: 'Academic Challenges', color: 'bg-teal-50 text-teal-600 border-teal-100' },
    { title: 'Social Skills', color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { title: 'Parenting Support', color: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100' },
  ];

  return (
    <section id="parent-coaching-section" className="relative py-20 bg-[#FFF8F0] overflow-hidden w-full">
      {/* Background Decorators */}
      <div className="absolute top-[15%] left-[5%] w-[35%] h-[35%] bg-amber-100/15 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-[#FFCC80]/10 rounded-full filter blur-3xl pointer-events-none z-0" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-7xl mx-auto">

          {/* Left Column: Title, Virtual consultation image, Timeline, and Help Pills */}
          <div className="lg:col-span-8 space-y-10">

            {/* Header info */}
            <div className="space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-100/60 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">
                <Users className="h-3.5 w-3.5" />
                <span>Parent Coaching Program</span>
              </span>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
                Empowering Parents to Become <br />
                Partners in Development
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                Helping families create meaningful progress from the comfort of their homes. Empowering parents to become active partners in their child's development journey.
              </p>
            </div>



            {/* Parent Coaching Timeline */}
            <div className="pt-4">
              <ParentCoachingTimeline />
            </div>

            {/* What Parent Coaching Helps With */}
            <div className="space-y-4 pt-4">
              <div className="text-left flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-orange-500" />
                <h4 className="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-wider">
                  What Parent Coaching Helps With:
                </h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {helpAreas.map((area, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.04 }}
                    className={`px-4 py-2 rounded-full text-xs font-bold border shadow-3xs cursor-default ${area.color}`}
                  >
                    {area.title}
                  </motion.span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Benefits Checklist & Parent-Child Illustration */}
          <div className="lg:col-span-4 w-full h-full flex flex-col justify-start">
            <ParentCoachingBenefitsSection />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ParentCoachingSection;
