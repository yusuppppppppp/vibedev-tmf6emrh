import { z } from "zod"

export const estimatorSchema = z.object({
  peopleCount: z
    .number()
    .min(1, "At least 1 person is required")
    .max(20, "Maximum 20 people allowed"),
  duration: z
    .number()
    .min(1, "Minimum duration is 1 hour")
    .max(8, "Maximum duration is 8 hours"),
  intensity: z.enum(["cozy", "medium", "roaring"]),
})

export type EstimatorSchema = z.infer<typeof estimatorSchema>
