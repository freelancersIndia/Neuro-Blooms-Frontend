import api from '../api/publicApi';

/**
 * Retrieves the list of active doctors.
 * Endpoint: GET /api/v1/doctors/
 */
export const getDoctors = async () => {
  const response = await api.get('/api/v1/doctors/');
  return response.data;
};

/**
 * Retrieves the available dates calendar for a specific doctor.
 * Endpoint: GET /api/v1/doctors/{doctor_id}/available-dates/
 */
export const getAvailableDates = async (doctorId) => {
  if (!doctorId) return null;
  const response = await api.get(`/api/v1/doctors/${doctorId}/available-dates/`);
  return response.data;
};

/**
 * Retrieves the available slots for a specific doctor on a selected date.
 * Endpoint: GET /api/v1/doctors/{doctor_id}/available-slots/
 */
export const getAvailableSlots = async (doctorId, date) => {
  if (!doctorId || !date) return null;
  const response = await api.get(`/api/v1/doctors/${doctorId}/available-slots/`, {
    params: { date },
  });
  return response.data;
};

/**
 * Submits an appointment request.
 * Endpoint: POST /api/v1/appointment-requests/
 */
export const submitAppointment = async (payload) => {
  const response = await api.post('/api/v1/appointment-requests/', payload);
  return response.data;
};
