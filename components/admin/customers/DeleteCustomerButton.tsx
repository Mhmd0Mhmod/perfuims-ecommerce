"use client";
import { deleteCustomerAction } from "@/app/[locale]/admin/customers/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
function DeleteCustomerButton({
  customerId,
  disabled,
}: {
  customerId: number;
  disabled?: boolean;
}) {
  const handleDelete = useCallback(async () => {
    const id = toast.loading("جاري حذف العميل...");
    const response = await deleteCustomerAction(customerId);
    if (response?.error) {
      toast.error(response.message || "حدث خطأ أثناء حذف العميل. حاول مرة أخرى.", { id });
      return;
    }
    toast.success("تم حذف العميل بنجاح!", { id });
  }, [customerId]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={disabled}>
        <Button variant={"ghost"} size="sm">
          <Trash className="h-4 w-4 text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="sm:text-right">حذف العميل</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteCustomerButton;
