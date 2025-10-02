"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Boxes,
  Lock,
  Users2,
  CreditCard,
  Settings2,
  BarChart3,
  Component as ComponentIcon,
  Brain,
  Database as DatabaseIcon,
  Search,
  Mail,
} from "lucide-react";

/** Small presentational badge for the last “hours saved” point */
function HoursSavedBadge({ children }) {
  return (
    <div
      className="inline-flex items-center rounded-md bg-brand px-3 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-brand/30"
      aria-label="Estimated hours saved"
    >
      {children}
    </div>
  );
}

export function FeaturesSection({ features = FEATURES, className = "" }) {
  const [active, setActive] = useState(0);
  const safe = Array.isArray(features) ? features.filter(Boolean) : [];
  const ActiveIcon = safe[active]?.icon || Boxes;

  const reduce = useReducedMotion();

  // --- Motion variants (fade-up + stagger) ---
  const sectionVar = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const gridVar = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.04, delayChildren: 0.06 },
    },
  };

  const gridItemVar = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const panelVar = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.06 },
    },
  };

  const childVar = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="features"
      className={`w-full py-10 md:py-12 lg:py-16 ${className || ""}`}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVar}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Icon tabs (icon-only, no bg) */}
        <motion.div
          className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-11 gap-2.5 sm:gap-3"
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
          variants={gridVar}
        >
          {safe.map((f, i) => {
            const Icon = f.icon || Boxes;
            const selected = i === active;
            return (
              <motion.button
                key={f.title || i}
                onClick={() => setActive(i)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-pressed={selected}
                className={[
                  "cursor-pointer rounded-xl border transition-all",
                  "flex items-center justify-center p-3 sm:p-3.5",
                  selected
                    ? "border-brand/50 ring-2 ring-brand/25 shadow-sm"
                    : "border-border hover:border-brand/40 hover:shadow-sm",
                ].join(" ")}
                title={f.title}
                variants={gridItemVar}
              >
                <Icon
                  className={[
                    "h-5 w-5 sm:h-6 sm:w-6 transition-colors",
                    selected
                      ? "text-brand"
                      : "text-muted-foreground group-hover:text-brand",
                  ].join(" ")}
                />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active detail panel */}
        <div className="mt-6 sm:mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={safe[active]?.title || active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="border border-border bg-card/80 backdrop-blur-sm shadow-sm">
                <CardContent className="p-5 sm:p-6 md:p-8">
                  {/* Two-column detail: text left, image right (stacks on small) */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start"
                    initial={reduce ? false : "hidden"}
                    whileInView={reduce ? undefined : "show"}
                    viewport={{ once: true, amount: 0.35 }}
                    variants={panelVar}
                  >
                    {/* Left: title + bullets */}
                    <motion.div className="md:col-span-7" variants={childVar}>
                      <motion.div className="flex items-center gap-3" variants={childVar}>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-brand">
                          <ActiveIcon className="h-5 w-5" />
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                          {safe[active]?.title}
                        </h3>
                      </motion.div>

                      {(() => {
                        const pts = Array.isArray(safe[active]?.points)
                          ? safe[active]?.points
                          : [];
                        const hasPoints = pts.length > 0;
                        const lastPoint = hasPoints ? pts[pts.length - 1] : "";
                        const normalPoints =
                          pts.length > 1 ? pts.slice(0, -1) : [];

                        return (
                          <div className="mt-3 sm:mt-4">
                            {/* Regular bullets (all except the last) */}
                            {normalPoints.length > 0 && (
                              <motion.ul
                                className="space-y-2.5 sm:space-y-3 list-disc pl-5 sm:pl-6"
                                variants={panelVar}
                              >
                                {normalPoints.map((p, i) => (
                                  <motion.li
                                    key={i}
                                    className="leading-relaxed text-muted-foreground"
                                    variants={childVar}
                                  >
                                    {p}
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}

                            {/* Last point as a non-bulleted badge */}
                            {lastPoint && (
                              <motion.div
                                className={normalPoints.length ? "mt-4" : ""}
                                variants={childVar}
                              >
                                <HoursSavedBadge>{lastPoint}</HoursSavedBadge>
                              </motion.div>
                            )}
                          </div>
                        );
                      })()}
                    </motion.div>

                    {/* Right: image (stacks below on small screens) */}
                    <motion.div className="md:col-span-5" variants={childVar}>
                      {safe[active]?.imageSrc ? (
                        <motion.div
                          className="overflow-hidden rounded-xl border border-border bg-white"
                          variants={childVar}
                        >
                          <div
                            className="relative w-full"
                            style={{ paddingTop: "56.25%" }}
                          >
                            <FloatingImage amplitude={14} duration={10}>
                              <Image
                                src={safe[active]?.imageSrc}
                                alt={
                                  safe[active]?.imageAlt ||
                                  safe[active]?.title ||
                                  "Feature image"
                                }
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 560px"
                                className="object-contain"
                                priority={active < 2}
                              />
                            </FloatingImage>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground"
                          variants={childVar}
                        >
                          Preview coming soon
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

function FloatingImage({ children, amplitude = 12, duration = 8 }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0"
      animate={
        reduce
          ? { y: 0 }
          : { y: [0, -amplitude, 0, amplitude, 0] } // up → center → down → center (loop)
      }
      transition={{
        duration, // total loop duration (seconds)
        repeat: Infinity, // loop forever
        ease: "easeInOut", // smooth in/out
      }}
    >
      {children}
    </motion.div>
  );
}



/* ---------- Data (icons included) ---------- */

export const FEATURES = [
  {
    title: "Core Architecture",
    icon: Boxes,
    points: [
      "Modern Next.js App Router stack with Tailwind and shadcn/ui.",
      "Predictable project layout with ESLint, npm scripts, and .env examples.",
      "Available in JavaScript and TypeScript.",
      "Single codebase for UI and APIs for faster development and deploys.",
      "All in One Package.",
      "24+ hours saved",
    ],
    imageSrc: "/assets/features/core.png",
  },
  {
    title: "Authentication",
    icon: Lock,
    points: [
      "Choose between NextAuth or Clerk, both prewired and documented.",
      "Social sign-in out of the box (Google, GitHub) with easy add-ons.",
      "Passwordless magic links with ready-to-edit email templates.",
      "Role-based access controlling pages, API routes, and admin sections.",
      "User management for invites, role changes, and deactivation.",
      "12+ hours saved",
    ],
    imageSrc: "/assets/features/auth.png",
  },
  {
    title: "Multi-Tenancy",
    icon: Users2,
    points: [
      "Every table includes tenant id, scoping queries to the active tenant.",
      "RLS available with pre-made policies that can be enabled when needed.",
      "Roles & permissions evaluated per tenant so users access what’s theirs.",
      "Teams with invites, transfer, and quick switching between tenants.",
      "Local seeds for multiple tenants and isolation tests.",
      "10+ hours saved",
    ],
    imageSrc: "/assets/features/mt.png",
  },
  {
    title: "Billing & Payments",
    icon: CreditCard,
    points: [
      "Stripe and LemonSqueezy with a unified interface switched via .env.",
      "Checkout flows, webhooks, and subscription status synced to DB.",
      "Plan-based rules that gate features and routes without provider logic.",
      "Trial, upgrade, downgrade, and proration support.",
      "Test keys and seed scripts for local end-to-end payment simulations.",
      "8+ hours saved",
    ],
    imageSrc: "/assets/features/payment.png",
  },
  {
    title: "Config-Driven Modules",
    icon: Settings2,
    points: [
      "Config-driven columns/filters/forms, auto-generated CRUD + APIs.",
      "Shared Zod schemas across UI & API for consistent validation.",
      "Built-in CSV/PDF export.",
      "Reusable table/form components with sorting, filtering, pagination.",
      "Add modules in minutes with consistent behavior across the app.",
      "10+ hours saved",
    ],
    imageSrc: "/assets/features/config.png",
  },
  {
    title: "Analytics Dashboard",
    icon: BarChart3,
    points: [
      "Built-in helpers for KPIs, trends, and distributions ready to use.",
      "Custom chart components that work on across different platforms.",
      "SQL templates for common metrics you can copy, tweak, and extend.",
      "Loading states so dashboards feel complete even before data arrives.",
      "Seeded demo data to preview real charts locally and verify performance.",
      "12+ hours saved",
    ],
    imageSrc: "/assets/features/analytics.png",
  },
  {
    title: "AI Integration",
    icon: Brain,
    points: [
      "Prewired OpenAI & DeepSeek clients via simple envs.",
      "Ready API endpoints & React hooks for chat, autocomplete, assistants.",
      "Insights patterns, summaries, anomalies, NLP over your data.",
      "Rate limits + prompt/response logging for cost & usage control.",
      "Built-in workflows for AI dev tools to speed scaffolding & refactors",
      "6+ hours saved",
    ],
    imageSrc: "/assets/features/ai.png",
  },
  {
    title: "Database",
    icon: DatabaseIcon,
    points: [
      "PostgreSQL-first with easy Supabase hosting, migrations included.",
      "MongoDB adapter for document-style modules when it fits better.",
      "Raw SQL for control or Prisma for DX—both documented patterns.",
      "Clean layers: routes → controllers/services → data access.",
      "Pooling, transactions, and helpers for pagination, filtering, soft deletes.",
      "10+ hours saved",
    ],
    imageSrc: "/assets/features/db.png",
  },
  {
    title: "Email",
    icon: Mail,
    points: [
      "Resend and Mailchimp prewired via environmental vars.",
      "Transactional events, sign-up, password reset, invoices, invites etc.",
      "React email templates with variants & custom theming.",
      "4+ hours saved",
    ],
    imageSrc: "/assets/features/email.png",
  },
  {
    title: "UI Kit",
    icon: ComponentIcon,
    points: [
      "Highly customizable pre-made landing pages.",
      "Reusable, a11y-first components aligned to the design system.",
      "Ready-made blocks: buttons, inputs, cards, modals, tables, carousels.",
      "Framer Motion animations with gentle defaults & micro-interaction hooks.",
      "Theme-aware chart components wired to analytics helpers.",
      "12+ hours saved",
    ],
    imageSrc: "/assets/features/ui.png",
  },
  {
    title: "SEO",
    icon: Search,
    points: [
      "Next.js metadata: titles, descriptions, canonicals, clean routes.",
      "OG/Twitter cards + dynamic OG image generator for shareable preview.",
      "Build-time sitemap & robots.txt with sane staging noindex rules.",
      "JSON-LD snippets for product, article, and breadcrumbs.",
      "Perf-friendly defaults: semantic HTML, a11y headings, alts, preload hints.",
      "8+ hours saved",
    ],
    imageSrc: "/assets/features/seo.png",
  },
];

