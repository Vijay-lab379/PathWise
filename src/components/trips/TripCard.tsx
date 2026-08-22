import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, DollarSign, Clock, ArrowRight } from "lucide-react";
import { DashboardTrip } from "@/features/trips/mockData";
import { ROUTES } from "@/constants/routes";

interface TripCardProps {
  trip: DashboardTrip;
}

export function TripCard({ trip }: TripCardProps) {
  const getBadgeStyle = (status: DashboardTrip["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-primary text-primary-foreground";
      case "ongoing":
        return "bg-travel-accent text-white";
      case "completed":
        return "bg-surface/95 text-foreground border border-border backdrop-blur-xs";
      default:
        return "bg-surface/90 text-foreground";
    }
  };

  return (
    <div className="group bg-surface border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
      {/* Top Photography Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-muted">
        <Image
          src={trip.imageUrl}
          alt={trip.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getBadgeStyle(
              trip.status
            )}`}
          >
            {trip.status}
          </span>
        </div>

        {/* Destination Tag */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center text-xs font-medium text-white/80 space-x-1">
            <MapPin className="w-3.5 h-3.5 text-travel-accent shrink-0" />
            <span>
              {trip.destination}, {trip.country}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {trip.title}
          </h3>

          {/* Metadata Grid */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{trip.startDate}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>
                {trip.durationDays} Days ({trip.cityCount} Cities)
              </span>
            </div>
            <div className="flex items-center space-x-1.5 col-span-2 mt-1">
              <DollarSign className="w-3.5 h-3.5 text-travel-accent shrink-0" />
              <span className="font-medium text-foreground">
                Budget: {trip.budgetTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-border/60">
          <Link
            href={ROUTES.TRIP_DETAILS(trip.id)}
            className="w-full py-2.5 px-4 bg-soft-blue hover:bg-primary hover:text-primary-foreground text-primary font-semibold rounded-xl text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center min-h-[44px] focus-visible:outline-2 focus-visible:outline-primary border border-primary/15"
          >
            <span>View Trip Details</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
