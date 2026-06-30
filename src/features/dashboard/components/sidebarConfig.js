export const menuConfig = [
  {
    section: 'ADMINISTRATION',
    items: [
      {
        id: 'user-management',
        title: 'User Management',
        icon: 'Users',
        color: '#7C3AED', // Purple
        children: [
          { title: 'Users', path: '/admin/users' },
          { title: 'Roles & Permissions', path: '/admin/roles' }
        ]
      },
      {
        id: 'clinic-management',
        title: 'Clinic Management',
        icon: 'Hospital',
        color: '#3B82F6', // Blue
        children: [
          { title: 'Clinic Settings', path: '/admin/clinic-settings' },
          { title: 'Weekly Schedule', path: '/admin/weekly-schedule' },
          { title: 'Clinic Holidays', path: '/admin/holidays' },
          { title: 'Clinic Breaks', path: '/admin/breaks' }
        ]
      },
      {
        id: 'reports',
        title: 'Reports',
        icon: 'TrendingUp',
        color: '#6366F1', // Indigo
        children: [
          { title: 'Dashboard Reports', path: '/admin/reports' }
        ]
      }
    ]
  },
  {
    section: 'DOCTORS',
    items: [
      {
        id: 'doctors',
        title: 'Doctors',
        icon: 'Stethoscope',
        color: '#10B981', // Emerald
        children: [
          { title: 'Doctor Directory', path: '/admin/doctors/directory' }
        ]
      },
      {
        id: 'doctor-scheduling',
        title: 'Doctor Scheduling',
        icon: 'Calendar',
        color: '#0D9488', // Teal
        children: [
          { title: 'Doctor Availability', path: '/admin/doctors/availability' },
          { title: 'Doctor Working Days', path: '/admin/doctors/working-days' },
          { title: 'Doctor Leaves', path: '/admin/doctors/leaves' },
          { title: 'Doctor Blocked Time', path: '/admin/doctors/blocked-time' }
        ]
      },
      {
        id: 'consultations',
        title: 'Consultations',
        icon: 'ClipboardList',
        color: '#06B6D4', // Cyan
        children: [
          { title: 'Active Consultations', path: '/admin/consultations/active' },
          { title: 'Consultation History', path: '/admin/consultations/history' },
          { title: 'Follow-up Appointments', path: '/admin/consultations/follow-up' }
        ]
      }
    ]
  },
  {
    section: 'RECEPTION',
    items: [
      {
        id: 'appointment-requests',
        title: 'Appointment Requests',
        icon: 'MessageSquare',
        color: '#F97316', // Orange
        children: [
          { title: 'All Requests', path: '/admin/reception/requests' }
        ]
      },
      {
        id: 'patients',
        title: 'Patients',
        icon: 'UserPlus',
        color: '#F43F5E', // Rose
        children: [
          { title: 'Patient Directory', path: '/admin/reception/patients' },
          { title: 'Patient Matching', path: '/admin/reception/matching' }
        ]
      },
      {
        id: 'appointments',
        title: 'Appointments',
        icon: 'Clock',
        color: '#8B5CF6', // Violet
        children: [
          { title: 'All Appointments', path: '/admin/reception/appointments' },
          { title: 'Calendar', path: '/admin/reception/calendar' },
          { title: 'Check-in', path: '/admin/reception/check-in' },
          { title: 'Today\'s Appointments', path: '/admin/reception/today' }
        ]
      }
    ]
  }
];
