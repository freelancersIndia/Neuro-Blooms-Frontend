import { useQuery } from '@tanstack/react-query';
import { getDoctors, getDoctorById } from '../services/doctors.service';

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
    staleTime: 5 * 60 * 1000, // 5 minutes cache validity
  });
};

export const useDoctor = (id) => {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => getDoctorById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
