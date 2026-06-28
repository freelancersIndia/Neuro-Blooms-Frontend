import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse select-none">
      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 flex items-center gap-4 shadow-sm h-[110px]">
            <div className="w-12 h-12 bg-slate-200 rounded-2xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-slate-200 rounded w-1/2" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar Skeleton */}
      <div className="h-16 px-6 bg-white border border-[#E5E7EB] rounded-2xl flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 flex-1">
          <div className="h-10 bg-slate-200 rounded-xl w-[280px]" />
          <div className="h-10 bg-slate-200 rounded-xl w-[120px]" />
          <div className="h-10 bg-slate-200 rounded-xl w-[120px]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-slate-200 rounded-xl" />
          <div className="h-10 bg-slate-200 rounded-xl w-[100px]" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white border border-[#E5E7EB] rounded-[20px] shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="border-b border-[#E5E7EB] bg-[#F8FAFC]/50 h-11 flex items-center px-6">
          <div className="h-4 bg-slate-200 rounded w-full" />
        </div>
        <div className="flex-1 p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 rounded-xl w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
