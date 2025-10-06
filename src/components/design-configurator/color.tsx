import type { Dispatch, SetStateAction } from 'react';

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { COLORS, type Options } from '@/validators/option-validator';

type CaseColorProps = {
  selectedColor: (typeof COLORS)[number];
  setOptions: Dispatch<SetStateAction<Options>>;
};

function CaseColor({ selectedColor, setOptions }: CaseColorProps) {
  return (
    <>
      <h3 className="font-medium">Color: {selectedColor.label}</h3>
      <RadioGroup
        value={selectedColor.label}
        onValueChange={(newValue) => {
          const color = COLORS.find((color) => color.label === newValue);

          if (color !== undefined) {
            setOptions((prev) => ({ ...prev, color }));
          }
        }}
        className="mt-3 flex items-center gap-x-3"
      >
        {COLORS.map((color) => (
          <div key={color.label}>
            <Label htmlFor={`$radio-${color.label}`} className="sr-only">
              {color.label}
            </Label>
            <RadioGroupItem
              id={`$radio-${color.label}`}
              value={color.label}
              className={cn(
                'relative -m-0.5 flex size-8 cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none active:outline-none',
                `text-${color.tw} bg-${color.tw}`,
                {
                  [`ring-primary ring-2 ring-offset-1`]:
                    color.label === selectedColor.label,
                },
              )}
            >
              <span
                className={cn(
                  `bg-${color.tw}`,
                  'size-8 rounded-full border border-black backdrop-opacity-10',
                )}
              ></span>
            </RadioGroupItem>
          </div>
        ))}
      </RadioGroup>
    </>
  );
}

export default CaseColor;
