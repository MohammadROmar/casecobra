import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { db } from '@/db';
import DesignPreview from '@/components/design-preview';

export const metadata: Metadata = { title: 'Preview Your Case' };

type ConfigureCasePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function ConfigureCasePage({ searchParams }: ConfigureCasePageProps) {
  const { id } = await searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({ where: { id } });

  if (
    !configuration ||
    !configuration.color ||
    !configuration.model ||
    !configuration.material ||
    !configuration.finish ||
    !configuration.croppedImageUrl
  ) {
    return notFound();
  }

  return <DesignPreview configuration={configuration} />;
}

export default ConfigureCasePage;
