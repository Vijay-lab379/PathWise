import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiCreated, apiError, apiNotFound, apiSuccess, apiUnauthorized } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";
import { getPublicTrip } from "@../route";

type Params = { params: Promise<{ shareToken: string }> };

export async function POST(_request: NextRequest, { params }: Params) {
  try {
    const { shareToken } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");

    const { data: sourceTrip, error: sourceError } = await getPublicTrip(supabase, shareToken);
    if (sourceError) return handleApiError(sourceError);
    if (!sourceTrip) return apiNotFound("Shared trip not found");

    const { data: copiedTrip, error: tripError } = await supabase.from("trips").insert({
      owner_id: user.id,
      title: `Copy of ${sourceTrip.title}`,
      description: sourceTrip.description,
      start_date: sourceTrip.start_date,
      end_date: sourceTrip.end_date,
      currency: sourceTrip.currency,
      cover_image_url: sourceTrip.cover_image_url,
      is_public: false,
    }).select("id, title, description, start_date, end_date, currency, cover_image_url, owner_id").single();
    if (tripError) return handleApiError(tripError);

    const stopIdMap = new Map<string, string>();
    const sortedStops = [...(sourceTrip.trip_stops ?? [])].sort((first, second) => first.stop_order - second.stop_order);
    for (const sourceStop of sortedStops) {
      const { data: copiedStop, error: stopError } = await supabase.from("trip_stops").insert({
        trip_id: copiedTrip.id,
        city_id: sourceStop.city_id,
        stop_order: sourceStop.stop_order,
        arrival_date: sourceStop.arrival_date,
        departure_date: sourceStop.departure_date,
      }).select("id").single();
      if (stopError) return handleApiError(stopError);
      stopIdMap.set(sourceStop.id, copiedStop.id);

      for (const sourceActivity of sourceStop.trip_activities ?? []) {
        const { error: activityError } = await supabase.from("trip_activities").insert({
          trip_stop_id: copiedStop.id,
          activity_id: sourceActivity.activity_id,
          custom_name: sourceActivity.custom_name,
          custom_cost: sourceActivity.custom_cost,
          scheduled_date: sourceActivity.scheduled_date,
          status: sourceActivity.status,
        });
        if (activityError) return handleApiError(activityError);
      }
    }

    return apiCreated({ ...copiedTrip, owner_id: user.id }, "Trip copied successfully");
  } catch (error) {
    return handleApiError(error);
  }
}