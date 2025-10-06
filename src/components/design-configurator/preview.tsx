import Image from 'next/image';
import { RefObject } from 'react';

import DesignConfiguratorRND, { type DesignConfiguratorRNDProps } from './rnd';
import { AspectRatio } from '../ui/aspect-ratio';
import { cn } from '@/lib/utils';
import phoneImg from '@/assets/images/phone-template.png';
import phoneCaseBackImg from '@/assets/images/phone-case-back.png';

type CasePreviewProps = {
  caseColor: string;
  containerRef: RefObject<HTMLDivElement | null>;
  phoneCaseRef: RefObject<HTMLDivElement | null>;
} & DesignConfiguratorRNDProps;

function CasePreview({
  containerRef,
  phoneCaseRef,
  caseColor,
  ...props
}: CasePreviewProps) {
  return (
    <div
      ref={containerRef}
      className="focus:ring-primary relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:ring-2 focus:ring-offset-2 focus:outline-none"
    >
      <div className="bg-opacity-50 pointer-events-none relative aspect-[896/1831] w-60 after:absolute after:inset-0 after:top-px after:right-[3px] after:bottom-px after:left-[3px] after:z-[90] after:rounded-[32px] after:shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]">
        <AspectRatio
          ref={phoneCaseRef}
          ratio={896 / 1831}
          className="relative z-[100] aspect-[896/1831] w-full"
        >
          <Image
            src={phoneImg}
            priority
            alt="Phone image"
            className="select-none"
          />
        </AspectRatio>
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 z-[55] transition-colors duration-300',
            `bg-${caseColor}`,
          )}
          style={{
            WebkitMaskImage: `url(${phoneCaseBackImg.src})`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
            WebkitMaskPosition: 'center',
            maskImage: `url(${phoneCaseBackImg.src})`,
            maskRepeat: 'no-repeat',
            maskSize: 'cover',
            maskPosition: 'center',
          }}
        />
      </div>

      <DesignConfiguratorRND {...props} />
    </div>
  );
}

export default CasePreview;
