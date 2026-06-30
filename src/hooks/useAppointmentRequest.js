import { useMutation } from '@tanstack/react-query';
import { submitAppointment } from '../services/bookingApi';

export const useAppointmentRequest = () => {
  return useMutation({
    mutationFn: submitAppointment,
  });
};
