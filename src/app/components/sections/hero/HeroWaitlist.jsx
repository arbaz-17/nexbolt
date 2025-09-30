'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import WaitlistForm from '../../forms/WaitlistForm';

const BADGES = [
  'Next.js','React','TypeScript','JavaScript','Node.js',
  'Tailwind CSS','shadcn/ui','Framer Motion',
  'PostgreSQL','Supabase','MongoDB','MySQL','Prisma',
  'NextAuth','Clerk',
  'Stripe','Paddle','LemonSqueezy',
  'Resend','Mailchimp',
  'Zod','ESLint','Prettier',
  'OpenAI',
];

export default function HeroWaitlist() {
  const [success, setSuccess] = useState(false);
  const successRef = useRef(null);

  return (
    <section
      id="waitlist"
      aria-labelledby="hero-title"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28 border border-amber-400"
    >
      {/* animated brand ornaments (left & right, mirrored, theme-aware) */}
      <motion.div
        aria-hidden
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="pointer-events-none absolute left-[-60px] top-10 md:left-[-80px] md:top-16"
      >
        <motion.div
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BrandOrnament className="text-brand" size={220} />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        className="pointer-events-none absolute right-[-60px] bottom-6 md:right-[-80px] md:bottom-10"
      >
        <motion.div
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BrandOrnament className="text-brand" size={260} mirrored />
        </motion.div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Badge belt (Framer Motion marquee) */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative mx-auto max-w-4xl overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface to-transparent" />

          <motion.div
            aria-hidden
            className="flex w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          >
            <MarqueeRow>
              {BADGES.map((label, i) => (
                <Badge key={`${label}-${i}`} label={label} />
              ))}
            </MarqueeRow>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
          className="mt-8 text-center text-4xl font-semibold tracking-tight md:text-6xl"
        >
          <span className="block">STOP WIRING. START SHIPPING AT</span>
          <span className="mt-2 inline-flex items-center justify-center gap-2 leading-none">
            <span className="font-heading text-5xl md:text-6xl leading-tight">
              <span className="text-brand text-neon animate-neon">BOLT SPEED!</span>
            </span>
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          className="mx-auto mt-4 max-w-3xl text-center text-sm md:text-base text-text-muted"
        >
          NexBolt gives you authentication, subscription billing, multitenancy, role-based access, analytics with dashboards,
          a modern UI kit, AI integrations, and much more.
        </motion.p>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
          className="mt-3 flex justify-center"
        >
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-center text-sm md:text-sm font-medium text-brand">
            Opinionated where it matters, <span className="ml-1">swappable where it should be.</span>
          </span>
        </motion.div>

        {/* Waitlist form / success */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
          className="mx-auto mt-8 max-w-xl"
        >
          {!success ? (
            <WaitlistForm onSuccess={() => setSuccess(true)} />
          ) : (
            <div
              ref={successRef}
              tabIndex={-1}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-center text-sm text-text"
            >
              <span role="img" aria-label="party popper">🎉</span>
              <span>You’re in! We’ll send early access and founder updates soon.</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* ambient brand glow (keep as-is) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(65%_55%_at_50%_0%,black,transparent)]"
      >
        <div className="absolute inset-0 blur-3xl opacity-30" style={{ background: 'var(--brand-glow)' }} />
      </div>
    </section>
  );
}

/* -------- helpers (JS, no types) -------- */

function BrandOrnament({ className = '', mirrored = false, size = 260 }) {
  // We color via currentColor; mask uses your SVG
  return (
    <div
      aria-hidden
      className={className}
      style={{
        width: size,
        height: size,
        color: 'var(--brand, currentColor)',
        background: 'currentColor',
        maskImage: 'url(/assets/logo/logo-black-symbol.svg)',
        WebkitMaskImage: 'url(/assets/logo/logo-black-symbol.svg)',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        transform: mirrored ? 'scaleX(-1)' : undefined,
        opacity: 0.45,
      }}
    />
  );
}

function MarqueeRow({ children }) {
  return (
    <div className="flex items-center gap-2 pr-4">
      {children}
      {children}
    </div>
  );
}

function Badge({ label }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-muted">
      {label}
    </span>
  );
}
