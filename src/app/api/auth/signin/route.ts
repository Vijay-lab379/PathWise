import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { signInSchema } from "@/lib/validations/auth";
import { apiError, apiSuccess } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validatedData = signInSchema.parse(json);

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      return apiError(error.message, 401);
    }

    // Fetch user profile if available
    let profile = null;
    if (data.user) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();
      profile = profileData;
    }

    return apiSuccess(
      {
        user: data.user,
        session: data.session,
        profile,
      },
      "User signed in successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}
