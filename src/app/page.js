export default function Home() {
  return (
    <section aria-labelledby="hero-title" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-text-muted">
            <span aria-hidden className="h-2 w-2 rounded-full bg-brand shadow-glow" />
            Production-ready boilerplate
          </span>

          <h1 id="hero-title" className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
            Your SaaS, <span className="text-brand">supercharged</span>.
          </h1>

          <p className="mt-4 text-lg text-text-muted">
            Auth, billing, tenancy, analytics—wired and ready. Ship in weeks, not months.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#get-started"
              className="rounded-2xl bg-brand px-5 py-3 font-medium text-black shadow-glow focus:outline-none focus:ring-2 ring-offset-0"
            >
              Get Started
            </a>
            <a
              href="#docs"
              className="rounded-2xl border border-border px-5 py-3 font-medium hover:bg-muted focus:outline-none focus:ring-2 ring-offset-0"
            >
              View Docs
            </a>
          </div>
        </div>

        {/* Example feature grid (nice starter section) */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {[
            ['Authentication', 'NextAuth (Google, email, magic links) wired for App Router.'],
            ['Billing', 'Paddle/LemonSqueezy with webhooks + plan gating.'],
            ['Multitenancy', 'Orgs/teams, invites, RBAC roles out of the box.'],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]"
      >
        <div className="absolute inset-0 blur-3xl opacity-30" style={{ background: 'var(--brand-glow)' }} />
      </div>
    </section>
  )
}
