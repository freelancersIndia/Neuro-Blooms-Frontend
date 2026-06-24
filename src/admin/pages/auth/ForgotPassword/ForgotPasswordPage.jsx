import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Send, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import Logo from '../../../components/common/Logo';

export const ForgotPasswordPage = () => {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await forgotPassword(data.email);
    if (result.success) {
      navigate('/admin/reset-password');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Centered Brand Logo */}
      <Logo size="md" align="center" showText={true} className="mb-3" />

      {/* Blue Circular Icon Header */}
      <div className="w-12 h-12 bg-admin-blue-50 text-admin-blue-600 rounded-full flex items-center justify-center border border-admin-blue-100 shadow-sm mb-4 animate-float" style={{ animationDuration: '5s' }}>
        <Lock className="w-6 h-6" />
      </div>

      {/* Header Titles */}
      <div className="text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Forgot Password?
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-2.5 max-w-sm mx-auto leading-relaxed">
          Enter your registered email address and we'll send you a one-time password (OTP) to reset your password.
        </p>
      </div>

      {/* Global API Errors */}
      {error && (
        <div className="w-full bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm font-semibold mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-red-600 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-left leading-snug">{error}</span>
        </div>
      )}

      {/* Forgot Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        {/* Email Address Input */}
        <div className="flex flex-col gap-1.5 w-full text-left">
          <label htmlFor="email" className="text-sm font-bold text-slate-700 tracking-wide">
            Email Address
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400 pointer-events-none">
              <Mail className="w-5 h-5" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              className={`w-full bg-slate-50/50 hover:bg-slate-50 border ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                  : 'border-slate-200 focus:border-admin-blue-500 focus:ring-admin-blue-100'
              } rounded-xl pl-12 pr-4 py-3 text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-medium focus:ring-4 focus:outline-none transition-all duration-200`}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
          </div>
          {errors.email && (
            <span className="text-xs font-semibold text-red-500 mt-0.5 pl-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Send Reset OTP Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-admin-blue-600 hover:bg-admin-blue-700 disabled:bg-admin-blue-400 text-white font-bold text-base py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-admin-blue-600/10 hover:shadow-admin-blue-600/20 active:scale-98 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed mt-1"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Sending Code...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Reset OTP</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative w-full flex items-center justify-center my-2">
          <div className="absolute w-full border-t border-slate-100" />
          <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            or
          </span>
        </div>

        {/* Back to Login Button */}
        <Link
          to="/admin/login"
          className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-admin-blue-600 hover:text-admin-blue-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>
      </form>

      {/* Security Expiry Alert Card */}
      <div className="w-full bg-slate-50/70 border border-slate-100 p-4 rounded-2xl flex gap-3 text-left mt-4">
        <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-admin-blue-600 flex-shrink-0 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] sm:text-xs font-bold text-slate-800">
            Secure & Protected
          </span>
          <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-normal">
            For your security, this OTP will expire in 10 minutes. Please check your inbox (and spam folder).
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
