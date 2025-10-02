'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useMobile } from '@/app/hooks/useMobile';
import WaitlistForm from '../../forms/WaitlistForm';

const BADGES = [
  'Next.js','React','TypeScript','JavaScript','Node.js',
  'Tailwind CSS','shadcn/ui','Framer Motion',
  'PostgreSQL','Supabase','MongoDB','MySQL','Prisma',
  'NextAuth','Clerk',
  'Stripe','LemonSqueezy',
  'Resend','Mailchimp',
  'Zod','ESLint','Prettier',
  'OpenAI','DeepSeek','Gemini'
];

export default function HeroWaitlist() {
  const [success, setSuccess] = useState(false);
  const successRef = useRef(null);

  // Performance toggles
  const isMobile = useMobile();                 // hide/scale heavy bits on small screens
  const prefersReduced = useReducedMotion();    // system setting
  const marqueeRef = useRef(null);
  const marqueeInView = useInView(marqueeRef, { once: false, margin: '-10% 0px -10% 0px' });

  // Allow continuous loops only when: not reduced motion, not mobile, and visible
  const allowLoops = !prefersReduced && !isMobile && marqueeInView;

  // (Optional) mount flag to avoid SSR/window mismatch for any runtime checks you add later
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="waitlist"
      aria-labelledby="hero-title"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
    >
      {/* Ornaments: hide on mobile to avoid iOS mask perf, show on md+ */}
      {!isMobile && (
        <>
          <motion.div
            aria-hidden
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="pointer-events-none absolute left-[-60px] top-10 md:left-[-80px] md:top-16"
            style={{ willChange: 'transform', contain: 'paint' }}
          >
            <motion.div
              animate={allowLoops ? { y: [0, -10, 0] } : { y: 0 }}
              transition={allowLoops ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
            >
              {/* On iOS, CSS masks can be expensive; we keep them off on mobile. */}
              <BrandOrnament className="text-brand" size={220} />
            </motion.div>
          </motion.div>

          <motion.div
            aria-hidden
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="pointer-events-none absolute right-[-60px] bottom-6 md:right-[-80px] md:bottom-10"
            style={{ willChange: 'transform', contain: 'paint' }}
          >
            <motion.div
              animate={allowLoops ? { y: [0, 10, 0] } : { y: 0 }}
              transition={allowLoops ? { duration: 6.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
            >
              <BrandOrnament className="text-brand" size={260} mirrored />
            </motion.div>
          </motion.div>
        </>
      )}

      <div className="mx-auto max-w-6xl px-6">
        {/* Badge belt — CSS marquee (no Framer loop) */}
        <div
          ref={marqueeRef}
          className="relative mx-auto max-w-4xl overflow-hidden"
          style={{ contain: 'layout paint' }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-surface to-transparent" />

          <div
            className={`flex w-max ${(!prefersReduced && marqueeInView) ? 'marquee' : ''}`}
            style={
              (!prefersReduced && marqueeInView)
                ? (isMobile ? { animationDuration: '36s' } : undefined)
                : { transform: 'none' }
            }
          >
            <MarqueeRow compact={isMobile}>
              {(isMobile ? BADGES.slice(0, 10) : BADGES).map((label, i) => (
                <Badge key={`${label}-${i}`} label={label} />
              ))}
            </MarqueeRow>
          </div>
        </div>

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
            Stop Planning. Start Profiting. Ship Your SaaS in Days.
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

      {/* Ambient brand glow — drop heavy blur on mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(65%_55%_at_50%_0%,black,transparent)]"
      >
        {!isMobile ? (
          <div className="absolute inset-0 blur-xl opacity-30" style={{ background: 'var(--brand-glow)' }} />
        ) : (
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background: 'radial-gradient(60% 40% at 50% 0%, var(--brand-glow) 0%, transparent 70%)'
            }}
          />
        )}
      </div>
    </section>
  );
}

/* -------- helpers (JS) -------- */

function BrandOrnament({ className = '', mirrored = false, size = 260, useImageFallback = false }) {
  // If you ever want to force <img> fallback on mobile, pass useImageFallback={true}
  if (useImageFallback) {
    return (
      <img
        aria-hidden
        src="/assets/logo/ornament-prebaked.png"  /* export a pre-blurred/fill version */
        alt=""
        width={size}
        height={size}
        className={className}
        style={{ opacity: 0.45, transform: mirrored ? 'scaleX(-1)' : undefined }}
      />
    );
  }

  // CSS mask version (kept off on mobile by the parent)
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
        transform: mirrored ? 'scaleX(-1) translateZ(0)' : 'translateZ(0)',
        opacity: 0.45,
        willChange: 'transform',
        contain: 'paint'
      }}
    />
  );
}

function MarqueeRow({ children, compact = false }) {
  return (
    <div className={`flex items-center ${compact ? 'gap-1.5 pr-2' : 'gap-2 pr-4'}`}>
      {children}
      {children} {/* duplicate content to allow seamless -50% loop */}
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
