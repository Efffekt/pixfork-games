import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  glitchOnHover?: boolean;
  autoGlitch?: boolean;
  autoGlitchInterval?: number;
}

export default function GlitchText({
  text,
  className = '',
  as: Tag = 'span',
  glitchOnHover = true,
  autoGlitch = false,
  autoGlitchInterval = 5000,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!autoGlitch) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 400);
    }, autoGlitchInterval);

    return () => clearInterval(interval);
  }, [autoGlitch, autoGlitchInterval]);

  return (
    <Tag
      className={`glitch-text ${isGlitching || !glitchOnHover ? '' : ''} ${className}`}
      data-text={text}
      onMouseEnter={glitchOnHover ? () => setIsGlitching(true) : undefined}
      onMouseLeave={glitchOnHover ? () => setIsGlitching(false) : undefined}
      style={isGlitching ? {
        '--glitch-active': '1',
      } as React.CSSProperties : undefined}
    >
      {text}
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              color: '#E21D00',
              animation: 'glitch-1 0.3s infinite linear',
              clipPath: 'inset(10% 0 80% 0)',
              mixBlendMode: 'screen',
            }}
            aria-hidden="true"
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              color: '#F0F0F0',
              animation: 'glitch-2 0.3s infinite linear',
              clipPath: 'inset(60% 0 10% 0)',
              mixBlendMode: 'screen',
            }}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
}
