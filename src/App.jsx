import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';

import { AppointmentModalProvider } from './context/AppointmentModalContext';

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppointmentModalProvider>
          <AppRoutes />
        </AppointmentModalProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
