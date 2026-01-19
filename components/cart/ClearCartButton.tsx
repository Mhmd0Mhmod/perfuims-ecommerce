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
  const { clear } = useCartContext();
  return (
    <Button onClick={clear} asChild={asChild} className={className}>
      {children}
    </Button>
  );
}
export default ClearCartButton;
