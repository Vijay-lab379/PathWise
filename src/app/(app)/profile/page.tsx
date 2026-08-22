"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Edit3,
  Check,
  LogOut,
  Settings,
  ArrowRight,
} from "lucide-react";
import { MOCK_TRIPS } from "@/features/trips/mockData";
import { ROUTES } from "@/constants/routes";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@pathwise.app",
    location: "San Francisco, USA",
    travelStyle: "Culture & Culinary Enthusiast",
    bio: "Passionate traveler discovering historic cities, authentic food markets, and mountain trails across Europe and Asia.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  });

  const [editForm, setEditForm] = useState({ ...profile });
  const [logOutModalOpen, setLogOutModalOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  // Group trips into Preplanned & Previous (Screen 7 Reference)
  const preplannedTrips = MOCK_TRIPS.filter((t) => t.status === "upcoming" || t.status === "ongoing");
  const previousTrips = MOCK_TRIPS.filter((t) => t.status === "completed");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setIsEditing(false);
  };

  if (loggedOut) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <LogOut className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-foreground">Logged Out Successfully</h2>
        <p className="text-xs text-muted-foreground">You have been signed out of your Pathwise account.</p>
        <Link
          href={ROUTES.LOGIN}
          className="inline-flex px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-xs"
        >
          Sign Back In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
            User Profile & Account
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal travel preferences and view your planned itineraries
          </p>
        </div>
      </div>

      {/* TOP USER DETAILS SECTION (Screen 7 Reference: Image + User Details with edit option) */}
      <section className="bg-surface border border-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
            {/* Avatar Image (Screen 7 Reference) */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-primary/20 bg-muted">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
                {profile.name}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-primary" /> {profile.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-travel-accent" /> {profile.location}
                </span>
              </div>
              <span className="inline-block mt-1 bg-primary/10 text-primary px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                {profile.travelStyle}
              </span>
            </div>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => {
                setEditForm({ ...profile });
                setIsEditing(true);
              }}
              className="px-4 py-2.5 bg-background border border-border hover:border-primary/40 text-foreground font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-2xs min-h-[44px] self-start sm:self-auto cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-primary" />
              <span>Edit Details</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-2 border border-border hover:bg-muted font-medium rounded-xl text-xs transition-colors min-h-[40px]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* User Information Display or Edit Form */}
        {!isEditing ? (
          <div className="space-y-3 pt-2">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground">
              Travel Bio & Preferences
            </h3>
            <p className="text-sm text-foreground/90 font-sans leading-relaxed max-w-2xl">
              {profile.bio}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Location / City
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Travel Preference Tag
                </label>
                <input
                  type="text"
                  value={editForm.travelStyle}
                  onChange={(e) => setEditForm({ ...editForm, travelStyle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Travel Bio
              </label>
              <textarea
                rows={3}
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 border border-border hover:bg-muted font-medium rounded-xl text-xs transition-colors min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-xl text-xs transition-colors inline-flex items-center space-x-1.5 min-h-[44px]"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}
      </section>

      {/* PREPLANNED TRIPS SECTION (Screen 7 Reference: Preplanned Trips with View buttons) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl text-foreground">
            Preplanned Trips ({preplannedTrips.length})
          </h2>
          <span className="text-xs text-muted-foreground font-medium">Upcoming & Ongoing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {preplannedTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-surface border border-border rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3 hover:border-primary/40 transition-colors"
            >
              <div className="relative h-36 w-full rounded-xl overflow-hidden bg-muted">
                <Image
                  src={trip.imageUrl}
                  alt={trip.title}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 bg-surface/90 backdrop-blur-xs text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-border">
                  {trip.status}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-heading font-bold text-base text-foreground line-clamp-1">
                  {trip.title}
                </h3>
                <p className="text-xs text-muted-foreground">{trip.startDate} – {trip.endDate}</p>
              </div>

              {/* View Button (Screen 7 Reference) */}
              <Link
                href={ROUTES.TRIP_DETAILS(trip.id)}
                className="w-full py-2 bg-background hover:bg-muted border border-border text-foreground font-semibold rounded-xl text-xs flex items-center justify-center space-x-1 transition-colors min-h-[38px]"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* PREVIOUS TRIPS SECTION (Screen 7 Reference: Previous Trips with View buttons) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-xl text-foreground">
            Previous Trips ({previousTrips.length})
          </h2>
          <span className="text-xs text-muted-foreground font-medium">Completed Journeys</span>
        </div>

        {previousTrips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {previousTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-surface border border-border rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3 hover:border-primary/40 transition-colors opacity-90 hover:opacity-100"
              >
                <div className="relative h-36 w-full rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={trip.imageUrl}
                    alt={trip.title}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-surface/90 backdrop-blur-xs text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-border">
                    {trip.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-base text-foreground line-clamp-1">
                    {trip.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{trip.startDate} – {trip.endDate}</p>
                </div>

                {/* View Button (Screen 7 Reference) */}
                <Link
                  href={ROUTES.SHARE(trip.id)}
                  className="w-full py-2 bg-background hover:bg-muted border border-border text-foreground font-semibold rounded-xl text-xs flex items-center justify-center space-x-1 transition-colors min-h-[38px]"
                >
                  <span>View Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-surface border border-dashed border-border rounded-2xl text-center text-xs text-muted-foreground">
            No completed previous trips yet.
          </div>
        )}
      </section>

      {/* SETTINGS & ACCOUNT MANAGEMENT STRIP */}
      <section className="bg-surface border border-border rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-border pb-3">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-lg text-foreground">
            Account Preferences & Options
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-foreground block">Sign Out of Pathwise</span>
            <span className="text-xs text-muted-foreground">
              Sign out of your active session on this device
            </span>
          </div>

          <button
            type="button"
            onClick={() => setLogOutModalOpen(true)}
            className="px-4 py-2.5 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[44px] cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* LOG OUT CONFIRMATION MODAL */}
      {logOutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-lg text-foreground">
                Confirm Sign Out
              </h3>
              <p className="text-xs text-muted-foreground">
                Are you sure you want to sign out of Pathwise? You can sign back in anytime.
              </p>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setLogOutModalOpen(false)}
                className="px-4 py-2 bg-background border border-border hover:bg-muted font-medium rounded-xl text-xs transition-colors min-h-[40px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setLogOutModalOpen(false);
                  setLoggedOut(true);
                }}
                className="px-4 py-2 bg-destructive text-destructive-foreground font-semibold rounded-xl text-xs hover:bg-destructive/90 transition-colors min-h-[40px]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
