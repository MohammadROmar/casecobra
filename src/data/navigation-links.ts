import { ArrowRight } from 'lucide-react';
import type { ElementType } from 'react';

import { buttonVariants } from '@/components/ui/button';

type NavLink = {
  to: string;
  label: string;
  className: string;
  icon?: ElementType;
};

export const createCaseLink: NavLink = {
  to: '/configure/upload',
  label: 'Create case',
  className: buttonVariants({
    size: 'sm',
    className: '!hidden items-center gap-1 sm:!flex',
  }),
  icon: ArrowRight,
};

export const signedInNavLinks: NavLink[] = [createCaseLink];

const adminNavLinks: NavLink[] = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    className: buttonVariants({ size: 'sm', variant: 'ghost' }),
  },
  createCaseLink,
];

const notSignedInNavLinks: NavLink[] = [
  {
    to: '/api/auth/register',
    label: 'Sign up',
    className: buttonVariants({ size: 'sm', variant: 'ghost' }),
  },
  {
    to: '/api/auth/login',
    label: 'Login',
    className: buttonVariants({ size: 'sm', variant: 'ghost' }),
  },
];

export function getNavigationLinks(user: boolean, isAdmin: boolean) {
  const navigationLinks = user
    ? isAdmin
      ? adminNavLinks
      : signedInNavLinks
    : notSignedInNavLinks;

  return navigationLinks;
}
