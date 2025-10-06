'use client';

import { useState } from 'react';

import { useConfiguration } from '@/hooks/configuration';
import { useSaveConfig } from '@/hooks/save-config';
import CasePreview from './preview';
import CaseColor from './color';
import PhoneModel from './model';
import MaterialNFinish from './material-n-finish';
import PriceNContinue from './price-n-continue';
import { ScrollArea } from '../ui/scroll-area';
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
  type Options,
} from '@/validators/option-validator';

type DesignConfiguratorProps = {
  configId: string;
  width: number;
  height: number;
  imageUrl: string;
};

function DesignConfigurator({
  configId,
  width,
  height,
  imageUrl,
}: DesignConfiguratorProps) {
  const [options, setOptions] = useState<Options>({
    color: COLORS[0],
    model: MODELS.options[3],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const [renderedDimension, setRenderedDimension] = useState({
    width: width / 4,
    height: height / 4,
  });
  const [renderedPosition, setRenderedPosition] = useState({ x: 150, y: 205 });

  const { containerRef, phoneCaseRef, saveConfiguration } = useConfiguration({
    configId,
    imageUrl,
    renderedDimension,
    renderedPosition,
  });

  const { mutate: saveConfig, isPending } = useSaveConfig({
    configId,
    saveConfiguration,
  });

  return (
    <section className="mt-20 mb-8 grid grid-cols-1 lg:grid-cols-3">
      <CasePreview
        containerRef={containerRef}
        phoneCaseRef={phoneCaseRef}
        caseColor={options.color.tw}
        height={height}
        width={width}
        imageUrl={imageUrl}
        setDimension={setRenderedDimension}
        setPosition={setRenderedPosition}
      />

      <div className="relative col-span-full lg:col-span-1">
        <ScrollArea className="relative h-[37.5rem] overflow-auto ring-lime-100 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-12 after:bg-gradient-to-t after:from-white">
          <div className="px-8 py-6">
            <h2 className="border-border mb-6 border-b pb-6 text-3xl font-bold tracking-tight">
              Customize your case
            </h2>

            <div className="relative mt-4 flex h-full flex-col justify-between">
              <CaseColor
                selectedColor={options.color}
                setOptions={setOptions}
              />
              <PhoneModel
                selectedModel={options.model}
                setOptions={setOptions}
              />
              <MaterialNFinish options={options} setOptions={setOptions} />
            </div>
          </div>
        </ScrollArea>

        <PriceNContinue
          options={options}
          isPending={isPending}
          onClick={() =>
            saveConfig({
              configId,
              color: options.color.value,
              model: options.model.value,
              material: options.material.value,
              finish: options.finish.value,
            })
          }
        />
      </div>
    </section>
  );
}

export default DesignConfigurator;
