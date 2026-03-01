import { useCartContext } from "@/context/CartContext";
import { Button } from "../ui/button";

function ClearCartButton({
  className,
  asChild = false,
  children,
}: {
  className?: string;
  asChild?: boolean;
  children: React.ReactNode;
}) {
  const { clearMutation } = useCartContext();
  return (
    <Button
      onClick={() => clearMutation.mutate()}
      asChild={asChild}
      className={className}
      disabled={clearMutation.isPending}
    >
      {children}
    </Button>
  );
}
export default ClearCartButton;
