// lib/rate.js
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

// e.g., 5 signups/minute per IP (tweak as you like)
const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
});

export async function limit(key) {
  // key can be ip or email
  const res = await limiter.limit(key);
  return res; // { success, limit, remaining, reset, pending }
}
