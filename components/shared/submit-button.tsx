import { ClassNameValue } from "tailwind-merge";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useFormState } from "react-hook-form";

function SubmitButton({
  label,
  labelOnLoading,
  className,
}: {
  label?: string;
  labelOnLoading?: string;
  className?: ClassNameValue;
}) {
  const { isSubmitting } = useFormState();
  return (
    <Button
      type="submit"
      className={cn("w-full disabled:cursor-not-allowed", className)}
      disabled={isSubmitting}
    >
      {isSubmitting ? labelOnLoading || "جارٍ المعالجة..." : label || "تسجيل الدخول"}
    </Button>
  );
}
export default SubmitButton;
