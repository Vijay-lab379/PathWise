import { createClient } from "@/lib/supabase/server";

export async function verifyTripOwnership(
  supabase: Awaited<ReturnType<typeof createClient>>,
  tripId: string,
  userId: string
) {
  const { data: trip, error } = await supabase
    .from("trips")
    .select("id, owner_id, budget, currency")
    .eq("id", tripId)
    .maybeSingle();

  if (error) return { trip: null, error };
  if (!trip) return { trip: null, error: new Error("NOT_FOUND") };
  if (trip.owner_id !== userId) return { trip: null, error: new Error("FORBIDDEN") };

  return { trip, error: null };
}

export async function verifyTripStop(
  supabase: Awaited<ReturnType<typeof createClient>>,
  tripId: string,
  stopId: string
) {
  return supabase
    .from("trip_stops")
    .select("id")
    .eq("id", stopId)
    .eq("trip_id", tripId)
    .maybeSingle();
}