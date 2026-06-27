import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, RotateCw, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import PasswordInput from '../../components/PasswordInput';
import OTPInput from '../../components/OTPInput';
import Logo from '../../../../components/common/Logo';
import { OTP_CONFIG } from '../../constants/auth.constants';
import authService from '../../services/auth.service';

export const ResetPasswordPage = () => {
  const { resetPasswordWithToken, resendOTP, tempEmail, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState(null);
  
  // Verification states
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpToken, setOtpToken] = useState('');
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);
  
  // Timer states
  const [secondsRemaining, setSecondsRemaining] = useState(OTP_CONFIG.EXPIRY_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const [showResendSuccess, setShowResendSuccess] = useState(false);

  // Password strength states
  const [passwordStrength, setPasswordStrength] = useState({ label: 'Weak', score: 1, color: 'bg-red-500 text-red-500' });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const passwordValue = watch('password');

  // Redirect if no session email
  useEffect(() => {
    if (!tempEmail) {
      navigate('/admin/login', { replace: true });
    }
    clearError();
  }, [tempEmail, navigate, clearError]);

  // Countdown timer effect
  useEffect(() => {
    if (secondsRemaining <= 0) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining]);

  // Password strength calculation effect
  useEffect(() => {
    if (!passwordValue) {
      setPasswordStrength({ label: 'Weak', score: 0, color: 'bg-slate-200 text-slate-400' });
      return;
    }

    let score = 0;
    if (passwordValue.length >= 8) score += 1;
    if (/[A-Za-z]/.test(passwordValue)) score += 1;
    if (/\d/.test(passwordValue)) score += 1;
    if (/[^A-Za-z0-9]/.test(passwordValue)) score += 1;

    let label = 'Weak';
    let color = 'bg-red-500 text-red-500';

    if (score <= 1) {
      label = 'Weak';
      color = 'bg-red-500 text-red-500';
    } else if (score === 2 || score === 3) {
      label = 'Medium';
      color = 'bg-amber-500 text-amber-500';
    } else if (score >= 4) {
      label = 'Strong';
      color = 'bg-emerald-500 text-emerald-500';
    }

    setPasswordStrength({ label, score: Math.max(score, 1), color });
  }, [passwordValue]);

  const handleOTPChange = async (code) => {
    setOtpCode(code);
    if (otpError) setOtpError(null);
    if (error) clearError();

    // If OTP is modified after verification, reset the verified status
    if (code.length < 6) {
      setIsOtpVerified(false);
      setOtpToken('');
    }

    if (code.length === 6) {
      setIsOtpVerifying(true);
      try {
        const email = tempEmail || 'admin@neuroblooms.com';
        const response = await authService.verifyOTP(email, code, 'PASSWORD_RESET');
        
        if (response.success && response.data?.token) {
          setIsOtpVerified(true);
          setOtpToken(response.data.token);
          setOtpError(null);
          toast.success(response.message || 'OTP verified successfully. You can now reset your password.');
        } else {
          setIsOtpVerified(false);
          setOtpToken('');
          const errMsg = response.message || 'OTP verification failed. Please check the code.';
          setOtpError(errMsg);
          toast.error(errMsg);
        }
      } catch (err) {
        setIsOtpVerified(false);
        setOtpToken('');
        const errMsg = err.message || 'Invalid verification code.';
        setOtpError(errMsg);
        toast.error(errMsg);
      } finally {
        setIsOtpVerifying(false);
      }
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    if (secondsRemaining > 0 || isResending) return;

    setIsResending(true);
    clearError();
    setShowResendSuccess(false);

    try {
      const result = await resendOTP('PASSWORD_RESET');
      if (result.success) {
        setSecondsRemaining(OTP_CONFIG.EXPIRY_SECONDS);
        setShowResendSuccess(true);
        // Reset verified state when new code is requested
        setIsOtpVerified(false);
        setOtpToken('');
        setOtpCode('');
        setTimeout(() => setShowResendSuccess(false), 5000);
      } else {
        setOtpError(result.error || 'Failed to resend code.');
      }
    } catch (err) {
      console.error('Error resending OTP:', err);
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data) => {
    clearError();
    if (!isOtpVerified || !otpToken) {
      setOtpError('Please enter and verify the 6-digit code first.');
      toast.error('Please enter and verify the 6-digit code first.');
      return;
    }

    if (data.password !== data.confirmPassword) {
      return; // Handled by React Hook Form validation rules
    }

    const result = await resetPasswordWithToken(otpToken, data.password, data.confirmPassword);
    if (result.success) {
      toast.success('Password has been reset successfully.');
      navigate('/admin/success');
    }
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Centered Brand Logo */}
      <Logo size="md" align="center" showText={true} className="mb-2" />

      {/* Blue Circular Icon Header */}
      <div className="w-10 h-10 bg-admin-blue-50 text-admin-blue-600 rounded-full flex items-center justify-center border border-admin-blue-100 shadow-sm mb-3 animate-float" style={{ animationDuration: '6s' }}>
        <Lock className="w-5 h-5" />
      </div>

      {/* Header Titles */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Reset Your Password
        </h2>
        <p className="text-xs font-semibold text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
          Enter the verification code sent to your email address and create a new secure password.
        </p>
      </div>

      {/* Global API Errors */}
      {error && (
        <div className="w-full bg-red-50 border border-red-200 text-red-800 px-4 py-2.5 rounded-xl text-xs font-bold mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span className="text-left leading-snug">{error}</span>
        </div>
      )}

      {/* Resend success alert */}
      {showResendSuccess && (
        <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold mb-4 text-center animate-fade-in-up">
          New verification code sent! Please check your inbox.
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        
        {/* SECTION 1: VERIFY OTP */}
        <div className="border-b border-slate-100 pb-3 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-5 rounded-full bg-admin-blue-50 text-admin-blue-600 text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="text-sm font-bold text-slate-800">Verify OTP</h3>
            {isOtpVerifying && (
              <RotateCw className="w-3.5 h-3.5 text-admin-blue-600 animate-spin ml-1" />
            )}
            {isOtpVerified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200 ml-2 animate-fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Verified
              </span>
            )}
          </div>
          <p className="text-[11px] font-semibold text-slate-500 pl-7 leading-relaxed">
            Enter the 6-digit verification code sent to{' '}
            <span className="text-admin-blue-600 font-bold select-all">
              {tempEmail || 'admin@neuroblooms.com'}
            </span>
          </p>

          <div className="pl-7 mt-2">
            <OTPInput value={otpCode} onChange={handleOTPChange} error={otpError} />
            
            {/* OTP Countdown & Resend Inline Container */}
            <div className="flex items-center justify-between mt-2 text-[11px] font-semibold select-none">
              {secondsRemaining > 0 ? (
                <span className="text-slate-500">
                  Code expires in <span className="font-bold text-admin-blue-600 font-mono">{formatTime(secondsRemaining)}</span>
                </span>
              ) : (
                <span className="text-red-500 font-bold">Code has expired</span>
              )}

              <button
                type="button"
                onClick={handleResend}
                disabled={secondsRemaining > 0 || isResending}
                className={`inline-flex items-center gap-1 font-bold ${
                  secondsRemaining === 0 && !isResending
                    ? 'text-admin-blue-600 hover:text-admin-blue-800 hover:underline cursor-pointer'
                    : 'text-slate-400 cursor-not-allowed'
                }`}
              >
                {isResending ? (
                  <>
                    <RotateCw className="w-3 h-3 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Resend OTP</span>
                    <RotateCw className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: CREATE NEW PASSWORD */}
        <div className={`text-left flex flex-col gap-4 transition-all duration-300 ${
          isOtpVerified ? 'opacity-100' : 'opacity-40 pointer-events-none select-none'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-admin-blue-50 text-admin-blue-600 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="text-sm font-bold text-slate-800">Create New Password</h3>
          </div>

          <div className="pl-7 flex flex-col gap-2.5">
            {/* New Password Input */}
            <PasswordInput
              id="password"
              label="New Password"
              placeholder="Enter new password"
              disabled={!isOtpVerified}
              error={errors.password?.message}
              {...register('password', {
                required: isOtpVerified ? 'New password is required' : false,
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
            />

            {/* Password strength display */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] sm:text-xs select-none">
              <span className="text-slate-500 font-semibold leading-snug">
                Min. 8 characters with letters, numbers & symbols
              </span>
              
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="font-bold text-slate-500">
                  Strength:{' '}
                  <span className={`font-extrabold ${passwordStrength.color.split(' ')[1]}`}>
                    {passwordStrength.label}
                  </span>
                </span>
                {/* 4 strength blocks */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((barIndex) => {
                    const isActive = passwordStrength.score >= barIndex;
                    return (
                      <div
                        key={barIndex}
                        className={`w-3.5 h-1.5 rounded-full transition-all duration-300 ${
                          isActive ? passwordStrength.color.split(' ')[0] : 'bg-slate-200'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Confirm Password Input */}
            <PasswordInput
              id="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm new password"
              disabled={!isOtpVerified}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: isOtpVerified ? 'Please confirm your new password' : false,
                validate: (value) => !isOtpVerified || value === passwordValue || 'Passwords do not match'
              })}
            />
            <span className="text-[10px] sm:text-xs font-semibold text-slate-500 -mt-2 leading-none">
              Please confirm your new password
            </span>
          </div>
        </div>

        {/* Submit Reset Password Button */}
        <button
          type="submit"
          disabled={isLoading || !isOtpVerified || isOtpVerifying}
          className="w-full bg-admin-blue-600 hover:bg-admin-blue-700 disabled:bg-admin-blue-400 text-white font-bold text-base py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-admin-blue-600/10 hover:shadow-admin-blue-600/20 active:scale-98 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Resetting Password...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Reset Password</span>
            </>
          )}
        </button>

        {/* Back to Login Link */}
        <Link
          to="/admin/login"
          className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors mt-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
