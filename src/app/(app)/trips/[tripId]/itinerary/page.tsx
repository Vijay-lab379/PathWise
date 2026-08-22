"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Plus,
  ArrowLeft,
  DollarSign,
  Layers,
} from "lucide-react";
import { MOCK_TRIPS } from "@/features/trips/mockData";
import {
  MOCK_ITINERARY_SECTIONS,
  ItinerarySection,
  ItineraryActivity,
} from "@/features/itinerary/mockData";
import { TripNavTabs } from "@/components/trips/TripNavTabs";
import { ActivityCard } from "@/components/itinerary/ActivityCard";
import { ActivityDiscoveryModal } from "@/components/itinerary/ActivityDiscoveryModal";
import { ROUTES } from "@/constants/routes";

interface PageProps {
  params: Promise<{ tripId: string }>;
}

export default function ItineraryBuilderPage({ params }: PageProps) {
  const { tripId } = use(params);
  const trip = MOCK_TRIPS.find((t) => t.id === tripId) || MOCK_TRIPS[0];

  // Local state for sections and activities
  const [sections, setSections] = useState<ItinerarySection[]>(MOCK_ITINERARY_SECTIONS);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);

  // Reorder Activity
  const handleMoveActivity = (
    sectionId: string,
    dayNumber: number,
    activityIndex: number,
    direction: "up" | "down"
  ) => {
    setSections((prevSections) =>
      prevSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          days: sec.days.map((d) => {
            if (d.dayNumber !== dayNumber) return d;
            const newActivities = [...d.activities];
            const targetIdx = direction === "up" ? activityIndex - 1 : activityIndex + 1;
            if (targetIdx < 0 || targetIdx >= newActivities.length) return d;

            const temp = newActivities[activityIndex];
            newActivities[activityIndex] = newActivities[targetIdx];
            newActivities[targetIdx] = temp;
            return { ...d, activities: newActivities };
          }),
        };
      })
    );
  };

  // Delete Activity
  const handleDeleteActivity = (sectionId: string, dayNumber: number, activityId: string) => {
    setSections((prevSections) =>
      prevSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          days: sec.days.map((d) => {
            if (d.dayNumber !== dayNumber) return d;
            return {
              ...d,
              activities: d.activities.filter((a) => a.id !== activityId),
            };
          }),
        };
      })
    );
  };

  // Add Activity Handler
  const handleAddActivity = (newAct: ItineraryActivity) => {
    setSections((prevSections) =>
      prevSections.map((sec) => {
        if (sec.id !== activeSectionId) return sec;
        return {
          ...sec,
          days: sec.days.map((d) => {
            if (d.dayNumber !== activeDayNumber) return d;
            return { ...d, activities: [...d.activities, newAct] };
          }),
        };
      })
    );
  };

  // Add New Section (Screen 5 Reference: + Add another Section)
  const handleAddSection = () => {
    const nextNum = sections.length + 1;
    const newSec: ItinerarySection = {
      id: `sec-${nextNum}`,
      sectionNumber: nextNum,
      title: `Section ${nextNum}: Tokyo Metropolitan & Culture Exploration`,
      description: "Explore modern district architecture, Meiji Shrine, and Shibuya Crossing.",
      dateRange: "Oct 22 to Oct 25, 2026",
      budget: "$1,100",
      city: "Tokyo",
      country: "Japan",
      days: [
        {
          dayNumber: 11,
          dateLabel: "Thursday, 22 October",
          activities: [
            {
              id: `act-sec${nextNum}-1`,
              time: "10:00 AM",
              title: "Meiji Jingu Shrine Morning Walk",
              category: "Culture",
              duration: "2 hours",
              cost: "Free",
              description: "Tranquil forest shrine walk in the heart of Shibuya.",
              location: "Shibuya, Tokyo",
            },
          ],
        },
      ],
    };
    setSections([...sections, newSec]);
  };

  const openAddModal = (secId: string, dayNum: number) => {
    setActiveSectionId(secId);
    setActiveDayNumber(dayNum);
    setModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
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
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{trip.startDate} – {trip.endDate}</span>
          </div>
          <h1 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
            Itinerary Builder: {trip.title}
          </h1>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={handleAddSection}
            className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-xs min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Section</span>
          </button>
        </div>
      </div>

      {/* TRIP SECTION NAVIGATION TABS */}
      <TripNavTabs tripId={trip.id} />

      {/* SECTIONS LISTING (Screen 5 Reference: Section 1, Section 2, Section 3) */}
      <div className="space-y-8">
        {sections.map((section) => (
          <section
            key={section.id}
            className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-6"
          >
            {/* Section Header (Screen 5 Reference: Section X Details) */}
            <div className="border-b border-border pb-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {section.sectionNumber}
                  </span>
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground">
                    Section {section.sectionNumber}: {section.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="bg-warm-sand/80 text-foreground border border-border px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-travel-accent" />
                    <span>{section.city}, {section.country}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground font-sans">
                {section.description}
              </p>

              {/* Wireframe Badges: Date Range & Budget */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="bg-background border border-border px-3.5 py-1.5 rounded-xl text-xs font-medium text-foreground flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>
                    <strong>Date Range:</strong> {section.dateRange}
                  </span>
                </div>

                <div className="bg-background border border-border px-3.5 py-1.5 rounded-xl text-xs font-medium text-foreground flex items-center space-x-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-travel-accent" />
                  <span>
                    <strong>Budget of this section:</strong> {section.budget}
                  </span>
                </div>
              </div>
            </div>

            {/* Days & Timeline */}
            <div className="space-y-6">
              {section.days.map((day) => (
                <div key={day.dayNumber} className="space-y-3">
                  {/* Day Header */}
                  <div className="flex items-center justify-between bg-muted/50 border border-border/80 px-4 py-2.5 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <span className="font-heading font-bold text-xs uppercase tracking-wider text-primary">
                        Day {day.dayNumber}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs font-medium text-foreground">
                        {day.dateLabel} ({section.city})
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => openAddModal(section.id, day.dayNumber)}
                      className="text-xs font-semibold text-primary hover:underline flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Activity</span>
                    </button>
                  </div>

                  {/* Scheduled Activities Timeline */}
                  {day.activities.length > 0 ? (
                    <div className="pl-2 sm:pl-4 pt-2">
                      {day.activities.map((act, actIdx) => (
                        <ActivityCard
                          key={act.id}
                          activity={act}
                          isFirst={actIdx === 0}
                          isLast={actIdx === day.activities.length - 1}
                          onMoveUp={() =>
                            handleMoveActivity(section.id, day.dayNumber, actIdx, "up")
                          }
                          onMoveDown={() =>
                            handleMoveActivity(section.id, day.dayNumber, actIdx, "down")
                          }
                          onDelete={() =>
                            handleDeleteActivity(section.id, day.dayNumber, act.id)
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    /* Empty Day Fallback */
                    <div className="p-4 bg-background border border-dashed border-border rounded-xl text-center space-y-2">
                      <p className="text-xs font-medium text-foreground">
                        Your day is still open.
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Add experiences, food, and places to make this day yours.
                      </p>
                      <button
                        type="button"
                        onClick={() => openAddModal(section.id, day.dayNumber)}
                        className="px-3.5 py-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg text-xs font-semibold transition-colors inline-flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Activity</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* BOTTOM ACTION: + Add another Section (Screen 5 Reference: + Add another Section) */}
      <div className="pt-4 text-center">
        <button
          type="button"
          onClick={handleAddSection}
          className="w-full py-4 bg-surface hover:bg-muted/50 border-2 border-dashed border-border hover:border-primary/40 text-foreground font-heading font-semibold rounded-2xl text-sm transition-all flex items-center justify-center space-x-2 min-h-[52px] shadow-2xs"
        >
          <Layers className="w-5 h-5 text-primary" />
          <span>+ Add another Section</span>
        </button>
      </div>

      {/* ACTIVITY DISCOVERY MODAL */}
      <ActivityDiscoveryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddActivity={handleAddActivity}
        dayNumber={activeDayNumber}
        city={sections.find((s) => s.id === activeSectionId)?.city || "Destination"}
      />
    </div>
  );
}
