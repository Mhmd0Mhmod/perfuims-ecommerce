"use client";
import { deleteCountry } from "@/app/admin/countries/actions";
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
import { Trash2Icon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

function DeleteCountryButton({ countryId }: { countryId: number }) {
  const onDelete = useCallback(async () => {
    const id = toast.loading("جاري حذف الدولة...");
    const response = await deleteCountry(countryId);
    if (response.status === 200) {
      toast.success(response.message || "تم حذف الدولة بنجاح", { id });
    } else {
      toast.error(response.message || "حدث خطأ أثناء حذف الدولة.", { id });
    }
  }, [countryId]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="sm:text-right">حذف الدولة</AlertDialogTitle>
          <AlertDialogDescription className="sm:text-right">
            هل أنت متأكد أنك تريد حذف هذه الدولة؟ لا يمكن التراجع عن هذا الإجراء.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>حذف</AlertDialogAction>
        </AlertDialogFooter>
        {/* Additional content and actions would go here */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteCountryButton;
