'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { getAuthStatus } from '@/actions/get-auth-status';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(() => {
    const configurationId = localStorage.getItem('configurationId');
    if (configurationId) setConfigId(configurationId);
  }, []);

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  useEffect(() => {
    if (!data?.success) return;

    if (configId) {
      localStorage.removeItem('configurationId');
      router.push(`/configure/preview?id=${configId}`);
    } else {
      router.push('/');
    }
  }, [data, configId, router]);

  return (
    <section className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="text-muted-foreground flex size-8 animate-spin items-center justify-center" />
        <h3 className="text-xl font-semibold">Logging you in...</h3>
        <p className="text-muted-foreground">
          You will be redirected automatically.
        </p>
      </div>
    </section>
  );
}
