import React from 'react';
import { Coffee, CalendarDays, Calendar, Clock, Bell } from 'lucide-react';
import { calculateDurationInMinutes } from './BreakDurationBadge';

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

const getNextBreak = (breaks) => {
  const weekdaysOrder = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const now = new Date();
  const todayIdx = now.getDay(); // 0 = Sunday, 1 = Monday...
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let closestBreak = null;
  let minDiff = Infinity;

  breaks.forEach(b => {
    if (!b.is_active) return;
    const breakDayIdx = weekdaysOrder.indexOf(b.weekday.toUpperCase());
    if (breakDayIdx === -1) return;

    let daysDiff = breakDayIdx - todayIdx;
    if (daysDiff < 0) {
      daysDiff += 7;
    }

    const [startH, startM] = b.start_time.split(':').map(Number);
    const startMinutes = startH * 60 + (startM || 0);

    let timeDiff = daysDiff * 24 * 60 + startMinutes - currentMinutes;
    if (daysDiff === 0 && timeDiff < 0) {
      timeDiff += 7 * 24 * 60; // next week
    }

    if (timeDiff < minDiff) {
      minDiff = timeDiff;
      closestBreak = b;
    }
  });

  return closestBreak;
};

export const ClinicBreakStats = ({ breaks = [] }) => {
  const activeBreaks = breaks.filter(b => b.is_active);

  // 1. Total Breaks
  const totalBreaks = activeBreaks.length;

  // 2. Today's Breaks
  const weekdaysOrder = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const todayWeekday = weekdaysOrder[new Date().getDay()];
  const todaysBreaks = activeBreaks.filter(b => b.weekday.toUpperCase() === todayWeekday).length;

  // 3. This Week (total recurring breaks sessions)
  const thisWeekCount = totalBreaks;

  // 4. Total Weekly Break Duration
  const totalMinutes = activeBreaks.reduce((acc, b) => {
    return acc + calculateDurationInMinutes(b.start_time, b.end_time);
  }, 0);
  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const totalDurationStr = `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`;

  // 5. Next Break
  const nextBreak = getNextBreak(activeBreaks);
  const nextBreakTime = nextBreak ? formatTime12h(nextBreak.start_time) : '--';
  const nextBreakName = nextBreak ? nextBreak.break_name || 'Break' : 'No upcoming breaks';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 select-none flex-shrink-0">
      {/* Card 1: Total Breaks */}
      <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 flex items-center gap-4 shadow-sm h-[110px]">
        <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#6D28D9] flex items-center justify-center flex-shrink-0">
          <Coffee size={22} />
        </div>
        <div className="flex flex-col text-left min-w-0">
          <span className="text-2xl font-bold text-[#111827]">{totalBreaks}</span>
          <span className="text-xs font-semibold text-[#9CA3AF] mt-0.5 truncate">Configured Breaks</span>
        </div>
      </div>

      {/* Card 2: Today's Breaks */}
      <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 flex items-center gap-4 shadow-sm h-[110px]">
        <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#16A34A] flex items-center justify-center flex-shrink-0">
          <CalendarDays size={22} />
        </div>
        <div className="flex flex-col text-left min-w-0">
          <span className="text-2xl font-bold text-[#111827]">{todaysBreaks}</span>
          <span className="text-xs font-semibold text-[#9CA3AF] mt-0.5 truncate">Scheduled Today</span>
        </div>
      </div>

      {/* Card 3: This Week */}
      <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 flex items-center gap-4 shadow-sm h-[110px]">
        <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] text-[#F97316] flex items-center justify-center flex-shrink-0">
          <Calendar size={22} />
        </div>
        <div className="flex flex-col text-left min-w-0">
          <span className="text-2xl font-bold text-[#111827]">{thisWeekCount}</span>
          <span className="text-xs font-semibold text-[#9CA3AF] mt-0.5 truncate">Recurring Sessions</span>
        </div>
      </div>

      {/* Card 4: Total Weekly Break Duration */}
      <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 flex items-center gap-4 shadow-sm h-[110px]">
        <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#2563EB] flex items-center justify-center flex-shrink-0">
          <Clock size={22} />
        </div>
        <div className="flex flex-col text-left min-w-0">
          <span className="text-2xl font-bold text-[#111827]">{totalDurationStr}</span>
          <span className="text-xs font-semibold text-[#9CA3AF] mt-0.5 truncate">Total Duration</span>
        </div>
      </div>

      {/* Card 5: Next Upcoming Break */}
      <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 flex items-center gap-4 shadow-sm h-[110px]">
        <div className="w-12 h-12 rounded-2xl bg-[#FCE4EC] text-[#EC407A] flex items-center justify-center flex-shrink-0">
          <Bell size={22} />
        </div>
        <div className="flex flex-col text-left min-w-0">
          <span className="text-lg font-bold text-[#111827] truncate">{nextBreakTime}</span>
          <span className="text-xs font-semibold text-[#9CA3AF] mt-0.5 truncate">{nextBreakName}</span>
        </div>
      </div>
    </div>
  );
};

export default ClinicBreakStats;
