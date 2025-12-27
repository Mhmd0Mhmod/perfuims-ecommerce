import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRecentSalesAr } from "@/lib/mock-data-ar";

export async function RecentSales() {
  const sales = await getRecentSalesAr();

  return (
    <div className="space-y-8">
      {sales.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{sale.item}</AvatarFallback>
          </Avatar>
          <div className="mr-4 space-y-1">
            <p className="text-sm leading-none font-medium">{sale.name}</p>
            <p className="text-muted-foreground m-0 p-0 text-sm">{sale.email}</p>
          </div>
          <div className="mr-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
}
