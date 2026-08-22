"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  Compass,
  Check,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { MOCK_DESTINATIONS } from "@/features/destinations/mockData";

export default function NewTripPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [tripName, setTripName] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(["Kyoto, Japan"]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    "Arashiyama Bamboo Grove Walk",
  ]);

  // Status States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Suggested Activities for Step 2/3 (Screen 4 Wireframe)
  const SUGGESTIONS = [
    {
      id: "sug-1",
      title: "Arashiyama Bamboo Grove Walk",
      place: "Kyoto, Japan",
      category: "Nature & Culture",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "sug-2",
      title: "Path of the Gods Cliffside Hike",
      place: "Amalfi Coast, Italy",
      category: "Scenic Trail",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "sug-3",
      title: "Jungfraujoch Top of Europe Express",
      place: "Swiss Alps, Switzerland",
      category: "Alpine Adventure",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "sug-4",
      title: "Oia Sunset & Caldera Cruise",
      place: "Santorini, Greece",
      category: "Coastal Sunset",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80",
    },
  ];

  // Destination Add/Remove
  const handleAddDestination = (destName: string) => {
    if (!destName.trim()) return;
    if (!selectedDestinations.includes(destName)) {
      setSelectedDestinations([...selectedDestinations, destName]);
    }
    setSelectedPlace("");
    if (errors.destinations) {
      setErrors((prev) => ({ ...prev, destinations: "" }));
    }
  };

  const handleRemoveDestination = (destName: string) => {
    setSelectedDestinations(selectedDestinations.filter((d) => d !== destName));
  };

  const toggleActivity = (title: string) => {
    if (selectedActivities.includes(title)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== title));
    } else {
      setSelectedActivities([...selectedActivities, title]);
    }
  };

  // Validation per step
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!tripName.trim()) {
      newErrors.tripName = "Trip name is required";
    }
    if (selectedDestinations.length === 0 && !selectedPlace.trim()) {
      newErrors.destinations = "Please select or add at least one destination";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!endDate) {
      newErrors.endDate = "End date is required";
    } else if (startDate && new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = "End date must be on or after start date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (selectedPlace.trim()) {
      handleAddDestination(selectedPlace);
    }

    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  // Submit flow
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(ROUTES.TRIPS);
      }, 1200);
    }, 1200);
  };

  // Duration calculation
  const calculateDuration = () => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : null;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* HEADER & BACK BUTTON */}
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.TRIPS}
          className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to My Trips
        </Link>
        <span className="text-xs text-muted-foreground font-medium">
          Step {currentStep} of 3
        </span>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="bg-surface border border-border rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between">
          {/* Step 1 */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-colors ${
                currentStep >= 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <span className="text-xs font-semibold hidden sm:inline text-foreground">
              Trip Essentials
            </span>
          </div>
          <div
            className={`flex-1 h-0.5 mx-3 transition-colors ${
              currentStep >= 2 ? "bg-primary" : "bg-border"
            }`}
          />

          {/* Step 2 */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-colors ${
                currentStep >= 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className="text-xs font-semibold hidden sm:inline text-foreground">
              Dates & Places
            </span>
          </div>
          <div
            className={`flex-1 h-0.5 mx-3 transition-colors ${
              currentStep >= 3 ? "bg-primary" : "bg-border"
            }`}
          />

          {/* Step 3 */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-colors ${
                currentStep === 3
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <span className="text-xs font-semibold hidden sm:inline text-foreground">
              Review & Create
            </span>
          </div>
        </div>
      </div>

      {/* SUCCESS NOTIFICATION */}
      {success && (
        <div className="p-4 bg-success/10 border border-success/30 rounded-2xl flex items-center space-x-3 text-sm text-success font-medium">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Trip created successfully! Redirecting to your trips...</span>
        </div>
      )}

      {/* FORM WRAPPER */}
      <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* STEP 1: TRIP ESSENTIALS */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
                Plan a new trip
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Give your adventure a title and select your primary destinations.
              </p>
            </div>

            {/* Trip Name Input */}
            <div>
              <label htmlFor="tripName" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Trip Name *
              </label>
              <input
                id="tripName"
                type="text"
                value={tripName}
                onChange={(e) => {
                  setTripName(e.target.value);
                  if (errors.tripName) setErrors((prev) => ({ ...prev, tripName: "" }));
                }}
                placeholder="e.g. Autumn Heritage & Bamboo Groves"
                className={`w-full px-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  errors.tripName ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                }`}
              />
              {errors.tripName && (
                <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.tripName}
                </p>
              )}
            </div>

            {/* Select a Place Input (Screen 4 Wireframe: Select a Place) */}
            <div>
              <label htmlFor="selectedPlace" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Select a Place / Destination *
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-travel-accent" />
                  <input
                    id="selectedPlace"
                    type="text"
                    value={selectedPlace}
                    onChange={(e) => setSelectedPlace(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddDestination(selectedPlace);
                      }
                    }}
                    placeholder="Type city or country (e.g. Kyoto, Japan) and press Add"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleAddDestination(selectedPlace)}
                  className="px-4 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl text-xs transition-colors min-h-[44px]"
                >
                  Add
                </button>
              </div>

              {/* Selected Places Tags */}
              {selectedDestinations.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedDestinations.map((dest) => (
                    <span
                      key={dest}
                      className="inline-flex items-center space-x-1.5 bg-warm-sand/80 text-foreground border border-border px-3 py-1.5 rounded-full text-xs font-medium"
                    >
                      <MapPin className="w-3.5 h-3.5 text-travel-accent" />
                      <span>{dest}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDestination(dest)}
                        aria-label={`Remove ${dest}`}
                        className="p-0.5 hover:bg-black/10 rounded-full transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {errors.destinations && (
                <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.destinations}
                </p>
              )}

              {/* Quick Destination Pickers */}
              <div className="mt-3">
                <span className="text-[11px] text-muted-foreground font-medium block mb-2">
                  Popular destinations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {MOCK_DESTINATIONS.slice(0, 4).map((d) => {
                    const label = `${d.city}, ${d.country}`;
                    const isSelected = selectedDestinations.includes(label);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() =>
                          isSelected
                            ? handleRemoveDestination(label)
                            : handleAddDestination(label)
                        }
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-colors flex items-center space-x-1.5 min-h-[36px] ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border hover:border-primary/40"
                        }`}
                      >
                        <span>{label}</span>
                        {isSelected && <Check className="w-3 h-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                Trip Description & Notes
              </label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Notes about this trip, who is going, or main goals..."
                className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm font-sans text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>
          </div>
        )}

        {/* STEP 2: DATES & SUGGESTIONS */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
                Trip Dates & Activity Suggestions
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Select your travel window and pick activities to include in your itinerary.
              </p>
            </div>

            {/* Date Inputs (Screen 4 Wireframe: Start Date, End Date) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Start Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      if (errors.startDate) setErrors((prev) => ({ ...prev, startDate: "" }));
                    }}
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      errors.startDate ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                </div>
                {errors.startDate && (
                  <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="endDate" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  End Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      if (errors.endDate) setErrors((prev) => ({ ...prev, endDate: "" }));
                    }}
                    className={`w-full pl-10 pr-3.5 py-2.5 bg-background border rounded-xl text-sm font-sans text-foreground transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                      errors.endDate ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                </div>
                {errors.endDate && (
                  <p className="mt-1 text-xs text-destructive flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.endDate}
                  </p>
                )}
              </div>
            </div>

            {/* Calculated Duration Banner */}
            {calculateDuration() !== null && (
              <div className="p-3.5 bg-warm-sand/60 border border-border rounded-xl flex items-center justify-between text-xs text-foreground font-medium">
                <span>Total Duration:</span>
                <span className="font-bold text-primary">{calculateDuration()} Days</span>
              </div>
            )}

            {/* SUGGESTION FOR PLACES TO VISIT/ACTIVITIES (Screen 4 Wireframe) */}
            <div className="pt-2 border-t border-border">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-travel-accent" />
                <h3 className="font-heading font-semibold text-base text-foreground">
                  Suggestion for Places to Visit / Activities to perform
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SUGGESTIONS.map((sug) => {
                  const isSelected = selectedActivities.includes(sug.title);
                  return (
                    <div
                      key={sug.id}
                      onClick={() => toggleActivity(sug.title)}
                      className={`p-3 border rounded-xl flex items-center space-x-3 cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/5 border-primary shadow-xs"
                          : "bg-background border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted">
                        <Image src={sug.image} alt={sug.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-semibold text-primary tracking-wider block">
                          {sug.category}
                        </span>
                        <h4 className="font-heading font-semibold text-xs text-foreground truncate">
                          {sug.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground truncate">{sug.place}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected ? "bg-primary border-primary text-primary-foreground" : "border-border bg-surface"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & CONFIRM */}
        {currentStep === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
                Review & Confirm Trip
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Please review your trip details before finalizing your creation.
              </p>
            </div>

            {/* Trip Preview Summary Card */}
            <div className="bg-background border border-border rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-travel-accent tracking-wider">
                    Trip Overview
                  </span>
                  <h3 className="font-heading font-bold text-lg text-foreground mt-0.5">
                    {tripName || "Untitled Adventure"}
                  </h3>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  {calculateDuration() || 1} Days
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground font-medium block">Destinations:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedDestinations.map((d) => (
                      <span key={d} className="bg-surface border border-border px-2.5 py-1 rounded-md font-medium text-foreground">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-muted-foreground font-medium block">Travel Window:</span>
                  <p className="font-semibold text-foreground mt-1">
                    {startDate ? new Date(startDate).toLocaleDateString() : "TBD"} –{" "}
                    {endDate ? new Date(endDate).toLocaleDateString() : "TBD"}
                  </p>
                </div>
              </div>

              {description && (
                <div className="pt-2 border-t border-border/60 text-xs">
                  <span className="text-muted-foreground font-medium block">Notes:</span>
                  <p className="text-foreground mt-0.5">{description}</p>
                </div>
              )}

              {selectedActivities.length > 0 && (
                <div className="pt-2 border-t border-border/60 text-xs">
                  <span className="text-muted-foreground font-medium block">
                    Included Activities ({selectedActivities.length}):
                  </span>
                  <ul className="mt-1.5 space-y-1 text-foreground">
                    {selectedActivities.map((act) => (
                      <li key={act} className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Final Action Button: Create Trip */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3.5 px-6 bg-primary hover:bg-primary-dark text-primary-foreground font-bold rounded-xl text-sm transition-colors duration-150 flex items-center justify-center min-h-[48px] shadow-sm cursor-pointer disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-primary"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Trip...
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4 mr-2" />
                    Create Trip
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP CONTROLS (Back / Continue) */}
        {!success && (
          <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2.5 border border-border hover:bg-muted text-foreground font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 && (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground font-medium rounded-xl text-xs flex items-center space-x-1.5 transition-colors min-h-[44px]"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
