import Image from 'next/image';
import { Check, Star } from 'lucide-react';

import MaxWidthWrapper from './max-width-wrapper';
import UnderlineIcon from '@/assets/icons/underline';
import { CUSTOMER_REVIEWS } from '@/data/customers-reviews';
import snakeImg from '@/assets/images/snake-2.png';

export default function ValueProposition() {
  return (
    <section className="bg-slate-100 py-24">
      <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
        <div className="flex flex-col items-center gap-4 sm:gap-6 lg:flex-row">
          <h2 className="order-1 mt-2 text-center text-5xl !leading-tight font-bold tracking-tight text-balance text-gray-900 md:text-6xl">
            What our{' '}
            <span className="relative px-2">
              customers
              <UnderlineIcon className="text-primary pointer-events-none absolute inset-x-0 -bottom-6 hidden sm:block" />
            </span>{' '}
            say
          </h2>
          <div className="order-0 size-24 lg:order-2">
            <Image
              src={snakeImg}
              alt="Cartoon cobra with a smiling face, big eyes, and a protruding red tongue, outlined in black. The snake is a vibrant green."
              className="select-none"
            />
          </div>
        </div>

        <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {CUSTOMER_REVIEWS.map((review) => (
            <li
              key={review.customerName}
              className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20"
            >
              <ul className="mb-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={`vlaue-proposition-stars-${i}`}>
                    <Star
                      aria-hidden
                      className="text-primary fill-primary size-5"
                    />
                  </li>
                ))}
              </ul>
              <div className="text-lg leading-8">
                <p>{review.review}</p>
              </div>
              <div className="mt-2 flex gap-4">
                <div className="size-12 overflow-hidden rounded-full">
                  <Image
                    src={review.image}
                    alt="User image"
                    className="object-cover select-none"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">{review.customerName}</p>
                  <div className="text-muted-foreground flex items-center gap-1.5">
                    <Check className="text-primary size-4 stroke-3" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </MaxWidthWrapper>
    </section>
  );
}
