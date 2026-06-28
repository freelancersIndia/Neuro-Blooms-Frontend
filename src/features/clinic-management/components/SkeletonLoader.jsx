import React from 'react';

export const SkeletonLoader = () => {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse p-8">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 border-b border-[#EEF2F7] pb-6">
        <div className="w-14 h-14 bg-slate-200 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-8 bg-slate-200 rounded-lg w-1/3" />
          <div className="h-4 bg-slate-200 rounded-md w-2/3" />
        </div>
      </div>

      {/* Form Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
        {/* Left Side fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-12 bg-slate-200 rounded-xl w-full" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-12 bg-slate-200 rounded-xl w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-12 bg-slate-200 rounded-xl w-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-12 bg-slate-200 rounded-xl w-full" />
            </div>
          </div>
        </div>

        {/* Right Side fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-28 bg-slate-200 rounded-2xl w-full" />
            <div className="h-10 bg-slate-200 rounded-xl w-1/3 mt-2" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-12 bg-slate-200 rounded-xl w-full" />
          </div>
        </div>
      </div>

      {/* Banner Skeleton */}
      <div className="h-14 bg-slate-200 rounded-xl w-full" />
    </div>
  );
};

export default SkeletonLoader;
