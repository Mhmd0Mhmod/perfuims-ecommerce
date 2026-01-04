"use client";
import { PaginationClient } from "@/components/shared/pagination";
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
import { useAdminPayments } from "@/hooks/use-admin-payments";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Payment } from "@/types/payment";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PaymentStatusActions from "./PaymentStatusActions";

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

function PaymentsTable({ status }: { status?: string }) {
  const [page, setPage] = useState(0);
  const { data, isFetching } = useAdminPayments({
    page,
    status,
  });
  if (isFetching && !data) {
    return (
      <div className="rounded-md border">
        <TableSkeleton rows={5} columns={7} />
      </div>
    );
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="text-right font-semibold">رقم المعاملة</TableHead>
            <TableHead className="text-right font-semibold">رقم الطلب</TableHead>
            <TableHead className="text-right font-semibold">المستخدم</TableHead>
            <TableHead className="text-right font-semibold">المبلغ</TableHead>
            <TableHead className="text-right font-semibold">طريقة الدفع</TableHead>
            <TableHead className="text-right font-semibold">التاريخ</TableHead>
            <TableHead className="text-right font-semibold">الحالة</TableHead>
            <TableHead className="text-center font-semibold">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.content.map((payment: Payment) => {
            const statusConfig = PAYMENT_STATUS_CONFIG[payment.paymentStatus] || {
              label: payment.paymentStatus,
              variant: "secondary",
            };

            return (
              <TableRow key={payment.paymentId} className="hover:bg-muted/50">
                <TableCell>
                  <Button variant="link" className="h-auto p-0 font-medium">
                    <Link href={`/admin/payments/${payment.paymentId}`}>
                      {payment.transactionId}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="link" className="h-auto p-0 font-medium" asChild>
                    <Link href={`/admin/orders/${payment.orderId}`}>#{payment.orderId}</Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="link" className="h-auto p-0 font-medium" asChild>
                    <Link href={`/admin/users/${payment.userId}`} className="text-sm">
                      {payment.username}
                    </Link>
                  </Button>
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
                <TableCell>
                  <div className="text-muted-foreground text-sm">
                    {formatDate(payment.paymentDate, "short")}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <PaymentStatusActions
                    paymentId={payment.paymentId}
                    currentStatus={payment.paymentStatus}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <PaginationClient
        totalPages={data?.totalPages || 0}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}

export default PaymentsTable;
