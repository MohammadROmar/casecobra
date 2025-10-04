import { StaticImageData } from 'next/image';
import { useRef, useState, useEffect, type ComponentProps } from 'react';

import Phone from './phone';
import { cn } from '@/lib/utils';

type ReviewColumnProps = {
  reviews: StaticImageData[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
};

type ReviewProps = ComponentProps<'li'> & {
  image: StaticImageData;
};

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: ReviewColumnProps) {
  const columnRef = useRef<HTMLUListElement>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <ul
      ref={columnRef}
      style={{ animationDuration: duration }}
      className={cn('animate-marquee space-y-8 py-4', className)}
    >
      {reviews.concat(reviews).map((image, i) => (
        <Review
          key={`review-${image.src}-${i}`}
          image={image}
          className={reviewClassName?.(i % reviews.length)}
        />
      ))}
    </ul>
  );
}

function Review({ image, ...props }: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAYS = [
    '0s',
    '0.1s',
    '0.2s',
    '0.3s',
    '0.4s',
    '0.5s',
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <li
      {...props}
      className={cn(
        'animate-fade-in rounded-[2.5rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5',
        props.className,
      )}
      style={{ animationDelay }}
    >
      <Phone image={image} />
    </li>
  );
}

export default ReviewColumn;
