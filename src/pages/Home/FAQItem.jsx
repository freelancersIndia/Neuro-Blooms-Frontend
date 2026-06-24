import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const FAQItem = ({ faq, isOpen, onToggle }) => {
  const { icon: IconComponent, question, answer, themeColor } = faq;

  // Color mapping based on themeColor
  let accentColorClass = '';
  let iconBgClass = '';
  let activeQuestionClass = '';

  if (themeColor === 'green') {
    accentColorClass = 'text-[#3B8A4C]';
    iconBgClass = 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]/20';
    activeQuestionClass = 'group-hover:text-[#3B8A4C]';
  } else if (themeColor === 'orange') {
    accentColorClass = 'text-[#F57C00]';
    iconBgClass = 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]/20';
    activeQuestionClass = 'group-hover:text-[#F57C00]';
  } else if (themeColor === 'blue') {
    accentColorClass = 'text-[#1E88E5]';
    iconBgClass = 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]/20';
    activeQuestionClass = 'group-hover:text-[#1E88E5]';
  } else if (themeColor === 'purple') {
    accentColorClass = 'text-[#AB47BC]';
    iconBgClass = 'bg-[#F3E5F5] text-[#6A1B9A] border-[#E1BEE7]/20';
    activeQuestionClass = 'group-hover:text-[#AB47BC]';
  } else if (themeColor === 'gold') {
    accentColorClass = 'text-[#FFCA28]';
    iconBgClass = 'bg-[#FFFDE7] text-[#F57F17] border-[#FFF59D]/20';
    activeQuestionClass = 'group-hover:text-[#FFCA28]';
  } else if (themeColor === 'teal') {
    accentColorClass = 'text-[#009688]';
    iconBgClass = 'bg-[#E0F2F1] text-[#00695C] border-[#80CBC4]/20';
    activeQuestionClass = 'group-hover:text-[#009688]';
  } else if (themeColor === 'pink') {
    accentColorClass = 'text-[#EC407A]';
    iconBgClass = 'bg-[#FCE4EC] text-[#C2185B] border-[#F48FB1]/20';
    activeQuestionClass = 'group-hover:text-[#EC407A]';
  }

  return (
    <div className="bg-white rounded-[24px] shadow-[0_4px_15px_rgba(79,94,84,0.02)] border border-slate-100/50 overflow-hidden w-full transition-shadow hover:shadow-[0_8px_25px_rgba(79,94,84,0.05)] duration-300">
      
      {/* Question Header Button */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left p-3.5 sm:p-4 group cursor-pointer focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3.5 min-w-0 flex-grow">
          {/* Circle Icon Badge */}
          <div className={`w-9.5 h-9.5 rounded-full flex items-center justify-center flex-shrink-0 border ${iconBgClass}`}>
            <IconComponent className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>

          {/* Question Text */}
          <span className={`font-bold text-[13.5px] sm:text-[14.5px] transition-colors duration-200 font-display leading-tight ${
            isOpen ? accentColorClass : 'text-slate-700 ' + activeQuestionClass
          }`}>
            {question}
          </span>
        </div>

        {/* Chevron icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="ml-3 flex-shrink-0"
        >
          <ChevronDown className={`w-4.5 h-4.5 stroke-[2.5] ${isOpen ? accentColorClass : 'text-slate-400 group-hover:text-slate-600'}`} />
        </motion.div>
      </button>

      {/* Animated Answer Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0.5 border-t border-slate-50">
              <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-normal pl-13 pr-2">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

FAQItem.propTypes = {
  faq: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.elementType.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    themeColor: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default FAQItem;
