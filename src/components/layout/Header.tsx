"use client";

import Link from "next/link";
import { Compass, User } from "lucide-react";
import { DesktopNavigation } from "./DesktopNavigation";
import { ROUTES } from "@/constants/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LEFT: Branding / Wordmark */}
        <div className="flex items-center space-x-8">
          <Link
            href={ROUTES.DASHBOARD}
            className="flex items-center space-x-2.5 text-primary hover:opacity-90 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-sm group"
            aria-label="Pathwise Home"
          >
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/15 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
              Pathwise
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <DesktopNavigation />
        </div>

        {/* RIGHT: Sign In & Profile / Avatar Control */}
        <div className="flex items-center space-x-3">
          <Link
            href={ROUTES.LOGIN}
            className="text-xs font-semibold text-primary hover:text-primary-dark px-3.5 py-2 rounded-xl border border-primary/25 hover:bg-primary/5 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary min-h-[40px] flex items-center justify-center"
          >
            Sign In
          </Link>
          <Link
            href={ROUTES.PROFILE}
            aria-label="User Profile"
            className="w-9 h-9 rounded-full bg-soft-blue hover:bg-primary/10 flex items-center justify-center text-primary border border-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            <User className="w-4 h-4 text-primary" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
