import { useQuery } from '@tanstack/react-query';
import { getNews, getNewsDetail } from '../services/requests/newsService';

export const useGetNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: getNews,
  });
};

export const useGetNewsDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => (id ? getNewsDetail(id) : null),
    enabled: !!id,
  });
};
