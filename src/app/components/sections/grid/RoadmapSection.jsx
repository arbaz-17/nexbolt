"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, LinkIcon, CheckCircle2, Wrench, Rocket, Clock } from "lucide-react";

/**
 * Nexbolt Roadmap — Minimal Timeline
 * - No title/description block
 * - No filters or search
 * - Timeline-only view
 * - Improved visuals & responsiveness
 */

const STATUS_META = {
  Stable: { color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", icon: CheckCircle2 },
  Beta: { color: "bg-amber-500/15 text-amber-400 border-amber-500/20", icon: Wrench },
  "Dev Preview": { color: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20", icon: Rocket },
  Planned: { color: "bg-slate-500/15 text-slate-400 border-slate-500/20", icon: Clock },
};

const ROADMAP = [
  {
    id: "v0.1",
    version: "v0.1",
    title: "Foundation",
    status: "Stable",
    progress: 100,
    start: "2025-09-25",
    target: "2025-09-28",
    highlights: [
      "App Router, Tailwind/ShadCN, tokens, theming baseline",
      "Env pipeline with Zod; 404/500; CI: typecheck/lint/build",
    ],
  },
  {
    id: "v0.2",
    version: "v0.2",
    title: "Authentication",
    status: "Stable",
    progress: 100,
    start: "2025-09-28",
    target: "2025-09-30",
    highlights: [
      "NextAuth/Clerk/Supabase switch, Google/GitHub, magic links",
      "Session helpers, protected routes, minimal settings page",
    ],
  },
  {
    id: "v0.3",
    version: "v0.3",
    title: "Tenants & Teams",
    status: "Beta",
    progress: 78,
    start: "2025-09-30",
    target: "2025-10-04",
    highlights: [
      "tenant_id on entities, org/workspace creation",
      "Invites, roles (Owner/Admin/Member), tenant switcher",
    ],
  },
  {
    id: "v0.4",
    version: "v0.4",
    title: "Config-Driven Modules",
    status: "Beta",
    progress: 62,
    start: "2025-10-04",
    target: "2025-10-08",
    highlights: [
      "Config → CRUD screens & APIs; shared Zod",
      "Tables/forms with filters, pagination; CSV/PDF export",
    ],
  },
  {
    id: "v0.5",
    version: "v0.5",
    title: "Email",
    status: "Beta",
    progress: 55,
    start: "2025-10-06",
    target: "2025-10-09",
    highlights: [
      "Resend + Mailchimp wiring, env-driven",
      "React Email templates: verify, invites, magic link, receipts",
    ],
  },
  {
    id: "v0.6",
    version: "v0.6",
    title: "Billing & Gating",
    status: "Dev Preview",
    progress: 36,
    start: "2025-10-08",
    target: "2025-10-14",
    highlights: [
      "Stripe + LemonSqueezy drivers, webhooks → subscriptions",
      "Plan gating (middleware/HOC), trials, upgrade/downgrade",
    ],
  },
  {
    id: "v0.7",
    version: "v0.7",
    title: "Analytics",
    status: "Dev Preview",
    progress: 25,
    start: "2025-10-10",
    target: "2025-10-16",
    highlights: [
      "KPIs, trends, distributions; theme-aware charts",
      "Seeded demo data, loading states, empty states",
    ],
  },
  {
    id: "v0.8",
    version: "v0.8",
    title: "AI Integration",
    status: "Planned",
    progress: 10,
    start: "2025-10-15",
    target: "2025-10-20",
    highlights: [
      "OpenAI/DeepSeek wrappers, insights & autocomplete",
      "Tenant rate limits, prompt/response logging & redaction",
    ],
  },
  {
    id: "v0.9",
    version: "v0.9",
    title: "SEO & Landing",
    status: "Planned",
    progress: 5,
    start: "2025-10-18",
    target: "2025-10-22",
    highlights: [
      "Metadata, OG generator, sitemap/robots, JSON-LD",
      "3 landing templates with forms wired to Resend",
    ],
  },
  {
    id: "v1.0",
    version: "v1.0",
    title: "Release",
    status: "Planned",
    progress: 0,
    start: "2025-10-22",
    target: "2025-10-25",
    highlights: [
      "Security hardening, indices, backups, telemetry",
      "Docs polish, examples, matrix, launch post",
    ],
  },
];

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.Planned;
  const Icon = meta.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium ${meta.color}`}>
      <Icon className="h-3.5 w-3.5" /> {status}
    </span>
  );
}

function formatDate(s) {
  if (!s) return "TBD";
  try {
    const d = new Date(s);
    return d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
  } catch {
    return s;
  }
}

function RoadmapItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: index * 0.02 }}
      className="relative pl-0 sm:pl-14"
    >
      {/* timeline dot */}
      <div className="absolute left-0 top-6 hidden h-2 w-2 -translate-x-1 rounded-full bg-primary sm:block" />

      <Card className="group relative overflow-hidden border-border/60 bg-gradient-to-b from-surface/80 to-background/60 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 group-hover:ring-white/10" />
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="rounded-full px-2 py-0.5 font-mono">
                {item.version}
              </Badge>
              {/*<StatusBadge status={item.status} />*/}
            </div>
            <CardTitle className="mt-1 text-lg leading-tight">{item.title}</CardTitle>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <div className="flex items-center justify-end gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {formatDate(item.start)} → {formatDate(item.target)}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="">
          {/* progress chip */}
          <div className="flex items-center gap-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-brand transition-all duration-500"
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">{item.progress}%</span>
          </div>

          <ul className="grid gap-1.5 text-sm text-muted-foreground">
            {item.highlights?.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-none" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {item.links?.length ? (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {item.links.map((l, i) => (
                <Button asChild key={i} size="sm" variant="link" className="px-0">
                  <a href={l.href} className="inline-flex items-center gap-1">
                    <LinkIcon className="h-3.5 w-3.5" /> {l.label}
                  </a>
                </Button>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function RoadmapSection({ className = "" }) {
  return (
    <section id="roadmap" className={`w-full py-10 sm:py-12 lg:py-16 ${className}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* persistent timeline rail (now visible on mobile too) */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:left-4" />

          <div className="space-y-6 sm:space-y-7">
            <AnimatePresence>
              {ROADMAP.map((item, idx) => (
                <RoadmapItem key={item.id} item={item} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <RoadmapSection />
    </main>
  );
}
