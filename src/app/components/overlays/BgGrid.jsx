'use client';

import { useId } from 'react';
import clsx from 'clsx';

/**
 * SVG grid background with minor/major lines (or dots).
 * - Theme-aware via `currentColor` (set color with Tailwind classes on <svg>)
 * - Mask fade at top to keep headline readable
 * - Works at any resolution, no image assets
 */
export default function BgGrid({
  variant = 'lines',         // 'lines' | 'dots'
  size = 24,                 // minor cell size (px)
  majorEvery = 5,            // draw a stronger line/dot every N cells
  minorOpacity = 0.22,
  majorOpacity = 0.35,
  minorWidth = 1,
  majorWidth = 1.25,
  dotRadiusMinor = 0.6,
  dotRadiusMajor = 0.9,
  fade = true,               // radial fade near the top
  className = '',            // extra tailwind classes
}) {
  const uid = useId().replace(/:/g, '-'); // SSR-safe unique ids
  const minorId = `grid-minor-${uid}`;
  const majorId = `grid-major-${uid}`;

  const majorSize = size * majorEvery;

  return (
    <svg
      aria-hidden
      className={clsx(
        'pointer-events-none absolute inset-0 -z-10 text-border',
        fade && '[mask-image:radial-gradient(65%_55%_at_50%_0%,black,transparent)]',
        className
      )}
    >
      <defs>
        {variant === 'lines' ? (
          <>
            {/* Minor lines */}
            <pattern id={minorId} width={size} height={size} patternUnits="userSpaceOnUse">
              {/* Draw top + left edges so patterns join seamlessly */}
              <path
                d={`M ${size} 0 L 0 0 0 ${size}`}
                fill="none"
                stroke="currentColor"
                strokeOpacity={minorOpacity}
                strokeWidth={minorWidth}
                shapeRendering="crispEdges"
              />
            </pattern>

            {/* Major lines */}
            <pattern id={majorId} width={majorSize} height={majorSize} patternUnits="userSpaceOnUse">
              <path
                d={`M ${majorSize} 0 L 0 0 0 ${majorSize}`}
                fill="none"
                stroke="currentColor"
                strokeOpacity={majorOpacity}
                strokeWidth={majorWidth}
                shapeRendering="crispEdges"
              />
            </pattern>
          </>
        ) : (
          <>
            {/* Minor dots */}
            <pattern id={minorId} width={size} height={size} patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r={dotRadiusMinor} fill="currentColor" fillOpacity={minorOpacity} />
            </pattern>

            {/* Major dots */}
            <pattern id={majorId} width={majorSize} height={majorSize} patternUnits="userSpaceOnUse">
              <circle cx="0" cy="0" r={dotRadiusMajor} fill="currentColor" fillOpacity={majorOpacity} />
            </pattern>
          </>
        )}
      </defs>

      {/* Layer minor then major so major lines/dots sit on top */}
      <rect width="100%" height="100%" fill={`url(#${minorId})`} />
      <rect width="100%" height="100%" fill={`url(#${majorId})`} />
    </svg>
  );
}
