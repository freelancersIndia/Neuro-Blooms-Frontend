import React, { lazy } from 'react';
import { clinicManagementRoutes } from '../clinic-management/routes';

const DashboardHome = lazy(() => import('./pages/DashboardHome').then(m => ({ default: m.DashboardHome })));

export const dashboardRoutes = [
  { path: 'dashboard', element: <DashboardHome /> },
  ...clinicManagementRoutes,
];
