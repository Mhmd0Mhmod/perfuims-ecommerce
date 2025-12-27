import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatsAr } from "@/lib/mock-data-ar";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

const icons = [DollarSign, Users, CreditCard, Activity];

export async function DashboardStats() {
  const stats = await getStatsAr();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = icons[index];
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground text-xs">{stat.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
