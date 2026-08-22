import React from "react";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Destination } from "@/features/destinations/mockData";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="group bg-surface border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col justify-between min-w-[260px] sm:min-w-[280px]">
      {/* Photo Header */}
      <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-muted">
        <Image
          src={destination.imageUrl}
          alt={destination.city}
          fill
          sizes="(max-width: 768px) 280px, 320px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-foreground flex items-center space-x-1 border border-border">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span>{destination.rating}</span>
        </div>

        {/* Tag Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-primary/90 text-primary-foreground text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-md">
            {destination.tag}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <h4 className="font-heading font-semibold text-base text-foreground group-hover:text-primary transition-colors">
            {destination.city}
          </h4>
          <div className="flex items-center text-xs text-muted-foreground mt-0.5 space-x-1">
            <MapPin className="w-3 h-3 text-travel-accent shrink-0" />
            <span>{destination.country}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
          <span className="text-muted-foreground">Est. Cost</span>
          <span className="font-semibold text-primary">{destination.averageCostPerDay}</span>
        </div>
      </div>
    </div>
  );
}
