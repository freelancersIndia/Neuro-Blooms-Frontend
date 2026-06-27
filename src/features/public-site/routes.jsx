import React, { lazy } from 'react';
import { ROUTES } from '../../utils/routes';

const HomePage = lazy(() => import('./pages/Home/HomePage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const ServicesPage = lazy(() => import('./pages/Services/ServicesPage'));
const ServiceDetailsPage = lazy(() => import('./pages/Services/ServiceDetailsPage'));
const ProgramsPage = lazy(() => import('./pages/Programs/ProgramsPage'));
const DoctorDetailsPage = lazy(() => import('./pages/Doctors/DoctorDetailsPage'));
const AppointmentPage = lazy(() => import('./pages/Appointment/AppointmentPage'));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage'));
const BlogDetailsPage = lazy(() => import('./pages/Blog/BlogDetailsPage'));
const FAQPage = lazy(() => import('./pages/FAQ/FAQPage'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage'));

export const publicSiteRoutes = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.ABOUT, element: <AboutPage /> },
  { path: ROUTES.SERVICES, element: <ServicesPage /> },
  { path: ROUTES.SERVICE_DETAILS, element: <ServiceDetailsPage /> },
  { path: ROUTES.PROGRAMS, element: <ProgramsPage /> },
  { path: ROUTES.DOCTOR, element: <DoctorDetailsPage /> },
  { path: ROUTES.SUCCESS_STORIES, element: <HomePage /> },
  { path: '/success-stories', element: <HomePage /> },
  { path: ROUTES.APPOINTMENT, element: <AppointmentPage /> },
  { path: ROUTES.BLOG, element: <BlogPage /> },
  { path: ROUTES.BLOG_DETAILS, element: <BlogDetailsPage /> },
  { path: ROUTES.FAQ, element: <FAQPage /> },
  { path: '*', element: <NotFoundPage /> },
];
