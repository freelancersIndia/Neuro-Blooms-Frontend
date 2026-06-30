export interface Doctor {
  id: string;
  full_name: string;
  profile_image: string | null;
  qualification: string;
  specialization: string;
  experience: number;
  accepts_appointments: boolean;
}

export type DateStatus =
  | 'AVAILABLE'
  | 'NOT_ACCEPTING_APPOINTMENTS'
  | 'CLINIC_CLOSED'
  | 'HOLIDAY'
  | 'ON_LEAVE'
  | 'DOCTOR_OFF'
  | 'FULLY_BOOKED';

export interface AvailableDate {
  date: string; // YYYY-MM-DD
  weekday: string;
  status: DateStatus;
  message: string;
}

export interface AvailableSlot {
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  display: string; // e.g., "9:00 AM - 9:30 AM"
}

export interface PatientInfo {
  parent_first_name: string;
  parent_last_name: string;
  relationship_to_child: 'FATHER' | 'MOTHER' | 'GUARDIAN' | 'GRANDPARENT' | 'OTHER';
  mobile_number: string;
  alternate_mobile_number?: string | null;
  email: string;
  child_first_name: string;
  child_last_name: string;
  date_of_birth: string; // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  appointment_type: 'INITIAL' | 'FOLLOW_UP' | 'REVIEW' | 'INITIAL_CONSULTATION' | 'DEVELOPMENT_ASSESSMENT';
  primary_concern: string;
  additional_notes?: string | null;
  referral_source?: string | null;
}

export interface AppointmentRequestPayload extends PatientInfo {
  doctor_id: string;
  preferred_date: string;
  preferred_time_slot: string;
}

export interface AppointmentRequestResponse {
  id: number;
  request_number: string;
  status: string;
  child_first_name: string;
  child_last_name: string;
  preferred_date: string;
  preferred_time_slot: string;
}
