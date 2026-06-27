export const MOCK_REQUEST = {
  id: 'REQ-2026-000124',
  requestNumber: 'REQ-2026-000124',
  status: 'APPROVED',
  parentName: 'Ravi Kumar',
  relationship: 'Father',
  parentPhone: '+91 98765 43210',
  parentEmail: 'ravi.kumar@email.com',
  childName: 'Aarav Kumar',
  childAge: '3 Years',
  childGender: 'Male',
  childDob: '12 May 2022',
  appointmentType: 'Initial Consultation',
  primaryConcern: 'Speech Delay',
  preferredDate: '15 Jul 2026',
  preferredTime: '10:30 AM',
  referralSource: 'Google Search',
  additionalNotes: 'Child is having difficulty in expressing words clearly. Need expert guidance.',
};

export const MOCK_MATCHES = [
  {
    id: 'P000124',
    name: 'Aarav Kumar',
    gender: 'Male',
    age: '3 Years',
    parentName: 'Ravi Kumar',
    relationship: 'Father',
    parentPhone: '+91 98765 43210',
    dob: '12 May 2022',
    lastVisit: '15 Jun 2026',
    score: 92,
    confidenceLabel: 'Very High Match',
    confidenceText: 'Best Match',
    confidenceType: 'high', // high | medium | low
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'P000087',
    name: 'Aarohi Singh',
    gender: 'Female',
    age: '3 Years',
    parentName: 'Neha Singh',
    relationship: 'Mother',
    parentPhone: '+91 98765 67890',
    dob: '10 May 2022',
    lastVisit: '02 May 2026',
    score: 78,
    confidenceLabel: 'High Match',
    confidenceText: 'Possible Match',
    confidenceType: 'medium', // high | medium | low
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'P000056',
    name: 'Aarav Patel',
    gender: 'Male',
    age: '4 Years',
    parentName: 'Vikram Patel',
    relationship: 'Father',
    parentPhone: '+91 87654 32109',
    dob: '12 Jan 2022',
    lastVisit: '20 Apr 2026',
    score: 65,
    confidenceLabel: 'Medium Match',
    confidenceText: 'Possible Match',
    confidenceType: 'low', // high | medium | low
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];
