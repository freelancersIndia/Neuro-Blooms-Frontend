export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-pulse select-none text-left">
      {/* Left Columns (3/4 of grid) */}
      <div className="xl:col-span-3 space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between pb-2">
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded w-48" />
            <div className="h-7 bg-slate-200 rounded w-64" />
            <div className="h-3 bg-slate-200 rounded w-96" />
          </div>
          <div className="h-9 bg-slate-200 rounded-xl w-32 hidden sm:block" />
        </div>

        {/* Summary Card Skeleton */}
        <div className="bg-white border border-slate-100 rounded-[20px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-200 flex-shrink-0" />
            <div className="space-y-2 flex-1 md:flex-none">
              <div className="h-4 bg-slate-200 rounded w-64" />
              <div className="h-3 bg-slate-200 rounded w-48" />
            </div>
          </div>
          <div className="w-full md:w-48 h-16 bg-slate-100 rounded-2xl flex-shrink-0" />
        </div>

        {/* Search Card Skeleton */}
        <div className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm space-y-4">
          <div className="h-4 bg-slate-200 rounded w-44" />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2 h-9 bg-slate-200 rounded-xl" />
            <div className="h-9 bg-slate-200 rounded-xl" />
            <div className="h-9 bg-slate-200 rounded-xl" />
          </div>
          <div className="h-3.5 bg-slate-100 rounded-xl w-72" />
        </div>

        {/* Possible Matches Header Skeleton */}
        <div className="space-y-1.5 pt-2">
          <div className="h-4 bg-slate-200 rounded w-44" />
          <div className="h-3 bg-slate-200 rounded w-60" />
        </div>

        {/* Patient Cards Skeletons */}
        <div className="space-y-4">
          {[1, 2, 3].map((idx) => (
            <div
              key={`patient-skel-${idx}`}
              className="bg-white border border-slate-100 rounded-[20px] p-5 flex flex-col lg:flex-row items-center justify-between gap-5 shadow-sm"
            >
              <div className="flex items-center gap-4.5 w-full lg:w-auto">
                <div className="w-14 h-14 rounded-2xl bg-slate-200 flex-shrink-0" />
                <div className="space-y-2 flex-grow lg:flex-grow-0">
                  <div className="h-2.5 bg-slate-200 rounded w-16" />
                  <div className="h-4 bg-slate-200 rounded w-36" />
                  <div className="h-2.5 bg-slate-200 rounded w-24" />
                </div>
              </div>
              <div className="space-y-2 w-full lg:w-40">
                <div className="h-2.5 bg-slate-100 rounded w-10" />
                <div className="h-3.5 bg-slate-200 rounded w-28" />
                <div className="h-2.5 bg-slate-200 rounded w-24" />
              </div>
              <div className="flex items-center gap-6 w-full lg:w-auto">
                <div className="space-y-2">
                  <div className="h-2.5 bg-slate-100 rounded w-10" />
                  <div className="h-3 bg-slate-200 rounded w-20" />
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 bg-slate-100 rounded w-16" />
                  <div className="h-3 bg-slate-200 rounded w-20" />
                </div>
              </div>
              <div className="w-full lg:w-28 h-12 bg-slate-100 rounded-xl" />
              <div className="flex items-center gap-2 w-full lg:w-auto">
                <div className="h-9 bg-slate-200 rounded-xl w-24" />
                <div className="h-9 bg-slate-200 rounded-xl w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column (1/4 of grid) - Sidebar Skeleton */}
      <div className="space-y-6">
        <div className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-sm space-y-4">
          <div className="h-3 bg-slate-200 rounded w-24 border-b border-slate-50 pb-2" />
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-2.5 bg-slate-100 rounded w-12" />
              <div className="h-4 bg-slate-200 rounded w-28" />
            </div>
            <div className="w-16 h-6 bg-slate-200 rounded-xl" />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-sm space-y-4">
          <div className="h-3 bg-slate-200 rounded w-36 border-b border-slate-50 pb-2" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={`parent-skel-${i}`} className="flex justify-between">
                <div className="h-3 bg-slate-200 rounded w-12" />
                <div className="h-3 bg-slate-200 rounded w-24" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-sm space-y-4">
          <div className="h-3 bg-slate-200 rounded w-36 border-b border-slate-50 pb-2" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={`child-skel-${i}`} className="flex justify-between">
                <div className="h-3 bg-slate-200 rounded w-12" />
                <div className="h-3 bg-slate-200 rounded w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PatientsLoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse select-none text-left">
      {/* 1. Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-2">
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded w-20" />
          <div className="h-8 bg-slate-200 rounded w-48" />
          <div className="h-3.5 bg-slate-200 rounded w-80" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-12 bg-slate-200 rounded-[14px] w-24" />
          <div className="h-12 bg-slate-200 rounded-[14px] w-40" />
        </div>
      </div>

      {/* 2. Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={`stat-skel-${i}`} className="bg-white border border-slate-100 rounded-[20px] p-5 flex items-center gap-4.5 min-h-[110px]">
            <div className="w-14 h-14 rounded-2xl bg-slate-200 flex-shrink-0" />
            <div className="space-y-2 flex-grow">
              <div className="h-3 bg-slate-200 rounded w-24" />
              <div className="h-6 bg-slate-200 rounded w-16" />
              <div className="h-2.5 bg-slate-200 rounded w-20" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Toolbar Skeleton */}
      <div className="bg-white border border-slate-100 rounded-[20px] p-4 flex flex-col md:flex-row gap-4 min-h-[76px]">
        <div className="h-11 bg-slate-200 rounded-xl flex-grow md:max-w-md" />
        <div className="flex flex-wrap items-center gap-3.5 w-full md:w-auto">
          <div className="h-11 bg-slate-200 rounded-xl w-32" />
          <div className="h-11 bg-slate-200 rounded-xl w-32" />
          <div className="h-11 bg-slate-200 rounded-xl w-36" />
          <div className="h-11 bg-slate-200 rounded-xl w-32" />
        </div>
      </div>

      {/* 4. Main content Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Side: Table skeleton */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-white border border-slate-100 rounded-[20px] overflow-hidden shadow-sm">
            {/* Table Header block */}
            <div className="h-12 bg-slate-50 border-b border-slate-100" />
            {/* Rows list */}
            <div className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={`row-skel-${idx}`} className="p-4.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 flex-shrink-0" />
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-24" />
                      <div className="h-2.5 bg-slate-150 rounded w-16" />
                    </div>
                  </div>
                  <div className="h-3.5 bg-slate-200 rounded w-28 flex-1 hidden md:block" />
                  <div className="h-3.5 bg-slate-200 rounded w-24 flex-1 hidden md:block" />
                  <div className="h-6 bg-slate-200 rounded-full w-24 flex-shrink-0" />
                  <div className="h-3.5 bg-slate-200 rounded w-20 flex-shrink-0 hidden sm:block" />
                  <div className="h-8 bg-slate-200 rounded-xl w-16 flex-shrink-0" />
                </div>
              ))}
            </div>
            {/* Footer block */}
            <div className="h-14 bg-slate-50/50 border-t border-slate-100" />
          </div>
        </div>

        {/* Right Side: Sidebar skeletons */}
        <div className="xl:col-span-1 space-y-6">
          {/* Card 1 Skeleton */}
          <div className="bg-white border border-slate-100 rounded-[20px] p-5 shadow-sm space-y-4.5">
            <div className="h-3.5 bg-slate-200 rounded w-20 border-b border-slate-50 pb-2" />
            {[1, 2, 3, 4].map((i) => (
              <div key={`filter-skel-${i}`} className="space-y-1.5">
                <div className="h-2.5 bg-slate-100 rounded w-12" />
                <div className="h-10 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>

          {/* Card 2 Skeleton */}
          <div className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-sm flex flex-col items-center gap-5">
            <div className="h-3.5 bg-slate-200 rounded w-28 border-b border-slate-50 pb-2 w-full" />
            <div className="w-28 h-28 rounded-full border-[10px] border-slate-150 flex items-center justify-center" />
            <div className="space-y-2.5 w-full">
              <div className="h-3.5 bg-slate-200 rounded w-full" />
              <div className="h-3.5 bg-slate-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
