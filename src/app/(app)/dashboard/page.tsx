"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MapPin,
  Calendar,
  Sparkles,
  Layers,
  FolderOpen,
} from "lucide-react";
import { MOCK_TRIPS } from "@/features/trips/mockData";
import { MOCK_DESTINATIONS } from "@/features/destinations/mockData";
import { TripCard } from "@/components/trips/TripCard";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { ROUTES } from "@/constants/routes";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "upcoming" | "completed">("all");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [simulateEmptyState, setSimulateEmptyState] = useState(false);

  // Filter trips based on search query, status, and empty state toggle
  const filteredTrips = simulateEmptyState
    ? []
    : MOCK_TRIPS.filter((trip) => {
        const matchesQuery =
          trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.country.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "all" || trip.status === filterStatus;
        return matchesQuery && matchesStatus;
      });

  const featuredTrip = MOCK_TRIPS[0];

  return (
    <div className="space-y-10 pb-16">
      {/* 1. HERO / BANNER IMAGE SECTION (Screen 3 Reference: Banner Image) */}
      <section className="relative rounded-3xl overflow-hidden bg-surface border border-border shadow-xs">
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <Image
            src={featuredTrip.imageUrl}
            alt={featuredTrip.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

          {/* Overlay Content */}
          <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="bg-surface/20 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-travel-accent" />
                Featured Journey
              </span>
              <button
                type="button"
                onClick={() => setSimulateEmptyState(!simulateEmptyState)}
                className="text-xs bg-surface/20 hover:bg-surface/30 backdrop-blur-md px-3 py-1 rounded-full text-white/90 transition-colors border border-white/20"
              >
                {simulateEmptyState ? "Show Populated State" : "Test Empty State"}
              </button>
            </div>

            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-2 text-sm font-medium text-white/80">
                <MapPin className="w-4 h-4 text-travel-accent" />
                <span>{featuredTrip.destination}, {featuredTrip.country}</span>
                <span>•</span>
                <Calendar className="w-4 h-4 text-white/80" />
                <span>{featuredTrip.startDate}</span>
              </div>
              <h1 className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                {featuredTrip.title}
              </h1>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={ROUTES.TRIP_DETAILS(featuredTrip.id)}
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-medium rounded-xl text-sm transition-colors shadow-sm inline-flex items-center justify-center min-h-[44px]"
                >
                  Continue Planning
                </Link>
                <Link
                  href={ROUTES.NEW_TRIP}
                  className="px-5 py-2.5 bg-surface/90 hover:bg-surface text-foreground font-medium rounded-xl text-sm transition-colors shadow-sm inline-flex items-center justify-center min-h-[44px]"
                >
                  <Plus className="w-4 h-4 mr-1.5 text-primary" />
                  Plan a New Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONTROLS BAR (Screen 3 Reference: Search bar, Group by, Filter, Sort by...) */}
      <section className="bg-surface p-4 sm:p-5 border border-border rounded-2xl shadow-xs space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trips, destinations, cities..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary min-h-[44px]"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter Tabs */}
          <div className="flex items-center bg-background border border-border rounded-xl p-1">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                filterStatus === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("upcoming")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                filterStatus === "upcoming" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("completed")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors min-h-[36px] ${
                filterStatus === "completed" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Completed
            </button>
          </div>

          {/* Group By Filter Button */}
          <button
            type="button"
            className="px-3.5 py-2.5 bg-background border border-border hover:border-primary/40 text-foreground font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[44px]"
          >
            <Layers className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Group by</span>
          </button>

          {/* Filter Options Button */}
          <button
            type="button"
            className="px-3.5 py-2.5 bg-background border border-border hover:border-primary/40 text-foreground font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[44px]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Filter</span>
          </button>

          {/* Sort By Toggle */}
          <button
            type="button"
            onClick={() => setSortBy(sortBy === "date" ? "title" : "date")}
            className="px-3.5 py-2.5 bg-background border border-border hover:border-primary/40 text-foreground font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[44px]"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Sort by: {sortBy === "date" ? "Date" : "Name"}</span>
          </button>
        </div>
      </section>

      {/* 3. TOP REGIONAL SELECTIONS (Screen 3 Reference: Top Regional Selections) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
              Top Regional Selections
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Handpicked destinations for your next escape
            </p>
          </div>
          <Link
            href={ROUTES.EXPLORE}
            className="text-xs font-semibold text-primary hover:underline flex items-center"
          >
            View All
          </Link>
        </div>

        {/* Regional Selections Carousel / Scroll Grid */}
        <div className="flex space-x-4 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-border">
          {MOCK_DESTINATIONS.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* 4. PREVIOUS & UPCOMING TRIPS (Screen 3 Reference: Previous Trips) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
              Your Trips
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage your upcoming itineraries and past travel experiences
            </p>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            Showing {filteredTrips.length} trip{filteredTrips.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Trips Grid or Empty State */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          /* Empty Trips State */
          <div className="bg-surface border border-dashed border-border rounded-2xl p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-warm-sand/80 text-primary flex items-center justify-center mx-auto border border-primary/20">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="font-heading font-semibold text-lg text-foreground">
                No trips found
              </h3>
              <p className="text-xs text-muted-foreground">
                {simulateEmptyState
                  ? "Empty state simulation enabled. Toggle off above to restore sample trips."
                  : "You haven't created any trips matching this filter yet."}
              </p>
            </div>
            <div className="pt-2">
              <Link
                href={ROUTES.NEW_TRIP}
                className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-medium rounded-xl text-sm inline-flex items-center space-x-2 transition-colors min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>Start Planning a Trip</span>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 5. STICKY / FLOATING ACTION BUTTON (Screen 3 Reference: + Plan a trip) */}
      <div className="fixed bottom-20 md:bottom-8 right-6 z-40">
        <Link
          href={ROUTES.NEW_TRIP}
          className="px-5 py-3 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 text-sm border border-primary-dark/20 min-h-[48px] focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Plus className="w-5 h-5" />
          <span>Plan a trip</span>
        </Link>
      </div>
    </div>
  );
}
