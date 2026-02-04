import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { CountryAPI } from "@/lib/api/country";

export default async function ContactPage() {
  const country = await CountryAPI.getCurrentCountryServer();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-right">
        <h1 className="text-4xl font-bold mb-2">اتصل بنا</h1>
        <p className="text-muted-foreground mb-8">Contact Us</p>
        
        <Separator className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-semibold mb-6">أرسل لنا رسالة</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right block">الاسم</Label>
                <Input id="name" placeholder="أدخل اسمك الكامل" className="text-right" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
                <Input id="email" type="email" placeholder="example@email.com" dir="ltr" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right block">رقم الهاتف</Label>
                <Input id="phone" type="tel" placeholder="+966 XX XXX XXXX" dir="ltr" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-right block">الموضوع</Label>
                <Input id="subject" placeholder="موضوع الرسالة" className="text-right" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-right block">الرسالة</Label>
                <Textarea 
                  id="message" 
                  placeholder="اكتب رسالتك هنا..." 
                  className="text-right min-h-[150px]" 
                />
              </div>
              
              <Button type="submit" className="w-full">
                إرسال الرسالة
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-semibold mb-6">معلومات التواصل</h2>
            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="text-primary h-6 w-6 shrink-0 mt-1" />
                  <div className="text-right flex-1">
                    <h3 className="font-semibold mb-1">العنوان</h3>
                    <p className="text-muted-foreground">{country?.name}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-start gap-4 mb-4">
                  <Phone className="text-primary h-6 w-6 shrink-0 mt-1" />
                  <div className="text-right flex-1">
                    <h3 className="font-semibold mb-1">الهاتف</h3>
                    <a 
                      href={`tel:${country?.contactNumber}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      dir="ltr"
                    >
                      {country?.contactNumber}
                    </a>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-start gap-4 mb-4">
                  <Mail className="text-primary h-6 w-6 shrink-0 mt-1" />
                  <div className="text-right flex-1">
                    <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                    <a 
                      href={`mailto:${country?.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      dir="ltr"
                    >
                      {country?.email}
                    </a>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-start gap-4">
                  <MessageCircle className="text-primary h-6 w-6 shrink-0 mt-1" />
                  <div className="text-right flex-1">
                    <h3 className="font-semibold mb-1">واتساب</h3>
                    <p className="text-muted-foreground">متاح على مدار الساعة</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">أوقات العمل</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <div className="flex justify-between">
                    <span>السبت - الخميس</span>
                    <span dir="ltr">9:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الجمعة</span>
                    <span dir="ltr">2:00 PM - 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
