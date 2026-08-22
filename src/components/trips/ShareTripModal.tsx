"use client";

import React, { useState } from "react";
import { X, Copy, Check, Share2, Globe, Lock, Send } from "lucide-react";

interface ShareTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle: string;
  shareUrl: string;
}

export function ShareTripModal({
  isOpen,
  onClose,
  tripTitle,
  shareUrl,
}: ShareTripModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-3xl max-w-md w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-lg text-foreground">
              Share Trip Itinerary
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trip Title */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium">Sharing Itinerary:</p>
          <h4 className="font-heading font-bold text-base text-foreground">
            {tripTitle}
          </h4>
        </div>

        {/* Share Link Copy Field */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Public Itinerary Link
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs font-mono text-foreground focus:outline-none min-h-[44px]"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors shrink-0 min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
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
          <span className="text-[10px] uppercase font-semibold text-success bg-success/10 px-2 py-0.5 rounded-md">
            Public Link
          </span>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="pt-2 border-t border-border space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Quick Share Options
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="p-2.5 bg-background border border-border hover:border-primary/40 rounded-xl text-xs font-semibold text-foreground flex items-center justify-center space-x-1.5 transition-colors min-h-[40px]"
            >
              <Send className="w-3.5 h-3.5 text-primary" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="p-2.5 bg-background border border-border hover:border-primary/40 rounded-xl text-xs font-semibold text-foreground flex items-center justify-center space-x-1.5 transition-colors min-h-[40px]"
            >
              <Share2 className="w-3.5 h-3.5 text-travel-accent" />
              <span>Message</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="p-2.5 bg-background border border-border hover:border-primary/40 rounded-xl text-xs font-semibold text-foreground flex items-center justify-center space-x-1.5 transition-colors min-h-[40px]"
            >
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Private</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-background border border-border hover:bg-muted font-medium rounded-xl text-xs transition-colors min-h-[44px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
