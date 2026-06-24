import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import Container from '../../components/common/Container';

export const ProgramsFAQSection = () => {
  const [activeTab, setActiveTab] = useState('nbdp'); // 'nbdp' or 'coaching'
  const [openIndex, setOpenIndex] = useState(null);

  const nbdpFAQs = [
    {
      question: 'Why is assessment necessary before starting the program?',
      answer: 'Every child has a unique developmental profile. A thorough developmental assessment helps us identify your child\'s specific strengths and areas of delay. This diagnostic baseline allows us to design a highly personalized program targeting precisely the skills they need to develop, rather than using a generic approach.',
    },
    {
      question: 'How long does it take to see progress in my child?',
      answer: 'While early signs of progress, such as improved engagement and calmer transitions, can often be seen within 4 to 6 weeks, major developmental milestone gains typically require 3 to 6 months of consistent intervention and home implementation. Growth is a continuous process that depends on regular attendance and daily practice.',
    },
    {
      question: 'How are goals decided for my child?',
      answer: 'Goals are formulated based on clinical findings from the initial assessment, the child\'s current age, and parent priorities. We break down larger targets (like verbal expression or emotional regulation) into small, measurable weekly steps. We collaborate with you to ensure goals are relevant to your daily routine.',
    },
    {
      question: 'How are parents involved in the program?',
      answer: 'Parent partnership is the cornerstone of our program. We provide brief feedback after every therapy session, share home training plans, host regular counseling calls, and conduct joint monthly progress reviews. You are equipped with the exact strategies used by our therapists to reinforce skills at home.',
    },
  ];

  const coachingFAQs = [
    {
      question: 'Can online coaching really help my child?',
      answer: 'Absolutely. Clinical studies confirm that parent-implemented intervention is one of the most effective ways to support neurodivergent and developing children. By coaching you, we enable therapy to happen throughout the week in your child\'s natural environment, leading to faster progress and more durable skill development.',
    },
    {
      question: 'How often are coaching sessions conducted?',
      answer: 'Typically, parent coaching is conducted weekly or bi-weekly. Each live session lasts 45-60 minutes and includes reviewing home practice videos, modeling specific coaching strategies, discussing challenges, and setting new home milestones for the upcoming week.',
    },
    {
      question: 'What if the strategies don\'t work at home?',
      answer: 'Development is not linear. If a strategy doesn\'t yield the desired response, we collaborate to modify it. We analyze details of the routine, break down the skill into even smaller steps, or try a different sensory or communication support. Our team provides ongoing remote support to guide you.',
    },
    {
      question: 'How is progress measured in parent coaching?',
      answer: 'We measure progress through structured daily activity logs, weekly parent feedback, and standard goal achievement scales. During monthly review calls, we evaluate whether target routines (e.g., bedtime, mealtime, playtime interaction) have become smoother and if child responsiveness has increased.',
    },
  ];

  const currentFAQs = activeTab === 'nbdp' ? nbdpFAQs : coachingFAQs;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-[#F8FBFF] overflow-hidden w-full">
      {/* Background Soft Blurs */}
      <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-blue-100/10 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-[#E8F5E9]/15 rounded-full filter blur-3xl pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF8FF] border border-blue-100/60 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Support &amp; Answers</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 font-display tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-16 bg-amber-400 rounded-full mt-2" />
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-100/80 p-1.5 rounded-full border border-slate-200/50 flex gap-2 shadow-inner">
            <button
              onClick={() => {
                setActiveTab('nbdp');
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'nbdp'
                  ? 'bg-[#3B8A4C] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              NBDP Questions
            </button>
            <button
              onClick={() => {
                setActiveTab('coaching');
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'coaching'
                  ? 'bg-purple-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Parent Coaching Questions
            </button>
          </div>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {currentFAQs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 hover:border-slate-200 hover:shadow-md"
                  >
                    {/* Header Button */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full py-5 px-6 sm:px-8 text-left flex justify-between items-center gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#3B8A4C]' : ''
                        }`}
                      />
                    </button>

                    {/* Expandable Panel */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                        >
                          <div className="pb-5 pt-0 px-6 sm:px-8 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-50/50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};

export default ProgramsFAQSection;
