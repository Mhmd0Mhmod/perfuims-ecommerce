import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ClassNameValue } from "tailwind-merge";
function LinkButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: ClassNameValue;
}) {
  return (
    <Button variant="link" className={cn("ml-2 p-0", className)} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
export default LinkButton;
