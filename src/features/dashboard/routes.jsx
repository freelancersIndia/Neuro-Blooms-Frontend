import React, { lazy } from 'react';

const DashboardHome = lazy(() => import('./pages/DashboardHome').then(m => ({ default: m.DashboardHome })));

export const dashboardRoutes = [
  { path: 'dashboard', element: <DashboardHome /> },
];
