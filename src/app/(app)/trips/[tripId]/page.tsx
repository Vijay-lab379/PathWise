import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Share2,
  Edit3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Building2,
  Compass,
} from "lucide-react";
import { MOCK_TRIPS } from "@/features/trips/mockData";
import { TripNavTabs } from "@/components/trips/TripNavTabs";
import { ROUTES } from "@/constants/routes";

interface TripWorkspacePageProps {
  params: Promise<{ tripId: string }>;
}

export default async function TripOverviewPage({ params }: TripWorkspacePageProps) {
  const { tripId } = await params;

  // Select matching trip or fallback to first mock trip
  const trip = MOCK_TRIPS.find((t) => t.id === tripId) || MOCK_TRIPS[0];

  // Mock Route Progression Cities
  const ROUTE_CITIES = [
    {
      order: 1,
      name: "Kyoto",
      country: "Japan",
      days: 5,
      dates: "Oct 12 - Oct 17",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=80",
    },
    {
      order: 2,
      name: "Osaka",
      country: "Japan",
      days: 3,
      dates: "Oct 17 - Oct 20",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=500&q=80",
    },
    {
      order: 3,
      name: "Nara",
      country: "Japan",
      days: 2,
      dates: "Oct 20 - Oct 22",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=500&q=80",
    },
  ];

  // Mock Overview Activities
  const OVERVIEW_ACTIVITIES = [
    {
      time: "Day 2 • 09:00 AM",
      title: "Arashiyama Bamboo Grove Walk",
      location: "Kyoto",
      category: "Culture",
    },
    {
      time: "Day 3 • 04:30 PM",
      title: "Fushimi Inari Torii Gate Hike at Sunset",
      location: "Kyoto",
      category: "Sightseeing",
    },
    {
      time: "Day 6 • 06:00 PM",
      title: "Dotonbori Street Food & Neon Lights Tour",
      location: "Osaka",
      category: "Gastronomy",
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* BACK TO TRIPS LINK */}
      <div>
        <Link
          href={ROUTES.TRIPS}
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to All Trips
        </Link>
      </div>

      {/* TRIP WORKSPACE HEADER */}
      <section className="bg-surface border border-border rounded-3xl overflow-hidden shadow-xs">
        {/* Cover Photo */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full bg-muted">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Header Overlay Actions & Status */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="bg-surface/20 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white">
                {trip.status}
              </span>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Link
                  href={ROUTES.NEW_TRIP}
                  className="px-3.5 py-2 bg-surface/20 hover:bg-surface/30 backdrop-blur-md text-white border border-white/20 font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[40px]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit Trip</span>
                </Link>

                <Link
                  href={ROUTES.SHARE(trip.id)}
                  className="px-3.5 py-2 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-sm min-h-[40px]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Trip</span>
                </Link>
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-medium text-white/80">
                <MapPin className="w-4 h-4 text-travel-accent" />
                <span>{trip.destination}, {trip.country}</span>
              </div>

              <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                {trip.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-white/90 pt-1 font-medium">
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

      {/* TRIP SECTION NAVIGATION TABS */}
      <TripNavTabs tripId={trip.id} />

      {/* OVERVIEW CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT 2 COLUMNS: SUMMARY, ROUTE, ACTIVITIES */}
        <div className="lg:col-span-2 space-y-8">
          {/* Trip Summary Card */}
          <section className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-primary">
              <Compass className="w-5 h-5" />
              <h2 className="font-heading font-bold text-lg text-foreground">
                Trip Summary & Notes
              </h2>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed font-sans">
              An autumn journey through traditional tea houses, vibrant maple foliage, and ancient shrines across Kyoto, Osaka, and Nara. Experiencing traditional kaiseki dining, historic castles, and serene bamboo groves.
            </p>
          </section>

          {/* Destination Route Progression (City 1 -> City 2 -> City 3) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-xl text-foreground">
                City Route Progression
              </h2>
              <span className="text-xs text-muted-foreground font-medium">
                {ROUTE_CITIES.length} Destinations
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ROUTE_CITIES.map((city, idx) => (
                <div
                  key={city.name}
                  className="relative group bg-surface border border-border rounded-2xl overflow-hidden shadow-xs hover:border-primary/30 transition-colors flex flex-col justify-between"
                >
                  <div className="relative h-32 w-full overflow-hidden bg-muted">
                    <Image
                      src={city.image}
                      alt={city.name}
                      fill
                      sizes="300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {city.order}
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <h3 className="font-heading font-bold text-base text-foreground">
                      {city.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{city.dates} ({city.days} Days)</p>
                  </div>

                  {idx < ROUTE_CITIES.length - 1 && (
                    <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-surface border border-border rounded-full p-1 shadow-xs text-primary">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Activities Summary */}
          <section className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-travel-accent" />
                <h2 className="font-heading font-bold text-lg text-foreground">
                  Upcoming Activity Highlights
                </h2>
              </div>
              <Link
                href={ROUTES.TRIP_ITINERARY(trip.id)}
                className="text-xs font-semibold text-primary hover:underline flex items-center"
              >
                View Full Itinerary
              </Link>
            </div>

            <div className="space-y-3">
              {OVERVIEW_ACTIVITIES.map((act, index) => (
                <div
                  key={index}
                  className="p-3.5 bg-background border border-border rounded-xl flex items-center justify-between text-xs hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <h4 className="font-heading font-semibold text-foreground text-sm">
                        {act.title}
                      </h4>
                      <p className="text-muted-foreground">{act.time} • {act.location}</p>
                    </div>
                  </div>
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-md font-semibold text-[10px] uppercase">
                    {act.category}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: BUDGET & STATISTICS SUMMARY */}
        <div className="space-y-6">
          {/* Budget Summary Card */}
          <section className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-travel-accent" />
                <h2 className="font-heading font-bold text-lg text-foreground">
                  Budget Summary
                </h2>
              </div>
              <Link
                href={ROUTES.TRIP_BUDGET(trip.id)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Details
              </Link>
            </div>

            {/* Numerical Totals */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-background border border-border rounded-xl">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Est. Total
                </span>
                <span className="font-heading font-bold text-xl text-foreground mt-0.5 block">
                  {trip.budgetTotal}
                </span>
              </div>

              <div className="p-3.5 bg-background border border-border rounded-xl">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                  Daily Avg
                </span>
                <span className="font-heading font-bold text-xl text-primary mt-0.5 block">
                  $285/day
                </span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-2.5 text-xs">
              <span className="font-semibold text-foreground uppercase tracking-wider text-[10px] text-muted-foreground block">
                Category Allocations
              </span>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Accommodation</span>
                  <span className="font-semibold text-foreground">$1,200 (42%)</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "42%" }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-muted-foreground">Activities & Tours</span>
                  <span className="font-semibold text-foreground">$650 (23%)</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="bg-travel-accent h-full rounded-full" style={{ width: "23%" }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-muted-foreground">Food & Dining</span>
                  <span className="font-semibold text-foreground">$600 (21%)</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "21%" }} />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-muted-foreground">Transport & Passes</span>
                  <span className="font-semibold text-foreground">$400 (14%)</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: "14%" }} />
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions Card */}
          <section className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="font-heading font-semibold text-sm text-foreground">
              Trip Management
            </h3>
            <div className="space-y-2">
              <Link
                href={ROUTES.TRIP_ITINERARY(trip.id)}
                className="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-primary-foreground font-medium rounded-xl text-xs flex items-center justify-between transition-colors min-h-[44px]"
              >
                <span>Open Itinerary Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={ROUTES.SHARE(trip.id)}
                className="w-full py-2.5 px-4 bg-background hover:bg-muted border border-border text-foreground font-medium rounded-xl text-xs flex items-center justify-between transition-colors min-h-[44px]"
              >
                <span>View Public Share Link</span>
                <Share2 className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
