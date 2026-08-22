"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DESKTOP_NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function DesktopNavigation() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="hidden md:flex items-center space-x-1" aria-label="Desktop Navigation">
      {DESKTOP_NAV_ITEMS.map((item) => {
        const active = isLinkActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
              active
                ? "bg-soft-blue text-primary font-bold border border-primary/20 shadow-2xs"
                : "text-muted-foreground hover:text-primary hover:bg-soft-blue/60"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
