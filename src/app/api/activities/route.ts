import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiSuccess, apiValidationError } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

const activityFields =
  "id, city_id, name, description, category, estimated_cost, currency, location, image_url";

function parseNonNegativeNumber(value: string | null, field: string) {
  if (value === null || value.trim() === "") return null;

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return { error: `${field} must be a non-negative number.` };
  }

  return { value: parsed };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cityId = searchParams.get("cityId")?.trim() || null;
    const category = searchParams.get("category")?.trim() || null;
    const maxCost = parseNonNegativeNumber(searchParams.get("maxCost"), "maxCost");
    const maxDuration = searchParams.get("maxDuration")?.trim() || null;

    if (maxCost && "error" in maxCost) {
      return apiValidationError(maxCost.error);
    }

    if (maxDuration) {
      return apiValidationError(
        "The maxDuration filter is unavailable because activities do not have a duration column."
      );
    }

    const supabase = await createClient();
    let activityQuery = supabase
      .from("activities")
      .select(activityFields)
      .order("name", { ascending: true });

    if (cityId) {
      activityQuery = activityQuery.eq("city_id", cityId);
    }

    if (category) {
      activityQuery = activityQuery.ilike("category", category);
    }

    if (maxCost && "value" in maxCost) {
      activityQuery = activityQuery.lte("estimated_cost", maxCost.value);
    }

    const { data: activities, error } = await activityQuery;

    if (error) return handleApiError(error);

    return apiSuccess(activities ?? []);
  } catch (error) {
    return handleApiError(error);
  }
}