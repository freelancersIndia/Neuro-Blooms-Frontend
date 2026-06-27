import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Mail, Send, HelpCircle, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import PasswordInput from '../../components/PasswordInput';
import Logo from '../../../../components/common/Logo';
import storage from '../../../../utils/storage';

export const LoginPage = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isExpired = searchParams.get('expired') === 'true';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberDevice: false
    }
  });

  // Pre-fill email if remember device was previously checked
  useEffect(() => {
    clearError();
    const remember = storage.getRememberDevice();
    if (remember) {
      const savedUser = storage.getUser();
      if (savedUser?.email) {
        setValue('email', savedUser.email);
        setValue('rememberDevice', true);
      }
    }
  }, [setValue, clearError]);

  const onSubmit = async (data) => {
    clearError();
    const result = await login(data.email, data.password);
    if (result.success) {
      // Temporarily store the remember device setting in session so we can persist tokens in step 2
      sessionStorage.setItem('nb_admin_remember_temp', JSON.stringify(data.rememberDevice));
      navigate('/admin/verify-otp');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Centered Brand Logo */}
      <Logo size="md" align="center" showText={true} className="mb-4" />

      {/* Header Titles */}
      <div className="text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-2">
          Welcome Back <span className="animate-pulse">👋</span>
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
          Sign in to access appointments, users, security logs and content management tools.
        </p>
      </div>

      {/* Session Expired Alert */}
      {isExpired && (
        <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm font-semibold mb-6 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Your session has expired. Please log in again.</span>
        </div>
      )}

      {/* Global API Errors */}
      {error && (
        <div className="w-full bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm font-semibold mb-6 flex items-center gap-2 animate-shake">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-red-600 flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-left leading-snug">{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
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
              placeholder="admin@neuroblooms.com"
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

        {/* Password Input */}
        <PasswordInput
          id="password"
          label="Password"
          placeholder="••••••••••••"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
        />

        {/* Remember Me & Forgot Password Links */}
        <div className="flex items-center justify-between mt-1 text-sm select-none">
          <label className="flex items-center gap-2 text-slate-600 font-semibold cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 text-admin-blue-600 border-slate-300 rounded focus:ring-admin-blue-500 accent-admin-blue-600 cursor-pointer"
              {...register('rememberDevice')}
            />
            <span className="group-hover:text-slate-800 transition-colors">Remember this device</span>
          </label>
          <Link
            to="/admin/forgot-password"
            className="text-admin-blue-600 hover:text-admin-blue-800 font-bold transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-admin-blue-600 hover:bg-admin-blue-700 disabled:bg-admin-blue-400 text-white font-bold text-base py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-admin-blue-600/10 hover:shadow-admin-blue-600/20 active:scale-98 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Sending Credentials...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Verification OTP</span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative w-full flex items-center justify-center my-4">
        <div className="absolute w-full border-t border-slate-100" />
        <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          or
        </span>
      </div>

      {/* Need Help Section */}
      <div className="text-sm font-semibold text-slate-500 flex flex-col items-center gap-1">
        <span>Need Help?</span>
        <a
          href="mailto:support@neuroblooms.com?subject=Admin%20Panel%20Access%20Help"
          className="text-admin-blue-600 hover:text-admin-blue-800 font-bold transition-colors flex items-center gap-1"
        >
          Contact System Administrator
        </a>
      </div>

      {/* Security Footer */}
      <div className="flex flex-col items-center gap-1 mt-6 text-[10px] sm:text-xs font-bold text-slate-400 tracking-wide leading-none text-center">
        <div className="flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-slate-300" />
          <span>© 2026 Neuro Blooms. All rights reserved.</span>
        </div>
        <span className="text-slate-400 font-semibold mt-0.5">
          Protected by Multi-Factor Authentication
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
