// app/api/waitlist/route.js
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { limit } from '@/lib/rate';
import { waitlistSchema } from '@/lib/validations/waitlistSchema';
// import { Resend } from 'resend';

export const dynamic = 'force-dynamic'; // ensure no static caching
export const revalidate = 0;

function validEmail(e = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export async function POST(req) {
  try {
    // Extract IP early (works well on Vercel)
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    // Rate limit per IP
    const rl = await limit(`waitlist:${ip}`);
    if (!rl.success) {
      const retryAfter = Math.max(0, rl.reset - Date.now());
      return NextResponse.json(
        { ok: false, code: 'RATE_LIMITED', message: 'Too many requests. Try again soon.' },
        {
          status: 429,
          headers: {
            'Cache-Control': 'no-store',
            'Retry-After': String(Math.ceil(retryAfter / 1000)),
          },
        }
      );
    }

    const body = await req.json().catch(() => ({}));

    // Extra cheap email sanity check before Zod (fast-fail)
    if (!validEmail(body?.email)) {
      return NextResponse.json(
        { ok: false, message: 'Valid email required' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Validate payload (honeypot & min submit time included)
    const parsed = waitlistSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues?.[0]?.message || 'Invalid submission';
      return NextResponse.json(
        { ok: false, message },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const { email, website = '', startedAt } = parsed.data;

    // Dedupe + store
    const now = Date.now();
    const added = await redis.sadd('waitlist:emails', email); // 1 if new, 0 if existed

    await redis.hset(`waitlist:sub:${email}`, {
      email,
      website,
      ip,
      ua: req.headers.get('user-agent') || '',
      ts: String(now),
      source: 'nexbolt-landing',
      startedAt: String(startedAt),
    });

    if (added === 1) {
      await redis.lpush(
        'waitlist:chron',
        JSON.stringify({ email, website, ts: now, ip })
      );
    }

    // Optional: notify yourself via Resend (uncomment once configured)
    // const key = process.env.RESEND_API_KEY;
    // const from = process.env.RESEND_FROM || 'Nexbolt <noreply@example.com>';
    // const to = (process.env.NOTIFY_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
    // if (key && to.length) {
    //   const resend = new Resend(key);
    //   await resend.emails.send({
    //     from, to,
    //     subject: 'New waitlist signup',
    //     text: `Email: ${email}\nWebsite: ${website || '—'}\nIP: ${ip}`,
    //   });
    // }

    return NextResponse.json(
      { ok: true, deduped: added === 0 },
      { status: 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('waitlist POST error:', err);
    return NextResponse.json(
      { ok: false, message: 'Internal Server Error' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
