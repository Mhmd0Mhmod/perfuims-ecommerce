"use client";
import { getAdminOrders } from "@/app/admin/orders/helper";
import { CancelOrderButton } from "@/components/admin/orders/CancelOrderButton";
import { OrderStatusSelect } from "@/components/admin/orders/OrderStatusSelect";
import TableSkeleton from "@/components/shared/table-skeleton";
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
import { usePagination } from "@/hooks/use-PaginationL";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Order, ORDER_STATUS, OrderStatus, PAYMENT_STATUS } from "@/types/order";
import { CheckCircle, Clock, Eye, Package, ShoppingCart, Truck, XCircle } from "lucide-react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    icon: React.ReactNode;
  }
> = {
  PENDING: {
    label: "قيد الانتظار",
    variant: "secondary",
    icon: <Clock className="h-3 w-3" />,
  },
  CONFIRMED: {
    label: "مؤكد",
    variant: "default",
    icon: <CheckCircle className="h-3 w-3" />,
  },
  SHIPPED: {
    label: "تم الشحن",
    variant: "outline",
    icon: <Truck className="h-3 w-3" />,
  },
  DELIVERED: {
    label: "تم التسليم",
    variant: "default",
    icon: <Package className="h-3 w-3" />,
  },
  CANCELLED: {
    label: "ملغي",
    variant: "destructive",
    icon: <XCircle className="h-3 w-3" />,
  },
};
function OrdersTable() {
  const {
    items: orders,
    hasMore,
    loadMore,
    setItems,
    setPage,
  } = usePagination({
    queryFn: getAdminOrders,
    queryKey: ["admin-orders"],
  });

  return (
    <InfiniteScroll
      dataLength={orders.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<TableSkeleton columns={6} rows={5} />}
    >
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
            {orders.map((order: Order) => {
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
                        {statusConfig.icon}
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <OrderStatusSelect orderId={order.orderId} currentStatus={order.status} />
                      <CancelOrderButton
                        orderId={order.orderId}
                        disabled={isCancelled || isDelivered}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </InfiniteScroll>
  );
}
export default OrdersTable;
