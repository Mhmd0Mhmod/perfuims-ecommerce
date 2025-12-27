import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { getRecentOrdersAr } from "@/lib/mock-data-ar";

export async function RecentOrdersTable() {
  const orders = await getRecentOrdersAr();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-right">رقم الطلب</TableHead>
          <TableHead className="text-right">العميل</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
          <TableHead className="text-right">طريقة الدفع</TableHead>
          <TableHead className="text-left">المبلغ</TableHead>
          <TableHead className="text-left">إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="text-right font-medium">{order.id}</TableCell>
            <TableCell className="text-right">{order.customer}</TableCell>
            <TableCell className="text-right">{order.status}</TableCell>
            <TableCell className="text-right">{order.method}</TableCell>
            <TableCell className="text-left">{order.total}</TableCell>
            <TableCell className="text-left">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-right">إجراءات</DropdownMenuLabel>
                  <DropdownMenuItem className="flex flex-row-reverse text-right">
                    نسخ رقم الدفع
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-row-reverse text-right">
                    عرض العميل
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-row-reverse text-right">
                    عرض تفاصيل الدفع
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
