"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClassNameValue } from "tailwind-merge";

function ActiveLink({
  href,
  children,
  className,
  activeClassName,
}: {
  href: string;
  children: React.ReactNode;
  className?: ClassNameValue;
  activeClassName?: ClassNameValue;
}) {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link href={href} className={cn(className, isActive && activeClassName)}>
      {children}
    </Link>
  );
}
export default ActiveLink;
