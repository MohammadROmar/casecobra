import type { Dispatch, SetStateAction } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { buttonVariants } from './ui/button';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';

type LoginModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function LoginModal({ isOpen, setIsOpen }: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login to continue</DialogTitle>
          <DialogDescription>
            <span className="font-medium">Your configuration was saved!</span>{' '}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <RegisterLink className={buttonVariants({ variant: 'outline' })}>
            Register
          </RegisterLink>
          <LoginLink className={buttonVariants()}>Login</LoginLink>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
