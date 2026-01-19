"use client";

import { deleteOffer, toggleOfferStatus } from "@/app/admin/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Offer } from "@/types/offer";
import { MoreHorizontal, Pencil, Power, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface OfferActionsMenuProps {
  offer: Offer;
}

export function OfferActionsMenu({ offer }: OfferActionsMenuProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDelete = async () => {
    const id = toast.loading("جارى حذف العرض...");
    try {
      const result = await deleteOffer(offer.id);
      if (result.success) {
        toast.success(result.message || "تم حذف العرض بنجاح", { id });
        setShowDeleteAlert(false);
      } else {
        toast.error(result.message || "حدث خطأ أثناء حذف العرض", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء حذف العرض", { id });
    }
  };

  const handleToggleStatus = async () => {
    const id = toast.loading("جارى تحديث حالة العرض...");
    try {
      const result = await toggleOfferStatus(offer.id, !offer.isActive);
      if (result.success) {
        toast.success(result.message, { id });
      } else {
        toast.error(result.message || "حدث خطأ", { id });
      }
    } catch {
      toast.error("حدث خطأ غير متوقع", { id });
    }
  };

  return (
    <>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">فتح القائمة</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/admin/offers/${offer.id}`}>
              <Pencil className="h-4 w-4" />
              تعديل
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleToggleStatus}>
            <Power className="h-4 w-4" />
            {offer.isActive ? "إلغاء التفعيل" : "تفعيل"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setShowDeleteAlert(true)}
          >
            <Trash2 className="h-4 w-4" />
            حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader className="sm:text-right">
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف العرض &quot;{offer.title}&quot; نهائياً.
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
