'use client';

import { Button } from '@/components/ui/button';
import { ButtonHTMLAttributes } from 'react';

type NavButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function NavButton({ children, className, ...props }: NavButtonProps) {
//   function handleClick() {
//     toast.error('권한이 없습니다.', {
//       description: '로그인 후 이용해주세요.',
//     });
//   }

  return (
    <Button
    //   onClick={handleClick}
      variant="link"
      className={className}
      {...props}>
      {children}
    </Button>
  );
}
