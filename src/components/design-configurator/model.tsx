import type { Dispatch, SetStateAction } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MODELS, type Options } from '@/validators/option-validator';
import { cn } from '@/lib/utils';

type PhoneModelProps = {
  selectedModel: (typeof MODELS.options)[number];
  setOptions: Dispatch<SetStateAction<Options>>;
};

function PhoneModel({ selectedModel, setOptions }: PhoneModelProps) {
  return (
    <div className="relative mt-6 flex w-full flex-col gap-3">
      <h3 className="font-medium">Model</h3>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selectedModel.label}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {MODELS.options.map((model) => (
            <DropdownMenuItem
              key={model.label}
              onClick={() => setOptions((prev) => ({ ...prev, model }))}
              className={cn(
                'flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100',
                {
                  'bg-zinc-100': model.label === selectedModel.label,
                },
              )}
            >
              <Check
                aria-hidden
                className={cn(
                  'text-primary me-2 size-4',
                  model.label === selectedModel.label
                    ? 'opacity-100'
                    : 'opacity-0',
                )}
              />
              {model.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default PhoneModel;
