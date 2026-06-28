import React from 'react';
import { Calendar, CalendarCheck, Clock, ShieldAlert } from 'lucide-react';

// Helpers
const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const parts = timeStr.split(' ');
  if (parts.length < 2) return 0;
  const time = parts[0];
  const modifier = parts[1];
  const timeParts = time.split(':');
  if (timeParts.length < 2) return 0;
  let hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
};

const calculateWeeklyHours = (schedules) => {
  let totalMinutes = 0;
  schedules.forEach(s => {
    if (s.is_open && s.opening_time && s.closing_time) {
      const op = parseTimeToMinutes(s.opening_time);
      const cl = parseTimeToMinutes(s.closing_time);
      if (cl > op) {
        totalMinutes += (cl - op);
      }
    }
  });
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
};

const getNextClosedDay = (schedules) => {
  const closedDays = schedules.filter(s => !s.is_open).map(s => s.weekday);
  if (closedDays.length === 0) return 'None';
  
  const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const ourTodayIndex = todayIndex === 0 ? 6 : todayIndex - 1;
  
  for (let i = 1; i <= 7; i++) {
    const checkIndex = (ourTodayIndex + i) % 7;
    const weekdayName = daysOfWeek[checkIndex];
    if (closedDays.includes(weekdayName)) {
      return weekdayName.charAt(0) + weekdayName.slice(1).toLowerCase();
    }
  }
  return 'None';
};

export const WeeklyStatistics = ({ schedules = [] }) => {
  const workingDays = schedules.filter(s => s.is_open).length;
  const closedDays = schedules.filter(s => !s.is_open).length;
  const weeklyHours = calculateWeeklyHours(schedules);
  const nextClosedDay = getNextClosedDay(schedules);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      {/* Card 1: Working Days */}
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[#EFFDF4] text-[#16A34A] flex items-center justify-center flex-shrink-0">
          <CalendarCheck size={22} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-2xl font-bold text-[#0F172A]">{workingDays}</span>
          <span className="text-xs font-semibold text-[#64748B] mt-0.5">Working Days</span>
        </div>
      </div>

      {/* Card 2: Closed Days */}
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[#FDF2F2] text-[#DC2626] flex items-center justify-center flex-shrink-0">
          <Calendar size={22} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-2xl font-bold text-[#0F172A]">{closedDays}</span>
          <span className="text-xs font-semibold text-[#64748B] mt-0.5">Closed Days</span>
        </div>
      </div>

      {/* Card 3: Weekly Working Hours */}
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#2563EB] flex items-center justify-center flex-shrink-0">
          <Clock size={22} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-2xl font-bold text-[#0F172A]">{weeklyHours}</span>
          <span className="text-xs font-semibold text-[#64748B] mt-0.5">Weekly Working Hours</span>
        </div>
      </div>

      {/* Card 4: Next Closed Day */}
      <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[#F3EEFF] text-[#7C3AED] flex items-center justify-center flex-shrink-0">
          <ShieldAlert size={22} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-2xl font-bold text-[#0F172A]">{nextClosedDay}</span>
          <span className="text-xs font-semibold text-[#64748B] mt-0.5">Next Closed Day</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStatistics;
