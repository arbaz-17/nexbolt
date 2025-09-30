import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  // anti-bot fields
  website: z.string().max(0).optional(),       // honeypot: must remain empty
  startedAt: z.number().int().positive().optional(), // client send Date.now()
});
