import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthIllustration from '../components/auth/AuthIllustration';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-body antialiased selection:bg-admin-blue-100 selection:text-admin-blue-800 overflow-hidden">
      
      {/* Left Panel - Brand, Tagline, Illustration & Badges (Sticky 50% width on desktop) */}
      <div className="hidden md:block md:w-1/2 h-screen sticky top-0 bg-[#ECF4FF]">
        <AuthIllustration />
      </div>

      {/* Right Panel - Centered Auth Forms (Fits 100% height without scrolling) */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center py-6 px-6 sm:px-12 lg:px-16 overflow-y-auto bg-white">
        <div className="w-full max-w-[390px] mx-auto flex flex-col justify-center py-2">
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};

export default AuthLayout;
