import React from "react";
import Image from "next/image";
import { MapPin, Star, Plus, Check } from "lucide-react";
import { Destination } from "@/features/destinations/mockData";

interface CityCardProps {
  destination: Destination;
  isSelected?: boolean;
  onToggleSelect?: (destination: Destination) => void;
}

export function CityCard({
  destination,
  isSelected = false,
  onToggleSelect,
}: CityCardProps) {
  return (
    <div
      className={`group bg-surface border rounded-2xl overflow-hidden shadow-xs transition-all duration-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isSelected
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-border hover:border-primary/40 hover:shadow-md"
      }`}
    >
      {/* Left Photo & Main Details (Option and its details from Screen 8) */}
      <div className="flex items-start space-x-4 w-full sm:w-auto flex-1">
        {/* Photo Container */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-muted">
          <Image
            src={destination.imageUrl}
            alt={destination.city}
            fill
            sizes="112px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-1.5 left-1.5 bg-surface/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-semibold text-foreground flex items-center space-x-0.5 border border-border">
            <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
            <span>{destination.rating}</span>
          </div>
        </div>

        {/* Destination Information */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md">
              {destination.tag}
            </span>
            <span className="text-xs text-muted-foreground">{destination.region}</span>
          </div>

          <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {destination.city}
          </h3>

          <div className="flex items-center text-xs text-muted-foreground space-x-1">
            <MapPin className="w-3.5 h-3.5 text-travel-accent shrink-0" />
            <span>{destination.country}</span>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 pt-1 font-sans">
            {destination.description}
          </p>
        </div>
      </div>

      {/* Right Price & Add Action Button */}
      <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-border/60 pt-3 sm:pt-0 shrink-0 gap-2">
        <div className="text-left sm:text-right">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
            Est. Cost
          </span>
          <span className="font-heading font-bold text-sm text-primary">
            {destination.averageCostPerDay}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggleSelect && onToggleSelect(destination)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 min-h-[40px] cursor-pointer ${
            isSelected
              ? "bg-primary text-primary-foreground hover:bg-primary-dark"
              : "bg-background text-foreground border border-border hover:border-primary/40 hover:bg-muted/60"
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4" />
              <span>Selected</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 text-primary" />
              <span>Add to Trip</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
