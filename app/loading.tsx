"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            {/* Glowing effect behind logo */}
            <div className="bg-primary/20 absolute inset-0 scale-150 rounded-full blur-2xl" />

            <h1 className="text-primary relative text-5xl font-bold md:text-6xl">مؤسسه الطاحون</h1>
          </div>
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase">المسك للعطور</p>
        </div>

        {/* Elegant Loader */}
        <div className="relative flex items-center justify-center">
          {/* Outer pulsing ring */}
          <div className="border-primary/20 absolute h-16 w-16 animate-ping rounded-full border" />

          {/* Spinning ring */}
          <div className="border-muted border-t-primary h-12 w-12 animate-spin rounded-full border-2" />
        </div>

        {/* Progress Bar */}
        <div className="w-48 space-y-2">
          <Progress value={progress} className="h-1" />
          <p className="text-muted-foreground text-center text-xs">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}
