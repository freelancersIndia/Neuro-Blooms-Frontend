import React from 'react';
import { motion } from 'framer-motion';
import ParentInfo from './ParentInfo';
import ImprovementStrip from './ImprovementStrip';

export const SuccessStoryCard = ({ 
  journeyBadge, 
  badgeBgClass, 
  badgeTextClass,
  title, 
  highlight, 
  highlightColorClass, 
  storyText, 
  childImage, 
  parentName, 
  parentRole, 
  parentAvatar, 
  rating = 5,
  improvementIcon,
  improvementText,
  improvementBgClass,
  improvementIconBgClass,
  improvementIconTextClass,
  improvementLabelClass
}) => {
  
  // Highlight text helper
  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className={`${highlightColorClass} font-extrabold`}>{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      className="bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-slate-100/50 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer w-full group"
      whileHover={{ y: -10 }}
    >
      <div className="flex gap-4">
        {/* Child Image */}
        <div className="w-24 xs:w-28 sm:w-32 h-[130px] sm:h-[145px] rounded-2xl overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-100">
          <img 
            src={childImage} 
            alt="Child success story" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Content Details */}
        <div className="flex-1 flex flex-col justify-between text-left">
          <div>
            {/* Journey Badge */}
            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide ${badgeBgClass} ${badgeTextClass}`}>
              {journeyBadge}
            </span>

            {/* Title */}
            <h4 className="text-xs sm:text-[13px] md:text-sm font-extrabold text-slate-800 tracking-tight leading-tight mt-1.5">
              {renderTitle()}
            </h4>

            {/* Story Text */}
            <p className="text-[11px] text-slate-500 leading-relaxed mt-2 font-normal line-clamp-3 sm:line-clamp-4">
              "{storyText}"
            </p>
          </div>

          {/* Parent Info & Star Rating */}
          <ParentInfo 
            avatar={parentAvatar}
            name={parentName}
            role={parentRole}
            rating={rating}
          />
        </div>
      </div>

      {/* Area of Improvement strip */}
      <ImprovementStrip 
        icon={improvementIcon}
        text={improvementText}
        bgClass={improvementBgClass}
        iconBgClass={improvementIconBgClass}
        iconTextClass={improvementIconTextClass}
        labelClass={improvementLabelClass}
      />
    </motion.div>
  );
};

export default SuccessStoryCard;
