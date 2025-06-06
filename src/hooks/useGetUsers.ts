import { useQuery } from '@tanstack/react-query';
import { getUserDetail, getUsers } from '../services/requests/usersService';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

export const useGetUserDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => (id ? getUserDetail(id) : null),
    enabled: !!id,
  });
};
