# Neuro Blooms Frontend – Architecture Documentation
## Modular, Feature-Based Project Structure

This project is built using a **Feature-First / Domain-Driven Architecture**. Business capabilities are isolated into independent, self-contained features, promoting modularity, ease of scalability, and separation of concerns.

---

## 1. Project Directory Structure

```
Neuro-Bloomes-Frontend/
├── src/
│   ├── api/                    # Centralized Shared API Layer
│   │   ├── adminApi.js         # Base client for protected console requests (refresh, interceptors)
│   │   └── publicApi.js        # Base client for public API requests
│   │
│   ├── assets/                 # Shared static assets (images, icons, brand assets)
│   │
│   ├── components/             # Reusable Shared UI Components
│   │   ├── appointment/        # Shared website appointment modal components
│   │   ├── common/             # Atomic, generic layout controls (Logo, Spinner, Spinner, Button, etc.)
│   │   └── layout/             # Shared public site headers and footers (Navbar, Footer, etc.)
│   │
│   ├── features/               # Isolated Feature Modules
│   │   ├── auth/               # Authentication & Authorization Feature
│   │   │   ├── components/     # Local auth UI components (OTPInput, PasswordInput, etc.)
│   │   │   ├── constants/      # Feature constants (endpoint strings, action keys)
│   │   │   ├── hooks/          # useAuth custom authentication action hook
│   │   │   ├── pages/          # Login, OTP, ForgotPassword, ResetPassword, Success Pages
│   │   │   ├── services/       # auth.service wrapper invoking auth endpoints
│   │   │   ├── store/          # Zustand store for authentication state management
│   │   │   └── routes.jsx      # Authentication sub-routes list
│   │   │
│   │   ├── dashboard/          # Admin Console shell feature
│   │   │   ├── components/     # Local console widgets (Sidebar.jsx, sidebarConfig.js, TopbarPlaceholder.jsx)
│   │   │   ├── layouts/        # DashboardLayout structure containing topbar, sidebar, main area
│   │   │   ├── pages/          # DashboardHome placeholder page
│   │   │   └── routes.jsx      # Admin console sub-routes list
│   │   │
│   │   └── public-site/        # Public Website Feature
│   │       ├── data/           # Mock data and static page configs
│   │       ├── hooks/          # Public React Query API hooks (useDoctors, useBlogs, etc.)
│   │       ├── pages/          # Public-facing pages (Home, About, Services, Programs, Blog, FAQ)
│   │       ├── services/       # Service endpoints wrappers (appointment, blogs, contact, etc.)
│   │       └── routes.jsx      # Public website sub-routes list
│   │
│   ├── guards/                 # Routing Access Guards
│   │   ├── ProtectedRoute.jsx  # Blocks unauthenticated access to console routes
│   │   └── PublicRoute.jsx     # Blocks authenticated access to login/auth pages
│   │
│   ├── layouts/                # Shared App Layout Frames
│   │   ├── AuthLayout.jsx      # Auth screen grid frame
│   │   └── MainLayout.jsx      # Public site navigation frame
│   │
│   ├── router/                 # Unified Routing Orchestrator
│   │   └── AppRoutes.jsx       # Consolidated routes mapping
│   │
│   ├── styles/                 # Tailwind CSS & Global CSS configuration
│   │
│   └── utils/                  # Reusable Helper Utilities & Routing Constants
```

---

## 2. Core Architecture Principles

### I. Feature Isolation (Colocation)
Each folder under `src/features/` owns everything it needs to function. Placing components, hooks, stores, and API calls within the folder of the feature that consumes them prevents business logic from scattering.
- **Rule**: A feature should only depend on components from the **Shared Layer** or public exports of other features. 
- **Avoid Circular Dependencies**: Features must never directly import from other features' internal directories.

### II. Centralized Shared Layer
Generic components and utilities are stored at the top-level of `src/` to be shared.
- `src/components/common/`: Contains generic, atomic elements (e.g. buttons, spinners, loaders) that contain no business logic.
- `src/utils/`: Generic utility helpers like string formatting, token parsers, and local storage wrappers.
- `src/api/`: Base API configurations (`adminApi` and `publicApi`) defining Axios client settings, request timeout limits, and token interceptor actions.

### III. Layout-View Separation
Layouts define visual skeletons and route outlets, completely decoupled from page-specific content:
- `MainLayout`: Public-facing website pages (header, outlet, footer).
- `AuthLayout`: Side illustration and centered card grid.
- `DashboardLayout`: Responsive sidebar drawer and page topbar wrappers.

---

## 3. Routing Architecture

Routing is modularized. Rather than maintaining a centralized list of pages, each feature maintains its own sub-routes inside its local `routes.jsx` definition:

#### Example: `src/features/auth/routes.jsx`
```javascript
import React, { lazy } from 'react';

const LoginPage = lazy(() => import('./pages/Login/LoginPage').then(m => ({ default: m.LoginPage })));
const VerifyOTPPage = lazy(() => import('./pages/VerifyOTP/VerifyOTPPage').then(m => ({ default: m.VerifyOTPPage })));

export const authRoutes = [
  { path: 'login', element: <LoginPage /> },
  { path: 'verify-otp', element: <VerifyOTPPage /> },
];
```

The unified router `src/router/AppRoutes.jsx` dynamically registers these routes by mapping over the arrays:

```javascript
import { authRoutes } from '../features/auth/routes';

export const AppRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      {authRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Route>
  </Routes>
);
```

---

## 4. Scalability Guide: Adding a New Feature

To add a new feature (e.g. `appointments`) to the admin panel:

1. **Create the Feature Folder**:
   Create a folder under `src/features/appointments/` containing `pages/`, `components/`, `services/`, and a `routes.jsx` file.
2. **Implement Feature Logic**:
   Write appointments-related pages and hooks locally in that folder.
3. **Register Local Routes**:
   Define route list inside `src/features/appointments/routes.jsx`:
   ```javascript
   import React, { lazy } from 'react';
   const AppointmentsList = lazy(() => import('./pages/AppointmentsList'));

   export const appointmentRoutes = [
     { path: 'appointments', element: <AppointmentsList /> }
   ];
   ```
4. **Mount in AppRoutes**:
   Import `appointmentRoutes` in `src/router/AppRoutes.jsx` and map it inside the `ProtectedRoute` Route component:
   ```javascript
   import { appointmentRoutes } from '../features/appointments/routes';

   // Inside <Routes> / <Route element={<DashboardLayout />}>:
   {appointmentRoutes.map(route => (
     <Route key={route.path} path={route.path} element={route.element} />
   ))}
   ```
