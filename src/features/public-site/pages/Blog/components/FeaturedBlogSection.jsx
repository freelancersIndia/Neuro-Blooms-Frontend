import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import Container from '../../../../../components/common/Container';

export const FeaturedBlogSection = ({ featuredBlog }) => {
  if (!featuredBlog) return null;

  return (
    <section className="py-12 bg-white w-full overflow-hidden select-none">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[#FAF9FF] to-[#F4F1FE] rounded-[40px] shadow-[0_15px_45px_rgba(123,97,255,0.05)] border border-purple-100/40 overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12"
        >
          
          {/* Subtle decoration ring */}
          <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-purple-200/10 pointer-events-none" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Featured Image */}
            <div className="lg:col-span-5 h-[260px] sm:h-[320px] lg:h-[380px] rounded-3xl overflow-hidden shadow-md group relative">
              <img
                src={featuredBlog.imageUrl}
                alt={featuredBlog.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Right Side - Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200/30">
                  Featured Article
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
                  {featuredBlog.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 font-display tracking-tight leading-snug hover:text-[#0E7A4B] transition-colors duration-200">
                <Link to={`/blogs/${featuredBlog.slug}`}>
                  {featuredBlog.title}
                </Link>
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                {featuredBlog.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 font-mono">
                  <Clock className="w-4 h-4 text-purple-500" /> {featuredBlog.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-500" /> {featuredBlog.date}
                </span>
              </div>

              {/* Button */}
              <div className="pt-2">
                <Link
                  to={`/blogs/${featuredBlog.slug}`}
                  className="bg-[#0E7A4B] hover:bg-[#0c663e] text-white font-extrabold text-sm sm:text-base px-6 py-3 rounded-full inline-flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
                </Link>
              </div>

            </div>

          </div>

        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturedBlogSection;
