import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="container mx-auto p-6">
      {/* Hero Section Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-75 w-full rounded-lg" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-50" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="mb-4 h-50 w-full rounded-lg" />
              <Skeleton className="mb-2 h-5 w-full" />
              <Skeleton className="mb-2 h-4 w-[80%]" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-15" />
                <Skeleton className="h-9 w-22.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
