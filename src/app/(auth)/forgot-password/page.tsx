"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email address is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-warm-sand/80 border border-primary/20 flex items-center justify-center text-primary mb-4 shadow-xs">
          <Compass className="w-8 h-8 text-primary" aria-hidden="true" />
        </div>
        <h1 className="font-heading font-bold text-2xl tracking-tight text-foreground">
          Reset Password
        </h1>
        <p className="font-sans text-sm text-muted-foreground mt-1">
          Enter your email address to receive password reset instructions
        </p>
      </div>

      {submitted ? (
        <div className="space-y-4">
          <div className="p-4 bg-success/10 border border-success/30 rounded-xl text-center">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
            <h2 className="font-heading font-semibold text-base text-foreground mb-1">
              Check your email
            </h2>
            <p className="font-sans text-xs text-muted-foreground leading-relaxed">
              If an account exists for <strong className="text-foreground">{email}</strong>, you will receive password reset instructions shortly.
            </p>
          </div>

          <Link
            href={ROUTES.LOGIN}
            className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-primary-foreground font-medium rounded-xl text-sm transition-colors duration-150 flex items-center justify-center min-h-[44px] focus-visible:outline-2 focus-visible:outline-primary"
          >
            Return to login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="name@example.com"
              disabled={loading}
              className={`w-full px-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                error ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
              }`}
            />
            {error && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-primary-foreground font-medium rounded-xl text-sm transition-colors duration-150 flex items-center justify-center min-h-[44px] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending reset link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      )}

      {/* Return to Login */}
      <div className="mt-6 text-center border-t border-border pt-4">
        <Link
          href={ROUTES.LOGIN}
          className="inline-flex items-center text-xs font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary rounded-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Login
        </Link>
      </div>
    </div>
  );
}
