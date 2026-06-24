import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Logo from '../../../components/common/Logo';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      navigate('/admin/login', { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handleProceed = () => {
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-center">
      {/* Centered Brand Logo */}
      <Logo size="md" align="center" showText={true} className="mb-4" />

      {/* Large Green Success Checkmark */}
      <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 shadow-sm mb-4 animate-float" style={{ animationDuration: '4s' }}>
        <CheckCircle2 className="w-7 h-7" />
      </div>

      {/* Header Titles */}
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
          Password Reset Successfully!
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
          Your account password has been updated. You can now use your new credentials to log in.
        </p>
      </div>

      {/* Countdown Timer Alert */}
      <div className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-500 mb-4 flex items-center justify-center gap-1.5">
        <svg className="animate-spin h-4 w-4 text-admin-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span>
          Redirecting to login page in{' '}
          <span className="font-extrabold text-admin-blue-600 font-mono">{countdown}</span> seconds...
        </span>
      </div>

      {/* Proceed to Login Button */}
      <button
        onClick={handleProceed}
        className="w-full bg-admin-blue-600 hover:bg-admin-blue-700 text-white font-bold text-base py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-admin-blue-600/10 hover:shadow-admin-blue-600/20 active:scale-98 transition-all duration-200 cursor-pointer"
      >
        <span>Proceed to Login</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SuccessPage;
