"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Layers,
  Plus,
  FolderOpen,
} from "lucide-react";
import { MOCK_COMMUNITY_TRIPS } from "@/features/community/mockData";
import { CommunityTripCard } from "@/components/community/CommunityTripCard";
import { ROUTES } from "@/constants/routes";

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"likes" | "title">("likes");

  const categories = [
    "All",
    "Culture & Heritage",
    "Nature & Adventure",
    "Luxury Travel",
    "Budget Friendly",
  ];

  // Filter & Sort community trips
  const filteredTrips = MOCK_COMMUNITY_TRIPS.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || trip.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return b.likesCount - a.likesCount;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
            Community Journeys
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover travel stories and itineraries shared by the global Pathwise community
          </p>
        </div>

        <Link
          href={ROUTES.NEW_TRIP}
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs transition-colors shadow-xs inline-flex items-center justify-center space-x-2 min-h-[44px] self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Your Trip</span>
        </Link>
      </div>

      {/* SEARCH BAR & CONTROLS (Screen 10 Reference: Search bar, Group by, Filter, Sort by) */}
      <section className="bg-surface p-4 border border-border rounded-2xl shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search community trips (e.g. Kyoto, Amalfi, Alps, Bali, Elena)..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[42px]"
          />
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            className="px-3.5 py-2 bg-background border border-border text-foreground text-xs font-medium rounded-xl flex items-center space-x-1 hover:border-primary/40 transition-colors min-h-[42px]"
          >
            <Layers className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Group by</span>
          </button>
          <button
            type="button"
            className="px-3.5 py-2 bg-background border border-border text-foreground text-xs font-medium rounded-xl flex items-center space-x-1 hover:border-primary/40 transition-colors min-h-[42px]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Filter</span>
          </button>
          <button
            type="button"
            onClick={() => setSortBy((prev) => (prev === "likes" ? "title" : "likes"))}
            className="px-3.5 py-2 bg-background border border-border text-foreground text-xs font-medium rounded-xl flex items-center space-x-1 hover:border-primary/40 transition-colors min-h-[42px]"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="capitalize">Sort: {sortBy}</span>
          </button>
        </div>
      </section>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors whitespace-nowrap min-h-[36px] ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-muted-foreground border border-border hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* COMMUNITY TRIPS LISTING (Screen 10 Reference: Community tab Cards) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-foreground">
            Featured Stories ({filteredTrips.length})
          </h2>
          <span className="text-xs text-muted-foreground font-medium">
            Showing traveler itineraries
          </span>
        </div>

        {filteredTrips.length > 0 ? (
          <div className="space-y-6">
            {filteredTrips.map((trip) => (
              <CommunityTripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          /* Empty Search Results */
          <div className="bg-surface border border-dashed border-border rounded-3xl p-8 sm:p-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-warm-sand/80 text-primary flex items-center justify-center mx-auto border border-primary/20">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-base text-foreground">
              No community journeys found
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              We couldn&apos;t find any stories matching &quot;{searchQuery}&quot;. Try searching for Kyoto, Amalfi, Alps, or Bali.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
