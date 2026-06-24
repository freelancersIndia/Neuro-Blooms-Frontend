import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Clock, ArrowRight } from 'lucide-react';
import Container from '../../../components/common/Container';

export const PopularBlogsSection = ({ popularBlogs, onResetFilters }) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll 80% of width
      const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

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
    <section className="py-16 bg-[#F5FBFF] w-full overflow-hidden relative select-none">
      
      {/* Absolute floating decorations */}
      <div className="absolute top-[10%] left-[3%] w-4 h-4 rounded-full bg-blue-400/25 pointer-events-none hidden lg:block" />
      <div className="absolute bottom-[10%] right-[3%] w-6 h-6 rounded-full border-4 border-amber-400/25 pointer-events-none hidden lg:block" />

      <Container className="relative">
        
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display tracking-tight text-left">
            Most Read Articles
          </h2>
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="relative w-full">
          
          {/* Left Arrow Button (Floating on the left edge) */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-lg text-[#0E7A4B] hover:bg-slate-50 transition-all cursor-pointer active:scale-90 select-none pointer-events-auto hidden md:flex"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button (Floating on the right edge) */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-lg text-[#0E7A4B] hover:bg-slate-50 transition-all cursor-pointer active:scale-90 select-none pointer-events-auto hidden md:flex"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Scrollable Row */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 px-1"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {popularBlogs.map((blog) => (
              <div
                key={blog.id}
                className="flex-shrink-0 w-[290px] sm:w-[330px] md:w-[350px] bg-white rounded-3xl border border-slate-100/60 shadow-[0_8px_30px_rgba(79,94,84,0.02)] hover:shadow-[0_18px_45px_rgba(79,94,84,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group h-full min-h-[380px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Blog Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 rounded-t-3xl w-full">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    loading="lazy"
                  />
                  <span className={`absolute top-4 left-4 z-10 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm ${getCategoryStyles(blog.category)}`}>
                    {blog.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-4 text-left">
                  
                  <div className="space-y-2.5">
                    {/* Views & Reading time */}
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-300" /> {blog.views} views
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-300" /> {blog.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-800 font-display tracking-tight line-clamp-2 leading-snug group-hover:text-[#0E7A4B] transition-colors duration-200">
                      <Link to={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>
                  </div>

                  {/* Read Link */}
                  <div className="pt-3 border-t border-slate-50">
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0E7A4B] hover:text-[#0c663e] transition-colors duration-200 cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 stroke-[2.5]" />
                    </Link>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
};

export default PopularBlogsSection;
