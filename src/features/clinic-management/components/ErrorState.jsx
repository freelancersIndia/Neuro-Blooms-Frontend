import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const ErrorState = ({ onRetry, message }) => {
  return (
    <div className="w-full flex-1 flex flex-col gap-5 text-center font-display items-center justify-center py-16 bg-white border border-[#E5E7EB] rounded-[20px] shadow-sm select-none">
      <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center border border-red-100 shadow-sm">
        <AlertTriangle size={26} />
      </div>
      <div className="flex flex-col gap-1 max-w-[320px]">
        <h3 className="text-sm font-bold text-[#111827]">Unable to load clinic breaks</h3>
        <p className="text-xs text-[#4B5563] mt-1 leading-normal">
          {message || 'We encountered a network error while communicating with the server.'}
        </p>
      </div>
      <button
        onClick={onRetry}
        className="h-10 px-5 rounded-xl bg-[#6D28D9] text-white font-bold text-xs hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
      >
        <RefreshCw size={14} />
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
