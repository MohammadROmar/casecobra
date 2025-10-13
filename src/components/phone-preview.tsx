'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { CaseColor } from '@prisma/client';

import { AspectRatio } from './ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { COLORS } from '@/validators/option-validator';
import phoneImg from '@/assets/images/clearphone.png';

type PhonePreviewProps = { color: CaseColor; croppedImageUrl: string };

function PhonePreview({ color, croppedImageUrl }: PhonePreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [renderedDimensions, setRenderedDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      if (!ref.current) return;

      const { width, height } = ref.current.getBoundingClientRect();

      setRenderedDimensions({ width, height });
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const caseBgColor = COLORS.find((c) => c.value === color);

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <Image
          src={croppedImageUrl}
          alt="Phone case"
          width={renderedDimensions.width / (3000 / 637)}
          height={renderedDimensions.height}
          className={cn(
            'phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]',
            caseBgColor,
          )}
        />
      </div>

      <div className="relative z-40 size-full">
        <Image src={phoneImg} alt="Phone" className="rounded-md" />
      </div>
    </AspectRatio>
  );
}

export default PhonePreview;
