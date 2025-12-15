import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl p-4" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle>العروض</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Table header skeleton */}
            <div className="grid grid-cols-7 gap-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
            {/* Rows skeleton */}
            {Array.from({ length: 5 }).map((_, r) => (
              <div key={r} className="grid grid-cols-7 gap-3">
                {Array.from({ length: 7 }).map((_, c) => (
                  <Skeleton key={c} className="h-6 w-full" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
