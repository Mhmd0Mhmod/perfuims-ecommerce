import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";

function Newsletter() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-primary-foreground/10 flex h-16 w-16 items-center justify-center rounded-full">
                  <Mail className="h-8 w-8" />
                </div>
              </div>
              <h2 className="mb-4 text-3xl font-bold">اشترك في النشرة البريدية</h2>
              <p className="text-primary-foreground/80 mb-8">
                احصل على آخر العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني
              </p>
              <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="bg-primary-foreground text-primary flex-1"
                  dir="rtl"
                />
                <Button type="submit" variant="secondary" size="lg">
                  اشترك الآن
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Newsletter;
