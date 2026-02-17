'use client';

import { useEffect, useRef, useState } from 'react';

const LABELS = ['DESIGN', 'SHIP', 'ITERATE'] as const;
const ROTATION_S = 24; // seconds per full revolution
const PULSE_INTERVAL_S = ROTATION_S / LABELS.length; // 8s between center crossings

// Geometry — large radius so the crown spans roughly edge-to-edge
const RADIUS = 1550;
const SVG_SIZE = RADIUS * 2;
const ARC_HEIGHT = 200; // visible arc depth below the apex

// Visible arc timing — labels traverse the visible arc in ~3.7s.
// Pulse covers the middle third of the arc (starts at 1/3 from entry, ends at 2/3).
const VISIBLE_ANGLE = 2 * Math.acos((RADIUS - ARC_HEIGHT) / RADIUS) * (180 / Math.PI);
const TRAVERSE_S = (VISIBLE_ANGLE / 360) * ROTATION_S;
const PULSE_DURATION_MS = Math.round((TRAVERSE_S / 3) * 1000); // ~1250ms
const PULSE_LEAD_MS = Math.round((TRAVERSE_S / 6) * 1000);     // ~620ms before center

// Label positions on the clockwise path (%). Calculated so with counter-clockwise
// SVG rotation, ITERATE reaches the crown apex (top) at the first pulse center (8s),
// DESIGN at 16s, SHIP at 24s.
const LABEL_OFFSETS = [66.67, 0, 33.33]; // DESIGN, SHIP, ITERATE
const PULSE_ORDER = [2, 0, 1]; // ITERATE → DESIGN → SHIP

export default function AmbientLoop() {
  const [pulseIdx, setPulseIdx] = useState<number | null>(null);
  const countRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const clearRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const pulse = () => {
      const idx = PULSE_ORDER[countRef.current % 3];
      setPulseIdx(idx);

      if (idx === 2) {
        window.dispatchEvent(new Event('iterate-pulse'));
      }

      // End pulse after the middle third duration
      if (clearRef.current) clearTimeout(clearRef.current);
      clearRef.current = setTimeout(() => setPulseIdx(null), PULSE_DURATION_MS);

      countRef.current++;
    };

    // First pulse starts when the first label reaches the 1/3 entry mark
    const firstDelay = PULSE_INTERVAL_S * 1000 - PULSE_LEAD_MS;

    const first = setTimeout(() => {
      pulse();
      intervalRef.current = setInterval(pulse, PULSE_INTERVAL_S * 1000);
    }, firstDelay);

    return () => {
      clearTimeout(first);
      if (clearRef.current) clearTimeout(clearRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const cx = RADIUS;
  const cy = RADIUS;

  // Clockwise full circle — text reads left-to-right at the top (crown) arc
  const d = [
    `M ${cx},${cy - RADIUS}`,
    `A ${RADIUS},${RADIUS} 0 0,1 ${cx},${cy + RADIUS}`,
    `A ${RADIUS},${RADIUS} 0 0,1 ${cx},${cy - RADIUS}`,
  ].join(' ');

  return (
    <>
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden hidden md:block"
        style={{ height: ARC_HEIGHT, zIndex: 1 }}
        aria-hidden="true"
      >
        {/* Positioning wrapper — crown apex at top of container */}
        <div
          className="absolute left-1/2"
          style={{
            width: SVG_SIZE,
            height: SVG_SIZE,
            marginLeft: -RADIUS,
            top: 16, // offset so text at the apex isn't clipped
          }}
        >
          {/* Counter-clockwise rotation — labels enter from the right */}
          <div
            className="w-full h-full will-change-transform"
            style={{ animation: `ambient-spin ${ROTATION_S}s linear infinite reverse` }}
          >
            <svg
              width={SVG_SIZE}
              height={SVG_SIZE}
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
            >
              <defs>
                <path id="necklace" d={d} fill="none" />
              </defs>

              {/* Faint circle outline */}
              <circle
                cx={cx}
                cy={cy}
                r={RADIUS}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.5"
                opacity="0.03"
              />

              {/* Labels */}
              {LABELS.map((label, i) => {
                const isIterate = i === 2;
                const isPulsing = pulseIdx === i;

                return (
                  <text
                    key={label}
                    textAnchor="middle"
                    style={{
                      fontSize: 14,
                      letterSpacing: 8,
                      fontFamily: 'system-ui, sans-serif',
                      fontWeight: 500,
                      fill: isPulsing && isIterate ? '#ef4444' : '#ffffff',
                      opacity: isPulsing ? (isIterate ? 0.7 : 0.5) : 0.25,
                      transition: isPulsing
                        ? 'fill 0.2s ease, opacity 0.2s ease, filter 0.2s ease'
                        : 'fill 0.6s ease, opacity 0.6s ease, filter 0.6s ease',
                      filter: isPulsing
                        ? isIterate
                          ? 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.4))'
                          : 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.15))'
                        : 'none',
                    }}
                  >
                    <textPath
                      href="#necklace"
                      startOffset={`${LABEL_OFFSETS[i]}%`}
                    >
                      {label}
                    </textPath>
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ambient-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
