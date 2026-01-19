import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Globe } from "lucide-react";

function EmptyCountry() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Globe className="h-12 w-12" />
        </EmptyMedia>
        <EmptyTitle>لم يتم اختيار دولة</EmptyTitle>
        <EmptyDescription>الرجاء اختيار دولة من القائمة لعرض المنتجات المتاحة</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
export default EmptyCountry;
