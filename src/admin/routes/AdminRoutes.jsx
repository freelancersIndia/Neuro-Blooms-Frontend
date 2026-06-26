import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Guards
import ProtectedRoute from '../guards/ProtectedRoute';
import PublicRoute from '../guards/PublicRoute';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Loading Spinner for admin sub-routes
import LoadingScreen from '../components/common/LoadingScreen';

// Lazy Load Pages
const LoginPage = lazy(() => import('../pages/auth/Login/LoginPage'));
const VerifyOTPPage = lazy(() => import('../pages/auth/VerifyOTP/VerifyOTPPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPassword/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPassword/ResetPasswordPage'));
const SuccessPage = lazy(() => import('../pages/auth/Success/SuccessPage'));

const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const UsersPage = lazy(() => import('../pages/users/UsersPage'));
const UserDetailsPage = lazy(() => import('../pages/users/UserDetailsPage'));
const AppointmentRequestsPage = lazy(() => import('../../pages/appointments/AppointmentRequestsPage'));

// Admin root selector that redirects based on login state
const AdminRootRedirect = () => {
  const token = localStorage.getItem('nb_admin_access_token') || sessionStorage.getItem('nb_admin_access_token');
  return token ? <Navigate to="dashboard" replace /> : <Navigate to="login" replace />;
};

export const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Admin Root Redirector */}
        <Route path="/" element={<AdminRootRedirect />} />

        {/* 1. PUBLIC AUTHENTICATION GROUP */}
        <Route
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="verify-otp" element={<VerifyOTPPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="success" element={<SuccessPage />} />
        </Route>

        {/* 2. PROTECTED CONSOLE GROUP */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:userId" element={<UserDetailsPage />} />
          <Route path="appointments/requests" element={<AppointmentRequestsPage />} />
          {/* Redirect all other console sub-paths back to dashboard */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>

        {/* Catch-all fallback inside /admin/* */}
        <Route path="*" element={<AdminRootRedirect />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
