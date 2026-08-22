"use client";

import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Share2,
  Globe,
  Lock,
  Send,
  Sparkles,
  Loader2,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

interface ShareTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle: string;
  shareUrl?: string;
}

export function ShareTripModal({
  isOpen,
  onClose,
  tripTitle,
  shareUrl = "https://pathwise.app/share/demo-japan-autumn",
}: ShareTripModalProps) {
  const [shareState, setShareState] = useState<"idle" | "generating" | "ready" | "copied">("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerateLink = () => {
    setShareState("generating");
    setTimeout(() => {
      setShareState("ready");
    }, 800);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setShareState("copied");
    setToastMessage("Public itinerary link copied to clipboard!");

    setTimeout(() => {
      setToastMessage(null);
      setShareState("ready");
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-3xl max-w-md w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150 relative">
        {/* TOAST CONFIRMATION NOTIFICATION */}
        {toastMessage && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-semibold px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2 animate-in slide-in-from-bottom-2 duration-200">
            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-foreground">
                Share Trip Itinerary
              </h3>
              <p className="text-xs text-muted-foreground">Publish or share with travel companions</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trip Title Info */}
        <div className="p-3.5 bg-background border border-border rounded-2xl space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-primary block">
            Public Story Link
          </span>
          <h4 className="font-heading font-bold text-base text-foreground">
            {tripTitle}
          </h4>
        </div>

        {/* Share Link Control Box */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Shareable URL
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shareState === "generating" ? "Generating secure link..." : shareUrl}
              className="flex-1 px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs font-mono text-foreground focus:outline-none min-h-[44px]"
            />
            <button
              type="button"
              onClick={shareState === "idle" ? handleGenerateLink : handleCopyLink}
              disabled={shareState === "generating"}
              className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors shrink-0 min-h-[44px] cursor-pointer disabled:opacity-50"
            >
              {shareState === "generating" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : shareState === "copied" ? (
                <>
                  <Check className="w-4 h-4 text-success-foreground" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visibility Setting Badge */}
        <div className="p-3 bg-background border border-border rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">Anyone with the link can view</span>
          </div>
          <span className="text-[10px] uppercase font-semibold text-success bg-success/10 px-2 py-0.5 rounded-md border border-success/20">
            Public Read-Only
          </span>
        </div>

        {/* Quick Social Share Options */}
        <div className="pt-2 border-t border-border space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Quick Share Channels
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2.5 bg-background border border-border hover:border-primary/40 rounded-xl text-xs font-semibold text-foreground flex items-center justify-center space-x-1.5 transition-colors min-h-[40px] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-primary" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2.5 bg-background border border-border hover:border-primary/40 rounded-xl text-xs font-semibold text-foreground flex items-center justify-center space-x-1.5 transition-colors min-h-[40px] cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-travel-accent" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2.5 bg-background border border-border hover:border-primary/40 rounded-xl text-xs font-semibold text-foreground flex items-center justify-center space-x-1.5 transition-colors min-h-[40px] cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Private</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2 flex justify-between items-center">
          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-travel-accent" />
            Pathwise Public Story
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-background border border-border hover:bg-muted font-medium rounded-xl text-xs transition-colors min-h-[40px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
