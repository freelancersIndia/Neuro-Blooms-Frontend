import api from '../../../api/publicApi';

export const getPublicDoctors = async () => {
  const response = await api.get('/api/v1/public/doctors/');
  return response.data;
};

export const getPublicAvailableSlots = async (doctorId, date) => {
  const response = await api.get('/api/v1/public/appointments/available-slots/', {
    params: {
      doctor_id: doctorId,
      appointment_date: date,
    },
  });
  return response.data;
};

export const createPublicAppointmentRequest = async (payload) => {
  const response = await api.post('/api/v1/public/appointment-requests/', payload);
  return response.data;
};
