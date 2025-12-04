import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

function PromoBanner() {
  return (
    <div className="bg-primary text-primary-foreground relative overflow-hidden py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 text-center">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <p className="text-sm font-medium md:text-base">
            عرض خاص: خصم 30% على جميع العطور الفاخرة | استخدم كود:{" "}
            <Badge variant="secondary" className="mx-1">
              LUXURY30
            </Badge>
          </p>
          <Button asChild variant="secondary" size="sm" className="hidden md:inline-flex">
            <Link href="/deals">تسوق الآن</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PromoBanner;
