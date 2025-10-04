'use client';

import { useInView } from 'react-intersection-observer';

import ReviewColumn from './review-column';
import { phones } from '@/data/review-phones';
import { splitArray } from '@/utils/split-array';
import { cn } from '@/lib/utils';

export default function ReviewGrid() {
  const { ref, inView } = useInView({ triggerOnce: true });

  const columns = splitArray(phones, 3);

  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={ref}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 before:absolute before:inset-x-0 before:top-0 before:z-30 before:h-36 before:bg-gradient-to-b before:from-slate-100 after:absolute after:inset-x-0 after:bottom-0 after:z-20 after:h-36 after:bg-gradient-to-t after:from-slate-100 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {inView ? (
        <>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) =>
              cn({
                'md:hidden': reviewIndex >= column1.length + column3[0].length,
                'lg:hidden': reviewIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? 'lg:hidden' : ''
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden md:block"
            msPerPixel={10}
          />
        </>
      ) : null}
    </div>
  );
}
