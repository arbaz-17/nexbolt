// hooks/useMobile.js
import { useEffect, useState } from 'react';

export function useMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(`(max-width:${breakpointPx - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    // Safari iOS supports addEventListener on MediaQueryList (modern versions)
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    } else {
      // Older iOS fallback
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, [breakpointPx]);

  return isMobile;
}
