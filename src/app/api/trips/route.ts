import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createTripSchema } from "@/lib/validations/trips";
import { apiSuccess, apiCreated, apiUnauthorized } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

// GET /api/trips — return all trips owned by the authenticated user
export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return apiUnauthorized("Authentication required");
    }

    const { data: trips, error } = await supabase
      .from("trips")
      .select(
        `
        id, owner_id, title, description,
        start_date, end_date, budget, currency,
        is_public, cover_image_url, created_at, updated_at,
        trip_stops ( id, city_id, stop_order, arrival_date, departure_date )
        `
      )
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return handleApiError(error);
    }

    return apiSuccess(trips ?? []);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/trips — create a trip owned by the authenticated user
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return apiUnauthorized("Authentication required");
    }

    const json = await req.json();
    const validatedData = createTripSchema.parse(json);

    // owner_id is ALWAYS sourced from the authenticated session — never from the request body
    const { data: trip, error } = await supabase
      .from("trips")
      .insert({
        owner_id: user.id,
        title: validatedData.title,
        description: validatedData.description ?? null,
        start_date: validatedData.start_date ?? null,
        end_date: validatedData.end_date ?? null,
        budget: validatedData.budget ?? null,
        currency: validatedData.currency,
        is_public: validatedData.is_public,
      })
      .select()
      .single();

    if (error) {
      return handleApiError(error);
    }

    return apiCreated(trip, "Trip created successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
