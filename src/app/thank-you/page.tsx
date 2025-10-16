import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import ThankYou from '@/components/thank-you';

export const metadata: Metadata = { title: 'Design Your Case' };

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
