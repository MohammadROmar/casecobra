'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Icons } from './icons';
import { STEPS } from '@/data/steps';
import { cn } from '@/lib/utils';
import snake1Img from '@/assets/images/snake-1.png';
import snake2Img from '@/assets/images/snake-2.png';
import snake3Img from '@/assets/images/snake-3.png';

function Steps() {
  const pathname = usePathname();

  return (
    <section>
      <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-x lg:border-gray-200">
        {STEPS.map((step, i) => {
          const isCurrent = pathname.endsWith(step.url);
          const isCompleted = STEPS.slice(i + 1).some((step) =>
            pathname.endsWith(step.url),
          );

          const image = i === 0 ? snake1Img : i === 1 ? snake2Img : snake3Img;

          return (
            <li
              key={step.name}
              className={cn(
                'relative overflow-hidden before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-zinc-400 lg:flex-1 before:lg:top-auto before:lg:bottom-0 before:lg:h-1 before:lg:w-full',
                {
                  'before:bg-zinc-700': isCurrent,
                  'before:bg-primary': isCompleted,
                },
              )}
            >
              <div
                className={cn(
                  'flex items-center px-6 py-4 text-sm font-medium',
                  i !== 0 ? 'lg:pl-9' : '',
                )}
              >
                <div
                  className={cn('relative flex size-20 shrink-0', {
                    'border-none': isCompleted,
                    'border-zinc-700': isCurrent,
                  })}
                >
                  <Image
                    src={image}
                    alt="Cartoon snake image"
                    fill
                    sizes="5rem"
                    className="object-contain object-center select-none"
                  />
                </div>

                <div className="mt-0.5 ml-4 flex h-full min-w-0 flex-col justify-center">
                  <h3
                    className={cn('text-sm font-semibold text-zinc-700', {
                      'text-primary': isCompleted,
                      'text-zinc-700': isCurrent,
                    })}
                  >
                    {step.name}
                  </h3>
                  <p className="text-muted-foreground text-sm font-normal">
                    {step.description}
                  </p>
                </div>
              </div>

              {i !== 0 ? (
                <div className="absolute inset-0 hidden w-3 lg:block">
                  <Icons.separator className="size-full text-gray-300" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default Steps;
