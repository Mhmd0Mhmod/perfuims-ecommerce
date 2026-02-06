import AnimatedCanvas from "@/components/design/AnimatedCanvas";
import Logo from "@/components/shop/Logo";
import { Card } from "@/components/ui/card";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <AnimatedCanvas />
      <Card className="animate-scale-in from-brand to-brand w-full max-w-md shadow-lg">
        <div className="mx-auto">
          <Logo />
        </div>
        {children}
      </Card>
    </main>
  );
}
export default layout;
