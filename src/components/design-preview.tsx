import { Configuration } from '@prisma/client';
import { Check } from 'lucide-react';

import Confetti from './confetti';
import Phone from './phone';
import CreateCheckoutSessionBtn from './create-checkout-session-btn';
import { formatPrice } from '@/utils/format-price';
import { cn } from '@/lib/utils';
import { COLORS, MODELS } from '@/validators/option-validator';
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products';

type DesignPreviewProps = { configuration: Configuration };

function DesignPreview({ configuration }: DesignPreviewProps) {
  const { color, model, material, finish } = configuration;

  const tw = COLORS.find((value) => value.value === color)?.tw;
  const selectedModel = MODELS.options.find(
    (value) => value.value === model,
  )?.label;

  let totalPrice = BASE_PRICE;
  if (material === 'polycarbonate')
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === 'textured') totalPrice += PRODUCT_PRICES.finish.textured;

  return (
    <section>
      <Confetti />
      <div className="mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            className={cn({ [`bg-${tw}`]: tw })}
            image={configuration.croppedImageUrl!}
          />
        </div>

        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          {selectedModel && (
            <h2 className="text-3xl font-bold tracking-tight">
              Your {selectedModel} Case
            </h2>
          )}

          <div className="mt-3 flex items-center gap-1.5">
            <Check className="text-primary size-4" />
            <p>In stock and ready to ship</p>
          </div>

          <div className="sm:col-span-12 md:col-span-9">
            <div className="border-border grid grid-cols-1 gap-y-8 border-b py-8 sm:grid-cols-2 sm:gap-x-6 md:py-10">
              <div>
                <h3 className="font-medium">Highlights</h3>
                <ol className="text-muted-foreground mt-3 list-inside list-disc">
                  <li>Wireless charging compatible.</li>
                  <li>TPU shock absorption.</li>
                  <li>Packafing made from recycled materials.</li>
                  <li>5-year print warranty.</li>
                </ol>
              </div>

              <div>
                <h3 className="font-medium">Materials</h3>
                <ol className="text-muted-foreground mt-3 list-inside list-disc">
                  <li>High-quality, durable material.</li>
                  <li>Scratch and fingureprint resistant coating.</li>
                </ol>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                <div className="flow-root text-sm">
                  <div className="mt-2 flex items-center justify-between py-1">
                    <h4 className="text-muted-foreground">Base price</h4>
                    <p className="font-medium">{formatPrice(BASE_PRICE)}</p>
                  </div>
                  {finish === 'textured' && (
                    <div className="mt-2 flex items-center justify-between py-1">
                      <h4 className="text-muted-foreground">Textured finish</h4>
                      <p className="font-medium">
                        {formatPrice(PRODUCT_PRICES.finish.textured)}
                      </p>
                    </div>
                  )}
                  {material === 'polycarbonate' && (
                    <div className="mt-2 flex items-center justify-between py-1">
                      <h4 className="text-muted-foreground">
                        Soft polycarbonate material
                      </h4>
                      <p className="font-medium">
                        {formatPrice(PRODUCT_PRICES.material.polycarbonate)}
                      </p>
                    </div>
                  )}

                  <div className="realtive border-border mt-2 flex items-center justify-between border-t py-2 font-semibold">
                    <h3>Order total</h3>
                    <p>{formatPrice(totalPrice)}</p>
                  </div>
                </div>
              </div>

              <CreateCheckoutSessionBtn configId={configuration.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignPreview;
