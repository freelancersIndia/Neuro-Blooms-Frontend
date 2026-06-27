import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import AuthorInfo from './AuthorInfo';

// Custom SVG Quote Icon
const QuoteIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

QuoteIcon.propTypes = {
  className: PropTypes.string,
};

// Leaf Illustration for Card 1 (Green)
const GreenLeaf = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#3B8A4C]/25 absolute bottom-4 right-4 pointer-events-none select-none z-10">
    <path d="M8 40C14 36 28 20 40 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 30C12 28 10 24 10 24C10 24 14 24 20 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 22C20 18 20 12 20 12C20 12 24 14 28 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 16C28 10 30 6 30 6C30 6 32 8 34 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 34C26 38 30 40 30 40C30 40 28 36 24 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 26C36 28 40 26 40 26C40 26 36 24 32 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Heart Illustration for Card 2 (Blue)
const BlueHeart = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#1E88E5]/25 absolute bottom-4 right-4 pointer-events-none select-none z-10">
    <path d="M50,75 C20,55 25,25 45,35 C50,38 50,38 55,35 C75,25 80,55 50,75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M40,52 Q50,58 60,52" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// Lavender Sprout Illustration for Card 3 (Purple)
const PurpleFlower = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#AB47BC]/25 absolute bottom-4 right-4 pointer-events-none select-none z-10">
    <path d="M24 40V12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 28C28 26 32 28 32 28C32 28 28 30 24 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 32C20 30 16 28 16 28C16 28 20 26 24 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 18C28 16 32 18 32 18C32 18 28 20 24 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 22C20 20 16 18 16 18C16 18 20 16 24 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 12C26 8 28 10 28 10C28 10 26 12 24 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 14C22 12 20 10 20 10C20 10 22 8 24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TestimonialCard = ({ testimonial }) => {
  const { id, text, authorName, authorRole, avatarUrl, themeColor } = testimonial;

  // Set color-specific parameters
  let wavePathColor = '';
  let Illustration = null;
  let quoteColor = 'text-emerald-500/20';

  if (themeColor === 'green') {
    wavePathColor = '#E8F5E9';
    Illustration = GreenLeaf;
    quoteColor = 'text-[#3B8A4C]';
  } else if (themeColor === 'blue') {
    wavePathColor = '#E3F2FD';
    Illustration = BlueHeart;
    quoteColor = 'text-[#1E88E5]';
  } else if (themeColor === 'purple') {
    wavePathColor = '#F3E5F5';
    Illustration = PurpleFlower;
    quoteColor = 'text-[#AB47BC]';
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-[32px] p-8 shadow-[0_15px_40px_rgba(79,94,84,0.05)] border border-slate-100/50 hover:shadow-[0_20px_50px_rgba(79,94,84,0.12)] transition-shadow duration-300 flex flex-col h-full relative overflow-hidden group select-none min-h-[340px] md:min-h-[360px]"
    >
      
      {/* Wave Background Overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none select-none z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <svg viewBox="0 0 100 25" preserveAspectRatio="none" className="w-full h-full">
          <path 
            d="M0,15 C25,5 40,25 70,10 C85,2 95,12 100,5 L100,25 L0,25 Z" 
            fill={wavePathColor} 
          />
        </svg>
      </div>

      {/* Decorative leaf/heart/sprout at the bottom right */}
      {Illustration && <Illustration />}

      {/* Top Header of the Card */}
      <div className="flex justify-between items-start z-10">
        <QuoteIcon className={`${quoteColor} w-10 h-10 opacity-75`} />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>

      {/* Card Testimonial Text */}
      <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed mt-5 mb-6 font-normal z-10 flex-grow">
        "{text}"
      </p>

      {/* Separator Divider */}
      <div className="border-t border-slate-100 pt-5 mt-auto z-10">
        <AuthorInfo name={authorName} role={authorRole} avatar={avatarUrl} />
      </div>

    </motion.div>
  );
};

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorRole: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    themeColor: PropTypes.oneOf(['green', 'blue', 'purple']).isRequired,
  }).isRequired,
};

export default TestimonialCard;
