import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const {
    user,
    role,
    isAuthenticated,
    tempEmail,
    isLoading,
    error,
    login,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    resetPasswordWithToken,
    logout,
    clearError,
    setTempEmail
  } = useAuthStore();

  return {
    // State
    user,
    role,
    isAuthenticated,
    tempEmail,
    isLoading,
    error,

    // Actions
    login,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    resetPasswordWithToken,
    logout,
    clearError,
    setTempEmail
  };
};

export default useAuth;
