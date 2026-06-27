import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="bg-white border border-rose-100 rounded-[20px] p-8 text-center max-w-md mx-auto shadow-sm my-10 select-none text-left">
      <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mx-auto mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-black text-rose-500 font-display uppercase tracking-wider">
        Unable to Load Patients
      </h3>
      <p className="text-xs font-semibold text-slate-500 mt-2.5 leading-relaxed">
        {message || "The system encountered an error loading the patients registry. Please check your network connection and try again."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer transition-colors font-display flex items-center justify-center gap-1.5 mx-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry Loading</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
