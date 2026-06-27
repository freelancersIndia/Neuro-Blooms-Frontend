import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store/authStore';

/**
 * Route guard for public-only authentication pages.
 * Redirects logged-in users to the admin dashboard.
 */
export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (isAuthenticated) {
    // If we have a stored redirection path, send them there, otherwise go to dashboard
    const from = location.state?.from?.pathname || '/admin/dashboard';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
