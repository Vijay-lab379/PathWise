import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiError, apiNotFound, apiSuccess, apiUnauthorized } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";
import { verifyTripOwnership } from "@/lib/api/trip-ownership";

type Params = { params: Promise<{ tripId: string }> };

async function updateSharing(request: NextRequest, { params }: Params, isPublic: boolean) {
  try {
    const { tripId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");

    const ownership = await verifyTripOwnership(supabase, tripId, user.id);
    if (ownership.error) {
      return ownership.error.message === "NOT_FOUND"
        ? apiNotFound("Trip not found")
        : apiError("You do not have permission to change sharing for this trip", 403, "FORBIDDEN");
    }

    const { data: trip, error } = await supabase
      .from("trips")
      .update({ is_public: isPublic })
      .eq("id", tripId)
      .eq("owner_id", user.id)
      .select("id, is_public, share_token")
      .single();

    if (error) return handleApiError(error);
    return apiSuccess(trip, isPublic ? "Trip sharing enabled" : "Trip sharing disabled");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest, context: { params: Params["params"] }) {
  return updateSharing(request, context, true);
}

export async function DELETE(request: NextRequest, context: { params: Params["params"] }) {
  return updateSharing(request, context, false);
}