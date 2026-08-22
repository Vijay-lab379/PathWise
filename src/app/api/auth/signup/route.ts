import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { signUpSchema } from "@/lib/validations/auth";
import { apiCreated, apiError } from "@/lib/api/response";
import { handleApiError } from "@/lib/api/errors";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const validatedData = signUpSchema.parse(json);

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
        data: {
          full_name: validatedData.fullName,
        },
      },
    });

    if (error) {
      return apiError(error.message, 400);
    }

    if (data.user) {
      // Upsert profile record to ensure consistency with profiles table
      await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          email: data.user.email || validatedData.email,
          full_name: validatedData.fullName,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
    }

    return apiCreated(
      {
        user: data.user,
        session: data.session,
      },
      "User signed up successfully"
    );
  } catch (error) {
    return handleApiError(error);
  }
}
