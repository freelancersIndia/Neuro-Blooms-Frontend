import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

// Custom lightweight CountUp component using requestAnimationFrame and IntersectionObserver
const CountUp = ({ end, duration = 1.8, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            
            // Easing function (outQuad) for natural slowing down
            const easedProgress = progress * (2 - progress);
            
            const currentValue = easedProgress * end;
            setCount(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration]);

  return <span ref={elementRef}>{count.toFixed(decimals)}</span>;
};

CountUp.propTypes = {
  end: PropTypes.number.isRequired,
  duration: PropTypes.number,
  decimals: PropTypes.number,
};

export const StatisticCard = ({ card }) => {
  const { icon: IconComponent, targetValue, suffix, title, description, decimals, themeColor } = card;

  // Set color-specific classes
  let iconBgClass = '';
  let lineBgClass = '';

  if (themeColor === 'green') {
    iconBgClass = 'bg-[#E8F5E9] text-[#2E7D32]';
    lineBgClass = 'bg-[#3B8A4C]';
  } else if (themeColor === 'orange') {
    iconBgClass = 'bg-[#FFF3E0] text-[#E65100]';
    lineBgClass = 'bg-[#F57C00]';
  } else if (themeColor === 'blue') {
    iconBgClass = 'bg-[#E3F2FD] text-[#1565C0]';
    lineBgClass = 'bg-[#1E88E5]';
  } else if (themeColor === 'purple') {
    iconBgClass = 'bg-[#F3E5F5] text-[#6A1B9A]';
    lineBgClass = 'bg-[#AB47BC]';
  } else if (themeColor === 'gold') {
    iconBgClass = 'bg-[#FFFDE7] text-[#F57F17]';
    lineBgClass = 'bg-[#FFCA28]';
  } else if (themeColor === 'teal') {
    iconBgClass = 'bg-[#E0F2F1] text-[#00695C]';
    lineBgClass = 'bg-[#009688]';
  }

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-[32px] p-7 shadow-[0_12px_35px_rgba(79,94,84,0.04)] border border-slate-100/50 hover:shadow-[0_20px_50px_rgba(79,94,84,0.1)] transition-shadow duration-300 flex flex-col justify-between items-center text-center h-full min-h-[220px] relative pb-8"
    >
      <div className="flex flex-col items-center">
        {/* Circle Icon Wrapper */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${iconBgClass}`}>
          <IconComponent className="w-5 h-5 stroke-[2.2]" />
        </div>

        {/* Counter Number */}
        <div className="text-[28px] sm:text-[30px] font-black font-display text-slate-800 tracking-tight leading-none">
          <CountUp end={targetValue} decimals={decimals} />
          <span>{suffix}</span>
        </div>

        {/* Title */}
        <h4 className="font-bold text-slate-800 text-[13px] sm:text-[14px] leading-snug font-display mt-2">
          {title}
        </h4>

        {/* Description */}
        <p className="text-slate-500 text-[11px] sm:text-xs leading-relaxed mt-2 max-w-[160px] font-normal">
          {description}
        </p>
      </div>

      {/* Accent Line centered at the bottom */}
      <div className={`w-10 h-[3px] rounded-full absolute bottom-4 left-1/2 -translate-x-1/2 ${lineBgClass}`} />
    </motion.div>
  );
};

StatisticCard.propTypes = {
  card: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    targetValue: PropTypes.number.isRequired,
    suffix: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    decimals: PropTypes.number.isRequired,
    themeColor: PropTypes.string.isRequired,
  }).isRequired,
};

export default StatisticCard;
