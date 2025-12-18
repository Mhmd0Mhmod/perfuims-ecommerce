"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  className?: string;
  itemClassName?: string;
  onLinkClick?: () => void;
}

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/shop", label: "المتجر" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
];

export function NavLinks({ className, itemClassName, onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              "hover:text-primary relative text-sm font-medium transition-colors",
              isActive ? "text-primary font-semibold" : "text-muted-foreground",
              itemClassName,
            )}
          >
            {link.label}
            {isActive && (
              <span className="bg-primary absolute right-0 -bottom-1 left-0 hidden h-0.5 rounded-full md:block" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
