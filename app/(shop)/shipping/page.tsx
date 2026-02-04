import { Separator } from "@/components/ui/separator";
import { Package, Truck, MapPin, Clock } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-right">
        <h1 className="text-4xl font-bold mb-2">الشحن والتوصيل</h1>
        <p className="text-muted-foreground mb-8">Shipping & Delivery</p>
        
        <Separator className="mb-8" />

        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Truck className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">طرق الشحن</h2>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold mb-2">الشحن القياسي</h3>
                <p className="text-muted-foreground">
                  يتم التوصيل خلال 3-5 أيام عمل من تاريخ تأكيد الطلب. متاح لجميع المناطق داخل المملكة.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">الشحن السريع</h3>
                <p className="text-muted-foreground">
                  يتم التوصيل خلال 1-2 يوم عمل للمدن الرئيسية. رسوم إضافية قد تطبق.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Package className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">تكلفة الشحن</h2>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">الشحن القياسي</span>
                <span className="font-semibold">20 ريال</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">الشحن السريع</span>
                <span className="font-semibold">35 ريال</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">الطلبات فوق 500 ريال</span>
                <span className="font-semibold text-green-600">شحن مجاني</span>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">مناطق التوصيل</h2>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                نقوم بالتوصيل إلى جميع مناطق ومدن المملكة العربية السعودية:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الرياض وضواحيها</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>جدة ومكة المكرمة والمدينة المنورة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>الدمام والخبر والجبيل</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>جميع مناطق المملكة الأخرى</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">معالجة الطلبات</h2>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>يتم معالجة الطلبات خلال 24 ساعة من تأكيد الدفع</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>سيتم إرسال رقم التتبع عبر البريد الإلكتروني والرسائل النصية</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>يمكنك تتبع طلبك من خلال حسابك أو رابط التتبع المرسل</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>يتم التواصل مع العميل قبل التوصيل لتحديد الموعد المناسب</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-primary/10 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">ملاحظة هامة</h3>
            <p className="text-muted-foreground">
              جميع منتجاتنا يتم تغليفها بعناية فائقة لضمان وصولها بحالة ممتازة. في حال وجود أي
              مشكلة في الشحنة، يرجى التواصل معنا فوراً.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
