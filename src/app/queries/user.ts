// queries/user.ts
import { supabase } from '@/libs/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useFetchUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw new Error(error.message);
      }
      return data.user;
    },
  });
};