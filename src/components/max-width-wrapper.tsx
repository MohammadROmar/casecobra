import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type MaxWidthWrapperProps = {
  className?: string;
} & PropsWithChildren;

function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
  return (
    <div
      className={cn(
        'mx-auto size-full max-w-screen-xl px-2.5 md:px-20',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
