import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

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

  const getPageNumbers = () => {
    const pages = [];
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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4.5 px-6 bg-white border border-slate-100 rounded-b-[20px] select-none text-slate-500 font-semibold text-xs leading-none">
      
      {/* Left Side: Counter Info */}
      <div className="text-slate-400 font-bold">
        Showing <span className="font-extrabold text-slate-700">{startItem}</span> to{' '}
        <span className="font-extrabold text-slate-700">{endItem}</span> of{' '}
        <span className="font-extrabold text-slate-700">{totalCount}</span> patients
      </div>

      {/* Center: Pagination Controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center text-slate-450 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-450 cursor-pointer transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className="px-1 text-slate-350 font-black select-none">
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
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'border border-slate-100 text-slate-500 hover:text-slate-850 hover:bg-slate-50'
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center text-slate-450 hover:text-slate-800 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-450 cursor-pointer transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right Side: Rows Per Page Selector */}
      <div className="flex items-center gap-2 relative">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="appearance-none bg-white border border-slate-100 rounded-xl pl-4 pr-9 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#7C3AED]/40 hover:bg-slate-50 cursor-pointer transition-all shadow-sm"
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 pointer-events-none" />
      </div>
    </div>
  );
};

export default Pagination;
