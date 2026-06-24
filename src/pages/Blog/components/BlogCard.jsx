import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export const BlogCard = ({ blog }) => {
  const { slug, title, category, excerpt, date, readTime, imageUrl } = blog;

  // Resolve category badge styling dynamically
  const getCategoryStyles = (cat) => {
    switch (cat) {
      case 'Autism':
        return 'bg-purple-50 text-purple-700 border-purple-100/50';
      case 'ADHD':
        return 'bg-blue-50 text-blue-700 border-blue-100/50';
      case 'Parenting':
        return 'bg-rose-50 text-rose-700 border-rose-100/50';
      case 'Early Intervention':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100/50';
      case 'Development':
        return 'bg-amber-50 text-amber-700 border-amber-100/50';
      case 'Speech':
        return 'bg-pink-50 text-pink-700 border-pink-100/50';
      case 'Learning':
        return 'bg-cyan-50 text-cyan-700 border-cyan-100/50';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-150';
    }
  };

  return (
    <article className="bg-white rounded-[32px] border border-slate-100/50 shadow-[0_12px_35px_rgba(79,94,84,0.03)] hover:shadow-[0_22px_55px_rgba(79,94,84,0.08)] transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-2 h-full min-h-[440px]">
      
      {/* Blog Image wrapper */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 w-full rounded-t-[32px]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Floating Category Badge */}
        <span className={`absolute top-4 left-4 z-10 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm ${getCategoryStyles(category)}`}>
          {category}
        </span>
      </div>

      {/* Content details */}
      <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          {/* Date & Reading time */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-300" /> {date}
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-300" /> {readTime}
            </span>
          </div>

          {/* Heading */}
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 font-display tracking-tight line-clamp-2 leading-snug group-hover:text-[#0E7A4B] transition-colors duration-200">
            <Link to={`/blogs/${slug}`}>
              {title}
            </Link>
          </h3>
          
          {/* Excerpt */}
          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-normal">
            {excerpt}
          </p>
        </div>

        {/* Read More link */}
        <div className="pt-4 border-t border-slate-50 flex items-center">
          <Link
            to={`/blogs/${slug}`}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0E7A4B] hover:text-[#0c663e] transition-colors duration-200 cursor-pointer"
          >
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 stroke-[2.5]" />
          </Link>
        </div>

      </div>

    </article>
  );
};

export default BlogCard;
