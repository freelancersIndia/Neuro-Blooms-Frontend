import React from 'react';
import PropTypes from 'prop-types';

export const SectionTitle = ({
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right',
  };

  return (
    <div className={`max-w-3xl mb-12 ${alignments[align]} ${className}`}>
      {subtitle && (
        <span className="text-secondary font-semibold tracking-wider text-xs uppercase mb-2 block font-display">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-display">
        {title}
      </h2>
      <div className={`h-1 w-12 bg-accent mt-4 ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
};

export default SectionTitle;
