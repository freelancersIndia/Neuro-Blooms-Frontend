import React from 'react';

export const WeeklySkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-6 select-none animate-pulse">
      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-6 bg-slate-100 rounded w-12" />
              <div className="h-3 bg-slate-100 rounded w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Card Skeleton */}
      <div className="w-full bg-white border border-[#E2E8F0] rounded-[20px] shadow-sm p-8 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-[#EEF2F7] pb-6">
          <div className="flex flex-col gap-2">
            <div className="h-6 bg-slate-100 rounded w-48" />
            <div className="h-4 bg-slate-100 rounded w-64" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 bg-slate-100 rounded w-24" />
            <div className="h-9 bg-slate-100 rounded w-24" />
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((row) => (
            <div key={row} className="grid grid-cols-6 gap-4 py-3 border-b border-[#F8FAFC] items-center">
              <div className="h-4 bg-slate-100 rounded w-20" />
              <div className="h-6 bg-slate-100 rounded w-14" />
              <div className="h-9 bg-slate-100 rounded w-32" />
              <div className="h-9 bg-slate-100 rounded w-32" />
              <div className="h-4 bg-slate-100 rounded w-16" />
              <div className="h-6 bg-slate-100 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklySkeleton;
