import Link from 'next/link';

import MaxWidthWrapper from './max-width-wrapper';

export default function Footer() {
  return (
    <footer className="relative h-20 bg-white">
      <MaxWidthWrapper>
        <div className="flex h-full flex-col items-center justify-center gap-1 border-t border-gray-200 md:flex-row md:justify-between">
          <Link href="/" className="font-semibold">
            Case<span className="text-primary">cobra</span>
          </Link>

          <div className="pb-2 text-center md:pb-0 md:text-left">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
