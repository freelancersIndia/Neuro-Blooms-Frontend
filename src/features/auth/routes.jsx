import React, { lazy } from 'react';

const LoginPage = lazy(() => import('./pages/Login/LoginPage').then(m => ({ default: m.LoginPage })));
const VerifyOTPPage = lazy(() => import('./pages/VerifyOTP/VerifyOTPPage').then(m => ({ default: m.VerifyOTPPage })));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPassword/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('./pages/ResetPassword/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const SuccessPage = lazy(() => import('./pages/Success/SuccessPage').then(m => ({ default: m.SuccessPage })));

export const authRoutes = [
  { path: 'login', element: <LoginPage /> },
  { path: 'verify-otp', element: <VerifyOTPPage /> },
  { path: 'forgot-password', element: <ForgotPasswordPage /> },
  { path: 'reset-password', element: <ResetPasswordPage /> },
  { path: 'success', element: <SuccessPage /> },
];
