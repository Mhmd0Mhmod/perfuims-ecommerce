"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const pathname = usePathname();

  useEffect(() => {
    console.error(error);
  }, [error]);

  // Determine home route based on current path
  const getHomeRoute = () => {
    if (pathname.startsWith("/admin")) return "/admin";
    if (pathname.startsWith("/account")) return "/account";
    return "/";
  };

  const homeRoute = getHomeRoute();

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-linear-to-br from-red-50 to-orange-50 p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-900">حدث خطأ ما!</CardTitle>
          <CardDescription className="text-gray-600">
            عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error.message && (
            <div className="max-h-60 overflow-y-auto rounded-md bg-red-50 p-3 text-sm text-red-800">
              <strong>تفاصيل الخطأ:</strong> {error.message}
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={reset} className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              حاول مرة أخرى
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href={homeRoute}>
                <Home className="h-4 w-4" />
                الصفحة الرئيسية
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
