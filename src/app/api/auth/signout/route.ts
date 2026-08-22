import { createClient } from "@/lib/supabase/server";
import { apiSuccess, apiError } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

export async function POST() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return apiError(error.message, 400);
    }

    return apiSuccess(null, "User signed out successfully");
  } catch (error) {
    return handleApiError(error);
  }
}
