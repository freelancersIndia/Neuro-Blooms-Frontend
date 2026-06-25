import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const UsersPagination = ({
  totalUsers = 127,
  currentPage = 1,
  pageSize = 12,
  onPageChange = (page) => console.log(`Pagination page ${page} clicked`),
  onPageSizeChange = (size) => console.log(`Page size changed to ${size}`)
}) => {
  const totalPages = Math.ceil(totalUsers / pageSize) || 1;

  const getPageNumbers = () => {
    const pagesList = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pagesList.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pagesList.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pagesList.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pagesList.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pagesList;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 px-1">
      {/* Bottom Left: Showing X to Y of Z */}
      <div className="text-xs font-bold text-slate-400 text-left">
        Showing <span className="text-slate-600">{totalUsers === 0 ? 0 : ((currentPage - 1) * pageSize) + 1}</span> to <span className="text-slate-600">{Math.min(currentPage * pageSize, totalUsers)}</span> of <span className="text-slate-600">{totalUsers}</span> users
      </div>

      {/* Bottom Center: Pagination Controls */}
      <div className="flex items-center justify-center gap-1.5 self-center">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
          className="w-9 h-9 border border-slate-200 hover:border-slate-350 bg-white rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {/* Page Numbers */}
        {pages.map((page, idx) => {
          if (page === '...') {
            return (
              <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-xs font-bold text-slate-400">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <motion.button
              key={`page-${page}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 text-xs font-black rounded-xl transition-all cursor-pointer border ${
                isActive
                  ? 'bg-admin-blue-600 border-admin-blue-600 text-white shadow-md shadow-admin-blue-600/10'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800'
              }`}
            >
              {page}
            </motion.button>
          );
        })}

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          className="w-9 h-9 border border-slate-200 hover:border-slate-350 bg-white rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Bottom Right: Page Size Dropdown */}
      <div className="flex items-center gap-2 justify-end self-end md:self-auto">
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-white border border-slate-200 rounded-[14px] px-3.5 py-2 text-xs font-bold text-slate-600 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:14px_14px] bg-[right_8px_center] bg-no-repeat pr-8 cursor-pointer focus:outline-none focus:border-admin-blue-500 focus:ring-2 focus:ring-admin-blue-500/10 transition-all"
          >
            <option value={12}>12 per page</option>
            <option value={24}>24 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UsersPagination;
