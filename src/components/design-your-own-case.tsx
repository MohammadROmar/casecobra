import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import Phone from '@/components/phone';
import { WHY_US } from '@/data/why-us';
import { buttonVariants } from '@/components/ui/button';
import arrowImg from '@/assets/images/arrow.png';
import testimonialImg from '@/assets/images/testimonials/1.jpg';

export default function DesignYourOwnCase() {
  return (
    <section>
      <MaxWidthWrapper className="py-24">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="order-1 mt-2 text-center text-5xl !leading-tight font-bold tracking-tight text-balance text-gray-900 md:text-6xl">
              Upload you photo and get{' '}
              <span className="bg-primary text-primary-foreground relative px-2">
                your own case
              </span>{' '}
              now
            </h2>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="relative flex flex-col items-center gap-40 md:grid md:grid-cols-2">
            <div className="absolute top-[25rem] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 select-none md:top-1/2 md:rotate-0">
              <Image src={arrowImg} alt="" aria-hidden />
            </div>

            <div className="relative h-80 w-full max-w-sm overflow-hidden rounded-xl bg-gray-900/5 ring-gray-900/10 ring-inset md:h-full md:justify-self-end lg:rounded-2xl">
              <div className="size-full overflow-hidden rounded-md bg-white object-cover shadow-2xl ring-1 ring-gray-900/10">
                <Image
                  src={testimonialImg}
                  alt=""
                  className="size-full object-cover object-center select-none"
                />
              </div>
            </div>

            <Phone image={testimonialImg} className="" />
          </div>
        </div>

        <ul className="mx-auto mt-12 w-fit max-w-prose space-y-2 sm:text-lg">
          {WHY_US.map((reason) => (
            <li key={reason} className="w-fit">
              <Check className="text-primary mr-1.5 inline size-5" />
              {reason}
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <Link
            href="/configure/upload"
            className={buttonVariants({
              size: 'lg',
              className: 'mx-auto mt-8',
            })}
          >
            Create your case now{' '}
            <ArrowRight aria-hidden className="ml-1.5 size-4" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
