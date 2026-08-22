import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiError, apiNotFound, apiSuccess, apiUnauthorized } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";
import { verifyTripOwnership, verifyTripStop } from "@/lib/api/trip-ownership";
import { updateExpenseSchema } from "@/lib/validations/trips";

type Params = { params: Promise<{ tripId: string; expenseId: string }> };

async function authorizeTrip(supabase: Awaited<ReturnType<typeof createClient>>, tripId: string, userId: string) {
  const ownership = await verifyTripOwnership(supabase, tripId, userId);
  if (ownership.error) return ownership.error.message === "NOT_FOUND" ? apiNotFound("Trip not found") : apiError("You do not have permission to update this trip", 403, "FORBIDDEN");
  return null;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { tripId, expenseId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");
    const denied = await authorizeTrip(supabase, tripId, user.id);
    if (denied) return denied;

    const input = updateExpenseSchema.parse(await request.json());
    if (input.tripStopId) {
      const { data: stop, error: stopError } = await verifyTripStop(supabase, tripId, input.tripStopId);
      if (stopError) return handleApiError(stopError);
      if (!stop) return apiNotFound("Trip stop not found");
    }
    const { data: expense, error } = await supabase.from("expenses").update({
      ...(input.category !== undefined && { category: input.category }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.amount !== undefined && { amount: input.amount }),
      ...(input.currency !== undefined && { currency: input.currency }),
      ...(input.expenseDate !== undefined && { date: input.expenseDate }),
      ...(input.tripStopId !== undefined && { trip_stop_id: input.tripStopId }),
    }).eq("id", expenseId).eq("trip_id", tripId).select("id, trip_id, trip_stop_id, category, amount, currency, description, date, created_at").maybeSingle();
    if (error) return handleApiError(error);
    if (!expense) return apiNotFound("Expense not found");
    return apiSuccess(expense, "Expense updated successfully");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { tripId, expenseId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");
    const denied = await authorizeTrip(supabase, tripId, user.id);
    if (denied) return denied;
    const { data: expense, error } = await supabase.from("expenses").delete().eq("id", expenseId).eq("trip_id", tripId).select("id").maybeSingle();
    if (error) return handleApiError(error);
    if (!expense) return apiNotFound("Expense not found");
    return apiSuccess(null, "Expense deleted successfully");
  } catch (error) {
    return handleApiError(error);
  }
}