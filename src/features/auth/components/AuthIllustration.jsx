import React from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, ShieldCheck, UserCheck, Lock, Monitor, Cpu } from 'lucide-react';
import Logo from '../../../components/common/Logo';

export const AuthIllustration = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine illustrations, taglines, and badges based on the current auth route
  let imageSrc = '/images/doctor/doctor_office_playroom.png';
  let title = 'Helping Children Grow, Learn & Thrive';
  let description = 'A complete platform to manage care, therapy, appointments and child development.';
  
  let badges = [
    { icon: Shield, label: 'Secure', subLabel: 'Authentication', color: 'text-admin-blue-600 bg-admin-blue-50' },
    { icon: Lock, label: 'OTP Protected', subLabel: 'Access', color: 'text-admin-green-600 bg-admin-green-50' },
    { icon: ShieldCheck, label: 'HIPAA Inspired', subLabel: 'Security', color: 'text-admin-blue-600 bg-admin-blue-50' },
    { icon: Monitor, label: 'Session Tracking', subLabel: 'Enabled', color: 'text-admin-green-600 bg-admin-green-50' }
  ];

  if (path.includes('verify-otp')) {
    imageSrc = '/images/doctor/doctor_office_playroom.png';
    title = 'Secure Access, Better Care';
    description = 'Your security helps us protect every child\'s future.';
    badges = [
      { icon: Shield, label: 'Secure', subLabel: 'Access', color: 'text-admin-blue-600 bg-admin-blue-50' },
      { icon: ShieldCheck, label: 'OTP', subLabel: 'Protected', color: 'text-admin-green-600 bg-admin-green-50' },
      { icon: UserCheck, label: 'Session', subLabel: 'Tracked', color: 'text-admin-blue-600 bg-admin-blue-50' },
      { icon: ShieldCheck, label: 'Your Data', subLabel: 'is Safe', color: 'text-admin-green-600 bg-admin-green-50' }
    ];
  } else if (path.includes('forgot-password')) {
    imageSrc = '/images/doctor/doctor_office_playroom.png';
    title = 'Caring Today, Building Tomorrow';
    description = 'Neuro Blooms helps children grow, learn and thrive with the right care and support.';
    badges = [
      { icon: Shield, label: 'Secure', subLabel: 'Access', color: 'text-admin-blue-600 bg-admin-blue-50' },
      { icon: ShieldCheck, label: 'OTP', subLabel: 'Protected', color: 'text-admin-green-600 bg-admin-green-50' },
      { icon: UserCheck, label: 'Session', subLabel: 'Tracked', color: 'text-admin-blue-600 bg-admin-blue-50' },
      { icon: ShieldCheck, label: 'Your Data', subLabel: 'is Safe', color: 'text-admin-green-600 bg-admin-green-50' }
    ];
  } else if (path.includes('reset-password')) {
    imageSrc = '/images/doctor/doctor_office_playroom.png';
    title = 'Secure Your Account, Continue Your Mission';
    description = 'Create a new password to keep your account secure and continue providing the best care and support.';
    badges = [
      { icon: ShieldCheck, label: 'OTP Protected', subLabel: 'Verification', color: 'text-admin-green-600 bg-admin-green-50' },
      { icon: Lock, label: 'Strong Security', subLabel: 'Encryption', color: 'text-admin-blue-600 bg-admin-blue-50' },
      { icon: ShieldCheck, label: 'Your Data', subLabel: 'is Safe', color: 'text-admin-green-600 bg-admin-green-50' },
      { icon: ShieldCheck, label: 'HIPAA Inspired', subLabel: 'Compliance', color: 'text-admin-blue-600 bg-admin-blue-50' }
    ];
  } else {
    // Default / Login
    imageSrc = '/images/testimonials/father_child.png';
    title = 'Helping Children Grow, Learn & Thrive';
    description = 'A complete platform to manage care, therapy, appointments and child development.';
    badges = [
      { icon: Shield, label: 'Secure', subLabel: 'Authentication', color: 'text-admin-blue-600 bg-admin-blue-50' },
      { icon: Lock, label: 'OTP Protected', subLabel: 'Access', color: 'text-admin-green-600 bg-admin-green-50' },
      { icon: ShieldCheck, label: 'HIPAA Inspired', subLabel: 'Security', color: 'text-admin-blue-600 bg-admin-blue-50' },
      { icon: Monitor, label: 'Session Tracking', subLabel: 'Enabled', color: 'text-admin-green-600 bg-admin-green-50' }
    ];
  }

  return (
    <div className="w-full h-full bg-[#ECF4FF] p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden select-none border-r border-blue-100/30">
      {/* Decorative Vector Polka Dot Grids & Background Blurs */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-blue-200/20 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl pointer-events-none" />
      
      {/* Dynamic Floating Glass Icons in Background */}
      <div className="absolute top-[25%] right-[20%] w-10 h-10 bg-white/60 backdrop-blur-md rounded-full shadow-md flex items-center justify-center border border-white text-admin-blue-600 animate-bounce" style={{ animationDuration: '6s' }}>
        <ShieldCheck className="w-5 h-5" />
      </div>
      <div className="absolute bottom-[35%] left-[8%] w-12 h-12 bg-white/60 backdrop-blur-md rounded-full shadow-md flex items-center justify-center border border-white text-admin-green-600 animate-pulse" style={{ animationDuration: '4s' }}>
        <UserCheck className="w-6 h-6" />
      </div>
      <div className="absolute top-[45%] left-[5%] w-9 h-9 bg-white/50 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center border border-white text-admin-blue-500 animate-bounce" style={{ animationDuration: '8s' }}>
        <Lock className="w-4 h-4" />
      </div>

      {/* Top Brand Logo Section */}
      <div className="relative z-10">
        <Logo size="md" align="left" showText={true} />
      </div>

      {/* Center Tagline & Illustration Container */}
      <div className="flex-1 flex flex-col justify-center my-4 relative z-10">
        {/* Main Title Tagline */}
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight font-display mb-1.5 max-w-md">
          {title}
        </h1>
        {/* Subtitle Description */}
        <p className="text-slate-600 text-xs lg:text-sm font-medium max-w-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Central Dynamic Therapist/Child Illustration */}
        <div className="w-full flex justify-center relative">
          <div className="relative w-[85%] md:w-[80%] aspect-[16/10] max-h-[170px] lg:max-h-[210px] rounded-[1.5rem] overflow-hidden shadow-lg border border-white/60 bg-white/40 backdrop-blur-sm p-2">
            <img
              src={imageSrc}
              alt="Neuro Blooms therapist illustration"
              className="w-full h-full object-cover rounded-xl transition-all duration-700 hover:scale-102"
              onError={(e) => {
                // Safe fallback if image failed to load
                e.target.src = '/assets/hero.png';
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Trust Badge Container */}
      <div className="relative z-10 mt-4 bg-white/80 backdrop-blur-md border border-white/80 p-3.5 rounded-2xl shadow-sm">
        <div className="grid grid-cols-4 gap-2 text-center">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-center">
                <div className={`w-9 h-9 ${badge.color} rounded-xl flex items-center justify-center shadow-sm mb-1.5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-800 leading-tight">
                  {badge.label}
                </span>
                <span className="text-[9px] font-semibold text-slate-500 leading-none mt-0.5">
                  {badge.subLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthIllustration;
