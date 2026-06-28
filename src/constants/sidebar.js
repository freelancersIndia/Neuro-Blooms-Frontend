import {
  LayoutDashboard,
  ClipboardList,
  CalendarCheck,
  CalendarDays,
  Users,
  Stethoscope,
  RotateCcw,
  UserRoundCheck,
  Clock3,
  FileText,
  Image,
  Star,
  Globe,
  MessageCircle,
  Mail,
  UserCog,
  ShieldCheck,
  Monitor,
  ClipboardCheck,
  BarChart3,
  PieChart,
  Settings,
  Search,
  Bell
} from 'lucide-react';

export const SIDEBAR_CONFIG = [
  {
    category: 'Dashboard',
    type: 'top-level',
    icon: LayoutDashboard,
    route: '/admin/dashboard',
    roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST']
  },
  {
    category: 'APPOINTMENTS',
    roles: ['ADMIN', 'RECEPTIONIST'],
    items: [
      {
        label: 'Appointment Requests',
        icon: ClipboardList,
        route: '/admin/appointments/requests',
        badgeKey: 'appointmentRequests',
        roles: ['ADMIN', 'RECEPTIONIST']
      },
      {
        label: 'Appointments',
        icon: CalendarCheck,
        route: '/admin/appointments/list',
        roles: ['ADMIN', 'RECEPTIONIST']
      },
      {
        label: 'Calendar',
        icon: CalendarDays,
        route: '/admin/calendar',
        roles: ['ADMIN', 'RECEPTIONIST']
      }
    ]
  },
  {
    category: 'PATIENT CARE',
    roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'],
    items: [
      {
        label: 'Patients',
        icon: Users,
        route: '/admin/patients',
        roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST']
      },
      {
        label: 'Consultations',
        icon: Stethoscope,
        route: '/admin/consultations',
        roles: ['ADMIN', 'DOCTOR']
      },
      {
        label: 'Follow-ups',
        icon: RotateCcw,
        route: '/admin/follow-ups',
        roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST']
      }
    ]
  },
  {
    category: 'CLINIC MANAGEMENT',
    roles: ['ADMIN', 'RECEPTIONIST'],
    items: [
      {
        label: 'Doctor Availability',
        icon: UserRoundCheck,
        route: '/admin/availability',
        roles: ['ADMIN', 'RECEPTIONIST']
      },
      {
        label: 'Appointment Slots',
        icon: Clock3,
        route: '/admin/slots',
        roles: ['ADMIN', 'RECEPTIONIST']
      },
      {
        label: 'Weekly Schedule',
        icon: Clock3,
        route: '/admin/weekly-schedule',
        roles: ['ADMIN', 'RECEPTIONIST']
      }
    ]
  },
  {
    category: 'CONTENT',
    roles: ['ADMIN'],
    items: [
      {
        label: 'Blogs',
        icon: FileText,
        route: '/admin/blogs',
        roles: ['ADMIN']
      },
      {
        label: 'Flyers',
        icon: Image,
        route: '/admin/flyers',
        roles: ['ADMIN']
      },
      {
        label: 'Success Stories',
        icon: Star,
        route: '/admin/stories',
        roles: ['ADMIN']
      },
      {
        label: 'Website Pages',
        icon: Globe,
        route: '/admin/pages',
        roles: ['ADMIN']
      }
    ]
  },
  {
    category: 'COMMUNICATION',
    roles: ['ADMIN', 'RECEPTIONIST'],
    items: [
      {
        label: 'WhatsApp',
        icon: MessageCircle,
        route: '/admin/whatsapp',
        badgeKey: 'whatsapp',
        roles: ['ADMIN', 'RECEPTIONIST']
      },
      {
        label: 'Email Templates',
        icon: Mail,
        route: '/admin/email-templates',
        roles: ['ADMIN']
      }
    ]
  },
  {
    category: 'SECURITY',
    roles: ['ADMIN'],
    items: [
      {
        label: 'Users',
        icon: UserCog,
        route: '/admin/users',
        roles: ['ADMIN']
      },
      {
        label: 'Roles & Permissions',
        icon: ShieldCheck,
        route: '/admin/roles',
        roles: ['ADMIN']
      },
      {
        label: 'Active Sessions',
        icon: Monitor,
        route: '/admin/sessions',
        badgeKey: 'activeSessions',
        roles: ['ADMIN']
      },
      {
        label: 'Activity Logs',
        icon: ClipboardCheck,
        route: '/admin/logs',
        roles: ['ADMIN']
      }
    ]
  },
  {
    category: 'ANALYTICS',
    roles: ['ADMIN'],
    items: [
      {
        label: 'Reports',
        icon: BarChart3,
        route: '/admin/reports',
        roles: ['ADMIN']
      },
      {
        label: 'Dashboard Analytics',
        icon: PieChart,
        route: '/admin/analytics',
        roles: ['ADMIN']
      }
    ]
  },
  {
    category: 'SETTINGS',
    roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'],
    items: [
      {
        label: 'General Settings',
        icon: Settings,
        route: '/admin/settings/general',
        roles: ['ADMIN']
      },
      {
        label: 'SEO Settings',
        icon: Search,
        route: '/admin/settings/seo',
        roles: ['ADMIN']
      },
      {
        label: 'Notifications',
        icon: Bell,
        route: '/admin/settings/notifications',
        roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST']
      }
    ]
  }
];

export default SIDEBAR_CONFIG;
