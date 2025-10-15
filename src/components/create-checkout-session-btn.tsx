'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

import LoginModal from './login-modal';
import { Button } from './ui/button';
import { createCheckoutSession } from '@/actions/create-checkout-session';

function CreateCheckoutSessionBtn({ configId }: { configId: string }) {
  const router = useRouter();
  const { user } = useKindeBrowserClient();

  const { mutate: createPaymentSession, isPending } = useMutation({
    mutationKey: ['get-checkout-session'],
    mutationFn: createCheckoutSession,
    onSuccess({ url }) {
      if (url) {
        router.push(url);
      } else {
        throw new Error('Unable to retrieve payment URL.');
      }
    },
    onError(error) {
      toast.error('Something went wrong', {
        description: error.message,
        classNames: {
          toast: '!bg-muted overflow-hidden',
          icon: 'text-destructive',
          description: '!text-muted-foreground truncate',
        },
      });
    },
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  function handleCheckout() {
    if (user) {
      createPaymentSession({ configId });
    } else {
      localStorage.setItem('configurationId', configId);
      setIsLoginModalOpen(true);
    }
  }

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className="mt-8 flex items-center justify-end pb-12">
        <Button
          disabled={isPending}
          isLoading={isPending}
          onClick={() => handleCheckout()}
          className="w-full cursor-pointer"
        >
          Check out <ArrowRight className="ml-1.5 size-4" />
        </Button>
      </div>
    </>
  );
}

export default CreateCheckoutSessionBtn;
