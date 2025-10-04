import Image from 'next/image';
import { Check, Star } from 'lucide-react';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import Phone from '@/components/phone';
import { usersImages } from '@/data/users';
import snakeImg from '@/assets/images/snake-1.png';
import yourImageImg from '@/assets/images/your-image.png';
import lineImg from '@/assets/images/line.png';
import testimonialImg from '@/assets/images/testimonials/1.jpg';

export default function Hero() {
  return (
    <section>
      <MaxWidthWrapper className="grid-cols-1 pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pt-24 lg:pb-52 xl:gap-x-8 xl:pt-32">
        <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
          <div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="absolute -top-20 left-0 hidden size-28 lg:block">
              <Image
                src={snakeImg}
                alt="Cartoon snake with a light green body holds a mobile."
                fill
                sizes="(max-width: 63rem): 0rem, 7rem"
                className="size-full object-contain object-center"
              />
            </div>
            <h1 className="relative mt-16 w-fit text-5xl !leading-tight font-bold tracking-tight text-balance text-gray-900 md:text-6xl lg:text-7xl">
              Your Image on a{' '}
              <span className="bg-primary text-primary-foreground px-2">
                Custom
              </span>{' '}
              Phone Case
            </h1>
            <p className="mt-8 max-w-prose text-center text-lg text-balance md:text-wrap lg:pr-10 lg:text-left">
              Capture your favorite memories with your own,{' '}
              <span className="font-semibold">one-of-one</span>phone case.
              Casecobra allows you to protect you memories, not just your phone
              case.
            </p>

            <div className="mt-8 flex flex-col items-center text-left font-medium sm:items-start">
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5 text-left">
                  <Check aria-hidden className="text-primary size-5 shrink-0" />
                  High-quality, durable material
                </li>
                <li className="flex items-center gap-1.5 text-left">
                  <Check aria-hidden className="text-primary size-5 shrink-0" />
                  5 year print guarantee
                </li>
                <li className="flex items-center gap-1.5 text-left">
                  <Check aria-hidden className="text-primary size-5 shrink-0" />
                  Modern iPhone models supported
                </li>
              </ul>

              <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                <ul className="flex -space-x-4">
                  {usersImages.map((img, i) => (
                    <li
                      key={`user-img-${i}`}
                      className="inline-block size-10 overflow-hidden rounded-full ring-2 ring-slate-100"
                    >
                      <Image
                        src={img}
                        alt="User image"
                        className="object-cover object-center"
                      />
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col items-center justify-between sm:items-start">
                  <ul className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <li key={i}>
                        <Star className="fill-primary size-4 text-gray-600" />
                      </li>
                    ))}
                  </ul>

                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20">
          <div className="relative md:max-w-lg">
            <div className="absolute -top-20 left-56 hidden w-40 select-none sm:block lg:hidden lg:w-52 xl:block">
              <Image
                src={yourImageImg}
                alt='An image features the words "Your image", with a dashed line arrow pointing downward.'
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-20 select-none">
              <Image
                src={lineImg}
                alt='An image features the words "Your image", with a dashed line arrow pointing downward.'
              />
            </div>

            <Phone image={testimonialImg} className="w-64" />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
