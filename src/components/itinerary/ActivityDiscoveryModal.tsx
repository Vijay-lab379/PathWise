"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Layers,
  Sparkles,
  Plus,
  Check,
  Star,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
} from "lucide-react";
import {
  MOCK_DISCOVERABLE_ACTIVITIES,
  DiscoverableActivity,
} from "@/features/activities/mockData";
import { ItineraryActivity } from "@/features/itinerary/mockData";

interface ActivityDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddActivity: (activity: ItineraryActivity) => void;
  dayNumber: number;
  city: string;
}

export function ActivityDiscoveryModal({
  isOpen,
  onClose,
  onAddActivity,
  dayNumber,
  city,
}: ActivityDiscoveryModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [addedActivityIds, setAddedActivityIds] = useState<string[]>([]);
  const [addedFeedback, setAddedFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    "All",
    "Sightseeing",
    "Food",
    "Culture",
    "Adventure",
    "Nature",
    "Shopping",
    "Nightlife",
  ];

  // Filter activities
  const filteredActivities = MOCK_DISCOVERABLE_ACTIVITIES.filter((act) => {
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || act.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectActivity = (act: DiscoverableActivity) => {
    const validCategory: ItineraryActivity["category"] =
      act.category === "Food" || act.category === "Culture" || act.category === "Shopping"
        ? act.category
        : "Sightseeing";

    const newItineraryActivity: ItineraryActivity = {
      id: `act-${act.id}-${addedActivityIds.length + 1}`,
      time: "11:00 AM",
      title: act.title,
      category: validCategory,
      duration: act.duration,
      cost: act.cost,
      description: act.description,
      location: `${act.city}, ${act.country}`,
    };

    onAddActivity(newItineraryActivity);
    setAddedActivityIds([...addedActivityIds, act.id]);
    setAddedFeedback(`Added "${act.title}" to Day ${dayNumber}!`);

    setTimeout(() => {
      setAddedFeedback(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-surface border border-border rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 border-b border-border bg-surface flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-travel-accent/10 text-travel-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-foreground leading-tight">
                Activity Discovery: Day {dayNumber} ({city})
              </h3>
              <p className="text-xs text-muted-foreground">
                Search and add experiences to your itinerary day
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FEEDBACK BANNER */}
        {addedFeedback && (
          <div className="px-5 py-2.5 bg-success/10 border-b border-success/20 text-success text-xs font-semibold flex items-center space-x-2 shrink-0 animate-in slide-in-from-top-2 duration-150">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{addedFeedback}</span>
          </div>
        )}

        {/* BODY SCROLL AREA */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* SEARCH & CONTROL BAR (Screen 8 Reference) */}
          <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search activities, places, experiences..."
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-xs font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[42px]"
              />
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                className="px-3 py-2 bg-background border border-border text-foreground text-xs font-medium rounded-xl flex items-center space-x-1 hover:border-primary/40 transition-colors min-h-[42px]"
              >
                <Layers className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Group by</span>
              </button>
              <button
                type="button"
                className="px-3 py-2 bg-background border border-border text-foreground text-xs font-medium rounded-xl flex items-center space-x-1 hover:border-primary/40 transition-colors min-h-[42px]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Filter</span>
              </button>
              <button
                type="button"
                className="px-3 py-2 bg-background border border-border text-foreground text-xs font-medium rounded-xl flex items-center space-x-1 hover:border-primary/40 transition-colors min-h-[42px]"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Sort by</span>
              </button>
            </div>
          </div>

          {/* CATEGORY PILLS */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors whitespace-nowrap min-h-[36px] ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ACTIVITIES RESULTS LIST (Screen 8 Reference: Option and its details) */}
          <div className="space-y-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((act) => {
                const isAdded = addedActivityIds.includes(act.id);
                return (
                  <div
                    key={act.id}
                    className="bg-background border border-border hover:border-primary/40 rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                      {/* Photo */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                        <Image
                          src={act.image}
                          alt={act.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                        <div className="absolute top-1 left-1 bg-surface/90 backdrop-blur-xs px-1.5 py-0.5 rounded-full text-[9px] font-semibold text-foreground flex items-center space-x-0.5 border border-border">
                          <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                          <span>{act.rating}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md">
                            {act.category}
                          </span>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-travel-accent shrink-0" />
                            {act.city}, {act.country}
                          </span>
                        </div>

                        <h4 className="font-heading font-bold text-sm sm:text-base text-foreground line-clamp-1">
                          {act.title}
                        </h4>

                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {act.description}
                        </p>

                        <div className="flex items-center space-x-4 text-xs text-muted-foreground pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-primary" /> {act.duration}
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-foreground">
                            <DollarSign className="w-3 h-3 text-travel-accent" /> {act.cost}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-border/60 pt-2 sm:pt-0">
                      <button
                        type="button"
                        onClick={() => handleSelectActivity(act)}
                        className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold transition-all inline-flex items-center justify-center space-x-1.5 min-h-[40px] cursor-pointer ${
                          isAdded
                            ? "bg-success/15 text-success border border-success/30"
                            : "bg-primary text-primary-foreground hover:bg-primary-dark shadow-2xs"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Day {dayNumber}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Itinerary</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">No activities found</p>
                <p>Try searching for &quot;Eiffel Tower&quot;, &quot;Cooking&quot;, or &quot;Colosseum&quot;.</p>
              </div>
            )}
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-border bg-surface flex justify-between items-center shrink-0">
          <span className="text-xs text-muted-foreground font-medium">
            Showing {filteredActivities.length} available experiences
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-primary text-primary-foreground hover:bg-primary-dark font-medium rounded-xl text-xs transition-colors min-h-[40px]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
