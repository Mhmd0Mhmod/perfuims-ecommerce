"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
function PasswordInput({ value, onChange, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="hover:text-primary absolute top-1/2 left-1 -translate-y-1/2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
}
export { PasswordInput };
