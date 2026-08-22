"use client";

import React, { useState } from "react";
import { X, Plus, Sparkles } from "lucide-react";
import { ItineraryActivity } from "@/features/itinerary/mockData";

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddActivity: (activity: ItineraryActivity) => void;
  dayNumber: number;
  sectionTitle: string;
}

export function AddActivityModal({
  isOpen,
  onClose,
  onAddActivity,
  dayNumber,
  sectionTitle,
}: AddActivityModalProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [category, setCategory] = useState<ItineraryActivity["category"]>("Sightseeing");
  const [duration, setDuration] = useState("2 hours");
  const [cost, setCost] = useState("$25");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newActivity: ItineraryActivity = {
      id: `act-${Date.now()}`,
      time,
      title,
      category,
      duration,
      cost: cost || "Free",
      description,
      location: location || sectionTitle,
    };

    onAddActivity(newActivity);
    onClose();
    setTitle("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-2xl max-w-lg w-full p-6 shadow-lg space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-travel-accent" />
            <h3 className="font-heading font-bold text-lg text-foreground">
              Add Activity to Day {dayNumber}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 text-muted-foreground hover:text-foreground rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Activity Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Traditional Tea Ceremony"
              required
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground transition-colors min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ItineraryActivity["category"])}
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground transition-colors min-h-[44px]"
              >
                <option value="Sightseeing">Sightseeing</option>
                <option value="Food">Food</option>
                <option value="Culture">Culture</option>
                <option value="Hotel">Hotel</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="2 hours"
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground transition-colors min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Est. Cost
              </label>
              <input
                type="text"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="$25 or Free"
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground transition-colors min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Gion District, Kyoto"
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground transition-colors min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Description / Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, ticket links or meeting instructions..."
              className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-border flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-border hover:bg-muted font-medium rounded-xl text-xs transition-colors min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs transition-colors inline-flex items-center space-x-1.5 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Activity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
