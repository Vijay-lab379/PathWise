"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Heart,
  Bookmark,
  ArrowRight,
  Building2,
} from "lucide-react";
import { CommunityTrip } from "@/features/community/mockData";
import { ROUTES } from "@/constants/routes";

interface CommunityTripCardProps {
  trip: CommunityTrip;
}

export function CommunityTripCard({ trip }: CommunityTripCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(trip.likesCount);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  return (
    <div className="group bg-surface border border-border hover:border-primary/40 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all space-y-4">
      {/* Creator Header Row (Screen 10 Reference: Left Avatar Circle + Details) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Avatar Circle */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-primary/20 bg-muted">
            <Image
              src={trip.creatorAvatar}
              alt={trip.creatorName}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-primary transition-colors">
              {trip.creatorName}
            </h4>
            <span className="text-xs text-muted-foreground">{trip.creatorHandle}</span>
          </div>
        </div>

        <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
          {trip.category}
        </span>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
        {/* Cover Photo */}
        <div className="relative w-full md:w-64 h-48 md:h-40 rounded-2xl overflow-hidden shrink-0 bg-muted">
          <Image
            src={trip.coverImage}
            alt={trip.title}
            fill
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 bg-surface/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-foreground border border-border flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-travel-accent" />
            <span>{trip.country}</span>
          </div>
        </div>

        {/* Details & Description */}
        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-medium text-foreground">
              <MapPin className="w-3.5 h-3.5 text-travel-accent shrink-0" />
              {trip.destination}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
              {trip.durationDays} Days
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
              {trip.cityCount} Cities
            </span>
          </div>

          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">
            {trip.title}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-2 font-sans">
            {trip.description}
          </p>

          <div className="text-[11px] font-semibold text-primary pt-1">
            {trip.datesLabel}
          </div>
        </div>
      </div>

      {/* Footer Actions Row */}
      <div className="pt-3 border-t border-border/80 flex items-center justify-between">
        {/* Like & Save stats */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={toggleLike}
            className={`flex items-center space-x-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              liked ? "text-destructive" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-destructive text-destructive" : ""}`} />
            <span>{likesCount}</span>
          </button>

          <div className="flex items-center space-x-1.5 text-xs font-medium text-muted-foreground">
            <Bookmark className="w-4 h-4" />
            <span>{trip.savesCount} saves</span>
          </div>
        </div>

        {/* View Trip Action */}
        <Link
          href={ROUTES.SHARE(trip.shareToken)}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs inline-flex items-center space-x-1.5 transition-colors shadow-2xs min-h-[40px]"
        >
          <span>View Story</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
