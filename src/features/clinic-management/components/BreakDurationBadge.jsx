import React from 'react';

export const calculateDurationInMinutes = (startTime, endTime) => {
  if (!startTime || !endTime) return 0;
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const startTotal = startH * 60 + (startM || 0);
  const endTotal = endH * 60 + (endM || 0);
  return endTotal - startTotal;
};

export const formatDuration = (minutes) => {
  if (minutes <= 0) return '0 Minutes';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hrs === 0) {
    return `${mins} Minutes`;
  }
  if (mins === 0) {
    return hrs === 1 ? '1 Hour' : `${hrs} Hours`;
  }
  return `${hrs} ${hrs === 1 ? 'Hour' : 'Hours'} ${mins} ${mins === 1 ? 'Minute' : 'Minutes'}`;
};

export const BreakDurationBadge = ({ startTime, endTime }) => {
  const diff = calculateDurationInMinutes(startTime, endTime);
  const durationText = formatDuration(diff);

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-[#4B5563] select-none">
      {durationText}
    </span>
  );
};

export default BreakDurationBadge;
