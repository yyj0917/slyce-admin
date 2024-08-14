
'use client';

import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/libs/utils/styles';
import { Button } from '@/components/ui/button';
import { ButtonHTMLAttributes } from 'react';

type ModeToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconSize?: number;
};

export function ModeToggle({
  iconSize = 20,
  className,
  ...props
}: ModeToggleProps) {
  const { theme, setTheme } = useTheme();

  function handleToggle() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Button
      variant="custom"
      size="icon"
      className={cn('group', className)}
      onClick={handleToggle}
      {...props}>
      <SunIcon
        size={iconSize}
        className="transition scale-100 dark:scale-0 group-hover:scale-110 dark:group-hover:scale-0 group-hover:fill-neutral-900 dark:group-hover:fill-neutral-50"
      />
      <MoonIcon
        size={iconSize}
        className="absolute transition scale-0 dark:scale-100 dark:group-hover:scale-110 group-hover:fill-neutral-900 dark:group-hover:fill-neutral-50"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
