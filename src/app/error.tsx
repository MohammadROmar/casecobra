'use client';

import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ErrorPage() {
  return (
    <section className="h-full">
      <MaxWidthWrapper className="flex h-full flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl">Something went wrong</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          An unexpected error occurred. PLease try again later
        </p>

        <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
          <Button
            onClick={() => window.location.reload()}
            className="cursor-pointer max-sm:w-full"
          >
            <RefreshCw className="mr-1.5 size-4" />
            Reload Page
          </Button>
          <Link
            href="/"
            className={cn(
              'cursor-pointer max-sm:w-full',
              buttonVariants({ variant: 'secondary' }),
            )}
          >
            <ArrowLeft className="mr-1.5 size-4" />
            Go Back Home
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
