'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { changeOrderStatus } from '@/actions/change-order-status';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@prisma/client';

type StatusDropdownProps = {
  id: string;
  orderStatus: OrderStatus;
};

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  awaiting_shipment: 'Awaiting Shipment',
  fulfilled: 'Fulfilled',
  shipped: 'Shipped',
};

function StatusDropdown({ id, orderStatus }: StatusDropdownProps) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ['change-order-status'],
    mutationFn: changeOrderStatus,
    onSuccess() {
      router.refresh();
    },
    onError() {
      toast.error('Something went wrong', {
        description: 'We could not update the order status. Please try agin.',
        classNames: {
          toast: '!bg-muted overflow-hidden',
          icon: 'text-destructive',
          description: '!text-muted-foreground truncate',
        },
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={isPending}
          className="flex w-52 items-center justify-between"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="">
        {Object.keys(OrderStatus).map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => {
              mutate({ id, newSatus: status as OrderStatus });
            }}
            disabled={isPending}
            className={cn(
              'flex cursor-default items-center gap-2 p-2.5 text-sm hover:bg-zinc-100',
              { 'bg-zinc-100': status === orderStatus },
            )}
          >
            <Check
              className={cn(
                'text-primary mr-2 size-4',
                orderStatus === status ? 'opacity-100' : 'opacity-0',
              )}
            />
            {LABEL_MAP[status as OrderStatus]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default StatusDropdown;
