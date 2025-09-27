'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '../theme/ThemeToggle'

const NAV_LINKS = [
  { label: 'Waitlist', href: '#waitlist' },
  { label: 'Features', href: '#features' },
  { label: 'Roadmap',  href: '#roadmap' },
  { label: 'Demo',     href: '#demo' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'FAQs',     href: '#faqs' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close on hash change
  useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className="fixed left-0 top-4 z-50 w-full px-4">
      <div
        className="
          relative mx-auto flex max-w-6xl items-center justify-between
          rounded-full border border-border bg-surface/90 px-6 py-3 shadow-md backdrop-blur
          supports-[backdrop-filter]:bg-surface/60 dark:supports-[backdrop-filter]:bg-surface/50
        "
      >
        {/* Logo / Brand */}
        <div className="z-20 flex items-center gap-2">
          {/* <Image src="/nexbolt-logo.svg" alt="NexBolt" width={32} height={32} priority /> */}
          <span aria-hidden className="inline-flex h-2.5 w-2.5 rounded-full bg-brand shadow-glow" />
          <Link
            href="/"
            className="rounded-md px-1 font-semibold text-text focus:outline-none focus:ring-2 focus:ring-ring"
          >
            NexBolt
          </Link>
        </div>

        {/* Desktop nav — centered */}
        <nav
          className="
            absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-6
            text-sm md:flex
          "
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-1 text-text-muted hover:text-text focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions — right (no auth) */}
        <div className="z-10 hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href="#waitlist"
            className="
              rounded-full bg-brand px-4 py-2 text-sm font-medium text-black shadow-glow
              hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring
            "
          >
            Join Waitlist
          </a>
          <a
            href="#docs"
            className="
              rounded-full border border-border px-4 py-2 text-sm font-medium
              text-text hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring
            "
          >
            View Docs
          </a>
        </div>

        {/* Mobile actions — right */}
        <div className="z-20 flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            className="rounded-xl border border-border p-2 text-text-muted hover:text-text focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown (sheet) */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            {/* overlay */}
            <button
              className="absolute inset-0 bg-black/40"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            {/* panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25 }}
              className="
                absolute right-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto
                border-l border-border bg-surface p-6 shadow-xl
              "
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="inline-flex h-2.5 w-2.5 rounded-full bg-brand shadow-glow" />
                  <span className="font-semibold">NexBolt</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-xl border border-border p-2 text-text-muted hover:text-text focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="grid gap-2" aria-label="Mobile">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-text hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-2 grid gap-2">
                  <a
                    href="#waitlist"
                    onClick={() => setOpen(false)}
                    className="
                      rounded-full bg-brand px-4 py-2 text-center text-sm font-medium text-black shadow-glow
                      hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring
                    "
                  >
                    Join Waitlist
                  </a>
                  <a
                    href="#docs"
                    onClick={() => setOpen(false)}
                    className="
                      rounded-full border border-border px-4 py-2 text-center text-sm font-medium
                      text-text hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring
                    "
                  >
                    View Docs
                  </a>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
