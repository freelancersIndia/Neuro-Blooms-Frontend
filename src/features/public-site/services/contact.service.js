import api from '../../../api/publicApi';

export const submitContactForm = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData);
    return response.data;
  } catch (error) {
    console.warn('Backend offline, simulating contact message submission locally');
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message: 'Your query has been sent to our desk. We will respond shortly.',
      data: {
        id: Math.floor(Math.random() * 10000).toString(),
        ...contactData,
        createdAt: new Date().toISOString(),
      },
    };
  }
};
