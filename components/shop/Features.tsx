import { Card, CardContent } from "../ui/card";
import { Truck, ShieldCheck, HeadphonesIcon, Gift } from "lucide-react";

function Features() {
  const features = [
    {
      icon: Truck,
      title: "شحن مجاني",
      description: "للطلبات فوق 500 ريال",
    },
    {
      icon: ShieldCheck,
      title: "ضمان الأصالة",
      description: "منتجات أصلية 100%",
    },
    {
      icon: HeadphonesIcon,
      title: "دعم 24/7",
      description: "خدمة عملاء متميزة",
    },
    {
      icon: Gift,
      title: "عروض خاصة",
      description: "خصومات حصرية",
    },
  ];

  return (
    <section className="bg-card border-y py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-none">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-primary/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
                  <feature.icon className="text-primary h-7 w-7" />
                </div>
                <div className="flex-1 text-right">
                  <h3 className="mb-1 font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
