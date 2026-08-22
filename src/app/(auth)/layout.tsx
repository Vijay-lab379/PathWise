import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Header Branding */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between pb-4">
        <Link
          href={ROUTES.HOME}
          className="flex items-center space-x-2 text-primary hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-sm"
          aria-label="Pathwise Home"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <Compass className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-foreground">
            Pathwise
          </span>
        </Link>
      </header>

      {/* Main Form Body Container */}
      <main className="flex-1 flex items-center justify-center my-4 sm:my-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-muted-foreground pt-4">
        <p>&copy; {new Date().getFullYear()} Pathwise. All rights reserved.</p>
      </footer>
    </div>
  );
}
