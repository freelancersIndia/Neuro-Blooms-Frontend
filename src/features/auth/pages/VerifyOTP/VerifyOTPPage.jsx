import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import OTPInput from '../../components/OTPInput';
import CountdownTimer from '../../components/CountdownTimer';
import Logo from '../../../../components/common/Logo';
import { OTP_CONFIG } from '../../constants/auth.constants';

export const VerifyOTPPage = () => {
  const { verifyOTP, resendOTP, tempEmail, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState(null);
  const [showResendSuccess, setShowResendSuccess] = useState(false);

  // Redirect if we reached this page without a temporary session email
  useEffect(() => {
    if (!tempEmail) {
      navigate('/admin/login', { replace: true });
    }
    clearError();
  }, [tempEmail, navigate, clearError]);

  const handleOTPChange = (code) => {
    setOtpCode(code);
    if (otpError) setOtpError(null);
    if (error) clearError();
  };

  const handleVerify = async (e) => {
    e?.preventDefault();
    if (otpCode.length !== 6) {
      setOtpError('Please enter a complete 6-digit verification code.');
      return;
    }

    setOtpError(null);
    
    // Retrieve the remember device setting saved from Step 1
    let rememberDevice = false;
    try {
      const saved = sessionStorage.getItem('nb_admin_remember_temp');
      if (saved) rememberDevice = JSON.parse(saved);
    } catch (err) {
      console.error('Error reading remember device flag:', err);
    }

    const result = await verifyOTP(otpCode, rememberDevice);
    if (result.success) {
      sessionStorage.removeItem('nb_admin_remember_temp');
      navigate('/admin/dashboard');
    }
  };

  const handleResend = async () => {
    clearError();
    setShowResendSuccess(false);
    const result = await resendOTP();
    if (result.success) {
      setShowResendSuccess(true);
      setTimeout(() => setShowResendSuccess(false), 5000);
      return true;
    } else {
      setOtpError(result.error || 'Failed to resend verification code.');
      return false;
    }
  };

  // Mask the email address for security (e.g. ad***@neuroblooms.com)
  const maskEmail = (email) => {
    if (!email) return '';
    const [local, domain] = email.split('@');
    if (local.length <= 2) return `${local[0]}*@${domain}`;
    return `${local.substring(0, 2)}***@${domain}`;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Centered Brand Logo */}
      <Logo size="md" align="center" showText={true} className="mb-3" />

      {/* Blue Circular Icon Header */}
      <div className="w-12 h-12 bg-admin-blue-50 text-admin-blue-600 rounded-full flex items-center justify-center border border-admin-blue-100 shadow-sm mb-4 animate-float" style={{ animationDuration: '4s' }}>
        <ShieldCheck className="w-6 h-6" />
      </div>

      {/* Header Titles */}
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Verify Your Identity
        </h2>
        <p className="text-sm font-semibold text-slate-500 mt-2.5 max-w-sm mx-auto leading-relaxed">
          We've sent a 6-digit verification code to{' '}
          <span className="text-admin-blue-600 font-bold underline decoration-admin-blue-200 decoration-2 select-all">
            {tempEmail || 'admin@neuroblooms.com'}
          </span>
        </p>
      </div>

      {/* Green Success Alert Banner */}
      <div className="w-full bg-emerald-50 border border-emerald-100 text-emerald-800 px-4 py-2.5 rounded-xl text-sm font-semibold mb-4 flex items-start gap-3 text-left">
        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
        <div className="flex flex-col">
          <span className="font-bold text-emerald-900 leading-tight">OTP Sent Successfully!</span>
          <span className="text-emerald-700/90 text-xs font-semibold mt-0.5 leading-snug">
            Please check your inbox and enter the code below.
          </span>
        </div>
      </div>

      {/* Resend Success Toast */}
      {showResendSuccess && (
        <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold mb-4 text-center animate-fade-in-up">
          New code sent successfully! Check your spam folder if not received.
        </div>
      )}

      {/* Verification Errors */}
      {error && (
        <div className="w-full bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm font-semibold mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-red-600 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-left leading-snug">{error}</span>
        </div>
      )}

      {/* OTP Form */}
      <form onSubmit={handleVerify} className="w-full flex flex-col gap-4">
        {/* OTP Code inputs */}
        <OTPInput value={otpCode} onChange={handleOTPChange} error={otpError} />

        {/* Countdown & Cooldown Resend Timer */}
        <CountdownTimer onResend={handleResend} initialSeconds={OTP_CONFIG.EXPIRY_SECONDS} />

        {/* Verify & Continue Button */}
        <button
          type="submit"
          disabled={isLoading || otpCode.length !== 6}
          className="w-full bg-admin-blue-600 hover:bg-admin-blue-700 disabled:bg-admin-blue-400 text-white font-bold text-base py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-admin-blue-600/10 hover:shadow-admin-blue-600/20 active:scale-98 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Verifying Code...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Verify & Continue</span>
            </>
          )}
        </button>

        {/* Back to Login Button */}
        <Link
          to="/admin/login"
          className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mt-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </form>

      {/* Secure & Protected Notice Card */}
      <div className="w-full bg-slate-50/70 border border-slate-100 p-3.5 rounded-2xl flex gap-3 text-left mt-4">
        <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0 shadow-sm">
          <Lock className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] sm:text-xs font-bold text-slate-800">
            Secure & Protected
          </span>
          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-normal">
            Your verification code is valid for a limited time and can only be used once.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
