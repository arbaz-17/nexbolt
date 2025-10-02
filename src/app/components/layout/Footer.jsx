"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, ExternalLink, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Waitlist", href: "#waitlist" },
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Licenses", href: "/licenses" },
];

const MAKER_LINKS = [
  { label: "TrackDairy", href: "https://trackdairy.com", external: true },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/your-handle", Icon: Github },
  { label: "Twitter / X", href: "https://twitter.com/your-handle", Icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle", Icon: Linkedin },
];

export default function Footer({ className = "" }) {
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer
      className={
        "w-full border-t border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 " +
        className
      }
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1) Logo + Overview */}
          <div className="space-y-2">
            <Link href="/" aria-label="Nexbolt Home" className="inline-flex items-center gap-3">
              {/* Light logo (shown when NOT dark) */}
              <Image
                src="/assets/logo/logo-light-2.svg"
                alt="Nexbolt logo"
                width={48}
                height={48}
                className="block h-12 w-12 dark:hidden"
                priority
              />
              {/* Dark logo (shown when .dark on <html>) */}
              <Image
                src="/assets/logo/logo-dark-3.svg"
                alt="Nexbolt logo"
                width={48}
                height={48}
                className="hidden h-12 w-12 dark:block"
                priority
              />
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground">
              A modern Next.js SaaS boilerplate with clean architecture, prewired auth, billing, emails,
              and analytics, so you can launch faster with confidence.
            </p>

            <div className="mt-4 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 transition hover:scale-[1.02] hover:border-border focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* 2) Links */}
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/80">
              Links
            </h3>
            <ul className="grid gap-2">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-foreground/90 transition hover:text-brand"
                  >
                    <span>{item.label}</span>
                    <span className="block h-px w-0 bg-foreground/50 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3) Legal */}
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/80">
              Legal
            </h3>
            <ul className="grid gap-2">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/90 transition hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 4) By the maker */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground/80">
              By the maker of Nexbolt
            </h3>
            <ul className="grid gap-2">
              {MAKER_LINKS.map(({ label, href, external }) => (
                <li key={href}>
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 text-sm text-foreground/90 transition hover:text-foreground"
                  >
                    <span>{label}</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Built by Arbaz Ahmad
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nexbolt. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/changelog"
              className="text-xs text-muted-foreground transition hover:text-foreground"
            >
              Changelog
            </Link>
            <button
              onClick={scrollToTop}
              type="button"
              title="Back to top"
              aria-label="Back to top"
              className={`inline-flex h-8 items-center gap-1 rounded-md border border-border/60 px-2 text-xs transition hover:scale-[1.02] hover:border-border focus:outline-none focus:ring-2 focus:ring-ring ${
                showToTop ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
