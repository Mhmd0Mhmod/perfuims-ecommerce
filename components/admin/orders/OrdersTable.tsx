import { OrderStatusSelect } from "@/components/admin/orders/OrderStatusSelect";
import { PaginationServer } from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderAPI } from "@/lib/api/order";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import {
  Order,
  ORDER_STATUS,
  ORDER_STATUS_CONFIG,
  OrderSearchParams,
  OrderStatus,
  PAYMENT_STATUS,
} from "@/types/order";
import { Pagination } from "@/types/pagination";
import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";
import Link from "next/link";

export const ORDER_STATUS_ICONS: Record<
  OrderStatus,
  {
    icon: React.ReactNode;
  }
> = {
  PENDING: {
    icon: <Clock className="h-3 w-3" />,
  },
  CONFIRMED: {
    icon: <CheckCircle className="h-3 w-3" />,
  },
  SHIPPED: {
    icon: <Truck className="h-3 w-3" />,
  },
  DELIVERED: {
    icon: <Package className="h-3 w-3" />,
  },
  CANCELLED: {
    icon: <XCircle className="h-3 w-3" />,
  },
} as const;
async function OrdersTable({ searchParams }: { searchParams: OrderSearchParams }) {
  const data = await OrderAPI.getAdminOrdersServer(searchParams);
  const { content, totalPages } = data as Pagination<Order>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-right font-semibold">رقم الطلب</TableHead>
            <TableHead className="text-right font-semibold">التاريخ</TableHead>
            <TableHead className="text-right font-semibold">العميل</TableHead>
            <TableHead className="text-right font-semibold">الدفع</TableHead>
            <TableHead className="text-right font-semibold">المبلغ</TableHead>
            <TableHead className="text-center font-semibold">الحالة</TableHead>
            <TableHead className="text-center font-semibold">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {content.map((order: Order) => {
            const statusConfig = ORDER_STATUS_CONFIG[order.status];
            const isCancelled = order.status === ORDER_STATUS.CANCELLED;
            const isDelivered = order.status === ORDER_STATUS.DELIVERED;

            return (
              <TableRow
                key={order.orderNumber}
                className={cn("hover:bg-muted/50", isCancelled && "bg-muted/10 opacity-60")}
              >
                <TableCell>
                  <div className="text-right">
                    <Button className="font-medium" variant={"link"}>
                      <Link href={`/admin/orders/${order.orderId}`}>#{order.orderNumber}</Link>
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="text-muted-foreground text-sm">
                    {formatDate(order.createdAt || new Date().toISOString(), "short")}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col">
                    <span className="font-medium">{order.user.name}</span>
                    <span className="text-muted-foreground text-xs">{order.user.email}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">{order.payment.paymentMethodName}</span>
                    <Badge
                      variant={
                        order.payment.paymentStatus === PAYMENT_STATUS.COMPLETED
                          ? "default"
                          : "secondary"
                      }
                      className="w-fit text-[10px]"
                    >
                      {order.payment.paymentStatus === PAYMENT_STATUS.COMPLETED
                        ? "مدفوع"
                        : "غير مدفوع"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-semibold">
                    {formatCurrency({
                      amount: order.totalAmount,
                      code: order.countryCode,
                    })}
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Badge variant={statusConfig.variant} className="gap-1">
                      {ORDER_STATUS_ICONS[order.status].icon}
                      {statusConfig.label}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <OrderStatusSelect orderId={order.orderId} currentStatus={order.status} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <PaginationServer
        totalPages={totalPages}
        currentPage={data.pageable.pageNumber}
        searchParams={searchParams}
      />
    </div>
  );
}
export default OrdersTable;
