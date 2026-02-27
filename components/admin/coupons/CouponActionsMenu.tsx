"use client";

import { deleteCoupon, toggleCouponStatus } from "@/app/admin/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OfferCoupon } from "@/types/offer";
import { Pencil, Power, PowerOff, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AddCouponForm from "./AddCouponForm";
import { useTransition } from "react";

interface CouponActionsMenuProps {
  coupon: OfferCoupon;
}

export function CouponActionsMenu({ coupon }: CouponActionsMenuProps) {
  const [pending, startTransition] = useTransition();
  const handleDelete = async () => {
    const id = toast.loading("جارى حذف الكوبون...");
    startTransition(async () => {
      try {
        const result = await deleteCoupon(coupon.id);
        if (result.success) {
          toast.success(result.message || "تم حذف الكوبون بنجاح", { id });
        } else {
          toast.error(result.message || "حدث خطأ أثناء حذف الكوبون", { id });
        }
      } catch {
        toast.error("حدث خطأ أثناء حذف الكوبون", { id });
      }
    });
  };

  const handleToggleStatus = async () => {
    const id = toast.loading("جارى تحديث حالة الكوبون...");
    startTransition(async () => {
      try {
        const result = await toggleCouponStatus(coupon.id, !coupon.isActive);
        if (result.success) {
          toast.success(result.message || "تم تحديث حالة الكوبون بنجاح", { id });
        } else {
          toast.error(result.message || "حدث خطأ أثناء تحديث حالة الكوبون", { id });
        }
      } catch {
        toast.error("حدث خطأ أثناء تحديث حالة الكوبون", { id });
      }
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size={"icon-sm"} disabled={pending}>
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              <span>تعديل الكوبون</span>
            </DialogTitle>
          </DialogHeader>
          <AddCouponForm coupon={coupon} />
        </DialogContent>
      </Dialog>
      <Button variant="ghost" onClick={handleToggleStatus} size={"icon-sm"} disabled={pending}>
        {coupon.isActive ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
      </Button>

      {/* Delete Alert */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="text-destructive" size={"icon-sm"} disabled={pending}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الكوبون &quot;{coupon.code}&quot; نهائياً.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
