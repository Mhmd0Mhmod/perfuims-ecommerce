"use client";
import { useSelectedCountry } from "@/hooks/use-selected-country";
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
  const { selectedCountry } = useSelectedCountry();
  const url = `/${selectedCountry?.code}${href}`;
  const isActive = pathName === url;
  return (
    <Link href={url} className={cn(className, isActive && activeClassName)}>
      {children}
    </Link>
  );
}
export default ActiveLink;
