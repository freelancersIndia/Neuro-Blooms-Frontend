import api from './api';

const MOCK_SERVICES = [
  {
    id: 's1',
    title: 'Autism Spectrum (ASD) Diagnostics',
    slug: 'asd-diagnostics',
    description: 'Gold-standard developmental assessments using ADOS-2 and ADIR clinical guidelines to understand unique neuro-profiles.',
    icon: 'Brain',
    details: 'Our detailed diagnostic assessment is child-centric, sensory-friendly, and conducted in collaborative play setups. We focus on strengths-based profiling.',
    duration: '2-3 sessions',
  },
  {
    id: 's2',
    title: 'Speech & Language Therapy',
    slug: 'speech-language-therapy',
    description: 'Empowering children to connect and express themselves through customized vocal, articulation, and AAC-assisted communication therapy.',
    icon: 'MessageCircle',
    details: 'Speech therapy programs at Neuro Blooms target articulation, receptive/expressive language delays, cognitive-communication, and social pragmatics.',
    duration: 'Ongoing clinical cycles',
  },
  {
    id: 's3',
    title: 'Occupational & Sensory Integration',
    slug: 'occupational-sensory-integration',
    description: 'Sensory-focused therapy to help children build fine motor skills, self-regulation, and confidence in home and classroom environments.',
    icon: 'Activity',
    details: 'Integrating sensory processing therapies into motor coordination building, helping children manage sensory sensitivities comfortably.',
    duration: 'Ongoing clinical cycles',
  },
];

export const getServices = async () => {
  try {
    const response = await api.get('/services');
    return response.data;
  } catch (error) {
    console.warn('Backend offline, using mock services');
    return MOCK_SERVICES;
  }
};

export const getServiceBySlug = async (slug) => {
  try {
    const response = await api.get(`/services/${slug}`);
    return response.data;
  } catch (error) {
    console.warn(`Backend offline, using mock data for service slug: ${slug}`);
    return MOCK_SERVICES.find((serv) => serv.slug === slug) || null;
  }
};
