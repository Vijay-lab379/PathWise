import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiError, apiNotFound, apiUnauthorized, apiValidationError } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";
import { verifyTripOwnership } from "@/lib/api/trip-ownership";
import { reorderTripActivitiesSchema } from "@/lib/validations/trips";

type Params = { params: Promise<{ tripId: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { tripId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");
    const ownership = await verifyTripOwnership(supabase, tripId, user.id);
    if (ownership.error) return ownership.error.message === "NOT_FOUND" ? apiNotFound("Trip not found") : apiError("You do not have permission to update this trip", 403, "FORBIDDEN");
    reorderTripActivitiesSchema.parse(await request.json());
    return apiValidationError("Activity reordering is unavailable because the trip_activities table has no sequence_number column.");
  } catch (error) {
    return handleApiError(error);
  }
}