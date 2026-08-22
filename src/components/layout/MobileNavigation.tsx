"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Home as HomeIcon,
  MapPin,
  User as UserIcon,
  Users,
} from "lucide-react";
import { MOBILE_NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const iconMap = {
  home: HomeIcon,
  compass: Compass,
  trips: MapPin,
  users: Users,
  user: UserIcon,
};

export function MobileNavigation() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-border px-2 py-1.5 shadow-md"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {MOBILE_NAV_ITEMS.map((item) => {
          const IconComponent = iconMap[item.iconName];
          const active = isLinkActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] min-h-[44px] rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                active
                  ? "text-primary font-bold bg-soft-blue"
                  : "text-muted-foreground hover:text-primary hover:bg-soft-blue/50"
              )}
            >
              <IconComponent
                className={cn("w-5 h-5 transition-transform duration-200", active && "scale-110 text-primary")}
                aria-hidden="true"
              />
              <span className="text-[10px] leading-tight mt-1 tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
