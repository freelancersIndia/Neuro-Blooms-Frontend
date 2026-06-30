import { useQuery } from '@tanstack/react-query';
import { getAvailableDates } from '../services/bookingApi';

export const useAvailableDates = (doctorId) => {
  return useQuery({
    queryKey: ['availableDates', doctorId],
    queryFn: () => getAvailableDates(doctorId),
    enabled: !!doctorId,
    staleTime: 60 * 1000, // 1 minute cache
  });
};
