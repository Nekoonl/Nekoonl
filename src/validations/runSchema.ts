import { z } from 'zod';

export const routePointSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timestamp: z.number().int().positive(),
  altitude: z.number().nullable().optional(),
  accuracy: z.number().nullable().optional()
});

export const createRunSchema = z.object({
  userId: z.string().uuid(),
  startedAt: z.date(),
  endedAt: z.date(),
  points: z.array(routePointSchema).min(2),
  weightKg: z.number().positive().optional().nullable()
});
