"use client";
import { getAdminPayments } from "@/app/admin/payments/helper";
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
import { Payment } from "@/types/payment";
import { CreditCard, Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

const PAYMENT_STATUS_CONFIG: Record<
  string,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  PENDING: {
    label: "قيد الانتظار",
    variant: "secondary",
  },
  COMPLETED: {
    label: "مكتمل",
    variant: "default",
  },
  FAILED: {
    label: "فشل",
    variant: "destructive",
  },
  REFUNDED: {
    label: "مسترجع",
    variant: "outline",
  },
};

function PaymentsTable() {
  const {
    items: payments,
    hasMore,
    loadMore,
  } = usePagination({
    queryFn: getAdminPayments,
    queryKey: ["admin-payments"],
  });

  return (
    <InfiniteScroll
      dataLength={payments.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<TableSkeleton columns={7} rows={5} />}
    >
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-right font-semibold">رقم المعاملة</TableHead>
              <TableHead className="text-right font-semibold">التاريخ</TableHead>
              <TableHead className="text-right font-semibold">رقم الطلب</TableHead>
              <TableHead className="text-right font-semibold">المستخدم</TableHead>
              <TableHead className="text-right font-semibold">المبلغ</TableHead>
              <TableHead className="text-right font-semibold">طريقة الدفع</TableHead>
              <TableHead className="text-center font-semibold">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment: Payment) => {
              const statusConfig = PAYMENT_STATUS_CONFIG[payment.paymentStatus] || {
                label: payment.paymentStatus,
                variant: "secondary",
              };

              return (
                <TableRow key={payment.paymentId} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="font-mono text-sm">{payment.transactionId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-muted-foreground text-sm">
                      {formatDate(payment.paymentDate, "short")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="h-auto p-0 font-medium" asChild>
                      <Link href={`/admin/orders/${payment.orderId}`}>#{payment.orderId}</Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">#{payment.userId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold">
                      {/* Assuming Egypt currency as default since code isn't in payment object. Ideally fetch or use context. */}
                      {formatCurrency({
                        amount: payment.amount,
                        code: "EG",
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="text-muted-foreground h-4 w-4" />
                      <span className="text-sm">{payment.paymentMethodType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
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

export default PaymentsTable;
