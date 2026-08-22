import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiNotFound, apiSuccess } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

type Params = { params: Promise<{ shareToken: string }> };

const publicTripFields = "id, title, description, start_date, end_date, currency, cover_image_url";

async function getPublicTrip(supabase: Awaited<ReturnType<typeof createClient>>, shareToken: string) {
  return supabase
    .from("trips")
    .select(`
      ${publicTripFields},
      trip_stops (
        id, city_id, stop_order, arrival_date, departure_date,
        cities ( id, name, country, country_code, description, image_url, latitude, longitude ),
        trip_activities (
          id, activity_id, custom_name, custom_cost, scheduled_date, status,
          activities ( id, city_id, name, description, category, estimated_cost, currency, location, image_url )
        )
      )
    `)
    .eq("share_token", shareToken)
    .eq("is_public", true)
    .maybeSingle();
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { shareToken } = await params;
    const supabase = await createClient();
    const { data: trip, error } = await getPublicTrip(supabase, shareToken);
    if (error) return handleApiError(error);
    if (!trip) return apiNotFound("Shared trip not found");

    return apiSuccess({
      id: trip.id,
      name: trip.title,
      description: trip.description,
      start_date: trip.start_date,
      end_date: trip.end_date,
      cover_image_url: trip.cover_image_url,
      currency: trip.currency,
      trip_stops: trip.trip_stops,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export { getPublicTrip };