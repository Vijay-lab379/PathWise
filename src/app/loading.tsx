import React from "react";
import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center space-y-4">
      {/* Simple Spinning Compass Icon */}
      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
        <Compass className="w-6 h-6 animate-spin [animation-duration:3s]" />
      </div>

      {/* Simple Text & Loader */}
      <div className="text-center space-y-2">
        <h2 className="font-heading font-semibold text-sm text-foreground">
          Loading Pathwise...
        </h2>
        <div className="w-32 h-1 bg-muted rounded-full overflow-hidden mx-auto">
          <div className="w-1/2 h-full bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
