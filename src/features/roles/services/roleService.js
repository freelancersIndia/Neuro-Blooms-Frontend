import adminApi from '../../../api/adminApi';

// Mock permissions for local fallback and creation UI
export const MOCK_PERMISSIONS = [
  // Patient Management
  { id: 'p1', name: 'View Patients', code: 'view_patients', group: 'Patient Management', description: 'Can view patient profiles and medical history.' },
  { id: 'p2', name: 'Create Patients', code: 'create_patients', group: 'Patient Management', description: 'Can register new patient profiles.' },
  { id: 'p3', name: 'Edit Patients', code: 'edit_patients', group: 'Patient Management', description: 'Can update patient profiles.' },
  { id: 'p4', name: 'Delete Patients', code: 'delete_patients', group: 'Patient Management', description: 'Can delete patient records (soft delete).' },

  // Appointment Scheduling
  { id: 'a1', name: 'View Appointments', code: 'view_appointments', group: 'Appointment Scheduling', description: 'Can view appointment calendars.' },
  { id: 'a2', name: 'Schedule Appointments', code: 'schedule_appointments', group: 'Appointment Scheduling', description: 'Can book new appointments.' },
  { id: 'a3', name: 'Reschedule/Cancel', code: 'modify_appointments', group: 'Appointment Scheduling', description: 'Can modify or cancel bookings.' },

  // Clinical Actions
  { id: 'c1', name: 'Write Prescriptions', code: 'write_prescriptions', group: 'Clinical Actions', description: 'Can create and sign medical prescriptions.' },
  { id: 'c2', name: 'Access EMR', code: 'access_emr', group: 'Clinical Actions', description: 'Can read and write Electronic Medical Records.' },

  // Billing & Finance
  { id: 'b1', name: 'Generate Invoices', code: 'generate_invoices', group: 'Billing & Finance', description: 'Can create billing invoices for patients.' },
  { id: 'b2', name: 'Process Payments', code: 'process_payments', group: 'Billing & Finance', description: 'Can record payments and process refunds.' },

  // System Administration
  { id: 's1', name: 'Manage Roles', code: 'manage_roles', group: 'System Administration', description: 'Can create and modify system roles and permissions.' },
  { id: 's2', name: 'View Security Logs', code: 'view_security_logs', group: 'System Administration', description: 'Can view administrative audit logs.' },
];

export const MOCK_ROLES = [
  {
    id: 'r1',
    name: 'ADMIN',
    description: 'System administrator with full permissions. Can manage clinic configuration, roles, users, and security logs.',
    users_count: 3,
    permissions_count: 13,
    is_system: true,
    is_active: true,
    created_at: '2026-06-01T08:00:00Z',
    updated_at: '2026-06-25T12:30:00Z',
    can_delete: false,
    can_edit: true,
  },
  {
    id: 'r2',
    name: 'DOCTOR',
    description: 'Clinical role. Allows access to EMR, prescribing medications, viewing patient histories, and managing availability schedules.',
    users_count: 15,
    permissions_count: 5,
    is_system: true,
    is_active: true,
    created_at: '2026-06-02T09:00:00Z',
    updated_at: '2026-06-23T14:30:00Z',
    can_delete: false,
    can_edit: true,
  },
  {
    id: 'r3',
    name: 'RECEPTIONIST',
    description: 'Front desk role. Can register patients, schedule/reschedule/cancel appointments, and generate billing invoices.',
    users_count: 8,
    permissions_count: 7,
    is_system: true,
    is_active: true,
    created_at: '2026-06-03T10:00:00Z',
    updated_at: '2026-06-18T11:15:00Z',
    can_delete: false,
    can_edit: true,
  },
  {
    id: 'r4',
    name: 'Ward Manager',
    description: 'Manages ward operations, nurse scheduling, and monitors inpatient occupancy rates.',
    users_count: 1,
    permissions_count: 3,
    is_system: false,
    is_active: true,
    created_at: '2026-06-15T14:20:00Z',
    updated_at: '2026-06-15T14:20:00Z',
    can_delete: false,
    can_edit: true,
  },
  {
    id: 'r5',
    name: 'Medical Scribe',
    description: 'Assists doctors with documentation in Electronic Medical Records during patient consultations.',
    users_count: 0,
    permissions_count: 2,
    is_system: false,
    is_active: true,
    created_at: '2026-06-20T16:00:00Z',
    updated_at: '2026-06-22T09:30:00Z',
    can_delete: true,
    can_edit: true,
  },
  {
    id: 'r6',
    name: 'Billing Clerk',
    description: 'Handles patient billing, processes insurance claims, and records payments.',
    users_count: 2,
    permissions_count: 2,
    is_system: false,
    is_active: false,
    created_at: '2026-06-22T11:00:00Z',
    updated_at: '2026-06-24T14:00:00Z',
    can_delete: false,
    can_edit: true,
  },
];

export const MOCK_USERS = [
  { id: 'u1', full_name: 'Doctor User', email: 'doctor@test.com', phone: '1234567890', status: 'Active', last_login: '2026-06-29T18:00:00Z', profile_image: null },
  { id: 'u2', full_name: 'Dr. Sarah Johnson', email: 'sarah.j@test.com', phone: '9876543210', status: 'Active', last_login: '2026-06-29T16:15:00Z', profile_image: null },
  { id: 'u3', full_name: 'Dr. Michael Brown', email: 'michael.b@test.com', phone: '9123456780', status: 'Active', last_login: '2026-06-28T11:30:00Z', profile_image: null },
  { id: 'u4', full_name: 'Dr. Emily Davis', email: 'emily.d@test.com', phone: '9988776655', status: 'Active', last_login: '2026-06-27T09:45:00Z', profile_image: null },
  { id: 'u5', full_name: 'Dr. Lisa Wilson', email: 'lisa.w@test.com', phone: '8899001122', status: 'Active', last_login: '2026-06-26T14:20:00Z', profile_image: null },
  { id: 'u6', full_name: 'Nurse Kelly Vance', email: 'k.vance@test.com', phone: '9876543211', status: 'Active', last_login: '2026-06-25T11:10:00Z', profile_image: null },
  { id: 'u7', full_name: 'Receptionist Amy', email: 'amy.recept@test.com', phone: '9876543212', status: 'Active', last_login: '2026-06-24T10:05:00Z', profile_image: null },
  { id: 'u8', full_name: 'Dr. Robert Carter', email: 'r.carter@test.com', phone: '9911223344', status: 'Active', last_login: '2026-06-23T08:30:00Z', profile_image: null },
  { id: 'u9', full_name: 'Scribe David', email: 'd.scribe@test.com', phone: '9944332211', status: 'Active', last_login: '2026-06-22T17:00:00Z', profile_image: null },
  { id: 'u10', full_name: 'Billing Admin Peter', email: 'p.billing@test.com', phone: '9922883377', status: 'Active', last_login: '2026-06-21T15:20:00Z', profile_image: null },
];

export const MOCK_ACTIVITY_LOGS = [
  { id: 'act-1', type: 'ROLE_CREATED', message: 'Role DOCTOR was created.', timestamp: '2023-06-20T10:00:00Z', performed_by: 'System' },
  { id: 'act-2', type: 'PERMISSIONS_UPDATED', message: 'Permissions assigned: View Patients, Access EMR, Write Prescriptions.', timestamp: '2025-06-20T11:00:00Z', performed_by: 'admin@test.com' },
  { id: 'act-3', type: 'USERS_ASSIGNED', message: 'Assigned 5 new users to the DOCTOR role.', timestamp: '2026-05-20T14:30:00Z', performed_by: 'admin@test.com' },
  { id: 'act-4', type: 'USERS_REMOVED', message: 'Removed user Scribe David from the DOCTOR role.', timestamp: '2026-06-15T09:15:00Z', performed_by: 'admin@test.com' },
  { id: 'act-5', type: 'ROLE_UPDATED', message: 'Role details and description updated.', timestamp: '2026-06-23T14:30:00Z', performed_by: 'admin@test.com' },
];

export const MOCK_STATISTICS = {
  total_roles: 6,
  active_roles: 5,
  inactive_roles: 1,
  system_roles: 3,
  custom_roles: 3,
  total_assigned_users: 26,
};

export const roleService = {
  /**
   * Fetch all roles with optional query parameters.
   */
  getRoles: async (params = {}) => {
    try {
      const response = await adminApi.get('/api/v1/roles/', { params });
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve roles');
    } catch (error) {
      console.warn('API request failed, using local mock data fallback', error);
      let filtered = [...MOCK_ROLES];

      // 1. Search
      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (r) => r.name.toLowerCase().includes(query) || r.description.toLowerCase().includes(query)
        );
      }

      // 2. Filters
      if (params.status && params.status !== 'All') {
        const isActive = params.status.toLowerCase() === 'active';
        filtered = filtered.filter((r) => r.is_active === isActive);
      }
      if (params.type && params.type !== 'All') {
        const isSystem = params.type.toLowerCase() === 'system';
        filtered = filtered.filter((r) => r.is_system === isSystem);
      }
      if (params.has_users && params.has_users !== 'All') {
        const hasUsers = params.has_users.toLowerCase() === 'yes';
        filtered = filtered.filter((r) => (hasUsers ? r.users_count > 0 : r.users_count === 0));
      }

      // Ordering
      if (params.ordering) {
        const desc = params.ordering.startsWith('-');
        const field = desc ? params.ordering.substring(1) : params.ordering;
        filtered.sort((a, b) => {
          let valA = a[field];
          let valB = b[field];
          if (field === 'users_count') {
            valA = a.users_count;
            valB = b.users_count;
          } else if (field === 'permissions_count') {
            valA = a.permissions_count;
            valB = b.permissions_count;
          } else if (typeof valA === 'string') {
            return desc ? valB.localeCompare(valA) : valA.localeCompare(valB);
          }
          return desc ? valB - valA : valA - valB;
        });
      }

      const page = parseInt(params.page, 10) || 1;
      const pageSize = parseInt(params.page_size, 10) || 10;
      const totalPages = Math.ceil(filtered.length / pageSize) || 1;
      const start = (page - 1) * pageSize;

      return {
        count: filtered.length,
        page,
        page_size: pageSize,
        total_pages: totalPages,
        next: page < totalPages ? `?page=${page + 1}&page_size=${pageSize}` : null,
        previous: page > 1 ? `?page=${page - 1}&page_size=${pageSize}` : null,
        results: filtered.slice(start, start + pageSize),
      };
    }
  },

  /**
   * Fetch role statistics.
   */
  getRoleStatistics: async () => {
    try {
      const response = await adminApi.get('/api/v1/roles/statistics/');
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve role statistics');
    } catch (error) {
      return MOCK_STATISTICS;
    }
  },

  /**
   * Fetch a single role's details (includes all permissions).
   */
  getRoleDetails: async (id) => {
    try {
      const response = await adminApi.get(`/api/v1/roles/${id}/`);
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve role details');
    } catch (error) {
      console.warn(`API request failed for role ${id}, using local mock details`, error);
      const mockRole = MOCK_ROLES.find((r) => r.id === id || r.name.toLowerCase() === id.toLowerCase()) || MOCK_ROLES[1];
      
      return {
        ...mockRole,
        created_by: 'System',
        updated_by: 'admin@test.com',
        permissions: MOCK_PERMISSIONS.map((p, idx) => ({
          ...p,
          assigned: idx < mockRole.permissions_count,
        })),
        assigned_users: {
          count: mockRole.users_count,
          page: 1,
          page_size: 10,
          total_pages: Math.ceil(mockRole.users_count / 10) || 1,
          next: null,
          previous: null,
          results: MOCK_USERS.slice(0, mockRole.users_count),
        },
        activity_logs: MOCK_ACTIVITY_LOGS,
      };
    }
  },

  /**
   * Create a new custom role.
   */
  createRole: async (roleData) => {
    const response = await adminApi.post('/api/v1/roles/', roleData);
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to create role');
  },

  /**
   * Update an existing role (PATCH).
   */
  updateRole: async (id, roleData) => {
    const response = await adminApi.patch(`/api/v1/roles/${id}/`, roleData);
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to update role');
  },

  /**
   * Delete a custom role (soft delete).
   */
  deleteRole: async (id) => {
    const response = await adminApi.delete(`/api/v1/roles/${id}/`);
    if (response.data && response.data.success) {
      return true;
    }
    return true;
  },

  /**
   * List all system users (used for assignment).
   */
  getUsers: async (params = {}) => {
    try {
      const response = await adminApi.get('/api/v1/users/', { params });
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(response.data?.message || 'Failed to retrieve users');
    } catch (error) {
      console.warn('API request failed, using local mock users', error);
      let filtered = [...MOCK_USERS];
      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter((u) => u.full_name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query));
      }
      return {
        count: filtered.length,
        results: filtered,
      };
    }
  },

  /**
   * Assign permissions to a role.
   */
  assignPermissions: async (id, permissionIds) => {
    const response = await adminApi.post(`/api/v1/roles/${id}/permissions/assign/`, {
      permission_ids: permissionIds,
    });
    if (response.data && response.data.success) {
      return response.data;
    }
    throw new Error(response.data?.message || 'Failed to assign permissions');
  },

  /**
   * Remove permissions from a role.
   */
  removePermissions: async (id, permissionIds) => {
    const response = await adminApi.post(`/api/v1/roles/${id}/permissions/remove/`, {
      permission_ids: permissionIds,
    });
    if (response.data && response.data.success) {
      return response.data;
    }
    throw new Error(response.data?.message || 'Failed to remove permissions');
  },

  /**
   * Assign users to a role.
   */
  assignUsers: async (id, userIds) => {
    const response = await adminApi.post(`/api/v1/roles/${id}/users/assign/`, {
      user_ids: userIds,
    });
    if (response.data && response.data.success) {
      return response.data;
    }
    throw new Error(response.data?.message || 'Failed to assign users');
  },

  /**
   * Remove users from a role.
   */
  removeUsers: async (id, userIds) => {
    const response = await adminApi.post(`/api/v1/roles/${id}/users/remove/`, {
      user_ids: userIds,
    });
    if (response.data && response.data.success) {
      return response.data;
    }
    throw new Error(response.data?.message || 'Failed to remove users');
  },
};

export default roleService;
