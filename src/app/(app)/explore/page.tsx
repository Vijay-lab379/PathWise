"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Layers,
  X,
  ChevronUp,
  ChevronDown,
  Plus,
  Compass,
  FolderOpen,
} from "lucide-react";
import { MOCK_DESTINATIONS, Destination } from "@/features/destinations/mockData";
import { CityCard } from "@/components/destinations/CityCard";
import { ROUTES } from "@/constants/routes";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"rating" | "city" | "cost">("rating");
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([
    MOCK_DESTINATIONS[0], // Kyoto
    MOCK_DESTINATIONS[2], // Tokyo
  ]);

  // Toggle selection
  const handleToggleSelect = (destination: Destination) => {
    const exists = selectedDestinations.some((d) => d.id === destination.id);
    if (exists) {
      setSelectedDestinations(selectedDestinations.filter((d) => d.id !== destination.id));
    } else {
      setSelectedDestinations([...selectedDestinations, destination]);
    }
  };

  // Reordering selected destinations
  const moveDestination = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= selectedDestinations.length) return;

    const newDestinations = [...selectedDestinations];
    const temp = newDestinations[index];
    newDestinations[index] = newDestinations[targetIndex];
    newDestinations[targetIndex] = temp;
    setSelectedDestinations(newDestinations);
  };

  // Filter & Sort results
  const filteredDestinations = MOCK_DESTINATIONS.filter((dest) => {
    const matchesSearch =
      dest.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || dest.tag === selectedTag;
    return matchesSearch && matchesTag;
  }).sort((a, b) => {
    if (sortBy === "city") return a.city.localeCompare(b.city);
    if (sortBy === "cost") return parseFloat(a.averageCostPerDay.replace(/\D/g, "")) - parseFloat(b.averageCostPerDay.replace(/\D/g, ""));
    return b.rating - a.rating;
  });

  const categories = ["All", "Popular", "Culture", "Nature", "Coastal", "Adventure", "Luxury"];

  return (
    <div className="space-y-8 pb-16">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
            Explore Destinations & Cities
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Search, discover and select cities to build your custom Pathwise itinerary
          </p>
        </div>
        <Link
          href={ROUTES.NEW_TRIP}
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-sm transition-colors shadow-xs inline-flex items-center justify-center space-x-2 min-h-[44px] self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Trip with Selected</span>
        </Link>
      </div>

      {/* SELECTED DESTINATIONS & ORDERING PANEL */}
      <section className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-base text-foreground">
              Selected Itinerary Route ({selectedDestinations.length})
            </h2>
          </div>
          {selectedDestinations.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedDestinations([])}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {selectedDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedDestinations.map((dest, idx) => (
              <div
                key={dest.id}
                className="bg-background border border-border rounded-xl p-3 flex items-center justify-between space-x-2 shadow-2xs"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-heading font-semibold text-xs text-foreground truncate">
                      {dest.city}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate">{dest.country}</p>
                  </div>
                </div>

                {/* Reordering & Delete Actions */}
                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveDestination(idx, "up")}
                    title="Move Up"
                    className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 rounded-md transition-colors"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === selectedDestinations.length - 1}
                    onClick={() => moveDestination(idx, "down")}
                    title="Move Down"
                    className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 rounded-md transition-colors"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleSelect(dest)}
                    title="Remove"
                    className="p-1 text-muted-foreground hover:text-destructive rounded-md transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-xs text-muted-foreground">
            No destinations selected yet. Click &quot;Add to Trip&quot; on any city below to build your route.
          </div>
        )}
      </section>

      {/* SEARCH BAR & CONTROLS (Screen 8 Reference: Search, Group by, Filter, Sort by...) */}
      <section className="bg-surface p-4 border border-border rounded-2xl shadow-xs space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations (e.g. Paris, Tokyo, Dubai, Rome, Bali)..."
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary min-h-[44px]"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="px-3.5 py-2.5 bg-background border border-border hover:border-primary/40 text-foreground font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[44px]"
          >
            <Layers className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Group by</span>
          </button>

          <button
            type="button"
            className="px-3.5 py-2.5 bg-background border border-border hover:border-primary/40 text-foreground font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[44px]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Filter</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setSortBy((prev) => (prev === "rating" ? "city" : prev === "city" ? "cost" : "rating"))
            }
            className="px-3.5 py-2.5 bg-background border border-border hover:border-primary/40 text-foreground font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[44px]"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="capitalize">Sort: {sortBy}</span>
          </button>
        </div>
      </section>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedTag(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors whitespace-nowrap min-h-[36px] ${
              selectedTag === cat
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-muted-foreground hover:text-foreground border border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* RESULTS LIST / CARDS GRID (Screen 8 Reference: Results / Option and its details) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-lg text-foreground">
            Results ({filteredDestinations.length})
          </h2>
          <span className="text-xs text-muted-foreground font-medium">
            Showing destinations
          </span>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="space-y-4">
            {filteredDestinations.map((dest) => {
              const isSelected = selectedDestinations.some((d) => d.id === dest.id);
              return (
                <CityCard
                  key={dest.id}
                  destination={dest}
                  isSelected={isSelected}
                  onToggleSelect={handleToggleSelect}
                />
              );
            })}
          </div>
        ) : (
          /* Empty Search Results */
          <div className="bg-surface border border-dashed border-border rounded-2xl p-8 sm:p-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-warm-sand/80 text-primary flex items-center justify-center mx-auto border border-primary/20">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-base text-foreground">
              No destinations found
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              We couldn&apos;t find any cities matching &quot;{searchQuery}&quot;. Try searching for Paris, Tokyo, Dubai, or Rome.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
