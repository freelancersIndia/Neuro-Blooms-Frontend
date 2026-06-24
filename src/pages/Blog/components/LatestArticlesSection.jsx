import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../../../components/common/Container';
import BlogCard from './BlogCard';

export const LatestArticlesSection = ({ blogs, currentPage, setCurrentPage, onResetFilters }) => {
  const PAGE_SIZE = 9;
  const totalPages = Math.ceil(blogs.length / PAGE_SIZE);
  
  // Slice articles for current page
  const paginatedBlogs = blogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll back to articles section top anchor
      const element = document.getElementById('articles-listing-anchor');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Framer Motion container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-16 bg-[#FFFDF7] w-full overflow-hidden select-none">
      <Container>
        
        {/* Header Row */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display tracking-tight text-left">
            Latest Articles
          </h2>
        </div>

        {/* Grid or Empty state */}
        {paginatedBlogs.length > 0 ? (
          <>
            <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {paginatedBlogs.map((blog) => (
                <motion.div key={blog.id} variants={itemVariants}>
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 pt-4 border-t border-slate-100">
                {/* Prev Button */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, idx) => {
                  const pageNumber = idx + 1;
                  const isActive = currentPage === pageNumber;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 rounded-full text-sm font-bold border transition-all cursor-pointer active:scale-95 ${
                        isActive
                          ? 'bg-[#0E7A4B] text-white border-[#0E7A4B] shadow-sm shadow-[#0E7A4B]/10'
                          : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8">
            <p className="text-slate-500 font-medium mb-4">No articles found matching your criteria.</p>
            <button
              onClick={onResetFilters}
              className="bg-[#0E7A4B] text-white font-extrabold text-sm px-6 py-2.5 rounded-full hover:bg-[#0c663e] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </Container>
    </section>
  );
};

export default LatestArticlesSection;
