import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiError, apiNotFound, apiSuccess, apiUnauthorized } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";
import { verifyTripOwnership } from "@/lib/api/trip-ownership";

type Params = { params: Promise<{ tripId: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { tripId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return apiUnauthorized("Authentication required");

    const ownership = await verifyTripOwnership(supabase, tripId, user.id);
    if (ownership.error) return ownership.error.message === "NOT_FOUND" ? apiNotFound("Trip not found") : apiError("You do not have permission to view this trip", 403, "FORBIDDEN");

    const [{ data: expenses, error: expensesError }, { data: stops, error: stopsError }] = await Promise.all([
      supabase.from("expenses").select("category, amount, currency").eq("trip_id", tripId),
      supabase.from("trip_stops").select("id").eq("trip_id", tripId),
    ]);
    if (expensesError) return handleApiError(expensesError);
    if (stopsError) return handleApiError(stopsError);

    const stopIds = (stops ?? []).map((stop) => stop.id);
    const { data: activities, error: activitiesError } = stopIds.length
      ? await supabase.from("trip_activities").select("custom_cost, activity_id, activities ( estimated_cost )").in("trip_stop_id", stopIds)
      : { data: [], error: null };
    if (activitiesError) return handleApiError(activitiesError);

    const categoryTotals = { transport: 0, accommodation: 0, meals: 0 };
    let enteredExpenses = 0;
    for (const expense of expenses ?? []) {
      enteredExpenses += expense.amount;
      if (expense.category in categoryTotals) {
        categoryTotals[expense.category as keyof typeof categoryTotals] += expense.amount;
      }
    }

    const estimatedActivityCosts = (activities ?? []).reduce((total, activity) => {
      const linked = Array.isArray(activity.activities) ? activity.activities[0] : activity.activities;
      return total + (activity.custom_cost ?? linked?.estimated_cost ?? 0);
    }, 0);
    const total = enteredExpenses + estimatedActivityCosts;
    const budget = ownership.trip?.budget ?? null;

    return apiSuccess({
      budget,
      currency: ownership.trip?.currency ?? null,
      transport: categoryTotals.transport,
      accommodation: categoryTotals.accommodation,
      meals: categoryTotals.meals,
      enteredExpenses,
      estimatedActivityCosts,
      total,
      remaining: budget === null ? null : budget - total,
    });
  } catch (error) {
    return handleApiError(error);
  }
}