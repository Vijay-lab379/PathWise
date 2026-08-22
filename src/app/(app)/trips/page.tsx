"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Sparkles,
  ArrowUpDown,
  FolderOpen,
  Compass,
} from "lucide-react";
import { MOCK_TRIPS } from "@/features/trips/mockData";
import { TripCard } from "@/components/trips/TripCard";
import { ROUTES } from "@/constants/routes";

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "ongoing" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");

  // Filter & Sort trips
  const filteredTrips = MOCK_TRIPS.filter((trip) => {
    const matchesTab = activeTab === "all" || trip.status === activeTab;
    const matchesQuery =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  }).sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  // Suggested Places to Visit & Activities to Perform (from Screen 4 reference)
  const SUGGESTED_ACTIVITIES = [
    {
      id: "act-1",
      title: "Arashiyama Bamboo Grove Walk",
      place: "Kyoto, Japan",
      category: "Nature & Culture",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "act-2",
      title: "Path of the Gods Hike",
      place: "Positano, Italy",
      category: "Scenic Trail",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "act-3",
      title: "Jungfraujoch Top of Europe Train",
      place: "Interlaken, Switzerland",
      category: "Alpine Adventure",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* PAGE HEADER & QUICK TRIP PLANNER BLOCK (Screen 4 Reference: Plan a new trip) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
            My Trips
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore your upcoming itineraries, active journeys, and travel archives
          </p>
        </div>
        <Link
          href={ROUTES.NEW_TRIP}
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-sm transition-colors shadow-xs inline-flex items-center justify-center space-x-2 min-h-[44px] self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Plan a New Trip</span>
        </Link>
      </div>

      {/* QUICK TRIP CREATION BAR (Screen 4 Reference: Start Date, Select a Place, End Date) */}
      <section className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-primary font-heading font-semibold text-base">
          <Compass className="w-5 h-5" />
          <h2>Plan a new trip</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Select a Place
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-travel-accent" />
              <input
                type="text"
                placeholder="e.g. Kyoto, Tokyo, Paris"
                className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[40px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <input
                type="date"
                className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-xl text-xs font-sans text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[40px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <input
                type="date"
                className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-xl text-xs font-sans text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[40px]"
              />
            </div>
          </div>

          <div className="flex items-end">
            <Link
              href={ROUTES.NEW_TRIP}
              className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs transition-colors flex items-center justify-center min-h-[40px]"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </section>

      {/* SUGGESTED PLACES TO VISIT / ACTIVITIES (Screen 4 Reference: Suggestion for Places to Visit/Activities) */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-travel-accent" />
          <h3 className="font-heading font-semibold text-base text-foreground">
            Suggested Places to Visit & Activities to Perform
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SUGGESTED_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="bg-surface border border-border rounded-xl p-3 flex items-center space-x-3 hover:border-primary/40 transition-colors cursor-pointer group shadow-xs"
            >
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-muted">
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-semibold text-primary tracking-wider block">
                  {act.category}
                </span>
                <h4 className="font-heading font-semibold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                  {act.title}
                </h4>
                <p className="text-[11px] text-muted-foreground truncate">{act.place}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTER & SEARCH CONTROL BAR */}
      <section className="bg-surface p-4 border border-border rounded-2xl shadow-xs space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center bg-background border border-border rounded-xl p-1 overflow-x-auto">
          {(["all", "upcoming", "ongoing", "completed"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors min-h-[38px] capitalize whitespace-nowrap ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center space-x-2 flex-1 md:max-w-xs">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by trip, city or country..."
              className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[40px]"
            />
          </div>

          <button
            type="button"
            onClick={() => setSortBy(sortBy === "date" ? "title" : "date")}
            className="px-3 py-2 bg-background border border-border hover:border-primary/40 text-foreground font-medium rounded-xl text-xs flex items-center space-x-1 transition-colors min-h-[40px]"
            title="Sort Trips"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </section>

      {/* TRIPS LISTING GRID OR POLISHED EMPTY STATE */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        /* Polished Empty State */
        <div className="bg-surface border border-dashed border-border rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-warm-sand/80 text-primary flex items-center justify-center mx-auto border border-primary/20">
            <FolderOpen className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              No trips found
            </h3>
            <p className="text-xs text-muted-foreground">
              We couldn&apos;t find any trips matching your current filter. Try adjusting your search query or create a new trip itinerary.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={ROUTES.NEW_TRIP}
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-medium rounded-xl text-sm inline-flex items-center space-x-2 transition-colors min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Plan New Trip</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
