import React, { lazy } from 'react';

const DoctorAvailabilityPage = lazy(() => import('./pages/DoctorAvailabilityPage').then(m => ({ default: m.DoctorAvailabilityPage })));
const DoctorWorkingDaysPage = lazy(() => import('./pages/DoctorWorkingDaysPage').then(m => ({ default: m.DoctorWorkingDaysPage })));
const DoctorLeavesPage = lazy(() => import('./pages/DoctorLeavesPage').then(m => ({ default: m.DoctorLeavesPage })));
const DoctorBlockedTimePage = lazy(() => import('./pages/DoctorBlockedTimePage').then(m => ({ default: m.DoctorBlockedTimePage })));

export const doctorRoutes = [
  { path: 'doctors/availability', element: <DoctorAvailabilityPage /> },
  { path: 'doctors/working-days', element: <DoctorWorkingDaysPage /> },
  { path: 'doctors/leaves', element: <DoctorLeavesPage /> },
  { path: 'doctors/blocked-time', element: <DoctorBlockedTimePage /> },
];
