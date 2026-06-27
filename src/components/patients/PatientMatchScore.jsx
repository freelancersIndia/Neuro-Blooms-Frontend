import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const PatientMatchScore = ({ score, size = 68, strokeWidth = 5 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start animation on mount
    const timer = setTimeout(() => setProgress(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  // Determine colors based on confidence level
  let strokeColor = 'stroke-orange-500';
  let textColor = 'text-orange-600 font-black';

  if (score >= 90) {
    strokeColor = 'stroke-emerald-500';
    textColor = 'text-emerald-600 font-black';
  } else if (score >= 70) {
    strokeColor = 'stroke-amber-500';
    textColor = 'text-amber-600 font-black';
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background Circle */}
        <circle
          className="stroke-slate-100"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Animated Progress Circle */}
        <motion.circle
          className={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Centered Percentage Text */}
      <span className={`absolute text-xs leading-none select-none tracking-tighter font-display ${textColor}`}>
        {score}%
      </span>
    </div>
  );
};

export default PatientMatchScore;
