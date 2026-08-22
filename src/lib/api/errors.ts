import { ZodError } from "zod";
import { apiError, apiValidationError } from "./response";

export class ApiHttpError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode = 400, details?: unknown) {
    super(message);
    this.name = "ApiHttpError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function handleApiError(error: unknown) {
  console.error("[API Error Handler]:", error);

  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));
    return apiValidationError("Request validation failed", formattedErrors);
  }

  if (error instanceof ApiHttpError) {
    return apiError(error.message, error.statusCode, error.details);
  }

  if (error && typeof error === "object" && "code" in error && "message" in error) {
    const pgError = error as { code: string; message: string; details?: string };
    // Handle Postgres / PostgREST error codes
    if (pgError.code === "23505") {
      return apiError("A record with this information already exists.", 409, pgError.details);
    }
    if (pgError.code === "23503") {
      return apiError("Foreign key constraint violation: referenced entity does not exist.", 400, pgError.details);
    }
    if (pgError.code === "PGRST116") {
      return apiError("Resource not found or access denied.", 404);
    }
    return apiError(pgError.message, 400);
  }

  if (error instanceof Error) {
    return apiError(error.message, 500);
  }

  return apiError("An unexpected internal error occurred", 500);
}
