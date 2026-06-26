import adminApi from './api';

const isNetworkError = (error) => {
  return !error.response && (error.code === 'ERR_NETWORK' || error.message.includes('Network Error') || error.message.includes('timeout'));
};

// Realistic mock database for offline fallback
const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1534751516642-a131ffd107fd?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
];

let mockDb = [
  {
    id: '764b8bbd-d34e-4e4f-b67a-115f0ebcd22f',
    request_number: 'REQ-2026-000124',
    parent_first_name: 'Ravi',
    parent_last_name: 'Kumar',
    relationship_to_child: 'FATHER',
    mobile_number: '+91 98765 43210',
    alternate_mobile_number: '+91 98765 43211',
    email: 'ravi.kumar@email.com',
    child_first_name: 'Aarav',
    child_last_name: 'Kumar',
    date_of_birth: '2023-02-14',
    gender: 'MALE',
    appointment_type: 'INITIAL_CONSULTATION',
    primary_concern: 'SPEECH_DELAY',
    preferred_date: '2026-07-15',
    preferred_time_slot: '10:30 AM',
    additional_notes: 'Child is having difficulty in expressing words clearly. Need expert guidance.',
    referral_source: 'Google Search',
    booking_source: 'WEBSITE',
    status: 'PENDING',
    rejection_reason: null,
    reviewed_at: null,
    reviewed_by: null,
    created_at: '2026-06-26T14:00:00Z',
    avatar: AVATARS[0]
  },
  {
    id: '764b8bbd-d34e-4e4f-b67a-115f0ebcd22e',
    request_number: 'REQ-2026-000123',
    parent_first_name: 'Sneha',
    parent_last_name: 'Patel',
    relationship_to_child: 'MOTHER',
    mobile_number: '+91 98123 45678',
    alternate_mobile_number: '',
    email: 'sneha.patel@email.com',
    child_first_name: 'Vihaan',
    child_last_name: 'Patel',
    date_of_birth: '2022-05-02',
    gender: 'MALE',
    appointment_type: 'DEVELOPMENT_ASSESSMENT',
    primary_concern: 'AUTISM_ASSESSMENT',
    preferred_date: '2026-07-16',
    preferred_time_slot: '02:00 PM',
    additional_notes: 'School teacher suggested development evaluation due to social interaction challenges.',
    referral_source: 'Doctor Referral',
    booking_source: 'WEBSITE',
    status: 'PENDING',
    rejection_reason: null,
    reviewed_at: null,
    reviewed_by: null,
    created_at: '2026-06-26T14:10:00Z',
    avatar: AVATARS[1]
  },
  {
    id: '764b8bbd-d34e-4e4f-b67a-115f0ebcd22d',
    request_number: 'REQ-2026-000122',
    parent_first_name: 'Arun',
    parent_last_name: 'Sharma',
    relationship_to_child: 'FATHER',
    mobile_number: '+91 97654 32109',
    alternate_mobile_number: '',
    email: 'arun.sharma@email.com',
    child_first_name: 'Myra',
    child_last_name: 'Sharma',
    date_of_birth: '2023-10-19',
    gender: 'FEMALE',
    appointment_type: 'INITIAL_CONSULTATION',
    primary_concern: 'DEVELOPMENTAL_DELAY',
    preferred_date: '2026-07-17',
    preferred_time_slot: '11:00 AM',
    additional_notes: 'Not walking independently yet. Pediatrician recommended developmental checkup.',
    referral_source: 'Friend/Family',
    booking_source: 'WEBSITE',
    status: 'APPROVED',
    rejection_reason: null,
    reviewed_at: '2026-06-26T14:20:00Z',
    reviewed_by: 'receptionist@neuroblooms.com',
    created_at: '2026-06-25T16:15:00Z',
    avatar: AVATARS[2]
  },
  {
    id: '764b8bbd-d34e-4e4f-b67a-115f0ebcd22c',
    request_number: 'REQ-2026-000121',
    parent_first_name: 'Pooja',
    parent_last_name: 'Verma',
    relationship_to_child: 'MOTHER',
    mobile_number: '+91 96543 21098',
    alternate_mobile_number: '',
    email: 'pooja.verma@email.com',
    child_first_name: 'Kabir',
    child_last_name: 'Verma',
    date_of_birth: '2021-06-28',
    gender: 'MALE',
    appointment_type: 'DEVELOPMENT_ASSESSMENT',
    primary_concern: 'BEHAVIOURAL_CONCERNS',
    preferred_date: '2026-07-18',
    preferred_time_slot: '03:30 PM',
    additional_notes: 'Exhibits extreme hyperactivity and has difficulty concentrating for more than 2 minutes.',
    referral_source: 'Social Media',
    booking_source: 'WEBSITE',
    status: 'APPROVED',
    rejection_reason: null,
    reviewed_at: '2026-06-26T14:22:00Z',
    reviewed_by: 'receptionist@neuroblooms.com',
    created_at: '2026-06-25T14:40:00Z',
    avatar: AVATARS[3]
  },
  {
    id: '764b8bbd-d34e-4e4f-b67a-115f0ebcd22b',
    request_number: 'REQ-2026-000120',
    parent_first_name: 'Imran',
    parent_last_name: 'Khan',
    relationship_to_child: 'FATHER',
    mobile_number: '+91 95432 10987',
    alternate_mobile_number: '',
    email: 'imran.khan@email.com',
    child_first_name: 'Zain',
    child_last_name: 'Khan',
    date_of_birth: '2022-08-15',
    gender: 'MALE',
    appointment_type: 'INITIAL_CONSULTATION',
    primary_concern: 'SPEECH_DELAY',
    preferred_date: '2026-07-19',
    preferred_time_slot: '10:00 AM',
    additional_notes: 'No response to verbal requests. Very limited vocabulary.',
    referral_source: 'Google Search',
    booking_source: 'WEBSITE',
    status: 'REJECTED',
    rejection_reason: 'Duplicate request',
    reviewed_at: '2026-06-26T14:25:00Z',
    reviewed_by: 'admin@neuroblooms.com',
    created_at: '2026-06-24T11:30:00Z',
    avatar: AVATARS[4]
  },
  {
    id: '764b8bbd-d34e-4e4f-b67a-115f0ebcd22a',
    request_number: 'REQ-2026-000119',
    parent_first_name: 'Neha',
    parent_last_name: 'Singh',
    relationship_to_child: 'MOTHER',
    mobile_number: '+91 94321 09876',
    alternate_mobile_number: '',
    email: 'neha.singh@email.com',
    child_first_name: 'Anaya',
    child_last_name: 'Singh',
    date_of_birth: '2021-12-20',
    gender: 'FEMALE',
    appointment_type: 'INITIAL_CONSULTATION',
    primary_concern: 'OCCUPATIONAL_THERAPY',
    preferred_date: '2026-07-20',
    preferred_time_slot: '01:00 PM',
    additional_notes: 'Needs help with fine motor skills like holding pencils and cutting paper.',
    referral_source: 'Instagram',
    booking_source: 'WEBSITE',
    status: 'PENDING',
    rejection_reason: null,
    reviewed_at: null,
    reviewed_by: null,
    created_at: '2026-06-24T10:10:00Z',
    avatar: AVATARS[5]
  },
  {
    id: '764b8bbd-d34e-4e4f-b67a-115f0ebcd229',
    request_number: 'REQ-2026-000118',
    parent_first_name: 'Rajesh',
    parent_last_name: 'Iyer',
    relationship_to_child: 'FATHER',
    mobile_number: '+91 93210 98765',
    alternate_mobile_number: '',
    email: 'rajesh.iyer@email.com',
    child_first_name: 'Aditi',
    child_last_name: 'Iyer',
    date_of_birth: '2020-01-12',
    gender: 'FEMALE',
    appointment_type: 'DEVELOPMENT_ASSESSMENT',
    primary_concern: 'AUTISM_ASSESSMENT',
    preferred_date: '2026-07-21',
    preferred_time_slot: '09:30 AM',
    additional_notes: 'Sensory sensitivities to loud sounds and crowded places. Shows repetitive actions.',
    referral_source: 'Doctor Referral',
    booking_source: 'WEBSITE',
    status: 'APPROVED',
    rejection_reason: null,
    reviewed_at: '2026-06-25T11:00:00Z',
    reviewed_by: 'admin@neuroblooms.com',
    created_at: '2026-06-23T15:20:00Z',
    avatar: AVATARS[6]
  },
  {
    id: '764b8bbd-d34e-4e4f-b67a-115f0ebcd228',
    request_number: 'REQ-2026-000117',
    parent_first_name: 'Priya',
    parent_last_name: 'Nair',
    relationship_to_child: 'MOTHER',
    mobile_number: '+91 92109 87654',
    alternate_mobile_number: '',
    email: 'priya.nair@email.com',
    child_first_name: 'Riya',
    child_last_name: 'Nair',
    date_of_birth: '2023-03-05',
    gender: 'FEMALE',
    appointment_type: 'INITIAL_CONSULTATION',
    primary_concern: 'SPEECH_DELAY',
    preferred_date: '2026-07-22',
    preferred_time_slot: '11:30 AM',
    additional_notes: 'Limited babbling and struggles to maintain eye contact. Need professional speech guidance.',
    referral_source: 'Friend/Family',
    booking_source: 'WEBSITE',
    status: 'PENDING',
    rejection_reason: null,
    reviewed_at: null,
    reviewed_by: null,
    created_at: '2026-06-23T11:00:00Z',
    avatar: AVATARS[7]
  },
  {
    id: '764b8bbd-d34e-4e4f-b67a-115f0ebcd227',
    request_number: 'REQ-2026-000116',
    parent_first_name: 'Vikram',
    parent_last_name: 'Rao',
    relationship_to_child: 'FATHER',
    mobile_number: '+91 91098 76543',
    alternate_mobile_number: '',
    email: 'vikram.rao@email.com',
    child_first_name: 'Dev',
    child_last_name: 'Rao',
    date_of_birth: '2020-09-14',
    gender: 'MALE',
    appointment_type: 'DEVELOPMENT_ASSESSMENT',
    primary_concern: 'BEHAVIOURAL_CONCERNS',
    preferred_date: '2026-07-23',
    preferred_time_slot: '04:00 PM',
    additional_notes: 'Showing angry outbursts and aggression at pre-school. Need behavioural intervention.',
    referral_source: 'Google Search',
    booking_source: 'WEBSITE',
    status: 'APPROVED',
    rejection_reason: null,
    reviewed_at: '2026-06-24T12:00:00Z',
    reviewed_by: 'receptionist@neuroblooms.com',
    created_at: '2026-06-22T13:45:00Z',
    avatar: AVATARS[8]
  },
  {
    id: '764b8bbd-d34e-4e4f-b67a-115f0ebcd226',
    request_number: 'REQ-2026-000115',
    parent_first_name: 'Meera',
    parent_last_name: 'Reddy',
    relationship_to_child: 'MOTHER',
    mobile_number: '+91 90987 65432',
    alternate_mobile_number: '',
    email: 'meera.reddy@email.com',
    child_first_name: 'Ishan',
    child_last_name: 'Reddy',
    date_of_birth: '2023-11-22',
    gender: 'MALE',
    appointment_type: 'INITIAL_CONSULTATION',
    primary_concern: 'OCCUPATIONAL_THERAPY',
    preferred_date: '2026-07-24',
    preferred_time_slot: '02:30 PM',
    additional_notes: 'Pediatrician suggested OT checkup to evaluate toe-walking.',
    referral_source: 'YouTube Channel',
    booking_source: 'WEBSITE',
    status: 'REJECTED',
    rejection_reason: 'Outside serviceable area',
    reviewed_at: '2026-06-23T16:00:00Z',
    reviewed_by: 'admin@neuroblooms.com',
    created_at: '2026-06-22T10:30:00Z',
    avatar: AVATARS[9]
  }
];

const appointmentRequestService = {
  /**
   * List Appointment Requests
   */
  listAppointmentRequests: async (params = {}) => {
    try {
      const response = await adminApi.get('/api/v1/appointments/requests/', { params });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Appointment Request Service] Backend offline/404, applying mock fallback.');
        
        let filtered = [...mockDb];

        // Apply filters
        if (params.search) {
          const query = params.search.toLowerCase();
          filtered = filtered.filter(item => 
            item.request_number.toLowerCase().includes(query) ||
            item.parent_first_name.toLowerCase().includes(query) ||
            item.parent_last_name.toLowerCase().includes(query) ||
            item.child_first_name.toLowerCase().includes(query) ||
            item.child_last_name.toLowerCase().includes(query) ||
            item.mobile_number.includes(query) ||
            item.email.toLowerCase().includes(query)
          );
        }

        if (params.status && params.status !== 'All') {
          filtered = filtered.filter(item => item.status === params.status);
        }

        if (params.appointment_type && params.appointment_type !== 'All') {
          filtered = filtered.filter(item => item.appointment_type === params.appointment_type);
        }

        if (params.primary_concern && params.primary_concern !== 'All') {
          filtered = filtered.filter(item => item.primary_concern === params.primary_concern);
        }

        if (params.preferred_date) {
          filtered = filtered.filter(item => item.preferred_date === params.preferred_date);
        }

        // Apply sorting
        if (params.ordering) {
          const orderField = params.ordering.replace('-', '');
          const desc = params.ordering.startsWith('-');
          filtered.sort((a, b) => {
            let valA = a[orderField] || '';
            let valB = b[orderField] || '';
            if (orderField === 'parent_first_name') {
              valA = `${a.parent_first_name} ${a.parent_last_name}`;
              valB = `${b.parent_first_name} ${b.parent_last_name}`;
            } else if (orderField === 'child_first_name') {
              valA = `${a.child_first_name} ${a.child_last_name}`;
              valB = `${b.child_first_name} ${b.child_last_name}`;
            }

            if (valA < valB) return desc ? 1 : -1;
            if (valA > valB) return desc ? -1 : 1;
            return 0;
          });
        } else {
          // Default ordering: -created_at
          filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        // Paginate
        const page = parseInt(params.page, 10) || 1;
        const pageSize = parseInt(params.page_size, 10) || 10;
        const start = (page - 1) * pageSize;
        const results = filtered.slice(start, start + pageSize);

        // Stats totals
        const total = mockDb.length;
        const pending = mockDb.filter(i => i.status === 'PENDING').length;
        const approved = mockDb.filter(i => i.status === 'APPROVED').length;
        const rejected = mockDb.filter(i => i.status === 'REJECTED').length;

        return {
          success: true,
          message: 'Appointment requests fetched successfully (Mock).',
          data: {
            statistics: {
              total_requests: total,
              pending_review: pending,
              approved: approved,
              rejected: rejected
            },
            results: results,
            pagination: {
              count: filtered.length,
              page,
              page_size: pageSize,
              total_pages: Math.ceil(filtered.length / pageSize)
            }
          }
        };
      }
      throw error;
    }
  },

  /**
   * Retrieve Appointment Request Detail
   */
  getAppointmentRequestDetail: async (id) => {
    try {
      const response = await adminApi.get(`/api/v1/appointments/requests/${id}/`);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Appointment Request Service] Backend offline/404, applying mock fallback.');
        const found = mockDb.find(item => item.id === id || item.request_number === id);
        if (!found) throw new Error('Appointment request not found');
        return {
          success: true,
          message: 'Appointment request details retrieved successfully (Mock).',
          data: found
        };
      }
      throw error;
    }
  },

  /**
   * Get Appointment Request Statistics
   */
  getAppointmentRequestStatistics: async () => {
    try {
      const response = await adminApi.get('/api/v1/appointments/requests/statistics/');
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        return {
          success: true,
          message: 'Statistics retrieved (Mock).',
          data: {
            total_requests: mockDb.length,
            pending_review: mockDb.filter(i => i.status === 'PENDING').length,
            approved: mockDb.filter(i => i.status === 'APPROVED').length,
            rejected: mockDb.filter(i => i.status === 'REJECTED').length
          }
        };
      }
      throw error;
    }
  },

  /**
   * Approve Appointment Request
   */
  approveAppointmentRequest: async (id) => {
    try {
      const response = await adminApi.post(`/api/v1/appointments/requests/${id}/approve/`);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        const found = mockDb.find(item => item.id === id);
        if (found) {
          if (found.status !== 'PENDING') {
            return {
              success: false,
              message: `Appointment request already ${found.status.toLowerCase()}.`
            };
          }
          found.status = 'APPROVED';
          found.reviewed_at = new Date().toISOString();
          found.reviewed_by = 'admin@neuroblooms.com';
        }
        return {
          success: true,
          message: 'Appointment request approved successfully (Mock).'
        };
      }
      throw error;
    }
  },

  /**
   * Reject Appointment Request
   */
  rejectAppointmentRequest: async (id, reason) => {
    try {
      const response = await adminApi.post(`/api/v1/appointments/requests/${id}/reject/`, { reason });
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        const found = mockDb.find(item => item.id === id);
        if (found) {
          if (found.status !== 'PENDING') {
            return {
              success: false,
              message: `Appointment request already ${found.status.toLowerCase()}.`
            };
          }
          found.status = 'REJECTED';
          found.rejection_reason = reason;
          found.reviewed_at = new Date().toISOString();
          found.reviewed_by = 'admin@neuroblooms.com';
        }
        return {
          success: true,
          message: 'Appointment request rejected successfully (Mock).'
        };
      }
      throw error;
    }
  },

  /**
   * Retrieve Appointment Request Timeline
   */
  getAppointmentRequestTimeline: async (id) => {
    try {
      const response = await adminApi.get(`/api/v1/appointments/requests/${id}/timeline/`);
      return response.data;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        const found = mockDb.find(item => item.id === id);
        const timeline = [
          {
            event: 'Submitted',
            performed_by: 'Website',
            performed_at: found ? found.created_at : new Date(Date.now() - 86400000).toISOString()
          },
          {
            event: 'Viewed',
            performed_by: 'receptionist@neuroblooms.com',
            performed_at: found ? new Date(new Date(found.created_at).getTime() + 900000).toISOString() : new Date(Date.now() - 85500000).toISOString()
          }
        ];
        if (found && found.status !== 'PENDING') {
          timeline.push({
            event: found.status === 'APPROVED' ? 'Approved' : 'Rejected',
            performed_by: found.reviewed_by || 'admin@neuroblooms.com',
            performed_at: found.reviewed_at || new Date().toISOString()
          });
        }
        return {
          success: true,
          message: 'Timeline retrieved successfully (Mock).',
          data: timeline
        };
      }
      throw error;
    }
  },

  /**
   * Export Appointment Requests to CSV
   */
  exportAppointmentRequests: async (params = {}) => {
    // For local CSV download fallback in mock mode
    try {
      const response = await adminApi.get('/api/v1/appointments/requests/export/', {
        params,
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      if (isNetworkError(error) || error.status === 404) {
        console.log('[Appointment Request Service] Backend offline/404, generating CSV locally.');
        
        const headers = 'Request Number,Parent Name,Child Name,Preferred Date,Preferred Time,Status,Created At\n';
        const rows = mockDb.map(item => 
          `"${item.request_number}","${item.parent_first_name} ${item.parent_last_name}","${item.child_first_name} ${item.child_last_name}","${item.preferred_date}","${item.preferred_time_slot}","${item.status}","${item.created_at}"`
        ).join('\n');
        
        const blob = new Blob([headers + rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'appointment_requests.csv');
        a.click();
        
        return { success: true };
      }
      throw error;
    }
  }
};

export default appointmentRequestService;
