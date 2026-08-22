"use client";

import React, { useState } from "react";
import {
  Clock,
  MapPin,
  DollarSign,
  ChevronUp,
  ChevronDown,
  Trash2,
  Edit2,
  ChevronRight,
  Utensils,
  Landmark,
  Building,
  Compass,
  Bus,
  ShoppingBag,
} from "lucide-react";
import { ItineraryActivity } from "@/features/itinerary/mockData";

interface ActivityCardProps {
  activity: ItineraryActivity;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const categoryIcons = {
  Food: Utensils,
  Culture: Landmark,
  Sightseeing: Compass,
  Hotel: Building,
  Transport: Bus,
  Shopping: ShoppingBag,
};

export function ActivityCard({
  activity,
  onMoveUp,
  onMoveDown,
  onDelete,
  onEdit,
  isFirst = false,
  isLast = false,
}: ActivityCardProps) {
  const [expanded, setExpanded] = useState(false);
  const CategoryIcon = categoryIcons[activity.category] || Compass;

  return (
    <div className="relative flex items-start space-x-3 group">
      {/* Timeline Bullet Dot & Vertical Line */}
      <div className="flex flex-col items-center shrink-0 self-stretch pt-1">
        <div className="w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/10 z-10 group-hover:ring-primary/20 transition-all" />
        {!isLast && <div className="w-0.5 flex-1 bg-border/80 my-1" />}
      </div>

      {/* Main Card Content */}
      <div className="flex-1 bg-surface border border-border hover:border-primary/40 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all space-y-2 mb-4">
        {/* Top Header Row: Time, Title, Category Badge */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-primary font-heading tracking-wide">
                {activity.time}
              </span>
              <span className="text-[10px] uppercase font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                <CategoryIcon className="w-3 h-3" />
                {activity.category}
              </span>
            </div>
            <h4 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors">
              {activity.title}
            </h4>
          </div>

          {/* Action Controls */}
          <div className="flex items-center space-x-1 opacity-90 group-hover:opacity-100 transition-opacity">
            {onMoveUp && (
              <button
                type="button"
                disabled={isFirst}
                onClick={onMoveUp}
                title="Move Activity Up"
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 rounded-md transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
            {onMoveDown && (
              <button
                type="button"
                disabled={isLast}
                onClick={onMoveDown}
                title="Move Activity Down"
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 rounded-md transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
            {onEdit && (
              <button
                type="button"
                onClick={onEdit}
                title="Edit Activity"
                className="p-1 text-muted-foreground hover:text-primary rounded-md transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                title="Delete Activity"
                className="p-1 text-muted-foreground hover:text-destructive rounded-md transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Metadata Strip: Duration, Cost, Location */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-3.5 h-3.5 text-travel-accent shrink-0" />
            <span className="font-semibold text-foreground">{activity.cost}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-travel-accent shrink-0" />
            <span className="truncate max-w-[200px]">{activity.location}</span>
          </div>
        </div>

        {/* Expandable Details */}
        {activity.description && (
          <div className="pt-2 border-t border-border/60">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center"
            >
              <span>{expanded ? "Hide Details" : "View Details"}</span>
              <ChevronRight
                className={`w-3.5 h-3.5 ml-0.5 transition-transform ${
                  expanded ? "rotate-90" : ""
                }`}
              />
            </button>

            {expanded && (
              <p className="mt-2 text-xs text-foreground/80 leading-relaxed font-sans bg-background p-3 rounded-xl border border-border/80">
                {activity.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
