import { Separator } from "@/components/ui/separator";
import { RotateCcw, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-right">
        <h1 className="text-4xl font-bold mb-2">سياسة الاسترجاع</h1>
        <p className="text-muted-foreground mb-8">Return Policy</p>
        
        <Separator className="mb-8" />

        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <RotateCcw className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">شروط الاسترجاع</h2>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                نحن نقدر رضاك التام عن منتجاتنا. يمكنك إرجاع المنتجات وفقاً للشروط التالية:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                  <span>يجب أن يكون المنتج في حالته الأصلية وغير مستخدم</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                  <span>يجب أن تكون العبوة والغلاف الأصلي سليمين</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                  <span>مدة الاسترجاع: 14 يوم من تاريخ استلام المنتج</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                  <span>يجب توفر فاتورة الشراء الأصلية</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="text-red-600 h-6 w-6" />
              <h2 className="text-2xl font-semibold">المنتجات غير القابلة للاسترجاع</h2>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-600 h-5 w-5 shrink-0 mt-0.5" />
                  <span>العطور التي تم فتح عبوتها أو استخدامها</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-600 h-5 w-5 shrink-0 mt-0.5" />
                  <span>المنتجات التي تم طلبها خصيصاً للعميل</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-600 h-5 w-5 shrink-0 mt-0.5" />
                  <span>المنتجات المخفضة أو المباعة في التخفيضات الموسمية</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="text-red-600 h-5 w-5 shrink-0 mt-0.5" />
                  <span>المنتجات التي مضى على شرائها أكثر من 14 يوم</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-semibold">كيفية إرجاع منتج</h2>
            </div>
            <div className="bg-muted/30 p-6 rounded-lg">
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">1</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">تواصل معنا</h3>
                    <p>اتصل بخدمة العملاء أو أرسل طلب إرجاع عبر حسابك</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">2</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">احصل على رقم الإرجاع</h3>
                    <p>سنرسل لك رقم إرجاع وتعليمات التغليف</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">3</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">أعد تغليف المنتج</h3>
                    <p>غلف المنتج بعناية مع الفاتورة ورقم الإرجاع</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">4</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">أرسل المنتج</h3>
                    <p>سنرسل مندوباً لاستلام المنتج من عنوانك</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-sm">5</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">استرداد المبلغ</h3>
                    <p>سيتم استرداد المبلغ خلال 5-7 أيام عمل بعد فحص المنتج</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">رسوم الإرجاع</h2>
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">إرجاع بسبب عيب في المنتج</span>
                <span className="font-semibold text-green-600">مجاناً</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">إرجاع بسبب خطأ في الطلب من قبلنا</span>
                <span className="font-semibold text-green-600">مجاناً</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">إرجاع لأسباب شخصية</span>
                <span className="font-semibold">يتحمل العميل رسوم الشحن</span>
              </div>
            </div>
          </section>

          <section className="bg-primary/10 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">ملاحظة هامة</h3>
            <p className="text-muted-foreground">
              في حال استلام منتج تالف أو معيب، يرجى عدم استخدامه والتواصل معنا فوراً.
              سنقوم باستبداله أو استرداد قيمته كاملة دون أي رسوم إضافية.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
