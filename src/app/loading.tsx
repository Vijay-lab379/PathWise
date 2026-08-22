import React from "react";
import { Compass, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
      {/* CARD CONTAINER */}
      <div className="bg-surface border border-border rounded-3xl p-8 sm:p-10 shadow-xl max-w-sm w-full text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
        {/* Animated Background Ambient Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-travel-accent/10 rounded-full blur-2xl pointer-events-none" />

        {/* ANIMATED COMPASS LOGO ICON */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          {/* Pulsing Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-25" />
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
          
          {/* Compass Outer Badge */}
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-xs">
            <Compass className="w-10 h-10 animate-spin [animation-duration:6s]" />
          </div>

          {/* Floating Coral Sparkle */}
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-travel-accent text-white flex items-center justify-center shadow-sm animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* BRAND & TITLE */}
        <div className="space-y-1">
          <h2 className="font-heading font-bold text-2xl text-foreground tracking-tight flex items-center justify-center space-x-1.5">
            <span className="text-primary">Pathwise</span>
          </h2>
          <p className="text-xs font-medium text-muted-foreground animate-pulse">
            Crafting your travel journey...
          </p>
        </div>

        {/* SHIMMER PROGRESS BAR */}
        <div className="space-y-2 pt-2">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden relative">
            <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-primary via-travel-accent to-primary rounded-full w-full animate-in slide-in-from-left duration-1000 repeat-infinite" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Preparing Itineraries & Routes
          </span>
        </div>
      </div>
    </div>
  );
}
