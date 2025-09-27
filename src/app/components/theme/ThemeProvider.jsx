'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', setTheme: () => {}, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    // read the value set by ThemeScript (already decided before paint)
    if (typeof window !== 'undefined' && window.__nexboltTheme) return window.__nexboltTheme
    return 'light'
  })

  // Apply theme to <html> and persist
  const setTheme = (t) => {
    setThemeState(t)
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.classList.toggle('dark', t === 'dark')
      root.style.colorScheme = t
    }
    try { localStorage.setItem('theme', t) } catch {}
  }

  // Sync with system changes when user hasn't explicitly chosen
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('theme')
    if (stored) return // user override — don't auto switch with system
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setTheme(mq.matches ? 'dark' : 'light')
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark')
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
