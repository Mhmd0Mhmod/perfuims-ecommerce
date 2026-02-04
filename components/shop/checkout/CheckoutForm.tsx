"use client";

import { createOrderAction } from "@/app/(shop)/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { checkoutSchema, CheckoutSchema } from "@/lib/zod";
import { CartItem } from "@/types/cart";
import { Country } from "@/types/country";
import { zodResolver } from "@hookform/resolvers/zod";
import { Banknote, ChevronLeft, CreditCard, Package, Truck } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

interface CheckoutFormProps {
  cartItems: CartItem[];
  user?: User;
  country: Country;
}

export default function CheckoutForm({ cartItems, user, country }: CheckoutFormProps) {
  const router = useRouter();

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      city: "",
      address: "",
      paymentMethodId: 2,
    },
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.variantDetails.newPrice * item.quantity,
    0,
  );
  const total = subtotal;

  async function onSubmit(values: CheckoutSchema) {
    const result = await createOrderAction(values);
    if (result.success) {
      localStorage.setItem("lastOrderId", result.data!.orderId.toString());
      if (result.data?.paymentUrl) {
        router.push(result.data.paymentUrl);
        return;
      }
      toast.success(result.message);
      router.push("/account/orders");
    } else {
      toast.error(result.message || "حدث خطأ ما أثناء إتمام الطلب");
    }
  }
  const paymentMethodID = useWatch({
    control: form.control,
    name: "paymentMethodId",
  });
  const isCardPayment = paymentMethodID === 1;
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
                  <FormField
                    control={form.control}
                    name="paymentMethodId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>طريقة الدفع</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(val) => field.onChange(Number(val))}
                            defaultValue={field.value.toString()}
                            className="grid grid-cols-1 gap-4 md:grid-cols-2"
                          >
                            {country.paymentMethods.map((method) => (
                              <div key={method.id}>
                                <RadioGroupItem
                                  value={method.id.toString()}
                                  id={method.id.toString()}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={method.id.toString()}
                                  className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-primary flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4 transition-all peer-data-[state=checked]:ring-1"
                                >
                                  <span className="mb-2">
                                    {method.id === 1 ? (
                                      <CreditCard className="h-6 w-6" />
                                    ) : (
                                      <Banknote className="h-6 w-6" />
                                    )}
                                  </span>
                                  {method.name}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
            <div className="max-h-75 space-y-4 overflow-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="hover:bg-accent/50 border-muted hover:border-accent flex gap-4 rounded-xl border p-2 transition-all duration-300"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.variantDetails.imageUrl || "/assets/logo.png"}
                      alt={item.variantDetails.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 justify-between gap-1">
                    <p className="line-clamp-1 flex items-center justify-center leading-none font-medium">
                      {item.variantDetails.name}
                    </p>
                    <div className="flex flex-col gap-1">
                      <p className="text-muted-foreground text-xs">
                        {item.variantDetails.size} {item.variantDetails.unit} × {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        {formatCurrency({
                          amount: item.variantDetails.newPrice * item.quantity,
                          code: country.code,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span>
                  {formatCurrency({
                    amount: subtotal,
                    code: country.code,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الشحن</span>
                <span className="font-medium text-green-600">مجاني</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>الإجمالي</span>
                <span>
                  {formatCurrency({
                    amount: total,
                    code: country.code,
                  })}
                </span>
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
                : isCardPayment
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
