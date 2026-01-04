import OrdersTable from "@/components/admin/orders/OrdersTable";
import StatsSkeleton from "@/components/shared/stats-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, Package, Search, ShoppingCart, Truck } from "lucide-react";
import { Suspense } from "react";
import { getAdminOrderStatus } from "./helper";
import FilterOrders from "@/components/admin/orders/FilterOrders";

async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    period?: string;
  }>;
}) {
  const params = await searchParams;
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
              <FilterOrders />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable {...params} />
        </CardContent>
      </Card>
    </div>
  );
}

async function OrderStatsCard() {
  const orders = await getAdminOrderStatus();
  const {
    cancelledOrders,
    confirmedOrders,
    deliveredOrders,
    pendingOrders,
    shippedOrders,
    totalOrders,
  } = orders;
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
          <ShoppingCart className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders || 0}</div>
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

export default OrdersPage;
