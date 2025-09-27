// Runs before hydration to set .dark on <html> using saved preference or system
export default function ThemeScript() {
  const code = `
  (function() {
    try {
      var stored = localStorage.getItem('theme'); // 'light' | 'dark' | null
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = stored || (systemDark ? 'dark' : 'light');
      var root = document.documentElement;
      if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
      root.style.colorScheme = theme; // better native form controls
      window.__nexboltTheme = theme; // expose for quick reads
    } catch (_) {}
  })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
