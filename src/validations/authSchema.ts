import { z } from 'zod';

export const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Usa mínimo 8 caracteres')
});

export type EmailPasswordInput = z.infer<typeof emailPasswordSchema>;
