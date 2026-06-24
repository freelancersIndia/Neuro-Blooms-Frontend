import { useMutation } from '@tanstack/react-query';
import { createAppointment } from '../services/appointment.service';

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: createAppointment,
  });
};
