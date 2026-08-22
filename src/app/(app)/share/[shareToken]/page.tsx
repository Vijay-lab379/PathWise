"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Share2,
  Building2,
  Compass,
  Sparkles,
  ArrowLeft,
  Utensils,
  Landmark,
  Building,
  Bus,
  ShoppingBag,
  Copy,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { MOCK_TRIPS } from "@/features/trips/mockData";
import { MOCK_ITINERARY_SECTIONS } from "@/features/itinerary/mockData";
import { ShareTripModal } from "@/components/trips/ShareTripModal";
import { ROUTES } from "@/constants/routes";

interface SharePageProps {
  params: Promise<{ shareToken: string }>;
}

const categoryIcons = {
  Food: Utensils,
  Culture: Landmark,
  Sightseeing: Compass,
  Hotel: Building,
  Transport: Bus,
  Shopping: ShoppingBag,
};

export default function FinalItinerarySharePage({ params }: SharePageProps) {
  const { shareToken } = use(params);
  const trip = MOCK_TRIPS.find((t) => t.id === shareToken || t.id === "trip-1") || MOCK_TRIPS[0];

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const handleCopyTripTemplate = () => {
    setCopiedToast(`Trip template "${trip.title}" saved to your Pathwise account!`);
    setTimeout(() => setCopiedToast(null), 3000);
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto relative">
      {/* TOAST CONFIRMATION NOTIFICATION */}
      {copiedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2 animate-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* PUBLIC HEADER NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={ROUTES.TRIPS}
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to My Trips
        </Link>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopyTripTemplate}
            className="px-3.5 py-2 bg-surface hover:bg-muted border border-border text-foreground font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[40px] shadow-2xs"
          >
            <Copy className="w-3.5 h-3.5 text-primary" />
            <span>Copy Trip Template</span>
          </button>

          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[40px] shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Trip</span>
          </button>
        </div>
      </div>

      {/* EDITORIAL HERO BANNER */}
      <section className="bg-surface border border-border rounded-3xl overflow-hidden shadow-md relative">
        <div className="relative h-72 sm:h-96 w-full bg-muted">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="bg-surface/20 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-travel-accent" />
                Public Itinerary Story
              </span>

              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="px-3.5 py-2 bg-surface/20 hover:bg-surface/30 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[40px]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-medium text-white/80">
                <MapPin className="w-4 h-4 text-travel-accent" />
                <span>{trip.destination}, {trip.country}</span>
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                {trip.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-white/90 font-medium">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-travel-accent" />
                  <span>{trip.startDate} – {trip.endDate}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-travel-accent" />
                  <span>{trip.durationDays} Days</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-travel-accent" />
                  <span>{trip.cityCount} Cities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUMERICAL SUMMARY STRIP */}
      <section className="bg-surface border border-border rounded-2xl p-5 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="space-y-0.5 border-r border-border/60 last:border-r-0">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
            Duration
          </span>
          <span className="font-heading font-bold text-xl text-foreground">
            {trip.durationDays} Days
          </span>
        </div>

        <div className="space-y-0.5 border-r border-border/60 last:border-r-0">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
            Destinations
          </span>
          <span className="font-heading font-bold text-xl text-foreground">
            {trip.cityCount} Cities
          </span>
        </div>

        <div className="space-y-0.5 border-r border-border/60 last:border-r-0">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
            Travel Window
          </span>
          <span className="font-heading font-bold text-sm sm:text-base text-foreground truncate block">
            {trip.startDate} – {trip.endDate}
          </span>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
            Est. Budget
          </span>
          <span className="font-heading font-bold text-xl text-primary">
            {trip.budgetTotal}
          </span>
        </div>
      </section>

      {/* READ-ONLY CITY ROUTE PROGRESSION */}
      <section className="space-y-4">
        <h2 className="font-heading font-bold text-xl text-foreground">
          Journey Route Progression
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MOCK_ITINERARY_SECTIONS.map((sec, idx) => (
            <div
              key={sec.id}
              className="bg-surface border border-border rounded-2xl p-4 shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {sec.city}, {sec.country}
                </h3>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {sec.description}
              </p>

              <div className="text-[11px] font-semibold text-primary pt-1">
                {sec.dateRange}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* READ-ONLY DAY-BY-DAY ITINERARY TIMELINE */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="font-heading font-bold text-2xl text-foreground">
            Complete Day-by-Day Itinerary
          </h2>
          <span className="text-xs text-muted-foreground font-medium">
            Read-Only Public Story
          </span>
        </div>

        {MOCK_ITINERARY_SECTIONS.map((sec) => (
          <div key={sec.id} className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-primary">
                  Section {sec.sectionNumber}: {sec.city} ({sec.country})
                </h3>
                <p className="text-xs text-muted-foreground">{sec.dateRange}</p>
              </div>
              <span className="text-xs font-bold text-foreground bg-surface border border-border px-3 py-1 rounded-full">
                Budget: {sec.budget}
              </span>
            </div>

            {sec.days.map((day) => (
              <div key={day.dayNumber} className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center space-x-2 border-b border-border/80 pb-2">
                  <span className="font-heading font-bold text-xs uppercase tracking-wider text-primary">
                    Day {day.dayNumber}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium text-foreground">
                    {day.dateLabel}
                  </span>
                </div>

                <div className="space-y-3 pl-2 sm:pl-4">
                  {day.activities.map((act) => {
                    const CategoryIcon = categoryIcons[act.category] || Compass;
                    return (
                      <div
                        key={act.id}
                        className="p-4 bg-background border border-border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-primary font-heading">
                              {act.time}
                            </span>
                            <span className="text-[10px] uppercase font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                              <CategoryIcon className="w-3 h-3" />
                              {act.category}
                            </span>
                          </div>

                          <h4 className="font-heading font-bold text-base text-foreground">
                            {act.title}
                          </h4>

                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {act.description}
                          </p>

                          <div className="flex items-center space-x-4 text-xs text-muted-foreground pt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-primary" /> {act.duration}
                            </span>
                            <span className="flex items-center gap-1 font-semibold text-foreground">
                              <DollarSign className="w-3.5 h-3.5 text-travel-accent" /> {act.cost}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-travel-accent" /> {act.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* FOOTER CALL-TO-ACTION */}
      <section className="bg-surface border border-border rounded-3xl p-8 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-xl text-foreground">
          Ready to plan your next journey with Pathwise?
        </h3>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Create custom itineraries, manage budgets, discover top activities, and share with your travel companions.
        </p>
        <div className="pt-2 flex justify-center space-x-3">
          <Link
            href={ROUTES.NEW_TRIP}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs transition-colors shadow-xs inline-flex items-center space-x-2 min-h-[44px]"
          >
            <Compass className="w-4 h-4" />
            <span>Plan Your Own Trip</span>
          </Link>
        </div>
      </section>

      {/* SHARE MODAL */}
      <ShareTripModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        tripTitle={trip.title}
        shareUrl={`https://pathwise.app/share/${trip.id}`}
      />
    </div>
  );
}
