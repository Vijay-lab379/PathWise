import { NextResponse } from "next/server";
import type { ApiResponse, PaginatedResponse } from "@/types/api";

export function apiSuccess<T>(
  data: T,
  message?: string,
  status = 200,
  init?: ResponseInit
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message ? { message } : {}),
    },
    {
      status,
      ...init,
    }
  );
}

export function apiCreated<T>(
  data: T,
  message?: string
): NextResponse<ApiResponse<T>> {
  return apiSuccess(data, message, 201);
}

export function apiError(
  error: string,
  status = 400,
  details?: unknown
): NextResponse<ApiResponse<never> & { details?: unknown }> {
  return NextResponse.json(
    {
      success: false,
      error,
      ...(details !== undefined ? { details } : {}),
    },
    { status }
  );
}

export function apiUnauthorized(
  error = "Unauthorized"
): NextResponse<ApiResponse<never>> {
  return apiError(error, 401);
}

export function apiForbidden(
  error = "Forbidden: Access denied"
): NextResponse<ApiResponse<never>> {
  return apiError(error, 403);
}

export function apiNotFound(
  error = "Resource not found"
): NextResponse<ApiResponse<never>> {
  return apiError(error, 404);
}

export function apiValidationError(
  error = "Validation error",
  details?: unknown
): NextResponse<ApiResponse<never> & { details?: unknown }> {
  return apiError(error, 422, details);
}

export function apiPaginated<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message?: string
): NextResponse<PaginatedResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      total,
      page,
      limit,
      ...(message ? { message } : {}),
    },
    { status: 200 }
  );
}
