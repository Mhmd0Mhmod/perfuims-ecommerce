"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUS_CONFIG, PERIOD_OPTIONS_CONFIG } from "@/types/order";
import { XCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterOrders() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const onSelectStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    const queryString = params.toString();
    const url = queryString ? `${pathName}?${queryString}` : pathName;
    router.push(url);
  };
  const onSelectPeriod = (period: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", period);
    const queryString = params.toString();
    const url = queryString ? `${pathName}?${queryString}` : pathName;
    router.push(url);
  };
  const clear = () => {
    router.push(pathName);
  };
  const selectedStatus = searchParams.get("status");
  const selectedPeriod = searchParams.get("period");
  return (
    <>
      <Select onValueChange={onSelectStatus} defaultValue={selectedStatus || ""}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="اختر الحالة" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ORDER_STATUS_CONFIG).map(([statusKey, status]) => (
            <SelectItem key={statusKey} value={statusKey}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={onSelectPeriod} defaultValue={selectedPeriod || ""}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="الفترة" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(PERIOD_OPTIONS_CONFIG).map(([periodKey, periodLabel]) => (
            <SelectItem key={periodKey} value={periodKey}>
              {periodLabel.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(selectedPeriod || selectedStatus) && (
        <Button variant="outline" onClick={clear} size={"icon-sm"}>
          <XCircle className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
export default FilterOrders;
