import { z } from 'zod';

export const onboardingSchema = z.object({
  displayName: z.string().trim().min(2).max(40),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  weightKg: z.coerce.number().positive().max(350).optional().or(z.literal('').transform(() => undefined)),
  runningGoal: z.enum(['distance', 'time', 'frequency']),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  preferredDays: z.array(z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])).min(1),
  initialTarget: z.coerce.number().positive(),
  motivationLevel: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  acceptedRoastTerms: z.boolean().default(false)
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
