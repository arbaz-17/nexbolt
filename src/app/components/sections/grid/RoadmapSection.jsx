"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils"; // optional; remove if not using

// ------- Data (fallback) -------
const FALLBACK = [
  { id: "v0.1", title: "Core Architecture", progress: 100 },
  { id: "v0.2", title: "Authentication", progress: 85 },
  { id: "v0.3", title: "Multi-Tenant Architecture", progress: 65 },
  { id: "v0.4", title: "Config-Driven Modules", progress: 60 },
  { id: "v0.5", title: "Emails", progress: 85 },
  { id: "v0.6", title: "Billing & Gating", progress: 20 },
  { id: "v0.7", title: "Analytics Dashboard", progress: 55 },
  { id: "v0.8", title: "AI Integration", progress: 80 },
  { id: "v0.9", title: "SEO & Landing Pages", progress: 75 },
  { id: "v1.0", title: "Nexbolt Release", progress: 45 },
];

// ------- Row (Title + Progress) -------
function FeatureRow({ item, index }) {
  const reduce = useReducedMotion();
  const pct = Math.max(0, Math.min(100, Number(item?.progress ?? 0)));

  // per-row fade-up variants (use custom index for slight stagger)
  const rowVar = {
    hidden: { opacity: 0, y: 8 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.28, ease: "easeOut", delay: i * 0.04 },
    }),
  };

  return (
    <motion.li
      custom={index}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.35 }}
      variants={rowVar}
      className="relative rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm supports-[backdrop-filter]:bg-card/50"
    >
      {/* glossy hairline top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10" />

      <button
        type="button"
        className={cn(
          "group grid w-full grid-cols-1 gap-2 rounded-xl px-4 py-3.5 pl-6 text-left outline-none",
          "focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "transition-transform duration-150 ease-out hover:-translate-y-0.5"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium leading-tight text-foreground/90">
            {item?.title}
          </span>

          {/* percentage pill */}
          <motion.span
            key={pct}
            initial={reduce ? false : { scale: 0.9, opacity: 0 }}
            animate={reduce ? undefined : { scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className={cn(
              "rounded-full border border-border/60 bg-background/80 px-2 py-0.5 text-[11px] tabular-nums text-foreground/80",
              pct === 100 && "text-foreground"
            )}
          >
            {pct}%
          </motion.span>
        </div>

        {/* Progress */}
        <div className="relative">
          <Progress
            value={pct}
            aria-label={`${item?.title ?? "Feature"} progress`}
            className={cn(
              "h-2.5 rounded-full bg-border/60",
              // Force the indicator to brand color across shadcn variants:
              "[&>div]:!bg-brand [&_[data-progress-indicator]]:!bg-brand"
            )}
          />
        </div>
      </button>
    </motion.li>
  );
}

// ------- Section -------
export function FeatureProgressSection({ items }) {
  const reduce = useReducedMotion();
  const data = Array.isArray(items) && items.length ? items : FALLBACK;

  const sectionVar = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="roadmap"
      className="w-full py-4 sm:py-6 lg:py-10"
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionVar}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* subtle grid background, theme-aware */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-x-6 -top-6 -bottom-6 -z-10 opacity-[0.05] dark:opacity-[0.07] [mask-image:radial-gradient(1200px_420px_at_center,black,transparent)]">
            <div className="h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.55)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.55)_1px,transparent_1px)] bg-[size:44px_44px]" />
          </div>

          <ul className="space-y-3 sm:space-y-3.5">
            <AnimatePresence initial={false}>
              {data.map((item, idx) => (
                <FeatureRow key={item?.id ?? idx} item={item} index={idx} />
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
