# Neuro Blooms Admin Console

The modern, high-performance administrative console for the **Neuro Blooms Healthcare Management System**, built with React, Vite, and Tailwind CSS. It features real-time dashboard analytics, role-based access control (RBAC), active session management, and a comprehensive security audit ledger.

---

## Key Features

- **Dynamic Analytics Dashboard**: A central hub showing key system metrics (total users, active doctors, session counts, locked accounts, and recent security events) along with real-time distribution charts.
- **Role-Based Access Control (RBAC)**: Custom route guarding for administrative staff, doctors, and receptionists.
- **Session Management**: Lists all active logins with details on browser, device, and IP address. Includes remote session revocation capabilities.
- **Security Auditing (Security Center)**: A real-time timeline tracking critical events (logins, failures, account locks/unlocks) with severity-coded indicators.
- **Timezone-Aware Greeting**: Dynamic, location-aware header greeting set to Indian Standard Time (`Asia/Kolkata`).
- **Resilient Offline Mode**: Robust mock service workers and fallbacks that seamlessly activate when the backend is offline, providing a high-fidelity local demonstration.
- **Automatic Token Refresh**: Global Axios interceptors that automatically handle JWT access token expiration and queue failed requests during refresh cycles.

---

## Technology Stack

- **Framework**: React 18+
- **Build Tool**: Vite (Fast HMR)
- **Styling**: Tailwind CSS (Sleek, responsive glassmorphic layouts)
- **State Management**: Zustand (Lightweight, persistent store mapping)
- **Icons**: Lucide React
- **API Client**: Axios with custom request/response interceptors

---

## Directory Structure

```text
src/
├── admin/
│   ├── components/      # Common UI components (Loading screens, card grids)
│   ├── constants/       # Global app constants (Auth endpoints)
│   ├── guards/          # Route protection guards (ProtectedRoute, PublicRoute)
│   ├── hooks/           # Custom React hooks (useAuth)
│   ├── layouts/         # High-level shell layouts (DashboardLayout, AuthLayout)
│   ├── pages/           # Screen views (Auth, Dashboard, Settings, Users, Security)
│   ├── routes/          # Admin routing tables
│   ├── services/        # Service layer for API integrations (api.js, session.service.js)
│   ├── store/           # Zustand global state stores (authStore.js)
│   └── utils/           # Helper utilities (storage.js)
└── styles/              # Global styling configurations
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd Neuro-Bloomes-Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and specify the backend API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1/
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173/` (or the port specified in your console).

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## Integration Details

### Authentication Flow
The console interacts with the backend using JWT.
1. The user logs in via credentials.
2. An OTP is sent and verified via `/auth/verify-otp/`.
3. The backend returns access/refresh tokens along with user profiles (including avatar URLs).
4. The frontend saves tokens in `localStorage` and automatically attaches them to subsequent requests.

### Service Failover
If the backend server is unreachable or returns a `404/502` error, the services (`session.service.js`, `security.service.js`) automatically switch to a high-fidelity local mock dataset. This allows developers and stakeholders to fully explore the UI interactions offline.
