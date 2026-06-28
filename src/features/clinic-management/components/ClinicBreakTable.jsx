import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit2, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import WeekdayBadge from './WeekdayBadge';
import BreakDurationBadge from './BreakDurationBadge';

const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return '--';
  const date = new Date(dateTimeStr);
  if (isNaN(date)) return dateTimeStr;
  const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${day} ${month} ${year} ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};

const formatTime12h = (timeStr) => {
  if (!timeStr) return '--';
  const [hStr, mStr] = timeStr.split(':');
  let hours = parseInt(hStr, 10);
  const minutes = parseInt(mStr, 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const ClinicBreakRow = ({ item, onView, onEdit, onDelete, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (actionFn) => {
    actionFn(item);
    setIsMenuOpen(false);
  };

  return (
    <tr className="border-b border-[#F8FAFC] last:border-0 hover:bg-slate-50/40 transition-colors h-[52px] font-display text-left">
      {/* Break Name */}
      <td className="py-2.5 px-6">
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-[#111827]">
            {item.break_name || 'Clinic Break'}
          </span>
          <span className="text-[10px] font-medium text-[#9CA3AF] mt-0.5">
            Recurring Break
          </span>
        </div>
      </td>

      {/* Weekday */}
      <td className="py-2.5 px-6">
        <WeekdayBadge weekday={item.weekday} />
      </td>

      {/* Start Time */}
      <td className="py-2.5 px-6 text-xs font-semibold text-[#111827]">
        {formatTime12h(item.start_time)}
      </td>

      {/* End Time */}
      <td className="py-2.5 px-6 text-xs font-semibold text-[#111827]">
        {formatTime12h(item.end_time)}
      </td>

      {/* Duration */}
      <td className="py-2.5 px-6">
        <BreakDurationBadge startTime={item.start_time} endTime={item.end_time} />
      </td>

      {/* Created */}
      <td className="py-2.5 px-6 text-[11px] font-semibold text-[#4B5563]">
        {formatDateTime(item.created_at || item.updated_at)}
      </td>

      {/* Status */}
      <td className="py-2.5 px-6">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#16A34A] leading-none select-none">
          <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-[#16A34A]" />
          Active
        </span>
      </td>

      {/* Actions */}
      <td className="py-2.5 px-6 text-center relative">
        <div className="flex items-center justify-center" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-[#6D28D9] hover:bg-[#F3E8FF] transition-all duration-150 cursor-pointer"
          >
            <MoreVertical size={14} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-6 top-10 bg-white border border-[#E5E7EB] shadow-xl rounded-xl p-1 z-30 w-32 flex flex-col animate-fade-in text-left">
              <button
                type="button"
                onClick={() => handleAction(onView)}
                className="w-full h-9 px-3 rounded-lg text-left text-xs font-semibold text-[#4B5563] hover:bg-slate-50 hover:text-[#6D28D9] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Eye size={13} />
                View Details
              </button>
              
              {isAdmin && (
                <>
                  <button
                    type="button"
                    onClick={() => handleAction(onEdit)}
                    className="w-full h-9 px-3 rounded-lg text-left text-xs font-semibold text-[#4B5563] hover:bg-slate-50 hover:text-[#6D28D9] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Edit2 size={13} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction(onDelete)}
                    className="w-full h-9 px-3 rounded-lg text-left text-xs font-semibold text-[#DC2626] hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export const ClinicBreakTable = ({
  breaks = [],
  onView,
  onEdit,
  onDelete,
  isAdmin
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset page when breaks list length changes
  useEffect(() => {
    setCurrentPage(1);
  }, [breaks.length]);

  const totalRows = breaks.length;
  const totalPages = Math.ceil(totalRows / pageSize) || 1;
  
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBreaks = breaks.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Table Area (with horizontal scroll if needed) */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed">
          <thead className="sticky top-0 bg-white z-10 select-none">
            <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC]/50">
              <th className="py-3 px-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider w-[25%]">Break Name</th>
              <th className="py-3 px-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider w-[15%]">Weekday</th>
              <th className="py-3 px-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider w-[13%]">Start Time</th>
              <th className="py-3 px-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider w-[13%]">End Time</th>
              <th className="py-3 px-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider w-[12%]">Duration</th>
              <th className="py-3 px-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider w-[15%]">Created</th>
              <th className="py-3 px-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider w-[10%]">Status</th>
              <th className="py-3 px-6 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider w-[10%] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBreaks.map((item) => (
              <ClinicBreakRow
                key={item.id}
                item={item}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                isAdmin={isAdmin}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="h-14 px-6 border-t border-[#E5E7EB] bg-white flex items-center justify-between select-none flex-shrink-0">
        {/* Left Side: Page Size Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#4B5563]">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="h-8 px-2 bg-white border border-[#CBD5E1] rounded-lg text-xs font-bold text-[#4B5563] hover:border-slate-400 outline-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-xs font-semibold text-[#9CA3AF] ml-2">
            Showing {totalRows === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + pageSize, totalRows)} of {totalRows}
          </span>
        </div>

        {/* Right Side: Page Controls */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-[#4B5563]">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-slate-400 hover:text-[#6D28D9] hover:bg-[#F3E8FF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-slate-400 hover:text-[#6D28D9] hover:bg-[#F3E8FF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicBreakTable;
