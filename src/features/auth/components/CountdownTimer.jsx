import React, { useState, useEffect } from 'react';
import { Clock, RotateCw } from 'lucide-react';
import { OTP_CONFIG } from '../constants/auth.constants';

export const CountdownTimer = ({ onResend, initialSeconds = OTP_CONFIG.RESEND_COOLDOWN }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleResendClick = async (e) => {
    e.preventDefault();
    if (secondsRemaining > 0 || isResending) return;

    setIsResending(true);
    try {
      const success = await onResend();
      if (success) {
        setSecondsRemaining(initialSeconds);
      }
    } catch (err) {
      console.error('Error resending OTP:', err);
    } finally {
      setIsResending(false);
    }
  };

  const timerFinished = secondsRemaining === 0;

  return (
    <div className="flex flex-col items-center gap-3 my-2 font-medium select-none">
      {/* Ticking Countdown Clock */}
      {!timerFinished && (
        <div className="flex items-center gap-1.5 text-slate-500 text-sm bg-slate-50 border border-slate-100 px-3.5 py-1.5 rounded-full shadow-sm">
          <Clock className="w-4 h-4 text-slate-400 animate-pulse" />
          <span>
            Code expires in <span className="font-bold text-admin-blue-600 font-mono">{formatTime(secondsRemaining)}</span>
          </span>
        </div>
      )}

      {timerFinished && (
        <div className="flex items-center gap-1.5 text-red-500 text-sm bg-red-50 border border-red-100 px-3.5 py-1.5 rounded-full shadow-sm">
          <Clock className="w-4 h-4" />
          <span className="font-semibold">Code has expired</span>
        </div>
      )}

      {/* Resend Link */}
      <div className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
        <span>Didn't receive the code?</span>
        <button
          onClick={handleResendClick}
          disabled={!timerFinished || isResending}
          className={`font-bold inline-flex items-center gap-1 transition-all duration-200 ${
            timerFinished
              ? 'text-admin-blue-600 hover:text-admin-blue-800 hover:underline cursor-pointer active:scale-95'
              : 'text-slate-400 cursor-not-allowed'
          }`}
        >
          {isResending ? (
            <>
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Resend OTP</span>
              <RotateCw className={`w-3.5 h-3.5 ${timerFinished ? 'hover:rotate-180' : ''} transition-transform duration-500`} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CountdownTimer;
