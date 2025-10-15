'use server';

import type { OrderStatus } from '@prisma/client';

import { db } from '@/db';

type ChangeOrderStatus = { id: string; newSatus: OrderStatus };

async function changeOrderStatus({ id, newSatus }: ChangeOrderStatus) {
  await db.order.update({ where: { id }, data: { status: newSatus } });
}

export { changeOrderStatus };
