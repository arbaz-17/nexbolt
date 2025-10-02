'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
  toggle: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    // Prefer the value set by the pre-hydration script
    if (typeof window !== 'undefined' && window.__nexboltTheme) {
      return window.__nexboltTheme
    }
    // SSR / very early: match the DOM if already has .dark, else default dark
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    }
    return 'dark'
  })

  const setTheme = (t) => {
    setThemeState(t)
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      root.classList.toggle('dark', t === 'dark')
      root.style.colorScheme = t
    }
    try { localStorage.setItem('theme', t) } catch {}
  }

  // If user has NOT chosen a theme, optionally sync with system changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('theme')
    if (stored) return // user override — don't auto switch with system
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setTheme(mq.matches ? 'dark' : 'light')
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
