import type { Dispatch, SetStateAction } from 'react';

import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  FINISHES,
  MATERIALS,
  type Options,
} from '@/validators/option-validator';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/utils/format-price';

type MaterialNFinishProps = {
  options: Options;
  setOptions: Dispatch<SetStateAction<Options>>;
};

function MaterialNFinish({ options, setOptions }: MaterialNFinishProps) {
  const selectedMaterial = options.material.label;
  const selectedFinish = options.finish.label;

  return (
    <>
      {[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
        <div key={name} className="mt-6">
          <h3 className="font-medium">
            {name.slice(0, 1).toUpperCase() + name.slice(1)}
          </h3>
          <RadioGroup
            value={options[name].label}
            onValueChange={(newVlaue) => {
              const values = name === 'material' ? MATERIALS : FINISHES;
              const value = values.options.find(
                (item) => item.label === newVlaue,
              );

              if (value) {
                setOptions((prev) => ({ ...prev, [name]: value }));
              }
            }}
            className="mt-3"
          >
            {selectableOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem
                  id={`${option.label}`}
                  value={option.label}
                  className="hidden"
                />
                <Label
                  htmlFor={`${option.label}`}
                  className={cn(
                    'border-border flex w-full cursor-pointer items-start justify-between gap-2 rounded-lg border-2 px-6 py-4 transition-colors duration-300',
                    {
                      'border-primary':
                        option.label === selectedMaterial ||
                        option.label === selectedFinish,
                    },
                  )}
                >
                  <span className="flex flex-col items-start">
                    <span className="font-medium">{option.label}</span>
                    {option.description && (
                      <span className="text-muted-foreground text-sm">
                        {option.description}
                      </span>
                    )}
                  </span>

                  <span className="text-muted-foreground mt-2 flex sm:mt-0 sm:ml-4 sm:flex-col sm:text-right">
                    {formatPrice(option.price)}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </>
  );
}

export default MaterialNFinish;
