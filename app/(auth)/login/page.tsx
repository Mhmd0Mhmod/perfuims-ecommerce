import LoginForm from "@/components/auth/LoginForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";
import Link from "next/link";

function page() {
  return (
    <Card className="animate-scale-in from-brand to-brand w-full max-w-md shadow-lg">
      <CardHeader className="text-right">
        <div className="flex items-center justify-between space-y-3">
          <Badge>
            <Sparkles />
            عطور فاخرة
          </Badge>
          <span className="text-6xl">🧴</span>
        </div>
        <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
        <CardDescription>سجل دخولك للوصول إلى مجموعتنا المميزة من العطور</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <LoginForm />
      </CardContent>
      <Separator />
      <CardFooter className="flex-col gap-4">
        <div className="text-muted-foreground text-center text-sm">
          ليس لديك حساب؟
          <Button variant="link" className="ml-2 p-0" asChild>
            <Link href="/register">سجل الآن</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default page;
