import { z } from 'zod';

export const patientInfoSchema = z.object({
  parent_first_name: z
    .string()
    .min(1, 'Parent first name is required')
    .max(150, 'First name cannot exceed 150 characters'),
  parent_last_name: z
    .string()
    .min(1, 'Parent last name is required')
    .max(150, 'Last name cannot exceed 150 characters'),
  relationship_to_child: z.enum(
    ['FATHER', 'MOTHER', 'GUARDIAN', 'GRANDPARENT', 'OTHER'],
    { errorMap: () => ({ message: 'Please select a valid relationship' }) }
  ),
  mobile_number: z
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(20, 'Mobile number cannot exceed 20 characters')
    .regex(/^[+0-9\s\-()]+$/, 'Invalid mobile number format. Only numbers, spaces, dashes, and parentheses are allowed.'),
  alternate_mobile_number: z
    .string()
    .max(20, 'Alternate mobile number cannot exceed 20 characters')
    .regex(/^[+0-9\s\-()]*$/, 'Invalid mobile number format')
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? null : val),
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Enter a valid email address'),
  child_first_name: z
    .string()
    .min(1, "Child's first name is required")
    .max(150, 'Child first name cannot exceed 150 characters'),
  child_last_name: z
    .string()
    .min(1, "Child's last name is required")
    .max(150, 'Child last name cannot exceed 150 characters'),
  date_of_birth: z
    .string()
    .min(1, "Child's date of birth is required")
    .refine(
      (val) => {
        const dob = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return dob <= today;
      },
      { message: "Child's date of birth cannot be in the future." }
    ),
  gender: z.enum(
    ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'],
    { errorMap: () => ({ message: 'Please select a gender' }) }
  ),
  appointment_type: z.enum(
    ['INITIAL', 'FOLLOW_UP', 'REVIEW', 'INITIAL_CONSULTATION', 'DEVELOPMENT_ASSESSMENT'],
    { errorMap: () => ({ message: 'Please select an appointment type' }) }
  ),
  primary_concern: z
    .string()
    .min(1, 'Primary concern is required')
    .max(2000, 'Primary concern cannot exceed 2000 characters'),
  additional_notes: z
    .string()
    .max(2000, 'Additional notes cannot exceed 2000 characters')
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? null : val),
  referral_source: z
    .string()
    .max(255, 'Referral source cannot exceed 255 characters')
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? null : val),
});

export type PatientInfoInput = z.infer<typeof patientInfoSchema>;
