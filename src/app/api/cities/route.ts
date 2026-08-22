import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { apiSuccess, apiValidationError } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

const cityFields =
  "id, name, country, country_code, description, image_url, latitude, longitude";

function parseFilterValue(value: string | null) {
  if (value === null || value.trim() === "") return null;

  return value.trim();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = parseFilterValue(searchParams.get("query"));
    const country = parseFilterValue(searchParams.get("country"));
    const region = parseFilterValue(searchParams.get("region"));

    if (region) {
      return apiValidationError(
        "The region filter is unavailable because cities do not have a region column."
      );
    }

    const supabase = await createClient();
    let cityQuery = supabase
      .from("cities")
      .select(cityFields)
      .order("name", { ascending: true });

    if (query) {
      cityQuery = cityQuery.ilike("name", `%${query}%`);
    }

    if (country) {
      cityQuery = cityQuery.ilike("country", `%${country}%`);
    }

    const { data: cities, error } = await cityQuery;

    if (error) return handleApiError(error);

    return apiSuccess(cities ?? []);
  } catch (error) {
    return handleApiError(error);
  }
}