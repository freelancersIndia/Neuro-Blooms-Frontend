import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CarouselArrowButton = ({ direction, onClick, disabled }) => {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.1, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-shadow duration-300 cursor-pointer ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'opacity-100'
      }`}
      aria-label={isLeft ? 'Previous slide' : 'Next slide'}
    >
      <Icon className="h-6 w-6 text-[#3B8A4C] stroke-[2.5]" />
    </motion.button>
  );
};

CarouselArrowButton.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export const CarouselIndicatorDots = ({ total, activeIndex, onChange }) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            onClick={() => onChange && onChange(index)}
            className="focus:outline-none p-1 group cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            <motion.div
              animate={{
                width: isActive ? 20 : 8,
                backgroundColor: isActive ? '#3B8A4C' : '#E2E8F0',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="h-2 rounded-full"
            />
          </button>
        );
      })}
    </div>
  );
};

CarouselIndicatorDots.propTypes = {
  total: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default { CarouselArrowButton, CarouselIndicatorDots };
