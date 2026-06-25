import adminApi from './api';
import { dummyUsers } from '../pages/users/data/users';

const isNetworkError = (error) => {
  return !error.response && (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('timeout'));
};

const getInitials = (fullName) => {
  if (!fullName) return '';
  return fullName
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const parsePhoneNumber = (phone) => {
  if (!phone) return { countryCode: '+91', phone: '' };
  const codes = ['+91', '+1', '+44', '+61'];
  for (const code of codes) {
    if (phone.startsWith(code)) {
      return {
        countryCode: code,
        phone: phone.slice(code.length)
      };
    }
  }
  return { countryCode: '+91', phone };
};

const mapApiUserToFrontend = (item) => {
  const joinedDate = item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  const createdAt = item.created_at ? new Date(item.created_at).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
  const updatedAt = item.updated_at ? new Date(item.updated_at).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
  const lastLoginStr = item.last_login ? new Date(item.last_login).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Never';
  const parsedPhone = parsePhoneNumber(item.phone_number);
  
  return {
    id: item.id,
    firstName: item.first_name,
    lastName: item.last_name,
    fullName: item.full_name,
    email: item.email,
    phone: parsedPhone.phone,
    avatar: item.profile_image || '',
    initials: getInitials(item.full_name),
    status: item.is_active ? 'Active' : 'Disabled',
    roles: item.roles || [],
    emailVerified: item.is_verified,
    phoneVerified: false,
    twoFactor: true,
    accountLockStatus: item.is_locked ? 'Locked' : 'Unlocked',
    failedLoginAttempts: item.failed_login_attempts || 0,
    joinedDate: joinedDate,
    createdAt: createdAt,
    updatedAt: updatedAt,
    lastLogin: lastLoginStr,
    lastLoginIp: '—',
    lastLoginLocation: '—',
    countryCode: parsedPhone.countryCode,
    username: item.email ? item.email.split('@')[0] : '',
    forcePasswordChange: true,
  };
};

const userService = {
  /**
   * Fetch registered users list with search, pagination and role/status filters.
   */
  getUsers: async (params = {}) => {
    try {
      const apiParams = {
        page: params.page || 1,
        page_size: params.page_size || 12,
      };

      if (params.search) {
        apiParams.search = params.search;
      }

      if (params.role && params.role !== 'ALL') {
        apiParams.role = params.role.toUpperCase();
      }

      if (params.is_active !== undefined && params.is_active !== 'ALL') {
        if (params.is_active === 'ACTIVE' || params.is_active === 'true' || params.is_active === true) {
          apiParams.is_active = 'true';
        } else if (params.is_active === 'INACTIVE' || params.is_active === 'false' || params.is_active === false) {
          apiParams.is_active = 'false';
        }
      }

      const response = await adminApi.get('/api/v1/users/', { params: apiParams });

      if (response.data && response.data.success && response.data.data) {
        const payload = response.data.data;
        return {
          success: true,
          message: response.data.message || 'Users retrieved successfully.',
          data: {
            count: payload.count,
            page: payload.page,
            page_size: payload.page_size,
            total_pages: payload.total_pages,
            next: payload.next,
            previous: payload.previous,
            results: (payload.results || []).map(item => ({
              id: item.id,
              name: item.full_name,
              email: item.email,
              phone: item.phone_number || '',
              avatar: item.profile_image || '',
              initials: getInitials(item.full_name),
              roles: item.roles || [],
              status: item.is_active ? 'Active' : 'Inactive',
              verification: item.is_verified ? 'Verified' : 'Pending',
              createdAt: item.created_at
            }))
          }
        };
      }
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[User Service] Backend offline/404, applying mock fallback for users list.');
        
        // Dynamic filtering in fallback mock
        let results = [...dummyUsers];
        
        if (params.search) {
          const q = params.search.toLowerCase();
          results = results.filter(u =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.phone.includes(q)
          );
        }

        if (params.role && params.role !== 'ALL') {
          results = results.filter(u => u.roles.includes(params.role.toUpperCase()));
        }

        if (params.is_active !== undefined && params.is_active !== 'ALL') {
          const isActiveVal = params.is_active === 'ACTIVE' || params.is_active === 'true' || params.is_active === true;
          results = results.filter(u => {
            const isUserActive = u.status.toUpperCase() === 'ACTIVE';
            return isUserActive === isActiveVal;
          });
        }

        const page = params.page || 1;
        const pageSize = params.page_size || 12;
        const totalCount = results.length;
        const totalPages = Math.ceil(totalCount / pageSize) || 1;
        const startIndex = (page - 1) * pageSize;
        const slicedResults = results.slice(startIndex, startIndex + pageSize);

        return {
          success: true,
          message: 'Users retrieved successfully. (Mock)',
          data: {
            count: totalCount,
            page: page,
            page_size: pageSize,
            total_pages: totalPages,
            next: page < totalPages ? `mock-next-page-${page + 1}` : null,
            previous: page > 1 ? `mock-prev-page-${page - 1}` : null,
            results: slicedResults
          }
        };
      }
      throw error;
    }
  },

  /**
   * Fetch aggregate user counts by verification and active statuses.
   */
  getUserStatistics: async () => {
    try {
      const response = await adminApi.get('/api/v1/users/statistics/');
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[User Service] Backend offline/404, applying mock fallback for user statistics.');
        return {
          success: true,
          message: 'User statistics retrieved successfully. (Mock)',
          data: {
            total_users: 127,
            verified_users: 86,
            active_users: 98,
            inactive_users: 29
          }
        };
      }
      throw error;
    }
  },

  /**
   * Create a new system user.
   */
  createUser: async (userData) => {
    try {
      const hasImage = userData.profile_image instanceof File;
      
      let payload;
      let headers = {};
      
      if (hasImage) {
        payload = new FormData();
        payload.append('first_name', userData.first_name);
        payload.append('last_name', userData.last_name);
        payload.append('email', userData.email);
        payload.append('password', userData.password);
        
        if (userData.phone_number) {
          payload.append('phone_number', userData.phone_number);
        }
        if (userData.profile_image) {
          payload.append('profile_image', userData.profile_image);
        }
        
        payload.append('is_active', String(userData.is_active));
        payload.append('is_verified', String(userData.is_verified));
        
        // Append roles list for FormData
        userData.roles.forEach(role => {
          payload.append('roles', role);
        });
        
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        payload = {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: userData.password,
          phone_number: userData.phone_number || null,
          roles: userData.roles,
          is_active: userData.is_active,
          is_verified: userData.is_verified
        };
      }
      
      const response = await adminApi.post('/api/v1/users/', payload, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetch details for a specific user.
   */
  getUserDetails: async (userId) => {
    try {
      const response = await adminApi.get(`/api/v1/users/${userId}/`);
      if (response.data && response.data.success && response.data.data) {
        return {
          success: true,
          message: response.data.message || 'User details retrieved successfully.',
          data: mapApiUserToFrontend(response.data.data)
        };
      }
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[User Service] Backend offline/404, applying mock fallback for user details.');
        return {
          success: true,
          message: 'User details retrieved successfully. (Mock)',
          data: { ...userDetails, id: userId }
        };
      }
      throw error;
    }
  },

  /**
   * Update a user account.
   */
  updateUser: async (userId, userData) => {
    try {
      const hasImage = userData.profile_image instanceof File;
      
      let payload;
      let headers = {};
      
      if (hasImage) {
        payload = new FormData();
        if (userData.first_name !== undefined) payload.append('first_name', userData.first_name);
        if (userData.last_name !== undefined) payload.append('last_name', userData.last_name);
        if (userData.email !== undefined) payload.append('email', userData.email);
        if (userData.phone_number !== undefined) {
          payload.append('phone_number', userData.phone_number || '');
        }
        if (userData.profile_image) {
          payload.append('profile_image', userData.profile_image);
        }
        if (userData.is_active !== undefined) payload.append('is_active', String(userData.is_active));
        if (userData.is_verified !== undefined) payload.append('is_verified', String(userData.is_verified));
        
        if (userData.roles) {
          userData.roles.forEach(role => {
            payload.append('roles', role);
          });
        }
        
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        payload = {};
        if (userData.first_name !== undefined) payload.first_name = userData.first_name;
        if (userData.last_name !== undefined) payload.last_name = userData.last_name;
        if (userData.email !== undefined) payload.email = userData.email;
        if (userData.phone_number !== undefined) payload.phone_number = userData.phone_number;
        if (userData.roles !== undefined) payload.roles = userData.roles;
        if (userData.is_active !== undefined) payload.is_active = userData.is_active;
        if (userData.is_verified !== undefined) payload.is_verified = userData.is_verified;
      }
      
      const response = await adminApi.patch(`/api/v1/users/${userId}/`, payload, { headers });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Lock a user account.
   */
  lockUser: async (userId) => {
    try {
      const response = await adminApi.post(`/api/v1/users/${userId}/lock/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Unlock a user account.
   */
  unlockUser: async (userId) => {
    try {
      const response = await adminApi.post(`/api/v1/users/${userId}/unlock/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a user account.
   */
  deleteUser: async (userId) => {
    try {
      const response = await adminApi.delete(`/api/v1/users/${userId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default userService;
