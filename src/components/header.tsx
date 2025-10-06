import Link from 'next/link';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import MaxWidthWrapper from './max-width-wrapper';
import { getNavigationLinks, createCaseLink } from '@/data/navigation-links';
import { buttonVariants } from './ui/button';

export default async function Header() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  const navigationLinks = getNavigationLinks(!!user, isAdmin);

  return (
    <header className="sticky inset-x-0 top-0 z-[1000] h-14 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm transition-all supports-[backdrop-filter]:bg-white/60">
      <MaxWidthWrapper>
        <nav>
          <div className="flex h-14 items-center justify-between border-b border-zinc-200">
            <Link href="/" className="z-40 flex font-semibold" prefetch={false}>
              Case<span className="text-primary">cobra</span>
            </Link>

            <ul className="flex h-full items-center gap-4">
              {user && (
                <li>
                  <LogoutLink
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'destructive',
                    })}
                  >
                    Logout
                  </LogoutLink>
                </li>
              )}

              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link href={link.to} className={link.className}>
                    {link.label}
                    {link.icon && <link.icon className="ml-1.5 size-5" />}
                  </Link>
                </li>
              ))}

              {!user && (
                <>
                  <div
                    aria-hidden
                    className="hidden h-8 w-px bg-zinc-200 sm:block"
                  />

                  <li>
                    <Link
                      href={createCaseLink.to}
                      prefetch={false}
                      className={createCaseLink.className}
                    >
                      {createCaseLink.label}
                      {createCaseLink.icon && (
                        <createCaseLink.icon className="ml-1.5 size-5" />
                      )}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
}
