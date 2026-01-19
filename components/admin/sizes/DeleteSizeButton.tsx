"use client";
import { deleteSize } from "@/app/admin/actions";
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
import { Size } from "@/types/size";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
function DeleteSizeButton({ size }: { size: Size }) {
  const handleDelete = async () => {
    const id = toast.loading("جارى حذف الحجم...");
    try {
      const result = await deleteSize(size.id);
      if (result.success) {
        toast.success(result.message || "تم حذف الحجم بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء حذف الحجم", { id });
      }
    } catch {
      toast.error("حدث خطأ أثناء حذف الحجم", { id });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="sm:text-right">
          <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
          <AlertDialogDescription>
            هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الحجم &quot;{size.size} {size.unit}
            &quot; نهائياً.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteSizeButton;
