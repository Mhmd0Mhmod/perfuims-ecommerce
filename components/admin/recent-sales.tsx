import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PAYMENT_METHODS } from "@/constants/payment_methods";
import { formatCurrency } from "@/lib/utils";
import { Payment } from "@/types/payment";

interface RecentSalesProps {
  payments: Payment[];
  countryCode: string;
}

export async function RecentSales({ payments, countryCode }: RecentSalesProps) {
  return (
    <div className="space-y-8">
      {payments.slice(0, 5).map((payment) => {
        const paymentMethod = PAYMENT_METHODS.find(
          (method) => method.name === payment.paymentMethodType,
        );
        return (
          <div key={payment.paymentId} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {payment.paymentMethodType?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="mr-4 space-y-1">
              <p className="text-sm leading-none font-medium">دفع #{payment.paymentId}</p>
              <p className="text-muted-foreground m-0 p-0 text-sm">
                {paymentMethod?.displayName || "غير محدد"}
              </p>
            </div>
            <div className="mr-auto font-medium">
              {formatCurrency({ amount: payment.amount, code: countryCode })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
