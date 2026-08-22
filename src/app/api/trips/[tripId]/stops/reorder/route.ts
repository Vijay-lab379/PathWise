import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { reorderStopsSchema } from "@/lib/validations/trips";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiNotFound,
} from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

type Params = { params: Promise<{ tripId: string }> };

// PATCH /api/trips/[tripId]/stops/reorder
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { tripId } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return apiUnauthorized("Authentication required");
    }

    // Verify trip ownership
    const { data: trip, error: tripErr } = await supabase
      .from("trips")
      .select("id, owner_id")
      .eq("id", tripId)
      .maybeSingle();

    if (tripErr) return handleApiError(tripErr);
    if (!trip) return apiNotFound("Trip not found");
    if (trip.owner_id !== user.id) {
      return apiError("You do not have permission to reorder stops on this trip", 403, "FORBIDDEN");
    }

    const json = await req.json();
    const { orderedStopIds } = reorderStopsSchema.parse(json);

    // Verify all provided stop IDs actually belong to this trip
    const { data: existingStops, error: stopsErr } = await supabase
      .from("trip_stops")
      .select("id")
      .eq("trip_id", tripId);

    if (stopsErr) return handleApiError(stopsErr);

    const existingIds = new Set((existingStops ?? []).map((s) => s.id));
    const invalidIds = orderedStopIds.filter((id) => !existingIds.has(id));

    if (invalidIds.length > 0) {
      return apiError(
        `The following stop IDs do not belong to this trip: ${invalidIds.join(", ")}`,
        400,
        "INVALID_STOP_IDS"
      );
    }

    // Apply new order — each stop gets its 1-based position in the provided array
    const updates = orderedStopIds.map((stopId, index) =>
      supabase
        .from("trip_stops")
        .update({ stop_order: index + 1, updated_at: new Date().toISOString() })
        .eq("id", stopId)
        .eq("trip_id", tripId)
    );

    const results = await Promise.all(updates);
    const firstError = results.find((r) => r.error)?.error;
    if (firstError) return handleApiError(firstError);

    // Return stops in new order
    const { data: reorderedStops, error: fetchErr } = await supabase
      .from("trip_stops")
      .select(
        `
        id, trip_id, city_id, stop_order,
        arrival_date, departure_date, notes, created_at, updated_at,
        cities ( id, name, country, image_url )
        `
      )
      .eq("trip_id", tripId)
      .order("stop_order", { ascending: true });

    if (fetchErr) return handleApiError(fetchErr);

    return apiSuccess(reorderedStops, "Stops reordered successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
