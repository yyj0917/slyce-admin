'use client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ButtonHTMLAttributes } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/libs/supabase/client';
import { useFetchUser } from '@/app/queries/user';
import { useQueryClient } from '@tanstack/react-query';

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function AuthButton({ children, className, ...props }: AuthButtonProps) {
    const queryClient = useQueryClient();

    const {data: user, error} = useFetchUser();
    // const [mounted, setMounted] = useState(false);
    // const router = useRouter();

    // useEffect(() => {
    //     setMounted(true);
    //   }, []);
    
    const handleAuthAction = async () => {
        if (user) {
          // 로그아웃 처리
          await supabase.auth.signOut();
          queryClient.invalidateQueries({ queryKey: ['user'] });
          window.location.href = '/admin/login'; // URL을 이동할 때 '=' 사용
          //   router.push('/'); // 로그아웃 후 홈 페이지로 이동
        } else {
          // 로그인 페이지로 이동
        //   router.push('/login'); // 로그인 페이지로 이동 (페이지는 원하는 대로 변경)
        }
      };
    return (
        <Button
        onClick={handleAuthAction}
        variant="link"
        className={className}
        {...props}>
        {user ? '로그아웃' : '로그인'}  
        </Button>
    );
}
