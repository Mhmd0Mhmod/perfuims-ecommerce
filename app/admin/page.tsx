import { Metadata } from "next";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { OverviewChart } from "@/components/admin/overview-chart";
import { RecentSales } from "@/components/admin/recent-sales";
import { RecentOrdersTable } from "@/components/admin/recent-orders-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRevenueDataAr } from "@/lib/mock-data-ar";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  description: "لوحة تحكم للمتجر",
};

export default async function DashboardPage() {
  const revenueData = await getRevenueDataAr();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">لوحة التحكم</h2>
      </div>

      {/* Summary Stats */}
      <DashboardStats />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Overview Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>نظرة عامة</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart data={revenueData} />
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>المبيعات الأخيرة</CardTitle>
            <CardDescription>لقد قمت بـ 265 عملية بيع هذا الشهر.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>الطلبات الأخيرة</CardTitle>
          <CardDescription>قائمة بطلباتك الأخيرة.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentOrdersTable />
        </CardContent>
      </Card>
    </div>
  );
}
