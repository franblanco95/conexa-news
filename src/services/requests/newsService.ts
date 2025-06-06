import axiosInstance from '../api';
import { sanitizeNews } from '../sanitizers/newsSanitizer';

export interface News {
  id: number;
  slug: string;
  url: string;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  status: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  userId: number;
}

export const getNews = async (): Promise<News[]> => {
  const { data } = await axiosInstance.get(`/posts`);
  return data.map(sanitizeNews);
};

export const getNewsDetail = async (id: string): Promise<News> => {
  const { data } = await axiosInstance.get(`/posts/${id}`);
  return data;
};
