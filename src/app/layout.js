import './globals.css'
import Script from 'next/script'
import { ThemeProvider } from './components/theme/ThemeProvider'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Space_Grotesk, Inter } from 'next/font/google'

// Headings
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
})

// Body
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata = {
  title: 'NexBolt',
  description: 'Next.js SaaS boilerplate',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      style={{ colorScheme: 'light' }}
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <head>
        {/* Runs before hydration to prevent light/dark flash & hydration mismatch */}
        <Script id="nexbolt-theme" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var stored = localStorage.getItem('theme'); // 'light'|'dark'|null
                var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var theme = stored || (systemDark ? 'dark' : 'light');
                var root = document.documentElement;
                if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
                root.style.colorScheme = theme;
                window.__nexboltTheme = theme;
              } catch (e) {}
            })();
          `}
        </Script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
