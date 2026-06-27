import React, { useState } from 'react';
import Container from '../../../../components/common/Container';
import SectionTitle from '../../../../components/common/SectionTitle';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: 'What clinical tools do you use for Autism (ASD) assessments?',
      a: 'We use the Autism Diagnostic Observation Schedule, Second Edition (ADOS-2) alongside the Autism Diagnostic Interview-Revised (ADI-R), combined with comprehensive cognitive and developmental history inventories. This guarantees a multi-source, clinical-grade assessment.',
    },
    {
      q: 'Do I need a referral from a pediatrician to start therapies?',
      a: 'While referrals are helpful and often required by certain insurance carriers, you can book an initial developmental intake directly at our center for self-referred children.',
    },
    {
      q: 'What is the age group that Neuro Blooms supports?',
      a: 'Our early intervention and speech programs primarily support children from age 18 months up to 12 years. We also run teen neurodiversity affirmation cohorts up to age 16.',
    },
    {
      q: 'Are parents required to be present during therapy sessions?',
      a: 'For early intervention and speech therapies, we strongly encourage active parent coaching. We often structure sessions with a 45-minute child play interaction followed by a 15-minute parent debrief to coordinate home adaptations.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <SectionTitle
          subtitle="Support Desk"
          title="Frequently Asked Questions"
        />

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-slate-50 transition-colors"
                >
                  <div className="flex gap-3 items-start pr-4">
                    <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-bold text-gray-900 text-sm md:text-base font-display">
                      {faq.q}
                    </span>
                  </div>
                  {isActive ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {isActive && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 text-sm text-gray-600 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default FAQPage;
