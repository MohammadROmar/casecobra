import { base64ToBlob } from '@/utils/base64-to-blob';
import { useUploadThing } from '@/utils/uploadthing';
import { useRef } from 'react';
import { toast } from 'sonner';

type useConfigurationParams = {
  configId: string;
  imageUrl: string;
  renderedPosition: { x: number; y: number };
  renderedDimension: { width: number; height: number };
};

export function useConfiguration({
  configId,
  imageUrl,
  renderedPosition,
  renderedDimension,
}: useConfigurationParams) {
  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing('imageUploader');

  async function saveConfiguration() {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      const userImage = new Image();
      userImage.crossOrigin = 'anonymous';
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height,
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(',')[1];

      const blob = base64ToBlob(base64Data, 'image/png');
      const file = new File([blob], 'filename.png', { type: 'image/png' });

      await startUpload([file], { configId });
    } catch (err) {
      console.log(err);

      toast.error('Something went wrong', {
        description:
          'There was a problem saving your config, please try again.',
        classNames: {
          toast: '!bg-muted',
          icon: 'text-destructive',
          description: '!text-muted-foreground',
        },
      });
    }
  }

  return { phoneCaseRef, containerRef, saveConfiguration };
}
