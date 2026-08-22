import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiCreated, apiError, apiNotFound, apiUnauthorized, apiValidationError } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";
import { verifyTripOwnership, verifyTripStop } from "@/lib/api/trip-ownership";
import { createTripActivitySchema } from "@/lib/validations/trips";

type Params = { params: Promise<{ tripId: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { tripId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");

    const ownership = await verifyTripOwnership(supabase, tripId, user.id);
    if (ownership.error) {
      return ownership.error.message === "NOT_FOUND"
        ? apiNotFound("Trip not found")
        : apiError("You do not have permission to update this trip", 403, "FORBIDDEN");
    }

    const input = createTripActivitySchema.parse(await request.json());
    if (input.startTime || input.endTime) {
      return apiValidationError("Activity times are unavailable because the trip_activities table has no time columns.");
    }

    const { data: stop, error: stopError } = await verifyTripStop(supabase, tripId, input.tripStopId);
    if (stopError) return handleApiError(stopError);
    if (!stop) return apiNotFound("Trip stop not found");

    const { data: activity, error } = await supabase
      .from("trip_activities")
      .insert({
        trip_stop_id: input.tripStopId,
        activity_id: input.activityId,
        scheduled_date: input.activityDate ?? null,
        custom_cost: input.customCost ?? null,
        notes: input.notes ?? null,
      })
      .select("id, trip_stop_id, activity_id, custom_cost, scheduled_date, notes, status, created_at")
      .single();

    if (error) return handleApiError(error);
    return apiCreated(activity, "Activity added to trip successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

