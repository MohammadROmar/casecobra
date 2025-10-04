import Image from 'next/image';

import MaxWidthWrapper from './max-width-wrapper';
import ReviewGrid from './review-grid';
import whatPeopleAreBuyingImg from '@/assets/images/what-people-are-buying.png';

export default function Reviews() {
  return (
    <section className="pointer-events-none bg-slate-100 py-24 select-none">
      <MaxWidthWrapper className="relative max-w-5xl">
        <div
          aria-hidden
          className="absolute top-1/3 -left-32 hidden select-none xl:block"
        >
          <Image src={whatPeopleAreBuyingImg} alt="" />
        </div>

        <ReviewGrid />
      </MaxWidthWrapper>
    </section>
  );
}
