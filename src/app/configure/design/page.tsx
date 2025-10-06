import DesignConfigurator from '@/components/design-configurator';
import { db } from '@/db';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: 'Design Your Case' };

type DesignPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function DesignPage({ searchParams }: DesignPageProps) {
  const { id } = await searchParams;

  if (!id || typeof id !== 'string') {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({ where: { id } });

  if (!configuration) {
    return notFound();
  }

  const { width, height, imageUrl } = configuration;

  return (
    <DesignConfigurator
      configId={id}
      width={width}
      height={height}
      imageUrl={imageUrl}
    />
  );
}

export default DesignPage;
