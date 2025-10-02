"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, ChevronDown } from "lucide-react";

// --- Data ----------------------------------------------------------

const FAQS = [
  {
    q: "What exactly is Nexbolt?",
    a: (
      <>
        Nexbolt is a production-grade Next.js SaaS boilerplate that includes landing pages, auth,
        billing, multi-tenant foundations, email, analytics scaffolds, AI integration, and docs—
        so you can launch faster with clean, extensible code.
      </>
    ),
  },
  {
    q: "Does Nexbolt work with AI?",
    a: (
      <>
        Yes. Beyond simple integrations, Nexbolt gives your AI code editor real project context
        (naming, file structure, patterns) so you can ask for a feature and get code that fits
        your conventions in seconds.
      </>
    ),
  },
  {
    q: "Is it multi-tenant out of the box?",
    a: (
      <>
        Yes. Data and server patterns are set for multi-tenancy (tenant keys, scoped queries,
        isolation helpers). Single-tenant works by omitting tenant scoping.
      </>
    ),
  },
  {
    q: "JavaScript or TypeScript?",
    a: (
      <>
        Currently JavaScript. A TypeScript edition is planned—designed to mirror the same structure,
        naming, and best practices for easy migration.
      </>
    ),
  },
  {
    q: "App Router or Pages Router?",
    a: (
      <>
        App Router. The architecture, layouts, loading states, and server actions are designed
        around Next.js App Router best practices.
      </>
    ),
  },
  {
    q: "Which authentication providers are included?",
    a: (
      <>
        Email/password + Google by default. The auth layer is modular—enable Apple, GitHub,
        Facebook, magic links, or swap providers (Clerk, NextAuth) with minimal changes.
      </>
    ),
  },
  {
    q: "What about payments and subscriptions?",
    a: (
      <>
        Adapters for Stripe, and Lemon Squeezy. Plans, trials, webhooks, and server-side
        gating are included. Swap providers via adapter config + webhooks.
      </>
    ),
  },
  {
    q: "How customizable is the UI?",
    a: (
      <>
        Tailwind + shadcn/ui with theme tokens. Tweak palette, radius, typography, and motion fast.
        Sections are composable and reusable across pages.
      </>
    ),
  },
  {
    q: "Does it include analytics and dashboards?",
    a: (
      <>
        You get an analytics scaffold (metric cards, charts, data hooks) ready to connect to your
        domain data for KPIs, trends, and distributions.
      </>
    ),
  },
  {
    q: "Does it include emails?",
    a: (
      <>
        Yes, React email templates powered by Resend for transactional flows (welcome, verify, receipts).
        Mailchimp stubs are included for broadcasts/newsletters.
      </>
    ),
  },
  {
    q: "How is Nexbolt different from Lovable?",
    a: (
      <>
        Lovable focuses on quickly generating landing sites. Nexbolt is a full-stack SaaS foundation:
        multi-tenant backend, auth, billing, analytics scaffolds, email, and production patterns.
      </>
    ),
  },
  {
    q: "Can i get a refund?",
    a: (
      <>
        No refunds. Upon purchase you get access to the private GitHub repository, its yours.
        Review the docs and preview materials before buying.
      </>
    ),
  },
  {
    q: "Can I use Nexbolt for client projects?",
    a: (
      <>
        Yes—unlimited end-products for you or your clients. You can’t redistribute the boilerplate
        itself or resell it as a template.
      </>
    ),
  },
  {
    q: "Can I use Payoneer?",
    a: (
      <>
        Yes, I can accommodate Payoneer. Please contact me via email first so we can arrange it
        and share the payment steps.
      </>
    ),
  },
  
];


// --- Component -----------------------------------------------------

export default function FAQSection() {

  const item = { hidden: { opacity: 0 }, show: { opacity: 1 } };

  return (
    <section id="faq" className="relative w-full py-8 sm:py-10 lg:py-12">

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* FAQ */}
        <Card className="overflow-hidden border border-border/60 bg-background/70 shadow-sm backdrop-blur">
          <CardContent className="p-2 sm:p-4 md:p-6">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((itemData, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <AccordionItem
                    value={`item-${i}`}
                    className={`
                      group border-border/60
                      data-[state=open]:bg-muted/20
                      rounded-xl px-2 sm:px-3 md:px-4
                      transition-colors
                    `}
                  >
                    <AccordionTrigger
                      className={`
                        text-left hover:no-underline py-3 sm:py-4
                        md:py-5
                        flex items-start gap-3 sm:gap-4
                      `}
                    >
                      {/* Icon + number chip */}
                      <span
                        className={`
                          mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center
                          rounded-full border border-border/60 bg-background text-xs font-semibold
                          group-data-[state=open]:border-primary/30 group-data-[state=open]:bg-primary/10 group-data-[state=open]:text-primary
                        `}
                      >
                        {i + 1}
                      </span>

                      {/* Question text */}
                      <span className="flex-1 text-base font-medium leading-6 sm:text-lg">
                        {itemData.q}
                      </span>

                      {/* Animated chevron */}
                      <ChevronDown
                        className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
                        aria-hidden="true"
                      />
                    </AccordionTrigger>

                    {/* Answer panel with brand-tinted background */}
                    <AccordionContent>
                      <div
                        className={`
                          mx-2 sm:mx-3 md:mx-4 mb-4 rounded-xl border border-primary/20
                          bg-brand p-3 sm:p-4 md:p-5
                          text-sm leading-6 text-white dark:text-black
                        `}
                      >
                        {/* Optional accent rail */}
                        <div className="relative">
                          <div
                            aria-hidden
                            className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-gradient-to-b from-primary/70 to-primary/20"
                          />
                          <div className="pl-3 sm:pl-4">{itemData.a}</div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* CTA Panel */}
        <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-border/60 bg-muted/40 p-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium">Still have questions?</p>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <Button asChild className=" bg-brand flex-1 sm:flex-none">
              <a href="#waitlist">Join the Waitlist</a>
            </Button>
            <Button variant="secondary" asChild className="flex-1 sm:flex-none">
              <a href="#contact" className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
