import { ArrowRight } from 'lucide-react';

import { Button } from '../ui/button';
import { formatPrice } from '@/utils/format-price';
import { BASE_PRICE } from '@/config/products';
import type { Options } from '@/validators/option-validator';

type PriceNContinueProps = {
  options: Options;
  isPending: boolean;
  onClick: () => void;
};

function PriceNContinue({ options, isPending, onClick }: PriceNContinueProps) {
  return (
    <div className="w-full px-8">
      <div className="relative flex w-full items-center gap-6 py-4 before:absolute before:inset-x-0 before:top-0 before:h-px before:w-full before:bg-zinc-200">
        <p className="font-medium whitespace-nowrap">
          {formatPrice(
            BASE_PRICE + options.material.price + options.finish.price,
          )}
        </p>
        <div className="w-full">
          <Button
            onClick={onClick}
            size="sm"
            isLoading={isPending}
            disabled={isPending}
            loadingText="Saving"
            className="flex w-full cursor-pointer"
          >
            Continue <ArrowRight className="ml-1.5 size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PriceNContinue;
