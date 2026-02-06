import { Gift, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

function HeroShopPage() {
  return (
    <section className="from-muted/50 to-background relative overflow-hidden bg-linear-to-b">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary/10 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl" />
        <div className="bg-secondary/20 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <div className="flex flex-col gap-6 text-right">
            {/* Badge */}
            <div className="flex">
              <Badge className="bg-primary text-primary-foreground gap-2 px-4 py-2">
                <Sparkles className="h-4 w-4" />
                مجموعة جديدة 2025
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              <span className="text-primary">مؤسسه الطاحون</span>
              <br />
              عطور عربية أصيلة تأسر القلوب
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-lg md:text-xl">
              اكتشف مجموعتنا الحصرية من العطور العربية الفاخرة والعود والمسك الأصيل المستوحاة من
              التراث العربي الأصيل والزيوت العطرية النادرة.
            </p>

            {/* Features Card */}
            <Card className="border-primary/20">
              <CardContent className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-sm font-medium">شحن مجاني للطلبات فوق 500 ريال</span>
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                    <Gift className="text-primary h-5 w-5" />
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-center gap-3">
                  <span className="text-sm font-medium">ضمان الجودة والأصالة 100%</span>
                  <div className="bg-secondary/30 flex h-10 w-10 items-center justify-center rounded-full">
                    <TrendingUp className="text-secondary-foreground h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link href="/products">تصفح الكل</Link>
              </Button>
              <Button asChild size="lg" className="text-base">
                <Link href="/products">العروض الخاصة</Link>
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="flex justify-start gap-4 pt-4">
              <Card className="max-w-30 flex-1">
                <CardContent className="p-4 text-center">
                  <p className="text-primary text-3xl font-bold">+500</p>
                  <Separator className="my-2" />
                  <p className="text-muted-foreground text-xs">منتج فاخر</p>
                </CardContent>
              </Card>
              <Card className="max-w-30 flex-1">
                <CardContent className="p-4 text-center">
                  <p className="text-primary text-3xl font-bold">+10K</p>
                  <Separator className="my-2" />
                  <p className="text-muted-foreground text-xs">عميل سعيد</p>
                </CardContent>
              </Card>
              <Card className="max-w-30 flex-1">
                <CardContent className="p-4 text-center">
                  <p className="text-primary text-3xl font-bold">4.9★</p>
                  <Separator className="my-2" />
                  <p className="text-muted-foreground text-xs">تقييم العملاء</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <Card className="aspect-square overflow-hidden border shadow-xl">
              <CardContent className="relative flex h-full items-center justify-center p-0">
                <Image
                  src={"/assets/logo.png"}
                  alt="Hero Image"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </CardContent>
            </Card>

            {/* Floating Discount Card */}
            <Card className="absolute -bottom-6 -left-6 shadow-lg">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-full">
                  <Sparkles className="text-primary-foreground h-6 w-6" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">خصم حتى</p>
                  <p className="text-primary text-2xl font-bold">30%</p>
                </div>
              </CardContent>
            </Card>

            {/* Decorative Elements */}
            <div className="bg-primary/10 absolute -top-4 -right-4 h-24 w-24 rounded-full blur-xl" />
            <div className="bg-secondary/10 absolute -right-8 -bottom-8 h-32 w-32 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
export default HeroShopPage;
