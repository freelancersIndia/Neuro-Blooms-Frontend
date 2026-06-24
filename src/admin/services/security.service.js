import adminApi from './api';

const isNetworkError = (error) => {
  return !error.response && (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('timeout'));
};

const mockLogs = [
  {
    id: 'fa982cc2-d890-449e-b98a-a829be11ea2b',
    user_email: 'admin@neuroblooms.com',
    action: 'ACCOUNT_UNLOCKED',
    description: 'Account unlocked by administrator admin@neuroblooms.com.',
    ip_address: '192.168.1.100',
    created_at: new Date(Date.now() - 120000).toISOString() // 2m ago
  },
  {
    id: '7ac198a2-f900-4bce-928d-29be11ea2b4c',
    user_email: 'Anonymous',
    action: 'FAILED_LOGIN',
    description: 'Failed login attempt for user doctor@neuroblooms.com.',
    ip_address: '203.0.113.5',
    created_at: new Date(Date.now() - 600000).toISOString() // 10m ago
  },
  {
    id: '3ac198a2-f900-4bce-928d-29be11ea2b4d',
    user_email: 'receptionist.sara@neuroblooms.com',
    action: 'USER_CREATED',
    description: 'User receptionist.sara@neuroblooms.com created by admin.',
    ip_address: '192.168.1.100',
    created_at: new Date(Date.now() - 1800000).toISOString() // 30m ago
  },
  {
    id: '4ac198a2-f900-4bce-928d-29be11ea2b4e',
    user_email: 'doctor.john@neuroblooms.com',
    action: 'PASSWORD_CHANGED',
    description: 'User doctor.john@neuroblooms.com changed their password.',
    ip_address: '192.168.1.45',
    created_at: new Date(Date.now() - 2700000).toISOString() // 45m ago
  }
];

const securityService = {
  /**
   * List security logs
   */
  getSecurityLogs: async (params = {}) => {
    try {
      const response = await adminApi.get('/api/v1/security-logs/', { params });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Security Service] Backend offline/404, applying mock fallback for security logs.');
        return {
          success: true,
          message: 'Security logs retrieved successfully. (Mock)',
          data: {
            count: mockLogs.length,
            results: mockLogs
          }
        };
      }
      throw error;
    }
  }
};

export default securityService;
