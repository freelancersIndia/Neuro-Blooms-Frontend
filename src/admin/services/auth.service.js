import adminApi from './api';
import { AUTH_ENDPOINTS, OTP_PURPOSES } from '../constants/auth.constants';

// Helper to determine if an error is a network connection error (backend offline)
const isNetworkError = (error) => {
  return !error.response && (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('timeout'));
};

const authService = {
  /**
   * Step 1: Login with credentials
   * @param {string} email 
   * @param {string} password 
   */
  login: async (email, password) => {
    try {
      const response = await adminApi.post(AUTH_ENDPOINTS.LOGIN, { email, password });
      return response.data;
    } catch (error) {
      // Fallback to mock behavior for testing if backend is offline
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Auth Service] Backend offline/404, applying mock fallback for login.');
        if (email === 'admin@neuroblooms.com' && password === 'AdminPassword123') {
          return {
            success: true,
            message: 'Credentials verified. OTP sent.',
            isMock: true
          };
        }
        throw new Error('Invalid email or password. Use admin@neuroblooms.com / AdminPassword123 for testing.');
      }
      throw error;
    }
  },

  /**
   * Step 2: Verify OTP
   * @param {string} email 
   * @param {string} otp_code 
   * @param {string} purpose 
   */
  verifyOTP: async (email, otp_code, purpose = OTP_PURPOSES.LOGIN_VERIFICATION) => {
    try {
      const response = await adminApi.post(AUTH_ENDPOINTS.VERIFY_OTP, {
        email,
        otp_code,
        purpose
      });
      return response.data;
    } catch (error) {
      // Fallback to mock behavior for testing if backend is offline
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Auth Service] Backend offline/404, applying mock fallback for OTP verification.');
        if (otp_code === '123456') {
          if (purpose === OTP_PURPOSES.PASSWORD_RESET) {
            return {
              success: true,
              message: 'OTP verified successfully.',
              isMock: true,
              data: {
                token: `${email || 'superuser@gmail.com'}:PASSWORD_RESET:mock_token_1wcP2l_sIErouKslXbFS5g`
              }
            };
          }
          return {
            success: true,
            isMock: true,
            data: {
              access: 'mock_jwt_access_token_' + Math.random().toString(36).substring(2),
              refresh: 'mock_jwt_refresh_token_' + Math.random().toString(36).substring(2),
              user: {
                id: 1,
                email: email || 'admin@neuroblooms.com',
                name: 'Admin Administrator',
                role: 'ADMIN'
              }
            }
          };
        }
        throw new Error('Invalid verification code. Use 123456 for testing.');
      }
      throw error;
    }
  },

  /**
   * Resend Verification OTP
   * @param {string} email 
   * @param {string} purpose 
   */
  resendOTP: async (email, purpose = OTP_PURPOSES.LOGIN_VERIFICATION) => {
    try {
      const response = await adminApi.post(AUTH_ENDPOINTS.RESEND_OTP, { email, purpose });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Auth Service] Backend offline/404, applying mock fallback for OTP resend.');
        return {
          success: true,
          message: 'OTP resent successfully.',
          isMock: true
        };
      }
      throw error;
    }
  },

  /**
   * Request Password Reset OTP
   * @param {string} email 
   */
  forgotPassword: async (email) => {
    try {
      const response = await adminApi.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Auth Service] Backend offline/404, applying mock fallback for forgot password.');
        if (email === 'admin@neuroblooms.com') {
          return {
            success: true,
            message: 'OTP sent to your email address.',
            isMock: true
          };
        }
        throw new Error('Email address not registered. Use admin@neuroblooms.com for testing.');
      }
      throw error;
    }
  },

  /**
   * Reset Password with OTP Code
   * @param {string} email 
   * @param {string} otp_code 
   * @param {string} new_password 
   */
  resetPassword: async (token, new_password, confirm_password) => {
    try {
      const response = await adminApi.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
        token,
        new_password,
        confirm_password
      });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Auth Service] Backend offline/404, applying mock fallback for reset password.');
        if (token && token.includes('PASSWORD_RESET')) {
          return {
            success: true,
            message: 'Password has been reset successfully.',
            isMock: true,
            data: null
          };
        }
        throw new Error('Invalid or expired verification token.');
      }
      throw error;
    }
  },

  /**
   * Token Logout
   * @param {string} refresh_token 
   */
  logout: async (refresh_token) => {
    try {
      const response = await adminApi.post(AUTH_ENDPOINTS.LOGOUT, { refresh: refresh_token });
      return response.data;
    } catch (error) {
      // Even if network error, we want logout to succeed on client side
      console.warn('[Auth Service] Logout API call encountered error:', error.message);
      return {
        success: true,
        message: 'Logged out successfully (client-side only).',
        isMock: true
      };
    }
  }
};

export default authService;
