import { changePaymentStatus } from "@/app/admin/payments/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAYMENT_STATUS_CONFIG, PaymentStatus } from "@/types/order";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

function PaymentStatusActions({
  paymentId,
  currentStatus,
}: {
  paymentId: number;
  currentStatus: PaymentStatus;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const handleChangeStatus = (newStatus: PaymentStatus) => {
    if (newStatus === status) return;
    startTransition(async () => {
      setStatus(newStatus);
      try {
        const res = await changePaymentStatus(paymentId, newStatus);
        if (!res.success) {
          setStatus(currentStatus);
          toast.error(res.message);
        } else {
          router.refresh();
          toast.success(res.message);
        }
      } catch (err) {
        setStatus(currentStatus);
        toast.error("حدث خطأ أثناء تحديث حالة الدفع.");
      }
    });
  };

  return (
    <Select value={status} onValueChange={handleChangeStatus} disabled={pending}>
      <SelectTrigger>
        <SelectValue placeholder={"تغيير الحالة المدفوعات"} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(PAYMENT_STATUS_CONFIG).map(([key, statusOption]) => (
          <SelectItem key={statusOption.label} value={key}>
            {statusOption.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export default PaymentStatusActions;
