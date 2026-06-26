import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/layout/ScrollToTop';
import AppointmentModal from '../components/appointment/AppointmentModal';
import { useAppointmentModal } from '../context/AppointmentModalContext';
import { ROUTES } from '../utils/routes';
import { Toaster } from 'react-hot-toast';

export const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useAppointmentModal();
  const isHome = location.pathname === '/';

  // Intercept navigation to /appointment or /contact to trigger the full-screen modal
  useEffect(() => {
    if (location.pathname === ROUTES.APPOINTMENT || location.pathname === '/contact') {
      openModal();
      
      // Go back to the previous page or fallback to home
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        navigate(ROUTES.HOME, { replace: true });
      }
    }
  }, [location.pathname, openModal, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <ScrollToTop />
      
      {/* Header / Navbar - Rendered on all pages, styled dynamically */}
      <Navbar isHome={isHome} />

      {/* Main content grid */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast notifications container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Reusable global Booking Modal Popup */}
      <AppointmentModal />
    </div>
  );
};

export default MainLayout;
