"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, CheckoutSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/cart";
import { User } from "next-auth";
import { createOrderAction } from "@/app/(shop)/checkout/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Package, Truck, CreditCard, ChevronLeft } from "lucide-react";

interface CheckoutFormProps {
  cartItems: CartItem[];
  user?: User;
}

export default function CheckoutForm({ cartItems, user }: CheckoutFormProps) {
  const router = useRouter();

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name || "",
      email: user?.email || "",
      phoneNumber: "",
      city: "",
      address: "",
      paymentMethod: "COD",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.variantDetails.newPrice * item.quantity,
    0,
  );
  const total = subtotal; // Add shipping logic if needed

  async function onSubmit(values: CheckoutSchema) {
    const result = await createOrderAction(values);
    if (result.success) {
      toast.success(result.message);
      router.push("/account/orders");
    } else {
      toast.error(result.message || "حدث خطأ ما أثناء إتمام الطلب");
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2" dir="rtl">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              معلومات الشحن
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسمك الكامل" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input placeholder="example@mail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input placeholder="05xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>المدينة</FormLabel>
                        <FormControl>
                          <Input placeholder="الرياض، جدة..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان بالتفصيل</FormLabel>
                      <FormControl>
                        <Input placeholder="اسم الشارع، رقم المبنى، الحي" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3 pt-4">
                  <FormLabel>طريقة الدفع</FormLabel>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "COD"
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => form.setValue("paymentMethod", "COD")}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                        <Truck
                          className={`mb-2 h-6 w-6 ${paymentMethod === "COD" ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <p className="text-sm font-bold">الدفع عند الاستلام</p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          ادفع نقداً عند استلام طلبك
                        </p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${
                        paymentMethod === "CARD"
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => form.setValue("paymentMethod", "CARD")}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                        <CreditCard
                          className={`mb-2 h-6 w-6 ${paymentMethod === "CARD" ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <p className="text-sm font-bold">بطاقة مدى / البطاقة الائتمانية</p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          دفع آمن وسريع عبر الإنترنت
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={() => <FormMessage />}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              ملخص الطلب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="max-h-[300px] space-y-4 overflow-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.variantDetails.imageUrl}
                      alt={item.variantDetails.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-1">
                    <p className="line-clamp-1 text-sm leading-none font-medium">
                      {item.variantDetails.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {item.variantDetails.size} {item.variantDetails.unit} × {item.quantity}
                    </p>
                    <p className="text-sm font-semibold">
                      {(item.variantDetails.newPrice * item.quantity).toLocaleString()} ر.س
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span>{subtotal.toLocaleString()} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الشحن</span>
                <span className="font-medium text-green-600">مجاني</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>الإجمالي</span>
                <span>{total.toLocaleString()} ر.س</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="h-12 w-full text-lg"
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting || cartItems.length === 0}
            >
              {form.formState.isSubmitting
                ? "جاري تنفيذ الطلب..."
                : paymentMethod === "CARD"
                  ? "الانتقال للدفع"
                  : "إتمام الشراء"}
              <ChevronLeft className="mr-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
