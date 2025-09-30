'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TechStackGrid({
  items = DEFAULT_TECH_ITEMS,
  className = '',
}) {
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut', staggerChildren: 0.04, delayChildren: 0.08 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 8 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <section className={`relative py-10 md:py-14 ${className} border border-amber-500`}>
      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-6xl px-6 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3 md:gap-4"
        role="list"
      >
        {items.map((it, idx) => (
          <motion.li key={`${it.label}-${idx}`} variants={item}>
            <IconCard item={it} idx={idx} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

/* ---------- card ---------- */

function IconCard({ item, idx }) {
  const { label, src, srcLight, srcDark, Icon } = item;
  const fallbackId = useId();
  const tooltipId = `tech-tooltip-${idx ?? ''}-${(label || '').toLowerCase().replace(/\s+/g, '-') || 'item'}-${fallbackId}`;

  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-describedby={tooltipId}
      className="
        group relative w-full aspect-square rounded-xl
        border border-border bg-surface
        flex items-center justify-center
        outline-none
        transition-[transform,box-shadow,filter,border-color]
        hover:brand-border hover:brand-glow
        focus-visible:brand-border focus-visible:brand-glow
      "
      whileHover={{ y: -4, rotate: 0.25 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon */}
      <div className="relative flex items-center justify-center h-[62%] w-[62%] md:h-[58%] md:w-[58%]">
        {srcLight && srcDark ? (
          <>
            <Image
              src={srcLight}
              alt={label}
              width={128}
              height={128}
              className="h-full w-full object-contain block dark:hidden"
              loading="lazy"
              style={{ color: 'initial' }}
              draggable={false}
            />
            <Image
              src={srcDark}
              alt=""
              width={128}
              height={128}
              className="hidden dark:block h-full w-full object-contain"
              loading="lazy"
              draggable={false}
              aria-hidden
            />
          </>
        ) : src ? (
          src.endsWith('.svg') ? (
            <>
              {/* Light: dark tint */}
              <div
                className="block dark:hidden h-full w-full text-black"
                style={{
                  background: 'currentColor',
                  maskImage: `url(${src})`,
                  WebkitMaskImage: `url(${src})`,
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
              {/* Dark: light tint */}
              <div
                className="hidden dark:block h-full w-full text-white"
                style={{
                  background: 'currentColor',
                  maskImage: `url(${src})`,
                  WebkitMaskImage: `url(${src})`,
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
                aria-hidden
              />
            </>
          ) : (
            <Image
              src={src}
              alt={label}
              width={128}
              height={128}
              className="h-full w-full object-contain"
              loading="lazy"
              draggable={false}
            />
          )
        ) : Icon ? (
          <Icon className="h-full w-full" aria-hidden />
        ) : (
          <span className="text-xs text-text-muted">{label}</span>
        )}
      </div>

      {/* Tooltip */}
      <div
        id={tooltipId}
        role="tooltip"
        className="
          pointer-events-none absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full
          whitespace-nowrap rounded-md bg-brand px-2.5 py-1
          text-xs font-semibold text-white shadow-md ring-1 ring-brand/30
          opacity-0 translate-y-1
          transition-all duration-150 ease-out
          group-hover:opacity-100 group-hover:translate-y-0
          group-focus-visible:opacity-100 group-focus-visible:translate-y-0
        "
      >
        {label}
        {/* caret */}
        <span
          aria-hidden
          className="
            absolute left-1/2 top-full -translate-x-1/2
            w-2 h-2 rotate-45
            bg-brand ring-1 ring-brand/30
          "
        />
      </div>

      <span className="sr-only">{label}</span>
    </motion.button>
  );
}


/* ---------- defaults (example) ---------- */
/* Prefer providing both srcLight/srcDark for crisp control */
const DEFAULT_TECH_ITEMS = [
  { label: 'Next.js',       src: '/assets/tech/next.svg' },
  { label: 'React',         src: '/assets/tech/react.svg' },
  { label: 'TypeScript',    src: '/assets/tech/ts.svg' },
  { label: 'JavaScript',    src: '/assets/tech/js.svg' },

  { label: 'Tailwind CSS',  src: '/assets/tech/tailwind.svg' },
  { label: 'shadcn/ui',     src: '/assets/tech/shadcnui.svg' },
  { label: 'Zod',           src: '/assets/tech/zod.svg' },

  { label: 'Clerk',         src: '/assets/tech/clerk.svg' },
  
  { label: 'Supabase', src: '/assets/tech/supabase.svg' },
  { label: 'PostgreSQL',    src: '/assets/tech/postgresql.svg' },
  { label: 'Prisma',        src: '/assets/tech/prisma.svg' },
  { label: 'MongoDB',       src: '/assets/tech/mongodb.svg' },
  { label: 'Upstash',       src: '/assets/tech/upstash.svg' },
  { label: 'Resend',         src: '/assets/tech/resend.svg' },

  { label: 'Stripe',        src: '/assets/tech/stripe.svg' },
  { label: 'LemonSqueezy',  src: '/assets/tech/lemonsqueezy.svg' },

  { label: 'OpenAI',        src: '/assets/tech/openai.svg' },
  { label: 'Deepseek',      src: '/assets/tech/deepseek.svg' },

  { label: 'Mailchimp',     src: '/assets/tech/mailchimp.svg' },

  { label: 'Vercel',        src: '/assets/tech/vercel.svg' },
];
