import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createStopSchema } from "@/lib/validations/trips";
import {
  apiCreated,
  apiError,
  apiUnauthorized,
  apiNotFound,
} from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

type Params = { params: Promise<{ tripId: string }> };

// POST /api/trips/[tripId]/stops
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { tripId } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return apiUnauthorized("Authentication required");
    }

    // Verify trip exists and belongs to the authenticated user
    const { data: trip, error: tripErr } = await supabase
      .from("trips")
      .select("id, owner_id")
      .eq("id", tripId)
      .maybeSingle();

    if (tripErr) return handleApiError(tripErr);
    if (!trip) return apiNotFound("Trip not found");
    if (trip.owner_id !== user.id) {
      return apiError("You do not have permission to add stops to this trip", 403, "FORBIDDEN");
    }

    const json = await req.json();
    const validatedData = createStopSchema.parse(json);

    // Determine stop_order: if not provided, place at end
    let stopOrder = validatedData.stop_order;
    if (stopOrder === undefined) {
      const { count } = await supabase
        .from("trip_stops")
        .select("id", { count: "exact", head: true })
        .eq("trip_id", tripId);
      stopOrder = (count ?? 0) + 1;
    }

    const { data: stop, error } = await supabase
      .from("trip_stops")
      .insert({
        trip_id: tripId,
        city_id: validatedData.city_id,
        stop_order: stopOrder,
        arrival_date: validatedData.arrival_date ?? null,
        departure_date: validatedData.departure_date ?? null,
        notes: validatedData.notes ?? null,
      })
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

    return apiCreated(stop, "Stop added to trip successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
