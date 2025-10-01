"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

/* -----------------------------------------
   Inline Pricing Data (one-time payments)
------------------------------------------*/
const PRICING_PLANS = [
  {
    id: "starter",
    title: "Starter",
    badge: "Indie",
    popular: false,
    tagline: "Fast MVPs",
    price: {
      oneTime: 129,           // one-time payment
      currency: "USD",
      compareAt: 159,         // optional strikethrough
      discountPercent: 19,    // optional; auto-calculated if omitted
    },
    cta: { label: "Get Starter", href: "#checkout-starter" },
    features: [
      "Next.js App Router Boilerplate",
      "Tailwind + shadcn/ui + Framer Motion",
      "UI Kit + 1 Landing Page Template",
      "NextAuth (Social Logins + Magic Link)",
      "Resend / Mailchimp",
      "Supabase / MongoDB (Prisma)",
      "Stripe / LemonSqueezy",
      "AI Integration",
      "Basic SEO",
      "ChatGPT prompts for privacy and terms",
      "Docs & 10-minute Quickstart",
    ],
  },
  {
    id: "premium",
    title: "Premium",
    popular: true,
    tagline: "Team-ready SaaS",
    price: {
      oneTime: 199,
      currency: "USD",
      compareAt: 249,
      discountPercent: 20,
    },
    cta: { label: "Go Premium", href: "#checkout-premium" },
    features: [
      "Everything in Starter + 2 Landing Page Templates",
      "NextAuth / Clerk Authentication",
      "Role Based Access for Teams",
      "Six React Email templates",
      "Plan-Based Feature Gating",
      "Rate Limiting for Sensitive Endpoints",
      "Dashboard Tools with Filters, Pagination, CSV/PDF Exports",
      "Analytics Starter with KPIs, Trends and Distributions.",
      "Advance SEO & Blog Scaffold",
      "Lifetime Updates"
    ],
  },
  {
    id: "pro",
    title: "Pro",
    badge: "For Teams",
    popular: false,
    tagline: "Multi-Tenant B2B SaaS",
    price: {
      oneTime: 349,
      currency: "USD",
      compareAt: 449,
      discountPercent: 22,
    },
    cta: { label: "Get Pro", href: "#checkout-pro" },
    features: [
      "Everything in Premium",
      "Advanced Multi-Tenant Architecture",
      "Postgres RLS Policies",
      "Permissions Based Feature Access",
      "Built in Background Jobs",
      "Per-Tenant Dashboards",
      "Extended Analytics & Charts Suite",
      "Lifetime Updates & Priority Support",
    ],
  },
];

/* -----------------------------------------
   Helpers
------------------------------------------*/
function formatCurrency(amount, currency) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount}`;
  }
}

function getDiscountPercent(plan) {
  const { compareAt, discountPercent, oneTime } = plan.price || {};
  if (typeof discountPercent === "number") return discountPercent;
  if (compareAt && compareAt > oneTime) {
    return Math.round(((compareAt - oneTime) / compareAt) * 100);
  }
  return 0;
}

/* -----------------------------------------
   UI Bits
------------------------------------------*/
function PopularRibbon() {
  return (
    <div className="absolute -top-3 right-4 z-10">
      <span className="inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-xs font-medium text-white shadow">
        <Sparkles className="h-3.5 w-3.5" />
        Most Popular
      </span>
    </div>
  );
}

function PriceRow({ plan }) {
  const { oneTime, currency, compareAt, note } = plan.price;
  const discount = getDiscountPercent(plan);

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2">
        <div className="text-4xl font-semibold leading-none tracking-tight">
          {formatCurrency(oneTime, currency)}
        </div>
        {compareAt && compareAt > oneTime ? (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground line-through">
              {formatCurrency(compareAt, currency)}
            </span>
            {discount > 0 && (
              <Badge variant="secondary" className="rounded px-2 py-0.5 text-xs">
                {discount}% off
              </Badge>
            )}
          </div>
        ) : null}
      </div>
      {note ? <p className="text-sm text-muted-foreground">{note}</p> : null}
    </div>
  );
}

function FeatureItem({ children }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <span className="text-sm leading-6 text-muted-foreground">{children}</span>
    </li>
  );
}

function PlanCard({ plan, index }) {
  const isPopular = !!plan.popular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative h-full"
    >
      {isPopular && <PopularRibbon />}
      <Card
        className={[
          "group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/70",
          isPopular ? "ring-1 ring-brand" : "",
        ].join(" ")}
      >
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{plan.title}</CardTitle>
            {plan.badge ? <Badge variant="outline">{plan.badge}</Badge> : null}
          </div>
          {plan.tagline ? (
            <p className="text-sm text-muted-foreground">{plan.tagline}</p>
          ) : null}
        </CardHeader>

        <CardContent className="space-y-6">
          <PriceRow plan={plan} />

          <Button
            asChild
            className={[
              "w-full",
              isPopular
                ? "bg-brand text-white hover:bg-white hover:text-brand"
                : "",
            ].join(" ")}
          >
            <a href={plan.cta.href} aria-label={`${plan.title} – ${plan.cta.label}`}>
              {plan.cta.label}
            </a>
          </Button>

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              What’s inside
            </p>
            <ul className="space-y-2.5">
              {plan.features.map((f, i) => (
                <FeatureItem key={i}>{f}</FeatureItem>
              ))}
            </ul>
          </div>
        </CardContent>

        {/* subtle hover border glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[--radius] ring-0 ring-purple-500/0"
          whileHover={{ boxShadow: "0 0 0 2px rgba(168,85,247,0.25)" }}
          transition={{ duration: 0.2 }}
        />
      </Card>
    </motion.div>
  );
}

/* -----------------------------------------
   Main Component
------------------------------------------*/
export default function PricingTabs() {
  const plans = PRICING_PLANS;
  const defaultTab = useMemo(
    () => plans.find((p) => p.popular)?.id ?? plans[0]?.id,
    [plans]
  );

  return (
    <section id="pricing" className="w-full py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Mobile: Tabs */}
        <div className="md:hidden">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {plans.map((p) => (
                <TabsTrigger key={p.id} value={p.id} className="text-xs md:text-sm">
                  {p.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {plans.map((p, i) => (
              <TabsContent key={p.id} value={p.id} className="mt-6">
                <PlanCard plan={p} index={i} />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Desktop: 3-column cards */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
          {plans.map((p, i) => (
            <PlanCard key={p.id} plan={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
