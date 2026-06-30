import React, { lazy } from 'react';

const UsersPage = lazy(() => import('./pages/UsersPage').then(m => ({ default: m.UsersPage })));
const UserDetailsPage = lazy(() => import('./pages/UserDetailsPage').then(m => ({ default: m.UserDetailsPage })));

export const usersRoutes = [
  { path: 'users', element: <UsersPage /> },
  { path: 'users/:id', element: <UserDetailsPage /> },
];
export default usersRoutes;
