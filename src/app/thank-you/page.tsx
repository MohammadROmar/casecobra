import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import ThankYou from '@/components/thank-you';

type ThankYouPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { orderId } = await searchParams;

  if (!orderId || typeof orderId !== 'string') {
    return notFound();
  }

  return (
    <Suspense>
      <ThankYou orderId={orderId} />
    </Suspense>
  );
}

export default ThankYouPage;
