import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowRight } from "lucide-react";

function NotFound() {
  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 px-4 text-center">
        {/* Glowing 404 Number */}
        <div className="relative">
          {/* Glowing effect behind number */}
          <div className="bg-primary/20 absolute inset-0 scale-150 rounded-full blur-3xl" />
          <h1 className="text-primary animate-float relative text-[120px] leading-none font-bold md:text-[180px]">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-foreground text-2xl font-bold md:text-3xl">الصفحة غير موجودة</h2>
          <p className="text-muted-foreground max-w-md text-sm md:text-base">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها أو حذفها.
          </p>
          <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">Page Not Found</p>
        </div>

        {/* Decorative Separator */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/30 h-px w-12" />
          <div className="bg-primary h-2 w-2 rounded-full" />
          <div className="bg-primary/30 h-px w-12" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="size-4" />
              العودة للرئيسية
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/shop">
              <Search className="size-4" />
              تصفح المنتجات
            </Link>
          </Button>
        </div>

        {/* Additional Help Link */}
        <Link
          href="/contact"
          className="text-muted-foreground hover:text-primary group mt-4 flex items-center gap-1 text-sm transition-colors"
        >
          هل تحتاج مساعدة؟ تواصل معنا
          <ArrowRight className="size-3 rotate-180 transition-transform group-hover:-translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
