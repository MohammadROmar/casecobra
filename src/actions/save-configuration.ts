'use server';

import { db } from '@/db';
import type {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from '@prisma/client';

export type SaveConfigurationActionState = {
  configId: string;
  color: CaseColor;
  model: PhoneModel;
  material: CaseMaterial;
  finish: CaseFinish;
};

export async function saveConfigurationAction({
  configId,
  color,
  model,
  material,
  finish,
}: SaveConfigurationActionState) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, model, material, finish },
  });
}
