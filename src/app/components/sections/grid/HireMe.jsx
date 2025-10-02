"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Mail, Briefcase } from "lucide-react";

/**
 * Minimal Hire Me card
 * - Place: components/sections/HireMeMini.jsx
 * - Usage: <HireMeMini contactHref="#contact" upworkHref="https://www.upwork.com/freelancers/your-id" />
 */

export default function HireMeMini({
  contactHref = "#contact",
  upworkHref = "https://www.upwork.com/freelancers/your-id",
}) {
  const reduce = useReducedMotion();

  return (
    <section id="hire-me" className="relative w-full py-6 sm:py-8 lg:py-10">
      {/* Subtle brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 mx-auto h-48 w-[92%] rounded-[999px] bg-brand blur-3xl"
      />
      <div className="mx-auto max-w-xl px-4">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 8 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Card className="border border-primary/30 bg-white dark:bg-black">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Rocket className="h-5 w-5" />
                Start your build
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-primary">
                Tell me about your idea, goals, and deadline. I’ll propose the fastest, safest path to MVP and then to revenue.
              </p>

              {/* Buttons: full-width on mobile, inline on larger screens */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Button asChild className="w-full bg-brand">
                  <a href={contactHref} className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </a>
                </Button>

                <Button asChild variant="secondary" className="w-full bg-brand text-white hover:text-black">
                  <a href={upworkHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Hire on Upwork
                  </a>
                </Button>
              </div>

              <div className="rounded-lg border border-border/60 bg-background/60 p-3">
                <p className="text-xs text-muted-foreground">
                  Prefer Payoneer? <span className="text-foreground">Email me first</span> and I’ll share the steps.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
