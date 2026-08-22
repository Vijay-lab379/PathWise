import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateStopSchema } from "@/lib/validations/trips";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiNotFound,
} from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

type Params = { params: Promise<{ tripId: string; stopId: string }> };

// ─── Ownership guard ────────────────────────────────────────────────────────────

async function verifyStopOwnership(
  supabase: Awaited<ReturnType<typeof createClient>>,
  tripId: string,
  stopId: string,
  userId: string
) {
  // Verify trip ownership first
  const { data: trip, error: tripErr } = await supabase
    .from("trips")
    .select("id, owner_id")
    .eq("id", tripId)
    .maybeSingle();

  if (tripErr) return { ok: false, tripNotFound: false, stopNotFound: false, dbError: tripErr };
  if (!trip) return { ok: false, tripNotFound: true, stopNotFound: false, dbError: null };
  if (trip.owner_id !== userId) return { ok: false, tripNotFound: false, stopNotFound: false, dbError: null, forbidden: true };

  // Verify stop belongs to this trip
  const { data: stop, error: stopErr } = await supabase
    .from("trip_stops")
    .select("id")
    .eq("id", stopId)
    .eq("trip_id", tripId)
    .maybeSingle();

  if (stopErr) return { ok: false, tripNotFound: false, stopNotFound: false, dbError: stopErr };
  if (!stop) return { ok: false, tripNotFound: false, stopNotFound: true, dbError: null };

  return { ok: true, tripNotFound: false, stopNotFound: false, dbError: null, forbidden: false };
}

// ─── PATCH /api/trips/[tripId]/stops/[stopId] ──────────────────────────────────

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { tripId, stopId } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return apiUnauthorized("Authentication required");
    }

    const ownership = await verifyStopOwnership(supabase, tripId, stopId, user.id);
    if (!ownership.ok) {
      if (ownership.tripNotFound) return apiNotFound("Trip not found");
      if (ownership.stopNotFound) return apiNotFound("Stop not found");
      if (ownership.forbidden) return apiError("You do not have permission to update this stop", 403, "FORBIDDEN");
      if (ownership.dbError) return handleApiError(ownership.dbError);
    }

    const json = await req.json();
    const validatedData = updateStopSchema.parse(json);

    const { data: updated, error } = await supabase
      .from("trip_stops")
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", stopId)
      .eq("trip_id", tripId)
      .select(
        `
        id, trip_id, city_id, stop_order,
        arrival_date, departure_date, notes, created_at, updated_at,
        cities ( id, name, country, country_code, image_url, latitude, longitude )
        `
      )
      .single();

    if (error) {
      return handleApiError(error);
    }

    return apiSuccess(updated, "Stop updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// ─── DELETE /api/trips/[tripId]/stops/[stopId] ─────────────────────────────────

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { tripId, stopId } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return apiUnauthorized("Authentication required");
    }

    const ownership = await verifyStopOwnership(supabase, tripId, stopId, user.id);
    if (!ownership.ok) {
      if (ownership.tripNotFound) return apiNotFound("Trip not found");
      if (ownership.stopNotFound) return apiNotFound("Stop not found");
      if (ownership.forbidden) return apiError("You do not have permission to delete this stop", 403, "FORBIDDEN");
      if (ownership.dbError) return handleApiError(ownership.dbError);
    }

    const { error } = await supabase
      .from("trip_stops")
      .delete()
      .eq("id", stopId)
      .eq("trip_id", tripId);

    if (error) {
      return handleApiError(error);
    }

    return apiSuccess(null, "Stop deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
