"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ORDER_STATUS_CONFIG, OrderStatus } from "@/types/order";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateOrderStatus } from "@/app/admin/orders/actions";

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: OrderStatus;
}

export function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<OrderStatus>(currentStatus);

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (newStatus === status) return;

    startTransition(async () => {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result.success) {
        setStatus(newStatus);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  const currentLabel = ORDER_STATUS_CONFIG[status]?.label || status;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          className="min-w-30 justify-between"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {currentLabel}
              <ChevronDown className="mr-2 h-4 w-4" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(ORDER_STATUS_CONFIG).map(([value, config]) => (
          <DropdownMenuItem
            key={value}
            onClick={() => handleStatusChange(value as OrderStatus)}
            className="flex items-center justify-between"
          >
            {config.label}
            {value === status && <Check className="mr-2 h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
