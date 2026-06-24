import { useQuery } from '@tanstack/react-query';
import { getServices, getServiceBySlug } from '../services/services.service';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
    staleTime: 10 * 60 * 1000, // 10 minutes cache validity
  });
};

export const useService = (slug) => {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: () => getServiceBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};
