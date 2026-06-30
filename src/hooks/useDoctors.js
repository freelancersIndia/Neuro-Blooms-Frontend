import { useQuery } from '@tanstack/react-query';
import { getDoctors } from '../services/bookingApi';

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};
