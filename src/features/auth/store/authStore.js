import { create } from 'zustand';
import authService from '../services/auth.service';
import storage from '../../../utils/storage';

export const useAuthStore = create((set, get) => {
  // Initialize state from storage
  const accessToken = storage.getAccessToken();
  const refreshToken = storage.getRefreshToken();
  const user = storage.getUser();
  const role = storage.getRole();

  // Listen to global session expiration event
  if (typeof window !== 'undefined') {
    window.addEventListener('nb-admin-auth-expired', () => {
      set({
        accessToken: null,
        refreshToken: null,
        user: null,
        role: null,
        isAuthenticated: false,
        tempEmail: '',
        error: 'Session expired. Please log in again.'
      });
    });
  }

  return {
    // State
    accessToken,
    refreshToken,
    user,
    role,
    isAuthenticated: !!accessToken,
    tempEmail: '',
    isLoading: false,
    error: null,

    // Actions
    clearError: () => set({ error: null }),
    setTempEmail: (email) => set({ tempEmail: email }),

    login: async (email, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await authService.login(email, password);
        if (response.success) {
          set({ tempEmail: email, isLoading: false });
          return { success: true };
        }
        throw new Error(response.message || 'Login failed');
      } catch (err) {
        set({ error: err.message, isLoading: false });
        return { success: false, error: err.message };
      }
    },

    verifyOTP: async (otp_code, rememberDevice = false) => {
      const { tempEmail } = get();
      if (!tempEmail) {
        set({ error: 'Session email not found. Please log in again.' });
        return { success: false, error: 'Session email not found' };
      }

      set({ isLoading: true, error: null });
      try {
        const response = await authService.verifyOTP(tempEmail, otp_code);
        if (response.success && response.data) {
          const { access, refresh, user } = response.data;
          let userRole = 'ADMIN';
          if (user.role) {
            userRole = user.role;
          } else if (user.roles && user.roles.length > 0) {
            if (user.roles.includes('ADMIN')) {
              userRole = 'ADMIN';
            } else {
              userRole = user.roles[0];
            }
          }

          // Save to storage
          storage.setAccessToken(access, rememberDevice);
          storage.setRefreshToken(refresh, rememberDevice);
          storage.setUser(user, rememberDevice);
          storage.setRole(userRole, rememberDevice);
          storage.setRememberDevice(rememberDevice);

          // Update store
          set({
            accessToken: access,
            refreshToken: refresh,
            user,
            role: userRole,
            isAuthenticated: true,
            isLoading: false
          });

          return { success: true };
        }
        throw new Error(response.message || 'OTP verification failed');
      } catch (err) {
        set({ error: err.message, isLoading: false });
        return { success: false, error: err.message };
      }
    },

    resendOTP: async (purpose) => {
      const { tempEmail } = get();
      if (!tempEmail) {
        return { success: false, error: 'Session email not found' };
      }

      try {
        const response = await authService.resendOTP(tempEmail, purpose);
        return { success: response.success, message: response.message };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    forgotPassword: async (email) => {
      set({ isLoading: true, error: null });
      try {
        const response = await authService.forgotPassword(email);
        if (response.success) {
          set({ tempEmail: email, isLoading: false });
          return { success: true };
        }
        throw new Error(response.message || 'Forgot password request failed');
      } catch (err) {
        set({ error: err.message, isLoading: false });
        return { success: false, error: err.message };
      }
    },

    resetPassword: async (otp_code, new_password, confirm_password) => {
      const { tempEmail } = get();
      if (!tempEmail) {
        set({ error: 'Session email not found. Please initiate password reset again.' });
        return { success: false, error: 'Session email not found' };
      }

      set({ isLoading: true, error: null });
      try {
        // Step 1: Verify OTP with purpose 'PASSWORD_RESET' to get the signed token
        const verifyRes = await authService.verifyOTP(tempEmail, otp_code, 'PASSWORD_RESET');
        if (!verifyRes.success || !verifyRes.data?.token) {
          throw new Error(verifyRes.message || 'OTP verification failed.');
        }

        const resetToken = verifyRes.data.token;

        // Step 2: Use the token to reset the password
        const response = await authService.resetPassword(resetToken, new_password, confirm_password);
        if (response.success) {
          set({ isLoading: false });
          return { success: true };
        }
        throw new Error(response.message || 'Password reset failed.');
      } catch (err) {
        set({ error: err.message, isLoading: false });
        return { success: false, error: err.message };
      }
    },

    resetPasswordWithToken: async (token, new_password, confirm_password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await authService.resetPassword(token, new_password, confirm_password);
        if (response.success) {
          set({ isLoading: false });
          return { success: true };
        }
        throw new Error(response.message || 'Password reset failed.');
      } catch (err) {
        set({ error: err.message, isLoading: false });
        return { success: false, error: err.message };
      }
    },

    logout: async () => {
      const { refreshToken } = get();
      set({ isLoading: true });
      try {
        if (refreshToken) {
          await authService.logout(refreshToken);
        }
      } catch (err) {
        console.error('Logout API call failed:', err);
      } finally {
        // Always clear client-side auth state
        storage.clearAll();
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          role: null,
          isAuthenticated: false,
          tempEmail: '',
          isLoading: false,
          error: null
        });
      }
    }
  };
});
