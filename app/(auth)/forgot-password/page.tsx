import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
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

function Page() {
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
        <CardTitle className="text-2xl font-bold">نسيت كلمة المرور</CardTitle>
        <CardDescription>
          أدخل بريدك الإلكتروني أو اسم المستخدم لاستعادة كلمة المرور
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <Separator />
      <CardFooter className="flex-col gap-4">
        <div className="text-muted-foreground text-center text-sm">
          تذكرت كلمة المرور؟
          <Button variant="link" className="ml-2 p-0" asChild>
            <Link href="/login">سجل دخولك الآن</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default Page;
