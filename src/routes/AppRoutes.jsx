import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ROUTES } from '../utils/routes';

// Lazy load pages
const HomePage = lazy(() => import('../pages/Home/HomePage'));
const AboutPage = lazy(() => import('../pages/About/AboutPage'));
const ServicesPage = lazy(() => import('../pages/Services/ServicesPage'));
const ServiceDetailsPage = lazy(() => import('../pages/Services/ServiceDetailsPage'));
const ProgramsPage = lazy(() => import('../pages/Programs/ProgramsPage'));
const DoctorDetailsPage = lazy(() => import('../pages/Doctors/DoctorDetailsPage'));
const AppointmentPage = lazy(() => import('../pages/Appointment/AppointmentPage'));
const BlogPage = lazy(() => import('../pages/Blog/BlogPage'));
const BlogDetailsPage = lazy(() => import('../pages/Blog/BlogDetailsPage'));
const FAQPage = lazy(() => import('../pages/FAQ/FAQPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'));

// Admin routes
const AdminRoutes = lazy(() => import('../admin/routes/AdminRoutes'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" className="min-h-screen" />}>
      <Routes>
        {/* Dedicated Admin Portal Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Public Website Routes */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.SERVICE_DETAILS} element={<ServiceDetailsPage />} />
          <Route path={ROUTES.PROGRAMS} element={<ProgramsPage />} />
          <Route path={ROUTES.DOCTOR} element={<DoctorDetailsPage />} />
          <Route path={ROUTES.SUCCESS_STORIES} element={<HomePage />} />
          <Route path="/success-stories" element={<HomePage />} />
          <Route path={ROUTES.APPOINTMENT} element={<AppointmentPage />} />
          <Route path={ROUTES.BLOG} element={<BlogPage />} />
          <Route path={ROUTES.BLOG_DETAILS} element={<BlogDetailsPage />} />
          <Route path={ROUTES.FAQ} element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};


export default AppRoutes;
