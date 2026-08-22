"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Layers,
  MapPin,
  Clock,
  DollarSign,
  Plus,
  ArrowLeft,
  X,
  Compass,
} from "lucide-react";
import { MOCK_TRIPS } from "@/features/trips/mockData";
import { MOCK_ITINERARY_SECTIONS, ItineraryActivity } from "@/features/itinerary/mockData";
import { TripNavTabs } from "@/components/trips/TripNavTabs";
import { ActivityDiscoveryModal } from "@/components/itinerary/ActivityDiscoveryModal";
import { ROUTES } from "@/constants/routes";

interface CalendarPageProps {
  params: Promise<{ tripId: string }>;
}

export default function TripCalendarPage({ params }: CalendarPageProps) {
  const { tripId } = use(params);
  const trip = MOCK_TRIPS.find((t) => t.id === tripId) || MOCK_TRIPS[0];

  // Calendar State
  const currentMonth = "October 2026";
  const [selectedDay, setSelectedDay] = useState<number>(13); // Default Day 2 (Oct 13)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<ItineraryActivity | null>(null);
  const [discoveryModalOpen, setDiscoveryModalOpen] = useState(false);

  // Map dates of October 2026 to itinerary activities
  const [dateActivitiesMap, setDateActivitiesMap] = useState<
    Record<number, { city: string; activities: ItineraryActivity[] }>
  >({
    12: {
      city: "Kyoto",
      activities: MOCK_ITINERARY_SECTIONS[0].days[0].activities,
    },
    13: {
      city: "Kyoto",
      activities: MOCK_ITINERARY_SECTIONS[0].days[1].activities,
    },
    14: {
      city: "Kyoto",
      activities: [],
    },
    17: {
      city: "Osaka",
      activities: MOCK_ITINERARY_SECTIONS[1].days[0].activities,
    },
    20: {
      city: "Nara",
      activities: MOCK_ITINERARY_SECTIONS[2].days[0].activities,
    },
  });

  // October 2026 starts on a Thursday (day offset = 4)
  const daysInMonth = 31;
  const startOffset = 4; // Thursday

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNum = i - startOffset + 1;
    if (dayNum > 0 && dayNum <= daysInMonth) {
      return dayNum;
    }
    return null;
  });

  const selectedDateData = dateActivitiesMap[selectedDay] || {
    city: selectedDay >= 12 && selectedDay <= 16 ? "Kyoto" : selectedDay >= 17 && selectedDay <= 19 ? "Osaka" : selectedDay >= 20 && selectedDay <= 22 ? "Nara" : "Japan",
    activities: [],
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* BACK TO TRIPS LINK */}
      <div>
        <Link
          href={ROUTES.TRIP_DETAILS(tripId)}
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Trip Overview
        </Link>
      </div>

      {/* COMPACT TRIP HEADER CONTEXT */}
      <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
            <MapPin className="w-3.5 h-3.5 text-travel-accent" />
            <span>{trip.destination}, {trip.country}</span>
            <span>•</span>
            <CalendarIcon className="w-3.5 h-3.5 text-primary" />
            <span>{trip.startDate} – {trip.endDate}</span>
          </div>
          <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
            Trip Calendar & Timeline
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setDiscoveryModalOpen(true)}
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs min-h-[44px] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Activity to Day</span>
        </button>
      </div>

      {/* TRIP SECTION NAVIGATION TABS */}
      <TripNavTabs tripId={trip.id} />

      {/* SEARCH BAR & CONTROLS (Screen 11 Reference: Search bar, Group by, Filter, Sort by) */}
      <section className="bg-surface p-4 border border-border rounded-2xl shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activities on calendar (e.g. Bamboo Grove, Kaiseki, Temple)..."
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
            className="px-3.5 py-2 bg-background border border-border text-foreground text-xs font-medium rounded-xl flex items-center space-x-1 hover:border-primary/40 transition-colors min-h-[42px]"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Sort by</span>
          </button>
        </div>
      </section>

      {/* MAIN CALENDAR GRID & AGENDA SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT 2 COLUMNS: CALENDAR GRID (Screen 11 Reference) */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-4">
          {/* Calendar Header Month Control */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="font-heading font-bold text-lg text-foreground">
              {currentMonth}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                aria-label="Previous Month"
                className="p-2 border border-border rounded-xl hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button
                type="button"
                aria-label="Next Month"
                className="p-2 border border-border rounded-xl hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center font-heading font-semibold text-xs text-muted-foreground uppercase pb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* 7x6 Calendar Dates Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarDays.map((dayNum, idx) => {
              if (!dayNum) {
                return (
                  <div key={idx} className="h-20 sm:h-24 bg-muted/20 rounded-xl border border-transparent" />
                );
              }

              const isTripDay = dayNum >= 12 && dayNum <= 22;
              const isSelected = selectedDay === dayNum;
              const dayData = dateActivitiesMap[dayNum];
              const hasActivities = dayData && dayData.activities.length > 0;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDay(dayNum)}
                  className={`h-20 sm:h-24 p-1.5 sm:p-2 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                      : isTripDay
                      ? "border-primary/30 bg-primary/5 hover:border-primary/60"
                      : "border-border/60 bg-background hover:border-border"
                  }`}
                >
                  {/* Date Number & City Tag */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-heading font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {dayNum}
                    </span>

                    {isTripDay && (
                      <span className="text-[9px] font-semibold text-primary uppercase tracking-tighter hidden sm:inline">
                        {dayNum <= 16 ? "Kyoto" : dayNum <= 19 ? "Osaka" : "Nara"}
                      </span>
                    )}
                  </div>

                  {/* Activity Chip Preview */}
                  {hasActivities ? (
                    <div className="space-y-1">
                      {dayData.activities.slice(0, 2).map((act) => (
                        <div
                          key={act.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedActivity(act);
                          }}
                          className="bg-surface border border-primary/30 hover:border-primary px-1.5 py-0.5 rounded-md text-[10px] font-medium text-foreground truncate shadow-2xs"
                        >
                          {act.title}
                        </div>
                      ))}
                      {dayData.activities.length > 2 && (
                        <span className="text-[9px] font-semibold text-primary block">
                          +{dayData.activities.length - 2} more
                        </span>
                      )}
                    </div>
                  ) : isTripDay ? (
                    <span className="text-[9px] text-muted-foreground/60 italic block">
                      Open day
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SELECTED DAY AGENDA SIDEBAR */}
        <div className="space-y-6">
          <section className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                  Schedule Details
                </span>
                <h3 className="font-heading font-bold text-base text-foreground">
                  October {selectedDay}, 2026 ({selectedDateData.city})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDiscoveryModalOpen(true)}
                className="p-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                title="Add Activity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Activities Scheduled for Selected Day */}
            {selectedDateData.activities.length > 0 ? (
              <div className="space-y-3">
                {selectedDateData.activities.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => setSelectedActivity(act)}
                    className="p-3.5 bg-background border border-border rounded-xl hover:border-primary/40 transition-colors shadow-2xs space-y-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-primary font-heading">
                        {act.time}
                      </span>
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase">
                        {act.category}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-sm text-foreground">
                      {act.title}
                    </h4>

                    <div className="flex items-center space-x-3 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" /> {act.duration}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-foreground">
                        <DollarSign className="w-3 h-3 text-travel-accent" /> {act.cost}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Concise Empty State */
              <div className="p-6 border border-dashed border-border rounded-xl text-center space-y-3">
                <Compass className="w-8 h-8 text-muted-foreground/60 mx-auto" />
                <div>
                  <p className="text-xs font-semibold text-foreground">No plans for this day yet.</p>
                  <p className="text-[11px] text-muted-foreground">Add experiences and places to make this day yours.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDiscoveryModalOpen(true)}
                  className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary-dark transition-colors inline-flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Activity</span>
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ACTIVITY DETAILS POPOVER / DIALOG */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-md font-semibold text-xs uppercase">
                {selectedActivity.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-bold text-xl text-foreground">
                {selectedActivity.title}
              </h3>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-semibold text-primary">
                  <Clock className="w-3.5 h-3.5" /> {selectedActivity.time} ({selectedActivity.duration})
                </span>
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <DollarSign className="w-3.5 h-3.5 text-travel-accent" /> {selectedActivity.cost}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-travel-accent" />
                <span>{selectedActivity.location}</span>
              </div>
            </div>

            <p className="text-xs text-foreground/80 leading-relaxed font-sans bg-background p-3.5 rounded-xl border border-border">
              {selectedActivity.description}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-xl text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISCOVERY MODAL FOR ADDING ACTIVITIES */}
      <ActivityDiscoveryModal
        isOpen={discoveryModalOpen}
        onClose={() => setDiscoveryModalOpen(false)}
        onAddActivity={(newAct) => {
          setDateActivitiesMap((prev) => {
            const current = prev[selectedDay] || { city: selectedDateData.city, activities: [] };
            return {
              ...prev,
              [selectedDay]: {
                ...current,
                activities: [...current.activities, newAct],
              },
            };
          });
        }}
        dayNumber={selectedDay}
        city={selectedDateData.city}
      />
    </div>
  );
}
