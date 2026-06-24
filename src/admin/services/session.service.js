import adminApi from './api';

const isNetworkError = (error) => {
  return !error.response && (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('timeout'));
};

// Local storage mock sessions to persist revocation in offline mode
let mockSessions = [
  {
    id: '8fa02b9e-648c-4f9e-a89e-49b82cce79d2',
    ip_address: '192.168.1.50',
    browser: 'Chrome 125.0.0',
    device: 'Desktop',
    login_at: new Date(Date.now() - 3600000).toISOString(), // 1h ago
    last_activity: new Date(Date.now() - 60000).toISOString(), // 1m ago
    is_active: true
  },
  {
    id: 'b2d42a9e-128c-4f9e-a89e-49b82cce79d3',
    ip_address: '192.168.1.102',
    browser: 'Safari 17.2',
    device: 'Mobile',
    login_at: new Date(Date.now() - 7200000).toISOString(), // 2h ago
    last_activity: new Date(Date.now() - 120000).toISOString(), // 2m ago
    is_active: true
  }
];

const sessionService = {
  /**
   * List all active sessions
   */
  getActiveSessions: async () => {
    try {
      const response = await adminApi.get('/api/v1/sessions/');
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Session Service] Backend offline/404, applying mock fallback for active sessions.');
        return {
          success: true,
          message: 'Active sessions retrieved successfully. (Mock)',
          data: mockSessions.filter(s => s.is_active)
        };
      }
      throw error;
    }
  },

  /**
   * Revoke a specific session
   * @param {string} sessionId
   */
  revokeSession: async (sessionId) => {
    try {
      const response = await adminApi.delete(`/api/v1/sessions/${sessionId}/`);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Session Service] Backend offline/404, applying mock fallback for session revocation.');
        mockSessions = mockSessions.map(s => s.id === sessionId ? { ...s, is_active: false } : s);
        return {
          success: true,
          message: 'Session revoked successfully. (Mock)',
          data: null
        };
      }
      throw error;
    }
  }
};

export default sessionService;
