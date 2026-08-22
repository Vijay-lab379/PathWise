"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function LoginPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ usernameOrEmail?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { usernameOrEmail?: string; password?: string } = {};
    if (!usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate frontend login action
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(ROUTES.DASHBOARD);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Top Avatar Circle from Wireframe (Photo) */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-soft-blue border-2 border-primary/20 flex items-center justify-center text-primary mb-4 shadow-xs">
          <User className="w-10 h-10 text-primary" aria-hidden="true" />
        </div>
        <h1 className="font-heading font-bold text-2xl tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="font-sans text-sm text-muted-foreground mt-1">
          Sign in to your Pathwise account
        </p>
      </div>

      {/* Success Notification Banner */}
      {success && (
        <div className="mb-5 p-3.5 bg-success/10 border border-success/30 rounded-xl flex items-center space-x-2 text-sm text-success font-medium">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>Login successful! Redirecting to dashboard...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Username / Email Field */}
        <div>
          <label
            htmlFor="usernameOrEmail"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
          >
            Username or Email
          </label>
          <div className="relative">
            <input
              id="usernameOrEmail"
              type="text"
              value={usernameOrEmail}
              onChange={(e) => {
                setUsernameOrEmail(e.target.value);
                if (errors.usernameOrEmail) setErrors((prev) => ({ ...prev, usernameOrEmail: undefined }));
              }}
              placeholder="username or name@example.com"
              disabled={loading || success}
              className={`w-full px-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.usernameOrEmail ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
              }`}
            />
          </div>
          {errors.usernameOrEmail && (
            <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.usernameOrEmail}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Password
            </label>
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-xs text-primary font-medium hover:underline focus-visible:outline-2 focus-visible:outline-primary rounded-xs"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="••••••••"
              disabled={loading || success}
              className={`w-full px-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] pr-10 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.password ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Login Button CTA */}
        <button
          type="submit"
          disabled={loading || success}
          className="w-full mt-2 py-3 px-4 bg-primary hover:bg-primary-dark text-primary-foreground font-medium rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center min-h-[44px] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-70 cursor-pointer shadow-2xs"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Navigation to Signup */}
      <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border pt-4">
        <span>Don&apos;t have an account? </span>
        <Link
          href={ROUTES.SIGNUP}
          className="text-primary font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-primary rounded-xs ml-1"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
