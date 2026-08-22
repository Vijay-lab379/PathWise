"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Camera, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(ROUTES.DASHBOARD);
      }, 1200);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
      {/* Top Avatar Circle from Wireframe (Photo) */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-warm-sand/80 border-2 border-primary/20 flex items-center justify-center text-primary shadow-xs transition-colors group-hover:border-primary/50">
            <User className="w-12 h-12 text-primary" aria-hidden="true" />
          </div>
          <div
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm"
            aria-label="Upload photo"
          >
            <Camera className="w-4 h-4" />
          </div>
        </div>
        <h1 className="font-heading font-bold text-2xl tracking-tight text-foreground mt-4">
          Create User Account
        </h1>
        <p className="font-sans text-sm text-muted-foreground mt-1">
          Join Pathwise to start planning your personalized trips
        </p>
      </div>

      {/* Success Notification Banner */}
      {success && (
        <div className="mb-5 p-3.5 bg-success/10 border border-success/30 rounded-xl flex items-center space-x-2 text-sm text-success font-medium">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>Registration successful! Redirecting to dashboard...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              First Name *
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              disabled={loading || success}
              className={`w-full px-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.firstName ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Last Name *
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              disabled={loading || success}
              className={`w-full px-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.lastName ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Email Address & Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              disabled={loading || success}
              className={`w-full px-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              disabled={loading || success}
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            />
          </div>
        </div>

        {/* Row 3: City & Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              City *
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              disabled={loading || success}
              className={`w-full px-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.city ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="country" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
              Country *
            </label>
            <input
              id="country"
              name="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              disabled={loading || success}
              className={`w-full px-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.country ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
              }`}
            />
            {errors.country && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.country}
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Additional Information .... */}
        <div>
          <label htmlFor="additionalInfo" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={3}
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Tell us about your travel preferences or interests..."
            disabled={loading || success}
            className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
        </div>

        {/* CTA Button: Register Users */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-primary-foreground font-medium rounded-xl text-sm transition-colors duration-150 flex items-center justify-center min-h-[44px] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Registering User...
              </>
            ) : (
              "Register Users"
            )}
          </button>
        </div>
      </form>

      {/* Navigation to Login */}
      <div className="mt-6 text-center text-xs text-muted-foreground border-t border-border pt-4">
        <span>Already have an account? </span>
        <Link
          href={ROUTES.LOGIN}
          className="text-primary font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-primary rounded-xs ml-1"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
