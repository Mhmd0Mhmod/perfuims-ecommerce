import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react";
import { DashboardStats as DashboardStatsType } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils";

interface DashboardStatsProps {
  stats: DashboardStatsType;
  currentCountry: string;
}

export async function DashboardStats({ stats, currentCountry }: DashboardStatsProps) {
  const statsData = [
    {
      title: "إجمالي الإيرادات",
      value: formatCurrency({
        amount: stats.totalRevenue,
        code: currentCountry,
      }),
      icon: DollarSign,
    },
    {
      title: "المستخدمين",
      value: `+${stats.totalUsers}`,
      icon: Users,
    },
    {
      title: "الطلبات",
      value: `+${stats.totalOrders}`,
      icon: ShoppingCart,
    },
    {
      title: "المدفوعات",
      value: `+${stats.totalPayments}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
