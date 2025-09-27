export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-text-muted">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} NexBolt. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-text">Privacy</a>
            <a href="#terms" className="hover:text-text">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
