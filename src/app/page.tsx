import Hero from '@/components/hero';
import ValueProposition from '@/components/value-proposition';
import Reviews from '@/components/reviews';
import DesignYourOwnCase from '@/components/design-your-own-case';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <Reviews />
      <DesignYourOwnCase />
    </>
  );
}
