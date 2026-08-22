import { createClient } from "@/lib/supabase/server";
import { apiSuccess, apiUnauthorized } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

// GET /api/auth/me
export async function GET() {
  try {
    const supabase = await createClient();

    // Use getUser() — validated against Supabase Auth server, not just the JWT
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return apiUnauthorized("No active session");
    }

    // Fetch only safe profile fields — never return passwords or secrets
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email, full_name, avatar_url, created_at, updated_at")
      .eq("id", user.id)
      .maybeSingle();

    return apiSuccess({
      user: {
        id: user.id,
        email: user.email,
        emailConfirmedAt: user.email_confirmed_at ?? null,
        createdAt: user.created_at,
      },
      profile,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
