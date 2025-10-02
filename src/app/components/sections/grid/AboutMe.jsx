"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AboutMe() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="w-full py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border border-transparent bg-background/60 shadow-lg backdrop-blur">

          <CardContent className="px-6 pb-8 md:px-10 md:pb-10">
            {/* Wrapped portrait */}
            <motion.figure
              initial={reduce ? {} : { opacity: 0, y: 10 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              // float on md+ so text wraps; stack on mobile
              className="
                md:float-left
                mx-auto mb-4 w-36 overflow-hidden rounded-xl ring-1 ring-border
                md:mx-0 md:mr-6 md:mb-2 md:w-44 lg:w-52
              "
            >
              {/* use fixed dims so it never feels oversized */}
              <motion.div
                whileHover={reduce ? {} : { rotateZ: -0.5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="relative"
              >
                {/* replace src with your real file */}
                <Image
                  src="/assets/arbaz-potrait-2.png"
                  alt="Arbaz Ahmad — full-stack developer"
                  width={288}   // served responsively; container width controls size
                  height={360}
                  className="h-auto w-full object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
              </motion.div>
            </motion.figure>

            {/* Copy wraps around the portrait on md+ */}
            <motion.p
              initial={reduce ? {} : { opacity: 0, y: 10 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
              className="text-base leading-relaxed text-muted-foreground md:text-left text-center"
            >
              I’m Arbaz Ahmad, a CS graduate and full-stack developer who loves turning ideas into
              solid SaaS. After launching TrackDairy and multiple client apps on NextJS , I refined the pieces that matter most: secure auth, smooth billing,
              multi-tenant data, useful analytics, and a clean, modern UI. Nexbolt brings those
              pieces together so you can launch faster and sleep better.
            </motion.p>

            {/* Clear float so what follows doesn't wrap */}

            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 10 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
              className="mt-6 flex justify-center md:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="
                  group relative
                  px-5
                  after:pointer-events-none after:absolute after:inset-0
                  after:rounded-xl after:ring-2 after:ring-primary/0
                  hover:after:ring-primary/30 focus-visible:after:ring-primary/40
                  bg-brand
                "
              >
                <Link href="#waitlist" aria-label="Join the waitlist for Nexbolt">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Join the Waitlist
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
