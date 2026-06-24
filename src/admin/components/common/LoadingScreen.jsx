import React from 'react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 antialiased">
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing Logo Outline */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-admin-blue-100 rounded-full animate-ping opacity-75" />
          <div className="relative w-12 h-12 bg-white border border-slate-100 rounded-full shadow-md flex items-center justify-center text-admin-blue-600">
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-pulse"
            >
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="10" />
              <path d="M50 15 C65 15, 75 25, 75 50" stroke="#10B981" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold text-slate-700 font-display uppercase tracking-wider">
            Loading Console
          </span>
          <span className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-widest">
            Please wait...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
