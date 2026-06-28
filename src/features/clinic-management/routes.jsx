import React, { lazy } from 'react';

const ClinicSettingsPage = lazy(() => import('./pages/ClinicSettingsPage').then(m => ({ default: m.ClinicSettingsPage })));
const WeeklySchedulePage = lazy(() => import('./pages/WeeklySchedulePage').then(m => ({ default: m.WeeklySchedulePage })));
const ClinicHolidaysPage = lazy(() => import('./pages/ClinicHolidaysPage').then(m => ({ default: m.ClinicHolidaysPage })));
const ClinicBreaksPage = lazy(() => import('./pages/ClinicBreaksPage').then(m => ({ default: m.ClinicBreaksPage })));

export const clinicManagementRoutes = [
  { path: 'clinic-settings', element: <ClinicSettingsPage /> },
  { path: 'weekly-schedule', element: <WeeklySchedulePage /> },
  { path: 'holidays', element: <ClinicHolidaysPage /> },
  { path: 'breaks', element: <ClinicBreaksPage /> },
];
