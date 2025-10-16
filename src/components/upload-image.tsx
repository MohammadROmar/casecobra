'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { CloudUpload, Loader2, MousePointerSquareDashed } from 'lucide-react';
import { toast } from 'sonner';

import { useUploadThing } from '@/utils/uploadthing';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

export default function UploadImage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const { configId } = data.serverData;

      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(progress) {
      setUploadProgress(progress);
    },
    onUploadError() {
      toast.error('Something went wrong', {
        description: 'Please try again later.',
        classNames: {
          toast: '!bg-muted overflow-hidden',
          icon: 'text-destructive',
          description: '!text-muted-foreground truncate',
        },
      });
    },
  });

  const [isPending, startTransition] = useTransition();

  function onDropRejected(rejectedFiles: FileRejection[]) {
    const [file] = rejectedFiles;

    toast.error(`${file.file.type} type is not supported.`, {
      description: 'Please choose a PNG, JPG, or JPEG image instead.',
      classNames: {
        toast: '!bg-muted',
        icon: 'text-destructive',
        description: '!text-muted-foreground',
      },
    });
  }

  function onDropAccepted(acceptedFiles: File[]) {
    startUpload(acceptedFiles, { configId: undefined });
  }

  return (
    <Dropzone
      onDropRejected={onDropRejected}
      onDropAccepted={onDropAccepted}
      accept={{
        'image/png': ['.png'],
        'image/jpg': ['.jpg'],
        'image/jpeg': ['.jpeg'],
      }}
      maxSize={4 * 1024 * 1024}
      maxFiles={1}
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={() => setIsDragOver(false)}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className={cn(
            'flex size-full flex-1 cursor-pointer flex-col items-center justify-center rounded-xl lg:rounded-2xl',
            { 'bg-blue-900/10 ring-neutral-900/25': isDragOver },
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragOver ? (
            <MousePointerSquareDashed className="text-muted-foreground mb-2 size-6" />
          ) : isUploading || isPending ? (
            <Loader2 className="text-muted-foreground mb-2 flex size-6 animate-spin items-center justify-center" />
          ) : (
            <CloudUpload className="text-muted-foreground mb-2 size-6" />
          )}
          <div className="text-muted-foreground mb-2 flex flex-col justify-center text-sm">
            {isUploading ? (
              <div className="flex flex-col items-center">
                <p>Uploading...</p>
                <Progress value={uploadProgress} className="mt-2 h-2 w-40" />
              </div>
            ) : isPending ? (
              <div className="flex flex-col items-center">
                <p>Redirecting, please wait...</p>
              </div>
            ) : isDragOver ? (
              <p>
                <span className="font-semibold">Drop file </span>
                to upload
              </p>
            ) : (
              <p>
                <span className="font-semibold">Click to upload </span>
                or
                <span className="font-semibold"> drag and drop</span>
              </p>
            )}
          </div>

          {!isPending && (
            <p className="text-muted-foreground text-xs">PNG, JPG, JPEG</p>
          )}
        </div>
      )}
    </Dropzone>
  );
}
