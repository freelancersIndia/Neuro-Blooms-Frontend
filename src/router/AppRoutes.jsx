import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Shared layouts, components, and guards
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProtectedRoute from '../guards/ProtectedRoute';
import PublicRoute from '../guards/PublicRoute';

// Relocated layout from dashboard module
import { DashboardLayout } from '../features/dashboard/layouts/DashboardLayout';

// Modular Feature Route Definitions
import { authRoutes } from '../features/auth/routes';
import { dashboardRoutes } from '../features/dashboard/routes';
import { publicSiteRoutes } from '../features/public-site/routes';

// Admin root selector that redirects based on login state
const AdminRootRedirect = () => {
  const token = localStorage.getItem('nb_admin_access_token') || sessionStorage.getItem('nb_admin_access_token');
  return token ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/admin/login" replace />;
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" className="min-h-screen" />}>
      <Routes>
        {/* Admin/Auth routes group */}
        <Route path="/admin">
          {/* Root Redirector */}
          <Route index element={<AdminRootRedirect />} />

          {/* Public Auth routes */}
          <Route
            element={
              <PublicRoute>
                <AuthLayout />
              </PublicRoute>
            }
          >
            {authRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>

          {/* Protected Console routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {dashboardRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            {/* Catch-all fallback inside /admin/* */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Route>

        {/* Public Website Routes */}
        <Route element={<MainLayout />}>
          {publicSiteRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
