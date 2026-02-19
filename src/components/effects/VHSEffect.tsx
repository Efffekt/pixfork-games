import { useEffect, useState } from 'react';

interface VHSEffectProps {
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  active?: boolean;
}

export default function VHSEffect({
  intensity = 'light',
  className = '',
  active = true,
}: VHSEffectProps) {
  const [trackingGlitch, setTrackingGlitch] = useState(false);

  useEffect(() => {
    if (!active) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Random tracking glitch
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setTrackingGlitch(true);
        setTimeout(() => setTrackingGlitch(false), 150 + Math.random() * 200);
      }
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  const opacityMap = { light: 0.03, medium: 0.06, heavy: 0.1 };
  const lineOpacity = opacityMap[intensity];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Horizontal scan lines */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, ${lineOpacity}) 2px,
            rgba(0, 0, 0, ${lineOpacity}) 4px
          )`,
        }}
      />

      {/* RGB split / chromatic aberration */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          opacity: intensity === 'heavy' ? 0.15 : 0.05,
          background: `linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.03) 0%,
            transparent 33%,
            transparent 66%,
            rgba(0, 0, 255, 0.03) 100%
          )`,
        }}
      />

      {/* Tracking glitch band */}
      {trackingGlitch && (
        <div
          className="absolute left-0 right-0 h-4"
          style={{
            top: `${20 + Math.random() * 60}%`,
            background: `linear-gradient(
              0deg,
              transparent,
              rgba(255, 255, 255, 0.08),
              transparent
            )`,
            transform: `translateX(${(Math.random() - 0.5) * 10}px)`,
          }}
        />
      )}
    </div>
  );
}
