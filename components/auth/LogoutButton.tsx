"use client";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();
  const logout = useCallback(() => {
    const id = toast.loading("جاري تسجيل الخروج...");
    signOut()
      .then(() => {
        toast.success("تم تسجيل الخروج بنجاح.", { id });
        router.push("/");
      })
      .catch(() => {
        toast.error("حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.", { id });
      });
  }, [router]);
  return (
    <Button variant="destructive" className="w-full text-right" onClick={logout}>
      تسجيل الخروج
    </Button>
  );
}
export default LogoutButton;
