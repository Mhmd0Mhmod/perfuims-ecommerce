import { OrderStatusSelect } from "@/components/admin/orders/OrderStatusSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatus } from "@/types/order";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Globe,
  Package,
  ShoppingCart,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "../helper";

const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    icon: React.ReactNode;
    description: string;
  }
> = {
  PENDING: {
    label: "قيد الانتظار",
    variant: "secondary",
    icon: <Clock className="h-5 w-5" />,
    description: "الطلب في انتظار المعالجة",
  },
  CONFIRMED: {
    label: "مؤكد",
    variant: "default",
    icon: <CheckCircle className="h-5 w-5" />,
    description: "تم تأكيد الطلب وجاري التجهيز",
  },
  SHIPPED: {
    label: "تم الشحن",
    variant: "outline",
    icon: <Truck className="h-5 w-5" />,
    description: "الطلب في الطريق إلى العميل",
  },
  DELIVERED: {
    label: "تم التسليم",
    variant: "default",
    icon: <Package className="h-5 w-5" />,
    description: "تم تسليم الطلب بنجاح",
  },
  CANCELLED: {
    label: "ملغي",
    variant: "destructive",
    icon: <XCircle className="h-5 w-5" />,
    description: "تم إلغاء هذا الطلب",
  },
};

async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) notFound();

  let order;
  try {
    order = await getOrderById(id);
  } catch {
    notFound();
  }

  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const isCancelled = order.status === "CANCELLED";
  const isDelivered = order.status === "DELIVERED";

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/orders">
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">طلب #{order.orderNumber}</h1>
            <p className="text-muted-foreground">تفاصيل الطلب وإدارته</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <OrderStatusSelect orderId={order.orderNumber} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Status Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              حالة الطلب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={`rounded-full p-3 ${
                  isCancelled
                    ? "bg-destructive/10 text-destructive"
                    : isDelivered
                      ? "bg-green-500/10 text-green-600"
                      : "bg-primary/10 text-primary"
                }`}
              >
                {statusConfig.icon}
              </div>
              <div>
                <Badge variant={statusConfig.variant} className="text-sm">
                  {statusConfig.label}
                </Badge>
                <p className="text-muted-foreground mt-1 text-sm">{statusConfig.description}</p>
              </div>
            </div>

            <Separator />

            {/* Order Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">رقم الطلب</span>
                <span className="font-medium">#{order.orderNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">عدد المنتجات</span>
                <span className="font-medium">{order.items.length} منتج</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">الدولة</span>
                <div className="flex items-center gap-1">
                  <Globe className="text-muted-foreground h-4 w-4" />
                  <span className="font-medium">{order.countryCode}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">المجموع الكلي</span>
              <span className="text-primary text-xl font-bold">{order.totalAmount.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Order Items Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              المنتجات
            </CardTitle>
            <CardDescription>قائمة المنتجات في هذا الطلب</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right font-semibold">المنتج</TableHead>
                    <TableHead className="text-center font-semibold">الكمية</TableHead>
                    <TableHead className="text-right font-semibold">سعر الوحدة</TableHead>
                    <TableHead className="text-right font-semibold">المجموع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                            <Package className="text-muted-foreground h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{item.productName}</div>
                            <div className="text-muted-foreground text-sm">
                              SKU: {item.productVariantId}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{item.quantity}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {item.subtotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Order Summary */}
            <div className="mt-4 space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span>{order.items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الشحن</span>
                <span>مجاني</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold">المجموع الكلي</span>
                <span className="text-primary text-lg font-bold">
                  {order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
