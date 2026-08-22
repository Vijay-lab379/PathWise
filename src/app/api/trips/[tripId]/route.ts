import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateTripSchema } from "@/lib/validations/trips";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiNotFound,
} from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

type Params = { params: Promise<{ tripId: string }> };

// ─── Ownership guard ────────────────────────────────────────────────────────────

async function verifyTripOwnership(
  supabase: Awaited<ReturnType<typeof createClient>>,
  tripId: string,
  userId: string
) {
  const { data: trip, error } = await supabase
    .from("trips")
    .select("id, owner_id")
    .eq("id", tripId)
    .maybeSingle();

  if (error) return { trip: null, error };
  if (!trip) return { trip: null, error: new Error("NOT_FOUND") };
  if (trip.owner_id !== userId) return { trip: null, error: new Error("FORBIDDEN") };

  return { trip, error: null };
}

// ─── GET /api/trips/[tripId] ────────────────────────────────────────────────────
// Returns the full trip with stops → cities, trip_activities → activities, expenses

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { tripId } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return apiUnauthorized("Authentication required");
    }

    const { data: trip, error } = await supabase
      .from("trips")
      .select(
        `
        id, owner_id, title, description,
        start_date, end_date, budget, currency,
        is_public, share_token, cover_image_url, created_at, updated_at,
        trip_stops (
          id, trip_id, city_id, stop_order,
          arrival_date, departure_date, notes,
          created_at, updated_at,
          cities (
            id, name, country, country_code,
            description, image_url, latitude, longitude
          ),
          trip_activities (
            id, trip_stop_id, activity_id,
            custom_name, custom_cost, scheduled_date, notes, status,
            created_at,
            activities (
              id, city_id, name, description,
              category, estimated_cost, currency, location, image_url
            )
          )
        ),
        expenses (
          id, trip_id, trip_stop_id, category,
          amount, currency, description, date, created_at
        )
        `
      )
      .eq("id", tripId)
      .eq("owner_id", user.id)   // RLS + explicit ownership filter
      .maybeSingle();

    if (error) {
      return handleApiError(error);
    }

    if (!trip) {
      return apiNotFound("Trip not found or access denied");
    }

    return apiSuccess(trip);
  } catch (error) {
    return handleApiError(error);
  }
}

// ─── PATCH /api/trips/[tripId] ──────────────────────────────────────────────────

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

    const { error: ownerErr } = await verifyTripOwnership(supabase, tripId, user.id);
    if (ownerErr) {
      return ownerErr.message === "NOT_FOUND"
        ? apiNotFound("Trip not found")
        : apiError("You do not have permission to update this trip", 403, "FORBIDDEN");
    }

    const json = await req.json();
    const validatedData = updateTripSchema.parse(json);

    const { data: updated, error } = await supabase
      .from("trips")
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", tripId)
      .eq("owner_id", user.id)
      .select()
      .single();

    if (error) {
      return handleApiError(error);
    }

    return apiSuccess(updated, "Trip updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

// ─── DELETE /api/trips/[tripId] ─────────────────────────────────────────────────

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { tripId } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return apiUnauthorized("Authentication required");
    }

    const { error: ownerErr } = await verifyTripOwnership(supabase, tripId, user.id);
    if (ownerErr) {
      return ownerErr.message === "NOT_FOUND"
        ? apiNotFound("Trip not found")
        : apiError("You do not have permission to delete this trip", 403, "FORBIDDEN");
    }

    const { error } = await supabase
      .from("trips")
      .delete()
      .eq("id", tripId)
      .eq("owner_id", user.id);

    if (error) {
      return handleApiError(error);
    }

    return apiSuccess(null, "Trip deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
