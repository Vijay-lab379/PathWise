import { z } from "zod";

// ─── Shared helpers ────────────────────────────────────────────────────────────

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
  .optional()
  .nullable();

const currency = z
  .string()
  .length(3, "Currency must be a 3-letter ISO 4217 code")
  .toUpperCase()
  .default("USD");

const uuidArray = z
  .array(z.string().uuid("Each ID must be a valid UUID"))
  .min(1, "At least one stop ID is required");

// ─── Trip schemas ──────────────────────────────────────────────────────────────

export const createTripSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(255),
    description: z.string().trim().max(2000).optional().nullable(),
    start_date: isoDate,
    end_date: isoDate,
    budget: z.number().positive("Budget must be a positive number").optional().nullable(),
    currency,
    is_public: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.start_date && data.end_date) {
        return data.end_date >= data.start_date;
      }
      return true;
    },
    { message: "end_date must be on or after start_date", path: ["end_date"] }
  );

export const updateTripSchema = z
  .object({
    title: z.string().trim().min(1).max(255).optional(),
    description: z.string().trim().max(2000).optional().nullable(),
    start_date: isoDate,
    end_date: isoDate,
    budget: z.number().positive().optional().nullable(),
    currency: z.string().length(3).toUpperCase().optional(),
    is_public: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.start_date && data.end_date) {
        return data.end_date >= data.start_date;
      }
      return true;
    },
    { message: "end_date must be on or after start_date", path: ["end_date"] }
  )
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;

// ─── Stop schemas ──────────────────────────────────────────────────────────────

export const createStopSchema = z
  .object({
    city_id: z.string().uuid("city_id must be a valid UUID"),
    stop_order: z.number().int().min(1).optional(),
    arrival_date: isoDate,
    departure_date: isoDate,
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.arrival_date && data.departure_date) {
        return data.departure_date >= data.arrival_date;
      }
      return true;
    },
    { message: "departure_date must be on or after arrival_date", path: ["departure_date"] }
  );

export const updateStopSchema = z
  .object({
    city_id: z.string().uuid().optional(),
    stop_order: z.number().int().min(1).optional(),
    arrival_date: isoDate,
    departure_date: isoDate,
    notes: z.string().trim().max(2000).optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.arrival_date && data.departure_date) {
        return data.departure_date >= data.arrival_date;
      }
      return true;
    },
    { message: "departure_date must be on or after arrival_date", path: ["departure_date"] }
  )
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const reorderStopsSchema = z.object({
  orderedStopIds: uuidArray,
});

const nonNegativeAmount = z.number().min(0, "Amount must be greater than or equal to 0");

export const createTripActivitySchema = z.object({
  tripStopId: z.string().uuid("tripStopId must be a valid UUID"),
  activityId: z.string().uuid("activityId must be a valid UUID"),
  activityDate: isoDate,
  customCost: nonNegativeAmount.optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export const updateTripActivitySchema = z.object({
  activityDate: isoDate,
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  customCost: nonNegativeAmount.optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
  sequenceNumber: z.number().int().min(1).optional(),
});

export const reorderTripActivitiesSchema = z.object({
  orderedActivityIds: z.array(z.string().uuid("Each ID must be a valid UUID")).min(1),
});

export const createExpenseSchema = z.object({
  category: z.string().trim().min(1).max(100),
  description: z.string().trim().max(2000).optional().nullable(),
  amount: nonNegativeAmount,
  currency,
  expenseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  tripStopId: z.string().uuid().optional().nullable(),
});

export const updateExpenseSchema = createExpenseSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided for update" }
);

export type CreateStopInput = z.infer<typeof createStopSchema>;
export type UpdateStopInput = z.infer<typeof updateStopSchema>;
export type ReorderStopsInput = z.infer<typeof reorderStopsSchema>;
export type CreateTripActivityInput = z.infer<typeof createTripActivitySchema>;
export type UpdateTripActivityInput = z.infer<typeof updateTripActivitySchema>;
export type ReorderTripActivitiesInput = z.infer<typeof reorderTripActivitiesSchema>;
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
