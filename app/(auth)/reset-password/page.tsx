import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
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
import { redirect } from "next/navigation";

async function Page({ searchParams }: { searchParams: Promise<{ t: string }> }) {
  const { t } = await searchParams;
  if (!t?.trim()) {
    redirect("/forgot-password");
  }

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
        <CardTitle className="text-2xl font-bold">إعادة تعيين كلمة المرور</CardTitle>
        <CardDescription>
          أدخل رمز التحقق الذي تم إرساله إلى بريدك الإلكتروني أو رقم هاتفك
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <ResetPasswordForm email={t} />
      </CardContent>
      <Separator />
      <CardFooter className="flex-col gap-4">
        <div className="text-muted-foreground text-center text-sm">
          لم تستلم الرمز؟
          <Button variant="link" className="ml-2 p-0" asChild>
            <Link href="/forgot-password">أعد إرسال الرمز</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default Page;
