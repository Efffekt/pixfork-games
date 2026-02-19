import { useEffect, useState } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export default function KonamiCode() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index]) {
        index++;
        if (index === KONAMI.length) {
          setActive(true);
          index = 0;
          timeout = setTimeout(() => setActive(false), 8000);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      clearTimeout(timeout);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none"
      style={{
        animation: 'fade-in 0.3s ease-out',
      }}
    >
      {/* Heavy CRT curvature effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(226,29,0,0.03) 1px, rgba(226,29,0,0.03) 2px)',
          borderRadius: '20px',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5), inset 0 0 50px rgba(226,29,0,0.1)',
        }}
      />

      {/* Arcade mode banner */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <p
          className="font-heading text-xl md:text-3xl uppercase tracking-widest"
          style={{
            color: '#E21D00',
            textShadow: '0 0 10px #E21D00, 0 0 20px #E21D00, 0 0 40px #E21D00, 0 0 80px #7B2FFF',
            animation: 'glow-pulse 0.5s ease-in-out infinite',
          }}
        >
          Arcade Mode
        </p>
        <p className="font-mono text-sm text-[#E21D00] mt-4 opacity-60">
          &#9650; &#9650; &#9660; &#9660; &#9664; &#9654; &#9664; &#9654; B A
        </p>
      </div>
    </div>
  );
}
