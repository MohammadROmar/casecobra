import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFoundPage() {
  return (
    <section className="h-full">
      <MaxWidthWrapper className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-destructive text-9xl">404</p>
        <h1 className="mt-2 text-2xl">Page Not Found</h1>
        <p className="text-muted-foreground text-sm">
          Could not find the page you requested
        </p>

        <Link href="/" className={cn('mt-4 cursor-pointer', buttonVariants())}>
          <ArrowLeft className="mr-1.5 size-4" />
          Go Back Home
        </Link>
      </MaxWidthWrapper>
    </section>
  );
}
