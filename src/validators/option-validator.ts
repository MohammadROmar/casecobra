// text-zinc-900 bg-zinc-900
// text-blue-950 bg-blue-950
// text-rose-950 bg-rose-950

import { PRODUCT_PRICES } from '@/config/products';

export const COLORS = [
  { label: 'Black', value: 'black', tw: 'zinc-900' },
  { label: 'Blue', value: 'blue', tw: 'blue-950' },
  { label: 'Rose', value: 'rose', tw: 'rose-950' },
] as const;

export const MODELS = {
  name: 'models',
  options: [
    { label: 'Samsung S24', value: 'samsungs24' },
    { label: 'Samsung S25', value: 'samsungs25' },
    { label: 'iPhone 15', value: 'iphone15' },
    { label: 'iPhone 16', value: 'iphone16' },
    { label: 'iPhone 17', value: 'iphone17' },
  ],
} as const;

export const MATERIALS = {
  name: 'material',
  options: [
    {
      label: 'Silicone',
      value: 'silicone',
      description: undefined,
      price: PRODUCT_PRICES.material.silicone,
    },
    {
      label: 'Soft Polycarbonate',
      value: 'softpolycarbonate',
      description: 'Scratch-resistant coating',
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const;

export const FINISHES = {
  name: 'finish',
  options: [
    {
      label: 'Smooth Finish',
      value: 'smooth',
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: 'Textured Finish',
      value: 'textured',
      description: 'Soft grippy texture',
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const;

export type Options = {
  color: (typeof COLORS)[number];
  model: (typeof MODELS.options)[number];
  material: (typeof MATERIALS.options)[number];
  finish: (typeof FINISHES.options)[number];
};
