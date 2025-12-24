import { CancelOrderButton } from "@/components/admin/orders/CancelOrderButton";
import { OrderStatusSelect } from "@/components/admin/orders/OrderStatusSelect";
import StatsSkeleton from "@/components/shared/stats-skeleton";
import TableSkeleton from "@/components/shared/table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency } from "@/lib/utils";
import { Order, OrderStatus } from "@/types/order";
import {
  CheckCircle,
  Clock,
  Eye,
  Package,
  Search,
  ShoppingCart,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getAdminOrders } from "./helper";

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

function OrdersPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Stats Cards */}
      <Suspense fallback={<StatsSkeleton length={4} />}>
        <div className="grid gap-4 md:grid-cols-4">
          <OrderStatsCard />
        </div>
      </Suspense>

      {/* Main Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="text-right">
              <CardTitle className="text-2xl font-bold">إدارة الطلبات</CardTitle>
              <CardDescription>عرض وإدارة جميع طلبات العملاء</CardDescription>
            </div>
            <div className="flex w-full gap-2 md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                <Input placeholder="ابحث عن طلب..." className="pr-10" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<TableSkeleton columns={6} rows={5} />}>
            <OrdersTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function OrderStatsCard() {
  const orders = await getAdminOrders();
  const totalOrders = orders.totalElements;
  const pendingOrders = orders.content.filter((o: Order) => o.status === "PENDING").length;
  const shippedOrders = orders.content.filter((o: Order) => o.status === "SHIPPED").length;
  const deliveredOrders = orders.content.filter((o: Order) => o.status === "DELIVERED").length;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
          <ShoppingCart className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
          <p className="text-muted-foreground text-xs">جميع الطلبات المستلمة</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">قيد الانتظار</CardTitle>
          <Clock className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingOrders}</div>
          <p className="text-muted-foreground text-xs">طلبات تحتاج معالجة</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">تم الشحن</CardTitle>
          <Truck className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{shippedOrders}</div>
          <p className="text-muted-foreground text-xs">طلبات في الطريق</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">تم التسليم</CardTitle>
          <Package className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deliveredOrders}</div>
          <p className="text-muted-foreground text-xs">طلبات مكتملة</p>
        </CardContent>
      </Card>
    </>
  );
}

async function OrdersTable() {
  const orders = await getAdminOrders();
  const totalOrders = orders.totalElements;

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right font-semibold">رقم الطلب</TableHead>
              <TableHead className="text-right font-semibold">المنتجات</TableHead>
              <TableHead className="text-right font-semibold">المبلغ</TableHead>
              <TableHead className="text-right font-semibold">الحالة</TableHead>
              <TableHead className="text-center font-semibold">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.content.length > 0 ? (
              orders.content.map((order: Order) => {
                const statusConfig = ORDER_STATUS_CONFIG[order.status];
                const isCancelled = order.status === "CANCELLED";
                const isDelivered = order.status === "DELIVERED";

                return (
                  <TableRow
                    key={order.orderNumber}
                    className={cn("hover:bg-muted/50", isCancelled && "bg-muted/10 opacity-60")}
                  >
                    <TableCell>
                      <div className="text-right">
                        <div className="font-medium">#{order.orderNumber}</div>
                        <div className="text-muted-foreground text-sm">
                          {order.items.length} منتج
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="max-w-[200px] space-y-1 truncate">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.productName} × {item.quantity}
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-muted-foreground text-xs">
                            +{order.items.length - 2} منتج آخر
                          </div>
                        )}
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

                    <TableCell className="text-right">
                      <Badge variant={statusConfig.variant} className="gap-1">
                        {statusConfig.icon}
                        {statusConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/orders/${order.orderId}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <OrderStatusSelect orderId={order.orderId} currentStatus={order.status} />
                        <CancelOrderButton
                          orderId={order.orderId}
                          disabled={isCancelled || isDelivered}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ShoppingCart className="text-muted-foreground h-10 w-10" />
                    <p className="text-muted-foreground">لا توجد طلبات حالياً</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          عرض {orders.content.length} من {totalOrders} طلب
        </div>
        <div className="text-muted-foreground text-sm">
          صفحة {orders.number + 1} من {orders.totalPages}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
