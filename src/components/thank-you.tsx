'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import PhonePreview from './phone-preview';
import { paymentStatus } from '@/actions/payment-status';
import { formatPrice } from '@/utils/format-price';

type LoaderProps = { title: string; subtitle: string };

function ThankYou({ orderId }: { orderId: string }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['payment-status'],
    queryFn: async () => await paymentStatus(orderId),
    retry: true,
    retryDelay: 500,
  });

  if (isPending) {
    return (
      <Loader title="Loading your order..." subtitle="This won't take long." />
    );
  }

  if (data === false) {
    return (
      <Loader
        title="Verifying your payment"
        subtitle="This might take a moment."
      />
    );
  }

  if (isError || !data) {
    return (
      <div className="mt-24 flex w-full justify-center">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-semibold">Something went wrong</h3>
          {error && <p className="text-muted-foreground">{error.message}</p>}
        </div>
      </div>
    );
  }

  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { color, croppedImageUrl } = configuration;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-primary text-base font-medium">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            We&apos;ve recieved your order and now processing it.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="font-medium">Order number</p>
            <p className="text-muted-foreground mt-2">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h3 className="font-semibold">You made a great choise</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              We at casecobra believe that a pone case doesn&apos;t only to look
              good, but also last you for the years to come. We offer a 5-year
              print guarantee: If your case isn&apos;t of the highest quality,
              we&apos;ll replace it for free
            </p>
          </div>
        </div>

        <div className="bg-secondary/5 right-1 mt-4 flex space-x-6 overflow-hidden rounded-xl ring-gray-900/10 ring-inset lg:rounded-2xl">
          <PhonePreview color={color!} croppedImageUrl={croppedImageUrl!} />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium">Shipping address</p>
              <div className="text-muted-foreground mt-2">
                <address className="not-italic">
                  <span className="block">{shippingAddress?.name}</span>
                  <span className="block">{shippingAddress?.street}</span>
                  <span className="block">
                    {shippingAddress?.postalCode} - {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>

            <div>
              <p className="font-medium">Shipping address</p>
              <div className="text-muted-foreground mt-2">
                <address className="not-italic">
                  <span className="block">{billingAddress?.name}</span>
                  <span className="block">{billingAddress?.street}</span>
                  <span className="block">
                    {billingAddress?.postalCode} - {billingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium">Payment status</p>
              <p className="text-muted-foreground mt-2">Paid</p>
            </div>

            <div>
              <p className="font-medium">Shipping Method</p>
              <p className="text-muted-foreground mt-2">
                DHL, takes up to 3 working days
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium">Subtotal</p>
            <p className="text-muted-foreground">{formatPrice(amount)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Shipping</p>
            <p className="text-muted-foreground">{formatPrice(0)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Total</p>
            <p className="text-muted-foreground">{formatPrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loader({ title, subtitle }: LoaderProps) {
  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

export default ThankYou;
