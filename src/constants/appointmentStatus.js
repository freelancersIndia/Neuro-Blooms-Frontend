export const APPOINTMENT_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export const STATUS_STYLES = {
  [APPOINTMENT_STATUS.PENDING]: {
    bg: 'bg-amber-50 border-amber-100',
    text: 'text-amber-600',
    label: 'Pending'
  },
  [APPOINTMENT_STATUS.APPROVED]: {
    bg: 'bg-emerald-50 border-emerald-100',
    text: 'text-emerald-600',
    label: 'Approved'
  },
  [APPOINTMENT_STATUS.REJECTED]: {
    bg: 'bg-rose-50 border-rose-100',
    text: 'text-rose-600',
    label: 'Rejected'
  }
};

export default APPOINTMENT_STATUS;
