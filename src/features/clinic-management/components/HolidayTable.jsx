import React from 'react';
import { Edit2, Trash2, MoreVertical, GripVertical } from 'lucide-react';
import HolidayStatusBadge from './HolidayStatusBadge';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, monthStr, dayStr] = dateStr.split('-');
  const day = parseInt(dayStr, 10);
  const monthIndex = parseInt(monthStr, 10) - 1;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[monthIndex];
  return `${day} ${month} ${year}`;
};

const getWeekdayName = (dateStr) => {
  if (!dateStr) return '';
  const [year, monthStr, dayStr] = dateStr.split('-');
  const date = new Date(parseInt(year, 10), parseInt(monthStr, 10) - 1, parseInt(dayStr, 10));
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return weekdays[date.getDay()];
};

const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return '';
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

export const HolidayTableRow = ({ holiday, onEdit, onDelete, isAdmin }) => {
  return (
    <tr className="border-b border-[#F8FAFC] last:border-0 hover:bg-slate-50/40 transition-colors h-[52px]">
      {/* Holiday Name */}
      <td className="py-2.5 px-6 text-xs font-bold text-[#0F172A] max-w-[200px] truncate">
        {holiday.holiday_name}
      </td>

      {/* Holiday Date */}
      <td className="py-2.5 px-6">
        <div className="flex flex-col text-left">
          <span className="text-xs font-semibold text-[#0F172A]">
            {formatDate(holiday.holiday_date)}
          </span>
          <span className="text-[10px] font-semibold text-[#94A3B8] mt-0.5">
            {getWeekdayName(holiday.holiday_date)}
          </span>
        </div>
      </td>

      {/* Description */}
      <td className="py-2.5 px-6 text-[11px] font-medium text-[#64748B] max-w-[320px]">
        <p className="line-clamp-2" title={holiday.description}>
          {holiday.description || '--'}
        </p>
      </td>

      {/* Created At */}
      <td className="py-2.5 px-6 text-[11px] font-semibold text-[#64748B]">
        {formatDateTime(holiday.created_at)}
      </td>

      {/* Status */}
      <td className="py-2.5 px-6 text-center">
        <HolidayStatusBadge dateStr={holiday.holiday_date} />
      </td>

      {/* Actions */}
      <td className="py-2.5 px-6">
        <div className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(holiday)}
            disabled={!isAdmin}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-[#7C3AED] hover:bg-[#F3EEFF] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
            title={isAdmin ? "Edit Holiday" : "Only admins can edit"}
          >
            <Edit2 size={13} />
          </button>
          
          <button
            type="button"
            onClick={() => onDelete(holiday)}
            disabled={!isAdmin}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
            title={isAdmin ? "Delete Holiday" : "Only admins can delete"}
          >
            <Trash2 size={13} />
          </button>

          <button
            type="button"
            disabled
            className="w-8 h-8 flex items-center justify-center text-slate-300 cursor-not-allowed"
            title="More Options (Reserved)"
          >
            <MoreVertical size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export const HolidayTable = ({ holidays = [], onEdit, onDelete, isAdmin }) => {
  return (
    <div className="w-full flex-1 min-h-0 overflow-y-auto">
      <table className="w-full text-left border-collapse table-fixed">
        <thead className="sticky top-0 bg-white z-10 select-none">
          <tr className="border-b border-[#EEF2F7] bg-[#F8FAFC]/50">
            <th className="py-3 px-6 text-[10px] font-bold text-[#64748B] uppercase tracking-wider w-[25%]">Holiday Name</th>
            <th className="py-3 px-6 text-[10px] font-bold text-[#64748B] uppercase tracking-wider w-[20%]">Holiday Date</th>
            <th className="py-3 px-6 text-[10px] font-bold text-[#64748B] uppercase tracking-wider w-[25%]">Description</th>
            <th className="py-3 px-6 text-[10px] font-bold text-[#64748B] uppercase tracking-wider w-[18%]">Created</th>
            <th className="py-3 px-6 text-[10px] font-bold text-[#64748B] uppercase tracking-wider w-[12%] text-center">Status</th>
            <th className="py-3 px-6 text-[10px] font-bold text-[#64748B] uppercase tracking-wider w-[12%] text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday) => (
            <HolidayTableRow
              key={holiday.id}
              holiday={holiday}
              onEdit={onEdit}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HolidayTable;
