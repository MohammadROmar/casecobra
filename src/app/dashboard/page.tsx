import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import Income from '@/components/income';
import StatusDropdown from '@/components/status-dropdown';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/db';
import { getDateLastMonth, getDateLastWeek } from '@/utils/get-date-last-week';
import { formatPrice } from '@/utils/format-price';
import MaxWidthWrapper from '@/components/max-width-wrapper';

export const metadata: Metadata = { title: 'Dashboard' };

async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!user || user.email !== adminEmail) {
    return notFound();
  }

  const orders = await db.order.findMany({
    where: { isPaid: true, createdAt: { gte: getDateLastWeek() } },
    orderBy: { createdAt: 'desc' },
    include: { user: true, shippingAddress: true },
  });

  const lastWeekSum = await db.order.aggregate({
    where: { isPaid: true, createdAt: { gte: getDateLastWeek() } },
    _sum: { amount: true },
  });
  const lastMonthSum = await db.order.aggregate({
    where: { isPaid: true, createdAt: { gte: getDateLastMonth() } },
    _sum: { amount: true },
  });

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  return (
    <MaxWidthWrapper className="space-y-16 py-6">
      <section className="grid gap-4 sm:grid-cols-2">
        <Income
          title="Last Week"
          income={lastWeekSum._sum.amount ?? 0}
          goal={WEEKLY_GOAL}
        />
        <Income
          title="Last Month"
          income={lastMonthSum._sum.amount ?? 0}
          goal={MONTHLY_GOAL}
        />
      </section>

      <section>
        <h1 className="text-4xl font-bold tracking-tight">Incoming Orders</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell">
                Purchase date
              </TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="bg-accent">
                <TableCell>
                  <p className="font-medium">{order.shippingAddress?.name}</p>
                  <p className="text-muted-foreground hidden text-sm md:inline">
                    {order.user.email}
                  </p>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusDropdown id={order.id} orderStatus={order.status} />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {order.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(order.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </MaxWidthWrapper>
  );
}

export default DashboardPage;
