import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange
}) => {
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  // Generate page numbers to display (e.g., 1, 2, 3, 4, ..., 15)
  const getPageNumbers = () => {
    const pages = [];
    
    // Always include page 1
    pages.push(1);

    if (totalPages <= 5) {
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-5 bg-white border border-slate-100 rounded-b-[20px] select-none text-slate-500 font-semibold text-xs leading-none">
      
      {/* 1. Counter info & Page size selector */}
      <div className="flex flex-wrap items-center gap-4 text-left">
        <span>
          Showing <span className="font-extrabold text-slate-800">{startItem}</span>–
          <span className="font-extrabold text-slate-800">{endItem}</span> of{' '}
          <span className="font-extrabold text-slate-800">{totalCount}</span> Requests
        </span>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <label htmlFor="pagination-size" className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
            Rows:
          </label>
          <select
            id="pagination-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-700 focus:outline-none focus:border-[#7C3AED]/40 cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* 2. Page Navigation Buttons */}
      <div className="flex items-center gap-1.5">
        {/* Previous Page */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-xl border border-slate-150 flex items-center justify-center text-slate-450 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-450 cursor-pointer transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dynamic page list */}
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className="px-1 text-slate-400 font-bold select-none">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-black transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#7C3AED] text-white shadow-sm shadow-[#7C3AED]/15'
                  : 'border border-slate-150 text-slate-550 hover:text-slate-800 hover:bg-slate-50'
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-xl border border-slate-150 flex items-center justify-center text-slate-450 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-450 cursor-pointer transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default Pagination;
