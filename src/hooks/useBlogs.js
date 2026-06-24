import { useQuery } from '@tanstack/react-query';
import { getBlogs, getBlogBySlug } from '../services/blogs.service';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    staleTime: 5 * 60 * 1000,
  });
};

export const useBlog = (slug) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
