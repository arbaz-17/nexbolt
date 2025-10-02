'use client'
import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()

  const Icon = theme === 'dark' ? Sun : Moon
  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
<button
  onClick={toggle}
  aria-label={label}
  className={`inline-flex items-center gap-2 rounded-2xl border border-border px-3 py-1.5 text-sm text-text hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring ${className}`}
>
  <Icon size={16} />
</button>
  )
}
