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
              "px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-150 min-h-[44px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
              active
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
