import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiError, apiNotFound, apiSuccess, apiUnauthorized, apiValidationError } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";
import { verifyTripOwnership } from "@/lib/api/trip-ownership";
import { updateTripActivitySchema } from "@/lib/validations/trips";

type Params = { params: Promise<{ tripId: string; itemId: string }> };

async function getOwnedItem(supabase: Awaited<ReturnType<typeof createClient>>, tripId: string, itemId: string) {
  const { data: stops, error: stopsError } = await supabase.from("trip_stops").select("id").eq("trip_id", tripId);
  if (stopsError) return { item: null, error: stopsError };
  const stopIds = (stops ?? []).map((stop) => stop.id);
  if (stopIds.length === 0) return { item: null, error: null };
  const { data: item, error } = await supabase.from("trip_activities").select("id, trip_stop_id").eq("id", itemId).in("trip_stop_id", stopIds).maybeSingle();
  return { item, error };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { tripId, itemId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");
    const ownership = await verifyTripOwnership(supabase, tripId, user.id);
    if (ownership.error) return ownership.error.message === "NOT_FOUND" ? apiNotFound("Trip not found") : apiError("You do not have permission to update this trip", 403, "FORBIDDEN");

    const input = updateTripActivitySchema.parse(await request.json());
    if (input.startTime || input.endTime || input.sequenceNumber !== undefined) {
      return apiValidationError("Activity times and sequence ordering are unavailable in the current trip_activities table.");
    }
    const existing = await getOwnedItem(supabase, tripId, itemId);
    if (existing.error) return handleApiError(existing.error);
    if (!existing.item) return apiNotFound("Trip activity not found");

    const { data: activity, error } = await supabase.from("trip_activities").update({
      scheduled_date: input.activityDate,
      custom_cost: input.customCost,
      notes: input.notes,
    }).eq("id", itemId).select("id, trip_stop_id, activity_id, custom_cost, scheduled_date, notes, status, created_at").single();
    if (error) return handleApiError(error);
    return apiSuccess(activity, "Trip activity updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { tripId, itemId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");
    const ownership = await verifyTripOwnership(supabase, tripId, user.id);
    if (ownership.error) return ownership.error.message === "NOT_FOUND" ? apiNotFound("Trip not found") : apiError("You do not have permission to update this trip", 403, "FORBIDDEN");
    const existing = await getOwnedItem(supabase, tripId, itemId);
    if (existing.error) return handleApiError(existing.error);
    if (!existing.item) return apiNotFound("Trip activity not found");
    const { error } = await supabase.from("trip_activities").delete().eq("id", itemId);
    if (error) return handleApiError(error);
    return apiSuccess(null, "Trip activity deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}