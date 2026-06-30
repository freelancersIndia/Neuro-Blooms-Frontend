import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getPublicDoctors,
  getPublicAvailableSlots,
  createPublicAppointmentRequest,
} from '../services/public.service';

export const usePublicDoctors = () => {
  return useQuery({
    queryKey: ['publicDoctors'],
    queryFn: getPublicDoctors,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePublicAvailableSlots = (doctorId, date) => {
  return useQuery({
    queryKey: ['publicAvailableSlots', doctorId, date],
    queryFn: () => getPublicAvailableSlots(doctorId, date),
    enabled: !!doctorId && !!date,
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useCreatePublicAppointmentRequest = () => {
  return useMutation({
    mutationFn: createPublicAppointmentRequest,
  });
};
