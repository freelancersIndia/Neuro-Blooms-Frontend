import adminApi from '../../../api/adminApi';

// Mock doctors list matching the design spec
const MOCK_DOCTORS = [
  {
    id: 'a654058f-f980-4044-b02d-0cbc8dadaff3',
    name: 'Dr. John Doe',
    specialty: 'Pediatric Neurologist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120&h=120',
  },
  {
    id: 'b765069f-e091-4155-c13e-1dcd9ebeeff4',
    name: 'Dr. Sarah Johnson',
    specialty: 'Child Psychologist',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=120&h=120',
  },
  {
    id: 'c876070f-d102-4266-d24f-2ede0fcf00a5',
    name: 'Dr. A. Jagadish',
    specialty: 'Senior Psychiatrist',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=120&h=120',
  }
];

// Mock database for availability records
const MOCK_AVAILABILITY = {
  'a654058f-f980-4044-b02d-0cbc8dadaff3': {
    id: 'c3a9f07c-9b1d-44a1-8736-ecf05785ea9a',
    doctor: 'a654058f-f980-4044-b02d-0cbc8dadaff3',
    accepting_appointments: true,
    consultation_duration: 45,
    max_daily_patients: 10,
    today_bookings: 6,
    last_updated_at: '2026-06-28T10:30:00Z',
    last_updated_by: 'Dr. Sarah Johnson'
  },
  'b765069f-e091-4155-c13e-1dcd9ebeeff4': {
    id: 'd4b0f18d-0c2e-55b2-9847-fdf16896fb0b',
    doctor: 'b765069f-e091-4155-c13e-1dcd9ebeeff4',
    accepting_appointments: true,
    consultation_duration: 30,
    max_daily_patients: 15,
    today_bookings: 8,
    last_updated_at: '2026-06-27T15:45:00Z',
    last_updated_by: 'Admin'
  },
  'c876070f-d102-4266-d24f-2ede0fcf00a5': {
    id: 'e5c1f29e-1d3f-66c3-0958-0ee279070c1c',
    doctor: 'c876070f-d102-4266-d24f-2ede0fcf00a5',
    accepting_appointments: false,
    consultation_duration: 60,
    max_daily_patients: 8,
    today_bookings: 2,
    last_updated_at: '2026-06-28T09:15:00Z',
    last_updated_by: 'Admin'
  }
};

export const doctorsService = {
  // Get list of doctors for dropdown
  getDoctorsList: async () => {
    try {
      const response = await adminApi.get('/api/v1/doctors/');
      if (response.data && response.data.success) {
        return response.data.data.map(doc => ({
          id: doc.id,
          name: doc.full_name || `${doc.first_name || ''} ${doc.last_name || ''}`.trim(),
          specialty: doc.specialization || 'Therapist',
          image: doc.profile_image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120&h=120'
        }));
      }
      return MOCK_DOCTORS;
    } catch (e) {
      console.warn('API /doctors offline or failed, using mock doctors');
      return MOCK_DOCTORS;
    }
  },

  // Get availability for a specific doctor
  getDoctorAvailability: async (doctorId) => {
    try {
      const response = await adminApi.get(`/api/v1/admin/doctors/${doctorId}/availability/`);
      // Ensure we extract data from standard wrapper { success: true, data: { ... } }
      if (response.data && response.data.success) {
        // We append today_bookings and last_updated fields if not present
        const data = response.data.data;
        return {
          ...data,
          today_bookings: data.today_bookings ?? (MOCK_AVAILABILITY[doctorId]?.today_bookings || 0),
          last_updated_at: data.updated_at || MOCK_AVAILABILITY[doctorId]?.last_updated_at || new Date().toISOString(),
          last_updated_by: MOCK_AVAILABILITY[doctorId]?.last_updated_by || 'Admin'
        };
      }
      throw new Error('Failed to retrieve availability');
    } catch (e) {
      console.warn(`API /availability/ for ${doctorId} offline, using mock availability`);
      const mockData = MOCK_AVAILABILITY[doctorId];
      if (!mockData) {
        // Fallback for new doctor
        return {
          id: `new-av-${doctorId}`,
          doctor: doctorId,
          accepting_appointments: true,
          consultation_duration: 30,
          max_daily_patients: 15,
          today_bookings: 0,
          last_updated_at: new Date().toISOString(),
          last_updated_by: 'Admin'
        };
      }
      return mockData;
    }
  },

  // Update availability for a specific doctor
  updateDoctorAvailability: async (doctorId, payload) => {
    try {
      const response = await adminApi.patch(`/api/v1/admin/doctors/${doctorId}/availability/`, payload);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to update availability');
    } catch (e) {
      console.warn(`API PATCH /availability/ for ${doctorId} offline, updating mock availability`);
      const existing = MOCK_AVAILABILITY[doctorId] || {};
      const updated = {
        ...existing,
        ...payload,
        last_updated_at: new Date().toISOString(),
        last_updated_by: 'Admin'
      };
      MOCK_AVAILABILITY[doctorId] = updated;
      return updated;
    }
  },

  // Get details for a specific doctor (includes nested availability)
  getDoctorDetails: async (doctorId) => {
    const response = await adminApi.get(`/api/v1/doctors/${doctorId}/`);
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error('Failed to retrieve doctor details');
  },

  // Get working days for a specific doctor
  getDoctorWorkingDays: async (doctorId) => {
    const response = await adminApi.get(`/api/v1/admin/doctors/${doctorId}/working-days/`);
    if (response.data && response.data.success) {
      return response.data.data.map(item => ({
        weekday: item.weekday,
        is_working: item.is_working,
        opening_time: item.is_working ? convertTo12Hour(item.opening_time) : null,
        closing_time: item.is_working ? convertTo12Hour(item.closing_time) : null,
      }));
    }
    throw new Error('Failed to retrieve doctor working days');
  },

  // Update working days for a specific doctor
  updateDoctorWorkingDays: async (doctorId, workingDays) => {
    const payload = {
      working_days: workingDays.map(item => ({
        weekday: item.weekday,
        is_working: item.is_working,
        opening_time: item.is_working ? convertTo24Hour(item.opening_time) : null,
        closing_time: item.is_working ? convertTo24Hour(item.closing_time) : null,
      }))
    };
    const response = await adminApi.patch(`/api/v1/admin/doctors/${doctorId}/working-days/`, payload);
    if (response.data && response.data.success) {
      return response.data.data.map(item => ({
        weekday: item.weekday,
        is_working: item.is_working,
        opening_time: item.is_working ? convertTo12Hour(item.opening_time) : null,
        closing_time: item.is_working ? convertTo12Hour(item.closing_time) : null,
      }));
    }
    throw new Error(response.data?.message || 'Failed to update doctor working days');
  },

  // Get leaves for a specific doctor
  getDoctorLeaves: async (doctorId) => {
    const response = await adminApi.get(`/api/v1/admin/doctors/${doctorId}/leaves/`);
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error('Failed to retrieve doctor leaves');
  },

  // Create a leave for a doctor
  createDoctorLeave: async (doctorId, payload) => {
    const response = await adminApi.post(`/api/v1/admin/doctors/${doctorId}/leaves/`, payload);
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to create doctor leave');
  },

  // Update a leave for a doctor
  updateDoctorLeave: async (doctorId, leaveId, payload) => {
    const response = await adminApi.patch(`/api/v1/admin/doctors/${doctorId}/leaves/${leaveId}/`, payload);
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to update doctor leave');
  },

  // Delete/Cancel a leave for a doctor
  deleteDoctorLeave: async (doctorId, leaveId) => {
    const response = await adminApi.delete(`/api/v1/admin/doctors/${doctorId}/leaves/${leaveId}/`);
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to delete doctor leave');
  },

  // Get blocked slots for a specific doctor
  getDoctorBlockedSlots: async (doctorId) => {
    const response = await adminApi.get(`/api/v1/admin/doctors/${doctorId}/blocked-slots/`);
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error('Failed to retrieve doctor blocked slots');
  },

  // Create a blocked slot for a doctor
  createDoctorBlockedSlot: async (doctorId, payload) => {
    const response = await adminApi.post(`/api/v1/admin/doctors/${doctorId}/blocked-slots/`, payload);
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to create doctor blocked slot');
  },

  // Update a blocked slot for a doctor
  updateDoctorBlockedSlot: async (doctorId, blockId, payload) => {
    const response = await adminApi.patch(`/api/v1/admin/doctors/${doctorId}/blocked-slots/${blockId}/`, payload);
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to update doctor blocked slot');
  },

  // Delete/Cancel a blocked slot for a doctor
  deleteDoctorBlockedSlot: async (doctorId, blockId) => {
    const response = await adminApi.delete(`/api/v1/admin/doctors/${doctorId}/blocked-slots/${blockId}/`);
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to delete doctor blocked slot');
  }
};

// Time conversion helpers for Doctor Working Days (12-hour AM/PM <-> 24-hour HH:MM:SS)
const convertTo12Hour = (timeStr) => {
  if (!timeStr) return null;
  const parts = timeStr.split(':');
  if (parts.length < 2) return null;
  let hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const modifier = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${modifier}`;
};

const convertTo24Hour = (time12hStr) => {
  if (!time12hStr) return null;
  const parts = time12hStr.split(' ');
  if (parts.length < 2) return null;
  const time = parts[0];
  const modifier = parts[1];
  const timeParts = time.split(':');
  if (timeParts.length < 2) return null;
  let hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}:00`;
};

export default doctorsService;
