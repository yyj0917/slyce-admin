'use client';

import { Button } from '@/components/ui/button';
import { supabase } from '@/libs/supabase/client';
import { ButtonHTMLAttributes } from 'react';

type NavButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// 이해하기
interface StatusButtonProps extends NavButtonProps {
    inf: any; // 추가적인 props
  }
export function StatusButton({ inf, children, className, ...props }: StatusButtonProps) {

    const handleAgree = async(id:number, status:string): Promise<void> => {
        if (status === '승인') {
            
            const confirm = window.confirm('승인을 취소하시겠습니까?');
            if (confirm) {
                const [statusUpdate, valueCheckUpdate] = await Promise.all([
                    supabase
                        .from('inf')
                        .update({ status: '미확인' })
                        .eq('id', id),
                    supabase
                        .from('inf')
                        .update({ valid_check: '승인하기' })
                        .eq('id', id)
                ]);
            }
            else {
                return;
            }
        } else {
            const confirm = window.confirm('승인하시겠습니까?');
            if (confirm) {
                const [statusUpdate, valueCheckUpdate] = await Promise.all([
                    supabase
                        .from('inf')
                        .update({ status: '승인' })
                        .eq('id', id),
                    supabase
                        .from('inf')
                        .update({ valid_check: '승인취소' })
                        .eq('id', id)
                ]);
            }
            else {
                return;
            }
        }
        
        // console.log('data:', data);
    }
  return (
    <Button
      onClick={()=>handleAgree(inf.id, inf.status)}
      variant="link"
      className={className}
      {...props}>
      {children}
    </Button>
  );
}
