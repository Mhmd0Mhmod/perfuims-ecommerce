import AnimatedCanvas from "@/components/design/AnimatedCanvas";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <AnimatedCanvas />
      {children}
    </main>
  );
}
export default layout;
