// lib/validations/waitlistSchema.js
import { z } from 'zod';

export const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email'),
  // honeypot: must be empty
website: z.string().optional().refine((v) => !v, { message: '—' }),

  // used for min submit time (anti-bot)
  startedAt: z
    .number()
    .refine((s) => Date.now() - s >= 800, {
      message: 'Please wait a moment before submitting',
    }),
});
