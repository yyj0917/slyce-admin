import { cn } from '@/libs/utils/styles';
import { Button } from '@/components/ui/button';

type MainLogoProps = {
  className?: string;
};

export function MainLogo({ className }: MainLogoProps) {
  return (
    <Button
      variant="custom"
      className={cn(
        'px-0 hover:drop-shadow-[6px_6px_6px_rgba(256,256,256,30%)] transition duration-200 ease-linear',
        className,
      )}>
      <h1 className="text-lg text-neutral-950 font-black tracking-tight dark:text-neutral-50">
        <span>SLY</span>
        <span className='before:content-["/"]'>CE</span>
      </h1>
    </Button>
  );
}