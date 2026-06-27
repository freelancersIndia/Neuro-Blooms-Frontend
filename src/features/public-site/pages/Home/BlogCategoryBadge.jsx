import React from 'react';
import PropTypes from 'prop-types';

export const BlogCategoryBadge = ({ category }) => {
  let colorClass = '';

  if (category === 'Parenting Tips') {
    colorClass = 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]/20';
  } else if (category === 'Child Development') {
    colorClass = 'bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]/20';
  } else if (category === 'Family Wellbeing') {
    colorClass = 'bg-[#E3F2FD] text-[#1565C0] border-[#90CAF9]/20';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide border ${colorClass}`}>
      {category}
    </span>
  );
};

BlogCategoryBadge.propTypes = {
  category: PropTypes.oneOf(['Parenting Tips', 'Child Development', 'Family Wellbeing']).isRequired,
};

export default BlogCategoryBadge;
