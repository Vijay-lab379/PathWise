"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, DollarSign, ListOrdered } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface TripNavTabsProps {
  tripId: string;
}

export function TripNavTabs({ tripId }: TripNavTabsProps) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Overview",
      href: ROUTES.TRIP_DETAILS(tripId),
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Itinerary",
      href: ROUTES.TRIP_ITINERARY(tripId),
      icon: ListOrdered,
      exact: false,
    },
    {
      label: "Budget",
      href: ROUTES.TRIP_BUDGET(tripId),
      icon: DollarSign,
      exact: false,
    },
    {
      label: "Calendar",
      href: ROUTES.TRIP_CALENDAR(tripId),
      icon: Calendar,
      exact: false,
    },
  ];

  const isTabActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="border-b border-border bg-surface sticky top-16 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Trip Workspace Sections">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isTabActive(tab.href, tab.exact);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-primary",
                  active
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
