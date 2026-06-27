import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import BlogCategoryBadge from './BlogCategoryBadge';

export const BlogPreviewCard = ({ blog }) => {
  const { id, title, excerpt, date, category, imageUrl, icon: IconComponent, themeColor } = blog;

  // Define accent colors
  let iconBgClass = '';
  let readMoreColorClass = '';

  if (themeColor === 'green') {
    iconBgClass = 'bg-white/90 text-[#2E7D32] border-emerald-100';
    readMoreColorClass = 'text-[#2E7D32] hover:text-[#1B5E20]';
  } else if (themeColor === 'orange') {
    iconBgClass = 'bg-white/90 text-[#E65100] border-orange-100';
    readMoreColorClass = 'text-[#E65100] hover:text-[#B75300]';
  } else if (themeColor === 'blue') {
    iconBgClass = 'bg-white/90 text-[#1565C0] border-blue-100';
    readMoreColorClass = 'text-[#1565C0] hover:text-[#0D47A1]';
  }

  return (
    <div className="bg-white rounded-[32px] p-4 shadow-[0_12px_35px_rgba(79,94,84,0.03)] border border-slate-100/50 hover:shadow-[0_20px_50px_rgba(79,94,84,0.08)] transition-all duration-300 flex flex-col h-full group min-h-[380px] md:min-h-[400px]">
      
      {/* Blog Featured Image */}
      <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-slate-50">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Floating Category Icon (Top Left) */}
        <div className={`absolute top-3.5 left-3.5 w-9.5 h-9.5 rounded-xl flex items-center justify-center border shadow-sm backdrop-blur-sm ${iconBgClass}`}>
          <IconComponent className="w-4.5 h-4.5 stroke-[2.2]" />
        </div>
      </div>

      {/* Meta Row (Category & Date) */}
      <div className="flex justify-between items-center mt-4 px-1.5">
        <BlogCategoryBadge category={category} />
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>{date}</span>
        </div>
      </div>

      {/* Text Details */}
      <div className="mt-3.5 px-1.5 flex-grow flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-snug font-display line-clamp-2 group-hover:text-[#3B8A4C] transition-colors duration-200">
            {title}
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed font-normal line-clamp-2">
            {excerpt}
          </p>
        </div>

        {/* Read More Footer */}
        <div className="mt-5 pt-3 border-t border-slate-50">
          <Link
            to="/blogs"
            className={`inline-flex items-center gap-1 text-xs md:text-sm font-bold transition-colors duration-200 cursor-pointer ${readMoreColorClass}`}
          >
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>

    </div>
  );
};

BlogPreviewCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    themeColor: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogPreviewCard;
