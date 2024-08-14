import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import { supabase } from '@/libs/supabase/client';

// 데이터 페칭 훅
// export const useFetchInfluencers = () => {
//   return useQuery('influencers', async () => {
//     const { data: inf, error } = await supabase.from('inf').select('*');
//     if (error) {
//       throw new Error(error.message);
//     }
//     return inf;
//   });
// };

export const useFetchInfluencers = () => {
    return useQuery({
      queryKey: ['influencers'],
      queryFn: async (): Promise<any[]> => {
        const { data: inf, error } = await supabase.from('inf').select('*');
        if (error) {
          throw new Error(error.message);
        }
        return inf || [];
      },
    });
  };
  
// // 인플루언서 데이터를 업데이트하는 함수
// const updateInfluencers = async (selectedIds: number[]) => {
//     const promises = selectedIds.map(id => 
//       supabase.from('inf')
//         .update({ status: '승인', valid_check: '승인취소' })
//         .eq('id', id)
//     );
//     await Promise.all(promises);
//   };

// // 인플루언서 데이터를 업데이트하는 훅
// export const useUpdateInfluencers = () => {
//     const queryClient = useQueryClient();
  
//     return useMutation((selectedIds: number[]) => updateInfluencers(selectedIds), {
//       onSuccess: () => {
//         // 데이터를 성공적으로 업데이트한 후 쿼리를 무효화하여 새 데이터로 갱신합니다.
//         queryClient.invalidateQueries('influencers');
//       },
//     });
//   };