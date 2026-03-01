import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function CartItemSkeleton() {
  return (
    <Card className="border-border/50 p-0">
      <div className="flex items-start gap-3 p-3">
        {/* Image */}
        <Skeleton className="h-16 w-16 min-w-16 rounded-md" />

        <div className="flex flex-1 flex-col gap-2">
          {/* Name + Badge */}
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>

          {/* Price Info */}
          <div className="flex flex-col gap-1">
            {/* Unit Price */}
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-14" />
            </div>
            {/* Total Price */}
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-3 w-10" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CartItemSkeleton;
