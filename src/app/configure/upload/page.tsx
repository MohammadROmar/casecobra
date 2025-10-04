import { Metadata } from 'next';

import UploadImage from '@/components/upload-image';

export const metadata: Metadata = { title: 'Configure Your Case' };

export default function ConfigureCasePage() {
  return (
    <section className="relative my-6 flex size-full flex-col items-center justify-center rounded-xl bg-gray-900/5 p-2 ring-gray-900/10 ring-inset lg:my-8 lg:rounded-2xl">
      <div className="relative flex w-full flex-1 flex-col items-center justify-center">
        <UploadImage />
      </div>
    </section>
  );
}
