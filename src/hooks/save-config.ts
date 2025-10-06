import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  saveConfigurationAction,
  SaveConfigurationActionState,
} from '@/actions/save-configuration';

type useSaveConfig = {
  configId: string;
  saveConfiguration: () => Promise<void>;
};

export function useSaveConfig({ configId, saveConfiguration }: useSaveConfig) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (args: SaveConfigurationActionState) => {
      await Promise.all([saveConfiguration(), saveConfigurationAction(args)]);
    },
    onError() {
      toast.error('Something went wrong', {
        description: 'There was a error on our end. Please try again.',
        classNames: {
          toast: '!bg-muted',
          icon: 'text-destructive',
          description: '!text-muted-foreground',
        },
      });
    },
    onSuccess() {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  return mutation;
}
