import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const AppointmentCalendar = ({ selectedDate, onSelectDate }) => {
  // Start calendar view on June 2026 to match reference design exactly
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // 5 = June

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month overflow days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        dayNum: prevMonthTotalDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthTotalDays - i),
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        dayNum: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Next month overflow days
    const totalSlots = 42; // 6 rows of 7
    const nextDaysCount = totalSlots - days.length;
    for (let i = 1; i <= nextDaysCount; i++) {
      days.push({
        dayNum: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const isTodayOrFuture = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm w-full">
      {/* Month Year Selector */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <button 
          onClick={handlePrevMonth}
          className="p-1 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
        </button>
        <span className="font-extrabold text-slate-800 font-display text-sm tracking-wide">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button 
          onClick={handleNextMonth}
          className="p-1 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronRight className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Weekday Abbreviations */}
      <div className="grid grid-cols-7 gap-1 text-center py-2 text-slate-400 font-semibold text-[10px] sm:text-xs">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
        {calendarDays.map((cell, idx) => {
          const isSelected = isSameDate(cell.date, selectedDate);
          const isEligible = cell.isCurrentMonth && isTodayOrFuture(cell.date);
          
          let btnClass = "w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center font-semibold font-display mx-auto transition-all ";
          
          if (isSelected) {
            btnClass += "bg-[#3B8A4C] text-white shadow-md shadow-emerald-900/10";
          } else if (isEligible) {
            btnClass += "bg-white border border-slate-100 text-slate-700 hover:border-[#3B8A4C]/45 hover:bg-emerald-50/20 cursor-pointer";
          } else {
            // Disabled or overflow days
            btnClass += "text-slate-300 pointer-events-none";
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={!isEligible}
              onClick={() => onSelectDate(cell.date)}
              className={btnClass}
            >
              {cell.dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
