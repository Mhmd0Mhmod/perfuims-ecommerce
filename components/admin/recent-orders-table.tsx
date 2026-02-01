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
import { Order, ORDER_STATUS, ORDER_STATUS_CONFIG } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { PAYMENT_METHODS } from "@/constants/payment_methods";

interface RecentOrdersTableProps {
  orders: Order[];
}

export async function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25 text-right">رقم الطلب</TableHead>
          <TableHead className="text-right">العميل</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
          <TableHead className="text-right">طريقة الدفع</TableHead>
          <TableHead className="text-left">المبلغ</TableHead>
          <TableHead className="text-left">إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.slice(0, 10).map((order) => {
          const statusConfig =
            ORDER_STATUS_CONFIG[order.status as keyof typeof ORDER_STATUS_CONFIG];
          const paymentMethod = PAYMENT_METHODS.find(
            (method) => method.id === order.payment?.paymentMethodId,
          );
          return (
            <TableRow key={order.orderId}>
              <TableCell className="text-right font-medium">{order.orderNumber}</TableCell>
              <TableCell className="text-right">{order.user?.name}</TableCell>
              <TableCell className="text-right">
                <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
              </TableCell>
              <TableCell className="text-right">{paymentMethod?.displayName || "N/A"}</TableCell>
              <TableCell className="text-left">
                {formatCurrency({ amount: order.totalAmount, code: order.countryCode })}
              </TableCell>
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
                    <DropdownMenuItem className="flex text-right">نسخ رقم الدفع</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex text-right">عرض العميل</DropdownMenuItem>
                    <DropdownMenuItem className="flex text-right">
                      عرض تفاصيل الدفع
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
