import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Globe2 } from "lucide-react";
function EmptyProducts() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Globe2 className="h-12 w-12" />
        </EmptyMedia>
        <EmptyTitle>لا توجد منتجات متاحة</EmptyTitle>
        <EmptyDescription>عذرًا، لا توجد منتجات متاحة في منطقتك حاليًا.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
export default EmptyProducts;
