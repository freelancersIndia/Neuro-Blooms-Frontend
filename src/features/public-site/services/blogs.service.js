import api from '../../../api/publicApi';
import { MOCK_BLOGS_DATA } from '../data/blogsData';

export const getBlogs = async () => {
  try {
    const response = await api.get('/blogs');
    return response.data;
  } catch (error) {
    console.warn('Backend offline, using mock blogs');
    return MOCK_BLOGS_DATA;
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
  } catch (error) {
    console.warn(`Backend offline, using mock data for blog: ${slug}`);
    return MOCK_BLOGS_DATA.find((b) => b.slug === slug) || null;
  }
};
