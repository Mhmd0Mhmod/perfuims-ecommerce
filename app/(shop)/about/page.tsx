import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-right">
        <h1 className="text-4xl font-bold mb-2">من نحن</h1>
        <p className="text-muted-foreground mb-8">About Us</p>
        
        <Separator className="mb-8" />

        <div className="space-y-6 text-right">
          <section>
            <h2 className="text-2xl font-semibold mb-4">عن متجرنا</h2>
            <p className="text-muted-foreground leading-relaxed">
              نحن متجر متخصص في بيع العطور الفاخرة والمميزة من أرقى العلامات التجارية العالمية.
              نسعى لتوفير تجربة تسوق استثنائية لعملائنا من خلال تقديم منتجات عالية الجودة وخدمة
              عملاء متميزة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">رؤيتنا</h2>
            <p className="text-muted-foreground leading-relaxed">
              أن نكون الوجهة الأولى لمحبي العطور في المنطقة، ونقدم لهم أفضل تجربة تسوق عبر
              الإنترنت مع ضمان الجودة والأصالة لجميع منتجاتنا.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">مهمتنا</h2>
            <p className="text-muted-foreground leading-relaxed">
              توفير مجموعة واسعة من العطور الفاخرة الأصلية بأسعار تنافسية، مع تقديم خدمة
              توصيل سريعة وآمنة، وضمان رضا العملاء بنسبة 100%.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">لماذا نحن؟</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>جميع منتجاتنا أصلية 100% ومن مصادر موثوقة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>أسعار تنافسية وعروض خاصة مستمرة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>شحن سريع وآمن لجميع المناطق</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>خدمة عملاء متاحة على مدار الساعة</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>سياسة استرجاع مرنة</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
