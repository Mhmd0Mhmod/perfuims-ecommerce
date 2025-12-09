import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="bg-muted mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <FileQuestion className="text-muted-foreground h-10 w-10" />
          </div>
          <CardTitle className="text-3xl">404</CardTitle>
          <CardDescription className="mt-2 text-lg">الصفحة غير موجودة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/">
                <Home className="ml-2 h-4 w-4" />
                الصفحة الرئيسية
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/products">
                <Search className="ml-2 h-4 w-4" />
                تصفح المنتجات
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
