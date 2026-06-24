export const AUTH_ENDPOINTS = {
  LOGIN: '/api/v1/auth/login/',
  VERIFY_OTP: '/api/v1/auth/verify-otp/',
  REFRESH: '/api/v1/auth/refresh/',
  LOGOUT: '/api/v1/auth/logout/',
  FORGOT_PASSWORD: '/api/v1/auth/forgot-password/',
  RESET_PASSWORD: '/api/v1/auth/reset-password/',
  RESEND_OTP: '/api/v1/auth/resend-otp/'
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'nb_admin_access_token',
  REFRESH_TOKEN: 'nb_admin_refresh_token',
  USER: 'nb_admin_user',
  ROLE: 'nb_admin_role',
  REMEMBER: 'nb_admin_remember_device'
};

export const ROLES = {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  RECEPTIONIST: 'RECEPTIONIST'
};

export const OTP_PURPOSES = {
  LOGIN_VERIFICATION: 'LOGIN_VERIFICATION',
  PASSWORD_RESET: 'PASSWORD_RESET'
};

export const OTP_CONFIG = {
  EXPIRY_SECONDS: 300, // 5 minutes standard
  RESEND_COOLDOWN: 30 // 30 seconds cooldown for resending
};
