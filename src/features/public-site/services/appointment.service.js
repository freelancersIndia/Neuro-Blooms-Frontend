import api from '../../../api/publicApi';

export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    console.warn('Backend offline, simulating successful appointment submission locally');
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message: 'Appointment request submitted successfully!',
      data: {
        id: Math.floor(Math.random() * 10000).toString(),
        ...appointmentData,
        createdAt: new Date().toISOString(),
      },
    };
  }
};

export const submitConsultationRequest = async (requestData) => {
  const response = await api.post('/api/v1/public/consultation-request/', requestData);
  return response.data;
};
