"use client";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-red-50 to-orange-50 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-900">حدث خطأ غير متوقع</CardTitle>
          <CardDescription className="text-gray-600">
            عذراً، حدث خطأ أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error?.message && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              <strong>تفاصيل الخطأ:</strong> {error.message}
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={() => reset()} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              حاول مرة أخرى
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                العودة للرئيسية
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Error;
