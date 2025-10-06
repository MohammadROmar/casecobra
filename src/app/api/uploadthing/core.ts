import { createUploadthing, type FileRouter } from 'uploadthing/next';
import sharp from 'sharp';
import { z } from 'zod';
import { db } from '@/db';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();

      const imageMetadata = await sharp(buffer).metadata();

      const { width, height } = imageMetadata;

      if (!configId) {
        const configuration = await db.configuration.create({
          data: {
            imageUrl: file.url,
            height,
            width,
          },
        });
        return { configId: configuration.id };
      }

      const updatedConfiguration = await db.configuration.update({
        where: { id: configId },
        data: { croppedImageUrl: file.url },
      });

      return { configId: updatedConfiguration.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
