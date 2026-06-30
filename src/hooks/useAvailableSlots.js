import { useQuery } from '@tanstack/react-query';
import { getAvailableSlots } from '../services/bookingApi';

export const useAvailableSlots = (doctorId, date) => {
  return useQuery({
    queryKey: ['availableSlots', doctorId, date],
    queryFn: () => getAvailableSlots(doctorId, date),
    enabled: !!doctorId && !!date,
    staleTime: 30 * 1000, // 30 seconds cache
  });
};
