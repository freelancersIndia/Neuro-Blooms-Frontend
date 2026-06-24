import api from './api';

// Mock data to ensure visual correctness when backend is not running
const MOCK_DOCTORS = [
  {
    id: '1',
    name: 'Dr. A. Jagadish',
    role: 'Child Development Specialist & Pediatrician',
    image: '/images/doctor/dr_a_jagadish.png',
    specialties: ['Autism Spectrum Disorder (ASD)', 'ADHD Support', 'Early Intervention', 'Developmental Assessments', 'High-Risk Newborn Follow-up'],
    education: 'MDS(E I) - Neonatal & Paediatric Early Intervention',
    bio: 'Dr. A. Jagadish is a renowned Child Development Specialist with 23+ years of experience in Early Intervention and Neuro Developmental Disabilities. He specializes in Autism, ADHD, Learning Disabilities, Cerebral Palsy, Developmental Assessments, and High-Risk Newborn Follow-up. Through evidence-based care, personalized intervention plans, and strong parent collaboration, he helps children achieve their fullest developmental potential.',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  }
];

export const getDoctors = async () => {
  try {
    const response = await api.get('/doctors');
    return response.data;
  } catch {
    console.warn('Backend offline, using mock doctors data');
    return MOCK_DOCTORS;
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  } catch {
    console.warn(`Backend offline, using mock data for doctor id: ${id}`);
    return MOCK_DOCTORS.find((doc) => doc.id === id) || null;
  }
};
