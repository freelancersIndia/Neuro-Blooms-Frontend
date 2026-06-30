import React, { lazy } from 'react';

const RolesPage = lazy(() => import('./pages/RolesPage').then(m => ({ default: m.RolesPage })));
const RoleDetailsPage = lazy(() => import('./pages/RoleDetailsPage').then(m => ({ default: m.RoleDetailsPage })));

export const rolesRoutes = [
  { path: 'roles', element: <RolesPage /> },
  { path: 'roles/:id', element: <RoleDetailsPage /> },
];
