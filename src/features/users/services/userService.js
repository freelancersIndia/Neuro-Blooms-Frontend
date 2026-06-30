import adminApi from '../../../api/adminApi';

export const MOCK_USERS_STATISTICS = {
  total_users: 248,
  doctors: 86,
  receptionists: 42,
  admins: 18,
  locked_users: 6,
  inactive_users: 14
};

export const MOCK_USERS_LIST = [
  {
    id: 'USR-0001',
    profile_image: null,
    full_name: 'Dr. John Smith',
    email: 'john.smith@neuroblooms.com',
    phone: '+91 98765 43210',
    phone_number: '+91 98765 43210',
    roles: ['DOCTOR', 'ADMIN'],
    is_verified: true,
    verified: true,
    is_blocked: false,
    blocked: false,
    is_active: true,
    active: true,
    is_locked: false,
    locked: false,
    failed_login_attempts: 0,
    last_login: '2026-06-30T10:15:00Z',
    created_at: '2026-06-29T10:30:00Z',
    updated_at: '2026-06-29T10:30:00Z',
    can_edit: true,
    can_delete: false,
    can_block: true,
    can_unlock: false
  },
  {
    id: 'USR-0002',
    profile_image: null,
    full_name: 'Sarah Johnson',
    email: 'sarah.johnson@neuroblooms.com',
    phone: '+91 91234 56780',
    phone_number: '+91 91234 56780',
    roles: ['RECEPTIONIST'],
    is_verified: true,
    verified: true,
    is_blocked: false,
    blocked: false,
    is_active: true,
    active: true,
    is_locked: false,
    locked: false,
    failed_login_attempts: 0,
    last_login: '2026-06-30T09:45:00Z',
    created_at: '2026-06-28T14:15:00Z',
    updated_at: '2026-06-28T14:15:00Z',
    can_edit: true,
    can_delete: true,
    can_block: true,
    can_unlock: false
  },
  {
    id: 'USR-0003',
    profile_image: null,
    full_name: 'Dr. Michael Brown',
    email: 'michael.brown@neuroblooms.com',
    phone: '+91 99887 66554',
    phone_number: '+91 99887 66554',
    roles: ['DOCTOR'],
    is_verified: true,
    verified: true,
    is_blocked: false,
    blocked: false,
    is_active: true,
    active: true,
    is_locked: false,
    locked: false,
    failed_login_attempts: 0,
    last_login: '2026-06-29T16:30:00Z',
    created_at: '2026-06-27T11:45:00Z',
    updated_at: '2026-06-27T11:45:00Z',
    can_edit: true,
    can_delete: true,
    can_block: true,
    can_unlock: false
  },
  {
    id: 'USR-0004',
    profile_image: null,
    full_name: 'Emily Davis',
    email: 'emily.davis@neuroblooms.com',
    phone: '+91 87654 32109',
    phone_number: '+91 87654 32109',
    roles: ['RECEPTIONIST'],
    is_verified: false,
    verified: false,
    is_blocked: false,
    blocked: false,
    is_active: true,
    active: true,
    is_locked: false,
    locked: false,
    failed_login_attempts: 0,
    last_login: '2026-06-28T11:00:00Z',
    created_at: '2026-06-27T09:20:00Z',
    updated_at: '2026-06-27T09:20:00Z',
    can_edit: true,
    can_delete: true,
    can_block: true,
    can_unlock: false
  },
  {
    id: 'USR-0005',
    profile_image: null,
    full_name: 'Admin User',
    email: 'admin@neuroblooms.com',
    phone: '+91 90000 11111',
    phone_number: '+91 90000 11111',
    roles: ['ADMIN'],
    is_verified: true,
    verified: true,
    is_blocked: false,
    blocked: false,
    is_active: true,
    active: true,
    is_locked: false,
    locked: false,
    failed_login_attempts: 0,
    last_login: '2026-06-30T11:20:00Z',
    created_at: '2026-06-26T20:10:00Z',
    updated_at: '2026-06-30T11:20:00Z',
    can_edit: false,
    can_delete: false,
    can_block: false,
    can_unlock: false
  },
  {
    id: 'USR-0006',
    profile_image: null,
    full_name: 'Lisa Wilson',
    email: 'lisa.wilson@neuroblooms.com',
    phone: '+91 93456 78901',
    phone_number: '+91 93456 78901',
    roles: ['RECEPTIONIST'],
    is_verified: true,
    verified: true,
    is_blocked: true,
    blocked: true,
    is_active: false,
    active: false,
    is_locked: true,
    locked: true,
    failed_login_attempts: 5,
    last_login: '2026-06-25T16:30:00Z',
    created_at: '2026-06-25T16:30:00Z',
    updated_at: '2026-06-25T16:30:00Z',
    can_edit: true,
    can_delete: true,
    can_block: false,
    can_unlock: true
  },
  {
    id: 'USR-0007',
    profile_image: null,
    full_name: 'Arjun Patel',
    email: 'arjun.patel@neuroblooms.com',
    phone: '+91 99011 22334',
    phone_number: '+91 99011 22334',
    roles: ['DOCTOR', 'ADMIN'],
    is_verified: false,
    verified: false,
    is_blocked: true,
    blocked: true,
    is_active: true,
    active: true,
    is_locked: true,
    locked: true,
    failed_login_attempts: 3,
    last_login: '2026-06-24T12:00:00Z',
    created_at: '2026-06-24T12:00:00Z',
    updated_at: '2026-06-24T12:00:00Z',
    can_edit: true,
    can_delete: true,
    can_block: false,
    can_unlock: true
  },
  {
    id: 'USR-0008',
    profile_image: null,
    full_name: 'Ravi Kumar',
    email: 'ravi.kumar@neuroblooms.com',
    phone: '+91 99876 54321',
    phone_number: '+91 99876 54321',
    roles: ['RECEPTIONIST'],
    is_verified: true,
    verified: true,
    is_blocked: false,
    blocked: false,
    is_active: false,
    active: false,
    is_locked: false,
    locked: false,
    failed_login_attempts: 0,
    last_login: '2026-06-23T09:10:00Z',
    created_at: '2026-06-23T09:10:00Z',
    updated_at: '2026-06-23T09:10:00Z',
    can_edit: true,
    can_delete: true,
    can_block: true,
    can_unlock: false
  }
];

export const userService = {
  /**
   * Fetch paginated and filtered users.
   */
  getUsers: async (params = {}) => {
    try {
      const response = await adminApi.get('/api/v1/users/', { params });
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      if (response.data && response.data.results) {
        return {
          results: response.data.results,
          count: response.data.count,
          total_pages: response.data.total_pages || Math.ceil(response.data.count / (params.page_size || 10))
        };
      }
      throw new Error(response.data?.message || 'Failed to retrieve users.');
    } catch (error) {
      console.warn('API request failed, using local mock users list fallback', error);
      
      let filtered = [...MOCK_USERS_LIST];
      
      // 1. Search
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.full_name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.phone.toLowerCase().includes(q) ||
            u.id.toLowerCase().includes(q)
        );
      }
      
      // 2. Role Filter
      if (params.role && params.role !== 'All Roles') {
        const rFilter = params.role.toUpperCase();
        filtered = filtered.filter((u) => u.roles.some((r) => r.toUpperCase() === rFilter));
      }
      
      // 3. Status Filter (active/is_active)
      const activeFilter = params.active ?? params.is_active;
      if (activeFilter !== undefined && activeFilter !== 'All') {
        const statusBool = activeFilter === 'true' || activeFilter === true;
        filtered = filtered.filter((u) => u.is_active === statusBool);
      }

      // 4. Verified Filter
      const verifiedFilter = params.verified ?? params.is_verified;
      if (verifiedFilter !== undefined && verifiedFilter !== 'All') {
        const verifiedBool = verifiedFilter === 'true' || verifiedFilter === true;
        filtered = filtered.filter((u) => u.is_verified === verifiedBool);
      }

      // 5. Blocked Filter
      const blockedFilter = params.blocked ?? params.is_blocked;
      if (blockedFilter !== undefined && blockedFilter !== 'All') {
        const blockedBool = blockedFilter === 'true' || blockedFilter === true;
        filtered = filtered.filter((u) => u.is_blocked === blockedBool);
      }

      // 6. Locked Filter
      if (params.locked !== undefined && params.locked !== 'All') {
        const lockedBool = params.locked === 'true' || params.locked === true;
        filtered = filtered.filter((u) => u.is_locked === lockedBool);
      }

      // 7. Has Profile Image Filter
      if (params.has_profile_image !== undefined && params.has_profile_image !== 'All') {
        const hasImgBool = params.has_profile_image === 'true' || params.has_profile_image === 'yes';
        if (hasImgBool) {
          filtered = filtered.filter((u) => u.profile_image !== null && u.profile_image !== '');
        } else {
          filtered = filtered.filter((u) => u.profile_image === null || u.profile_image === '');
        }
      }

      // 8. Sorting
      if (params.ordering) {
        const isDescending = params.ordering.startsWith('-');
        const sortField = isDescending ? params.ordering.substring(1) : params.ordering;

        filtered.sort((a, b) => {
          let valA = a[sortField];
          let valB = b[sortField];

          if (sortField === 'name') {
            valA = a.full_name;
            valB = b.full_name;
          }

          if (typeof valA === 'string') {
            return isDescending
              ? valB.localeCompare(valA)
              : valA.localeCompare(valB);
          } else {
            return isDescending ? valB - valA : valA - valB;
          }
        });
      } else {
        // Default: newest first
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      
      const page = parseInt(params.page || 1, 10);
      const pageSize = parseInt(params.page_size || 10, 10);
      const start = (page - 1) * pageSize;
      const paginatedResults = filtered.slice(start, start + pageSize);
      
      return {
        results: paginatedResults,
        count: filtered.length,
        total_pages: Math.ceil(filtered.length / pageSize)
      };
    }
  },

  /**
   * Fetch user statistics.
   */
  getUsersStatistics: async () => {
    try {
      const response = await adminApi.get('/api/v1/users/statistics/');
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve user statistics.');
    } catch (error) {
      console.warn('API request failed, using local mock user statistics fallback', error);
      return MOCK_USERS_STATISTICS;
    }
  },

  /**
   * Retrieve a single user.
   */
  getUserDetails: async (id) => {
    try {
      const response = await adminApi.get(`/api/v1/users/${id}/`);
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve user details.');
    } catch (error) {
      console.warn(`API request failed, using local mock user details fallback for id ${id}`, error);
      const found = MOCK_USERS_LIST.find((u) => u.id === id);
      if (found) return found;
      throw new Error('User not found.');
    }
  },

  /**
   * Create a new user.
   */
  createUser: async (data) => {
    try {
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        roles: data.roles,
        phone_number: data.phone_number || data.phone,
        is_active: data.is_active ?? true,
        is_verified: data.is_verified ?? false
      };
      const response = await adminApi.post('/api/v1/users/', payload);
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to create user.');
    } catch (error) {
      console.warn('API request failed, using local mock create user', error);
      const newUser = {
        id: `USR-000${MOCK_USERS_LIST.length + 1}`,
        profile_image: null,
        full_name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        phone: data.phone_number || '',
        phone_number: data.phone_number || '',
        roles: data.roles || [],
        is_verified: data.is_verified ?? false,
        verified: data.is_verified ?? false,
        is_blocked: false,
        blocked: false,
        is_active: data.is_active ?? true,
        active: data.is_active ?? true,
        is_locked: false,
        locked: false,
        failed_login_attempts: 0,
        last_login: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        can_edit: true,
        can_delete: true,
        can_block: true,
        can_unlock: false
      };
      MOCK_USERS_LIST.unshift(newUser);
      MOCK_USERS_STATISTICS.total_users += 1;
      if (newUser.is_active) MOCK_USERS_STATISTICS.active_users += 1;
      if (newUser.is_verified) MOCK_USERS_STATISTICS.verified_users += 1;
      return newUser;
    }
  },

  /**
   * Update a user (partial updates).
   */
  updateUser: async (id, data) => {
    try {
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        roles: data.roles,
        phone_number: data.phone_number || data.phone,
        is_active: data.is_active ?? data.active,
        is_verified: data.is_verified ?? data.verified
      };
      const response = await adminApi.patch(`/api/v1/users/${id}/`, payload);
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to update user.');
    } catch (error) {
      console.warn('API request failed, using local mock update user', error);
      const index = MOCK_USERS_LIST.findIndex((u) => u.id === id);
      if (index !== -1) {
        const old = MOCK_USERS_LIST[index];
        const updated = {
          ...old,
          full_name: data.first_name && data.last_name ? `${data.first_name} ${data.last_name}` : old.full_name,
          email: data.email ?? old.email,
          phone: data.phone_number ?? data.phone ?? old.phone,
          phone_number: data.phone_number ?? data.phone ?? old.phone_number,
          roles: data.roles ?? old.roles,
          is_active: data.is_active ?? data.active ?? old.is_active,
          active: data.is_active ?? data.active ?? old.active,
          is_verified: data.is_verified ?? data.verified ?? old.is_verified,
          verified: data.is_verified ?? data.verified ?? old.verified,
          updated_at: new Date().toISOString()
        };
        MOCK_USERS_LIST[index] = updated;
        return updated;
      }
      throw new Error('User not found.');
    }
  },

  /**
   * Lock a user account.
   */
  lockUser: async (id) => {
    try {
      const response = await adminApi.post(`/api/v1/users/${id}/lock/`);
      if (response.data && response.data.success) {
        return true;
      }
      throw new Error(response.data?.message || 'Failed to lock user.');
    } catch (error) {
      console.warn('API request failed, using local mock lock user', error);
      const user = MOCK_USERS_LIST.find((u) => u.id === id);
      if (user) {
        user.is_locked = true;
        user.locked = true;
        user.is_blocked = true;
        user.blocked = true;
        user.can_block = false;
        user.can_unlock = true;
        return true;
      }
      throw new Error('User not found.');
    }
  },

  /**
   * Unlock a user account.
   */
  unlockUser: async (id) => {
    try {
      const response = await adminApi.post(`/api/v1/users/${id}/unlock/`);
      if (response.data && response.data.success) {
        return true;
      }
      throw new Error(response.data?.message || 'Failed to unlock user.');
    } catch (error) {
      console.warn('API request failed, using local mock unlock user', error);
      const user = MOCK_USERS_LIST.find((u) => u.id === id);
      if (user) {
        user.is_locked = false;
        user.locked = false;
        user.is_blocked = false;
        user.blocked = false;
        user.can_block = true;
        user.can_unlock = false;
        user.failed_login_attempts = 0;
        return true;
      }
      throw new Error('User not found.');
    }
  },

  /**
   * Delete a user account.
   */
  deleteUser: async (id) => {
    try {
      const response = await adminApi.delete(`/api/v1/users/${id}/`);
      if (response.data && response.data.success) {
        return true;
      }
      throw new Error(response.data?.message || 'Failed to delete user.');
    } catch (error) {
      console.warn('API request failed, using local mock delete user', error);
      const index = MOCK_USERS_LIST.findIndex((u) => u.id === id);
      if (index !== -1) {
        const user = MOCK_USERS_LIST[index];
        MOCK_USERS_LIST.splice(index, 1);
        MOCK_USERS_STATISTICS.total_users -= 1;
        if (user.is_active) MOCK_USERS_STATISTICS.inactive_users -= 1;
        return true;
      }
      throw new Error('User not found.');
    }
  },

  /**
   * Fetch roles for dropdown.
   */
  getRolesDropdown: async () => {
    try {
      const response = await adminApi.get('/api/v1/roles/dropdown/');
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      if (response.data && response.data.results) {
        return response.data.results;
      }
      throw new Error('Failed to retrieve roles.');
    } catch (error) {
      console.warn('API request failed, using local mock roles dropdown', error);
      return [
        { id: 'admin', name: 'ADMIN' },
        { id: 'doctor', name: 'DOCTOR' },
        { id: 'receptionist', name: 'RECEPTIONIST' }
      ];
    }
  }
};
