import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiCreated, apiError, apiNotFound, apiSuccess, apiUnauthorized } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";
import { verifyTripOwnership, verifyTripStop } from "@/lib/api/trip-ownership";
import { createExpenseSchema } from "@/lib/validations/trips";

type Params = { params: Promise<{ tripId: string }> };

async function authorizeTrip(supabase: Awaited<ReturnType<typeof createClient>>, tripId: string, userId: string) {
  const ownership = await verifyTripOwnership(supabase, tripId, userId);
  if (ownership.error) {
    return ownership.error.message === "NOT_FOUND"
      ? apiNotFound("Trip not found")
      : apiError("You do not have permission to access this trip", 403, "FORBIDDEN");
  }
  return null;
}

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { tripId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");
    const denied = await authorizeTrip(supabase, tripId, user.id);
    if (denied) return denied;

    const { data: expenses, error } = await supabase
      .from("expenses")
      .select("id, trip_id, trip_stop_id, category, amount, currency, description, date, created_at")
      .eq("trip_id", tripId)
      .order("date", { ascending: true });
    if (error) return handleApiError(error);
    return apiSuccess(expenses ?? []);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { tripId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");
    const denied = await authorizeTrip(supabase, tripId, user.id);
    if (denied) return denied;

    const input = createExpenseSchema.parse(await request.json());
    if (input.tripStopId) {
      const { data: stop, error: stopError } = await verifyTripStop(supabase, tripId, input.tripStopId);
      if (stopError) return handleApiError(stopError);
      if (!stop) return apiNotFound("Trip stop not found");
    }

    const { data: expense, error } = await supabase.from("expenses").insert({
      trip_id: tripId,
      trip_stop_id: input.tripStopId ?? null,
      category: input.category,
      description: input.description ?? null,
      amount: input.amount,
      currency: input.currency,
      date: input.expenseDate,
    }).select("id, trip_id, trip_stop_id, category, amount, currency, description, date, created_at").single();
    if (error) return handleApiError(error);
    return apiCreated(expense, "Expense created successfully");
  } catch (error) {
    return handleApiError(error);
  }
}