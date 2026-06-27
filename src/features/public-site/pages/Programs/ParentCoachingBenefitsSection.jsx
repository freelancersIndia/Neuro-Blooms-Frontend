import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const ParentCoachingBenefitsSection = () => {
  const benefits = [
    'Home-Based Learning',
    'Real-Life Skill Development',
    'Parent Empowerment',
    'Daily Practice',
    'Consistent Progress',
    'Remote Access & Support',
  ];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-[32px] p-7 md:p-8 border border-purple-100 shadow-xl flex flex-col justify-between h-full bg-gradient-to-br from-white to-purple-50/20"
    >
      <div className="space-y-6">
        {/* Title */}
        <h4 className="text-xl font-extrabold text-purple-900 font-display tracking-tight leading-tight">
          Why Parent Coaching Works
        </h4>

        {/* Benefits list */}
        <ul className="space-y-3.5">
          {benefits.map((benefit, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-3 text-left"
            >
              <div className="p-1 rounded-full bg-purple-100 text-purple-700 shrink-0 mt-0.5 shadow-2xs">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <span className="text-sm font-bold text-slate-700 leading-snug">
                {benefit}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* SVG Cartoon Illustration: Parent hugging child */}
      <div className="mt-8 flex justify-center items-center w-full">
        <svg
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[1000px] drop-shadow-md select-none pointer-events-none"
        >
          {/* Background circles/blobs */}
          <circle cx="100" cy="90" r="50" fill="#EDE7F6" opacity="0.7" />
          <circle cx="125" cy="100" r="30" fill="#FFF3E0" opacity="0.6" />

          {/* Mother Hair (Back) */}
          <path d="M70 70 C70 45, 120 45, 120 70 C120 75, 122 88, 118 95 C112 105, 75 105, 71 95 Z" fill="#8D6E63" />

          {/* Mother Body / Shirt */}
          <path d="M60 150 C60 110, 130 110, 130 150 Z" fill="#EC407A" />

          {/* Child Body / Shirt */}
          <path d="M100 150 C100 125, 150 125, 150 150 Z" fill="#29B6F6" />

          {/* Mother Head */}
          <circle cx="95" cy="70" r="22" fill="#FFE0B2" />
          {/* Mother Hair Front/Bangs */}
          <path d="M73 70 C73 50, 117 50, 117 70 C105 60, 85 60, 73 70 Z" fill="#5D4037" />

          {/* Child Head */}
          <circle cx="125" cy="95" r="16" fill="#FFE0B2" />
          {/* Child Hair */}
          <path d="M110 95 C110 82, 140 82, 140 95 C132 88, 118 88, 110 95 Z" fill="#5D4037" />

          {/* Mother closed happy eyes */}
          <path d="M84 72 Q88 75 92 72" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M98 72 Q102 75 106 72" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Mother Smile */}
          <path d="M91 82 Q95 86 99 82" stroke="#5D4037" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Mother Rosy Cheeks */}
          <circle cx="82" cy="77" r="2.5" fill="#E91E63" opacity="0.4" />
          <circle cx="108" cy="77" r="2.5" fill="#E91E63" opacity="0.4" />

          {/* Child closed happy eyes */}
          <path d="M117 96 Q120 98 123 96" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M127 96 Q130 98 133 96" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Child Smile */}
          <path d="M122 103 Q125 105 128 103" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Mother Arms (Hugging) */}
          <path d="M68 120 C85 115, 115 115, 126 122" stroke="#EC407A" strokeWidth="10" strokeLinecap="round" />
          {/* Child Arms (Hugging) */}
          <path d="M136 130 C125 125, 105 125, 98 135" stroke="#29B6F6" strokeWidth="7" strokeLinecap="round" />

          {/* Floating hearts */}
          <path d="M80 32 C78 28, 74 28, 72 30 C70 32, 70 36, 75 40 C80 36, 80 32, 80 32 Z" fill="#E91E63" opacity="0.8" />
          <path d="M135 45 C133 41, 129 41, 127 43 C125 45, 125 49, 130 53 C135 49, 135 45, 135 45 Z" fill="#E91E63" opacity="0.8" />
        </svg>
      </div>

    </motion.div>
  );
};

export default ParentCoachingBenefitsSection;
