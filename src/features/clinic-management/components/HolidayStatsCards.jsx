import React from 'react';
import { Calendar, CalendarDays, CalendarHeart, Clock } from 'lucide-react';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, monthStr, dayStr] = dateStr.split('-');
  const day = parseInt(dayStr, 10);
  const monthIndex = parseInt(monthStr, 10) - 1;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[monthIndex];
  return `${day} ${month} ${year}`;
};

export const HolidayStatsCards = ({ holidays = [] }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear().toString();

  // 1. Total Holidays
  const totalHolidays = holidays.length;

  // 2. Upcoming Holidays (date >= today and within next 60 days)
  const sixtyDaysLater = new Date();
  sixtyDaysLater.setDate(sixtyDaysLater.getDate() + 60);
  const sixtyDaysLaterStr = sixtyDaysLater.toISOString().split('T')[0];

  const upcomingHolidays = holidays.filter(h => {
    return h.holiday_date >= todayStr && h.holiday_date <= sixtyDaysLaterStr;
  }).length;

  // 3. This Year
  const thisYearCount = holidays.filter(h => {
    return h.holiday_date.startsWith(currentYear);
  }).length;

  // 4. Next Holiday
  const nextHolidayObj = holidays.find(h => h.holiday_date >= todayStr);
  const nextHolidayDate = nextHolidayObj ? formatDate(nextHolidayObj.holiday_date) : '--';
  const nextHolidayName = nextHolidayObj ? nextHolidayObj.holiday_name : 'No upcoming holidays';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none flex-shrink-0">
      {/* Card 1: Total Holidays */}
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 flex items-center gap-4 shadow-sm h-[110px]">
        <div className="w-12 h-12 rounded-2xl bg-[#EFFDF4] text-[#16A34A] flex items-center justify-center flex-shrink-0">
          <CalendarHeart size={22} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-2xl font-bold text-[#0F172A]">{totalHolidays}</span>
          <span className="text-xs font-semibold text-[#64748B] mt-0.5">Total Holidays</span>
        </div>
      </div>

      {/* Card 2: Upcoming Holidays */}
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 flex items-center gap-4 shadow-sm h-[110px]">
        <div className="w-12 h-12 rounded-2xl bg-[#FFF9E6] text-[#D97706] flex items-center justify-center flex-shrink-0">
          <CalendarDays size={22} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-2xl font-bold text-[#0F172A]">{upcomingHolidays}</span>
          <span className="text-xs font-semibold text-[#64748B] mt-0.5">Upcoming Holidays (60 Days)</span>
        </div>
      </div>

      {/* Card 3: This Year */}
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 flex items-center gap-4 shadow-sm h-[110px]">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#2563EB] flex items-center justify-center flex-shrink-0">
          <Calendar size={22} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-2xl font-bold text-[#0F172A]">{thisYearCount}</span>
          <span className="text-xs font-semibold text-[#64748B] mt-0.5">This Year ({currentYear})</span>
        </div>
      </div>

      {/* Card 4: Next Holiday */}
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 flex items-center gap-4 shadow-sm h-[110px] overflow-hidden">
        <div className="w-12 h-12 rounded-2xl bg-[#F3EEFF] text-[#7C3AED] flex items-center justify-center flex-shrink-0">
          <Clock size={22} />
        </div>
        <div className="flex flex-col text-left min-w-0">
          <span className="text-lg font-bold text-[#0F172A] truncate">{nextHolidayDate}</span>
          <span className="text-xs font-semibold text-[#64748B] mt-0.5 truncate">{nextHolidayName}</span>
        </div>
      </div>
    </div>
  );
};

export default HolidayStatsCards;
