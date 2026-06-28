import adminApi from '../../../api/adminApi';

// Mapping helpers between frontend UI and backend API formats for Clinic Settings

const mapTimezoneToFrontend = (backendTz) => {
  if (!backendTz) return 'Asia/Kolkata (IST)';
  const timezones = [
    'Asia/Kolkata (IST)',
    'UTC (Coordinated Universal Time)',
    'America/New_York (EST/EDT)',
    'America/Chicago (CST/CDT)',
    'America/Denver (MST/MDT)',
    'America/Los_Angeles (PST/PDT)',
    'Europe/London (GMT/BST)',
    'Europe/Paris (CET/CEST)',
    'Asia/Singapore (SGT)',
    'Asia/Tokyo (JST)',
    'Australia/Sydney (AEST/AEDT)',
    'Europe/Berlin (CET)',
    'Asia/Dubai (GST)',
    'Asia/Hong_Kong (HKT)',
  ];
  const match = timezones.find(tz => tz.startsWith(backendTz));
  return match || backendTz;
};

const mapTimezoneToBackend = (frontendTz) => {
  if (!frontendTz) return 'Asia/Kolkata';
  return frontendTz.split(' ')[0];
};

const mapSlotDurationToFrontend = (minutes) => {
  return `${minutes || 30} Minutes`;
};

const mapSlotDurationToBackend = (durationStr) => {
  if (!durationStr) return 30;
  const mins = parseInt(durationStr.split(' ')[0], 10);
  return isNaN(mins) ? 30 : mins;
};

const mapBackendToFrontend = (backendData) => {
  if (!backendData) return null;
  return {
    id: backendData.id,
    clinic_name: backendData.clinic_name || '',
    logo: backendData.clinic_logo || null,
    timezone: mapTimezoneToFrontend(backendData.timezone),
    opening_time: backendData.opening_time ? backendData.opening_time.substring(0, 5) : '09:00',
    closing_time: backendData.closing_time ? backendData.closing_time.substring(0, 5) : '17:00',
    slot_duration: mapSlotDurationToFrontend(backendData.slot_duration_minutes),
    booking_window: backendData.booking_window_days || 30,
    allow_same_day_booking: backendData.allow_same_day_booking ?? true,
    max_daily_appointments: backendData.max_daily_appointments || 50,
  };
};

const mapFrontendToBackend = (frontendData) => {
  return {
    clinic_name: frontendData.clinic_name,
    timezone: mapTimezoneToBackend(frontendData.timezone),
    opening_time: frontendData.opening_time ? `${frontendData.opening_time}:00` : undefined,
    closing_time: frontendData.closing_time ? `${frontendData.closing_time}:00` : undefined,
    slot_duration_minutes: mapSlotDurationToBackend(frontendData.slot_duration),
    booking_window_days: parseInt(frontendData.booking_window, 10),
    allow_same_day_booking: frontendData.allow_same_day_booking,
    max_daily_appointments: parseInt(frontendData.max_daily_appointments, 10),
  };
};

// Time conversion helpers for Weekly Schedule (12-hour AM/PM <-> 24-hour HH:MM)

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
  return `${formattedHours}:${formattedMinutes}`;
};

const mapWeeklyScheduleToFrontend = (backendList) => {
  if (!Array.isArray(backendList)) return [];
  return backendList.map(item => ({
    weekday: item.weekday,
    is_open: item.is_open,
    opening_time: item.is_open ? convertTo12Hour(item.opening_time) : null,
    closing_time: item.is_open ? convertTo12Hour(item.closing_time) : null,
  }));
};

const mapWeeklyScheduleToBackend = (frontendList) => {
  if (!Array.isArray(frontendList)) return [];
  return frontendList.map(item => ({
    weekday: item.weekday,
    is_open: item.is_open,
    opening_time: item.is_open ? convertTo24Hour(item.opening_time) : null,
    closing_time: item.is_open ? convertTo24Hour(item.closing_time) : null,
  }));
};

export const clinicService = {
  /**
   * Fetch global clinic settings.
   */
  getSettings: async () => {
    const response = await adminApi.get('/api/v1/admin/clinic/settings/');
    if (response.data && response.data.success && response.data.data) {
      return mapBackendToFrontend(response.data.data);
    }
    throw new Error(response.data?.message || 'Failed to retrieve clinic settings');
  },

  /**
   * Update clinic settings.
   */
  updateSettings: async (settingsData) => {
    const payload = mapFrontendToBackend(settingsData);
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined && payload[key] !== null) {
        if (typeof payload[key] === 'boolean') {
          formData.append(key, payload[key] ? 'true' : 'false');
        } else {
          formData.append(key, payload[key]);
        }
      }
    });

    // Only append clinic_logo if it's a File (new upload) or null (cleared).
    // If it's a string (existing URL), do not append it to avoid DRF validation errors.
    if (settingsData.logo instanceof File) {
      formData.append('clinic_logo', settingsData.logo);
    } else if (settingsData.logo === null) {
      formData.append('clinic_logo', '');
    }

    const response = await adminApi.patch('/api/v1/admin/clinic/settings/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.success && response.data.data) {
      return mapBackendToFrontend(response.data.data);
    }
    throw new Error(response.data?.message || 'Failed to update clinic settings');
  },

  /**
   * Fetch clinic weekly schedule.
   */
  getWeeklySchedule: async () => {
    const response = await adminApi.get('/api/v1/admin/clinic/weekly-schedule/');
    if (response.data && response.data.data) {
      return mapWeeklyScheduleToFrontend(response.data.data);
    }
    throw new Error(response.data?.message || 'Failed to retrieve weekly schedule');
  },

  /**
   * Bulk update clinic weekly schedule.
   */
  updateWeeklySchedule: async (schedules) => {
    const payload = {
      schedules: mapWeeklyScheduleToBackend(schedules)
    };
    const response = await adminApi.patch('/api/v1/admin/clinic/weekly-schedule/', payload);
    if (response.data && response.data.data) {
      return mapWeeklyScheduleToFrontend(response.data.data);
    }
    throw new Error(response.data?.message || 'Failed to update weekly schedule');
  },

  /**
   * Fetch all clinic holidays.
   */
  getHolidays: async () => {
    const response = await adminApi.get('/api/v1/admin/clinic/holidays/');
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to retrieve holidays');
  },

  /**
   * Create a new clinic holiday.
   */
  createHoliday: async (holidayData) => {
    const response = await adminApi.post('/api/v1/admin/clinic/holidays/', holidayData);
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to create holiday');
  },

  /**
   * Update an existing clinic holiday.
   */
  updateHoliday: async (id, holidayData) => {
    const response = await adminApi.patch(`/api/v1/admin/clinic/holidays/${id}/`, holidayData);
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to update holiday');
  },

  /**
   * Delete a clinic holiday.
   */
  deleteHoliday: async (id) => {
    const response = await adminApi.delete(`/api/v1/admin/clinic/holidays/${id}/`);
    if (response.data && response.data.status === 'success') {
      return true;
    }
    return true;
  },

  /**
   * Fetch all clinic breaks.
   */
  getBreaks: async () => {
    const response = await adminApi.get('/api/v1/admin/clinic/breaks/');
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to retrieve breaks');
  },

  /**
   * Create a new clinic break.
   */
  createBreak: async (breakData) => {
    const response = await adminApi.post('/api/v1/admin/clinic/breaks/', breakData);
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to create break');
  },

  /**
   * Update an existing clinic break.
   */
  updateBreak: async (id, breakData) => {
    const response = await adminApi.patch(`/api/v1/admin/clinic/breaks/${id}/`, breakData);
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || 'Failed to update break');
  },

  /**
   * Delete a clinic break.
   */
  deleteBreak: async (id) => {
    const response = await adminApi.delete(`/api/v1/admin/clinic/breaks/${id}/`);
    if (response.data && response.data.success) {
      return true;
    }
    return true;
  },
};
