import React from 'react';
import PropTypes from 'prop-types';

export const ValuePointCard = ({ icon: IconComponent, title, description, colorClass }) => {
  return (
    <div className="flex gap-3.5 items-start">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border ${colorClass}`}>
        <IconComponent className="w-5 h-5 stroke-[2.2]" />
      </div>
      <div className="flex flex-col min-w-0">
        <h4 className="font-bold text-slate-800 text-sm md:text-base leading-snug font-display">
          {title}
        </h4>
        <p className="text-slate-500 text-[11px] md:text-xs mt-1 leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

ValuePointCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  colorClass: PropTypes.string.isRequired,
};

export default ValuePointCard;
