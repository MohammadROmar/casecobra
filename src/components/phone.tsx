import Image, { StaticImageData } from 'next/image';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';
import darkPhoneImg from '@/assets/images/phone-template-dark-edges.png';
import whitePhoneImg from '@/assets/images/phone-template-white-edges.png';

type PhoneProps = {
  image: StaticImageData | string;
  dark?: boolean;
} & ComponentProps<'div'>;

function Phone({ image, dark = false, className, ...props }: PhoneProps) {
  return (
    <div
      {...props}
      className={cn(
        'pointer-events-none relative z-50 overflow-hidden select-none',
        className,
      )}
    >
      <Image src={dark ? darkPhoneImg : whitePhoneImg} alt="Phone image" />

      <Image
        src={image}
        alt="overlaying phone image"
        fill
        sizes="896px"
        className="absolute inset-0 -z-10 object-cover"
      />
    </div>
  );
}

export default Phone;
