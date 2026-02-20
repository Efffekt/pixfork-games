import { useState, useEffect, useCallback, useRef } from 'react';

const BOOT_LINES = [
  '> SYSTEM CHECK...',
  '> LOADING PIXFORK ENGINE v2.7...',
  '> INITIALIZING NEON GRID...',
  '> MOUNTING CASSETTE DRIVE...',
  '> CALIBRATING VHS TRACKING...',
  '> ALL SYSTEMS ONLINE',
  '> READY_',
];

export default function BootSequence() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<'booting' | 'flickering' | 'complete'>('booting');
  const skipRef = useRef(false);

  const complete = useCallback(() => {
    sessionStorage.setItem('pixfork-booted', 'true');
    setPhase('complete');
    window.dispatchEvent(new CustomEvent('boot-complete'));
  }, []);

  const skip = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    complete();
  }, [complete]);

  // Check if already booted this session or prefers reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sessionStorage.getItem('pixfork-booted') || prefersReducedMotion) {
      skipRef.current = true;
      setPhase('complete');
      sessionStorage.setItem('pixfork-booted', 'true');
      window.dispatchEvent(new CustomEvent('boot-complete'));
      return;
    }
  }, []);

  // Skip on any interaction
  useEffect(() => {
    if (phase === 'complete') return;
    const handler = () => skip();
    window.addEventListener('click', handler);
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('keydown', handler);
    };
  }, [skip, phase]);

  // Typing animation
  useEffect(() => {
    if (phase !== 'booting' || skipRef.current) return;

    if (currentLine >= BOOT_LINES.length) {
      setPhase('flickering');
      const timer = setTimeout(complete, 500);
      return () => clearTimeout(timer);
    }

    const text = BOOT_LINES[currentLine];

    if (currentChar <= text.length) {
      const timer = setTimeout(() => {
        setLines(prev => {
          const updated = [...prev];
          if (updated.length <= currentLine) updated.push('');
          updated[currentLine] = text.slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar(prev => prev + 1);
      }, 20 + Math.random() * 15);
      return () => clearTimeout(timer);
    }

    // Move to next line
    const timer = setTimeout(() => {
      setCurrentLine(prev => prev + 1);
      setCurrentChar(0);
    }, 150);
    return () => clearTimeout(timer);
  }, [phase, currentLine, currentChar, complete]);

  if (phase === 'complete') return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-bg-deep flex items-center justify-center transition-opacity duration-500 ${
        phase === 'flickering' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Faint scanlines on boot screen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(226,29,0,0.015) 1px, rgba(226,29,0,0.015) 2px)',
        }}
      />

      <div className="max-w-lg w-full px-8">
        {/* Mini logo */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex gap-0.5">
            <div className="w-1.5 h-1.5 bg-[#E21D00]" />
            <div className="w-1.5 h-1.5 bg-[#E21D00]" />
            <div className="w-1.5 h-1.5 bg-[#E21D00]" />
          </div>
          <span className="font-mono text-xs text-[#E21D00]/40 uppercase tracking-widest">
            Pixfork Games OS
          </span>
        </div>

        <div className="font-mono text-base md:text-lg space-y-1">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${
                i === lines.length - 1 && line.includes('READY')
                  ? 'text-[#00FF88]'
                  : i === lines.length - 1 && line.includes('ONLINE')
                  ? 'text-[#00FF88]'
                  : 'text-[#E21D00]'
              }`}
            >
              {line}
              {i === lines.length - 1 && phase === 'booting' && (
                <span className="inline-block w-2 h-4 bg-current ml-1 animate-[blink-cursor_1s_step-end_infinite]" />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-0.5 bg-bg-elevated rounded-sm overflow-hidden">
          <div
            className="h-full bg-[#E21D00] transition-all duration-200"
            style={{ width: `${(currentLine / BOOT_LINES.length) * 100}%` }}
          />
        </div>

        <p className="text-text-muted text-sm mt-6 font-mono">
          Press any key to skip
        </p>
      </div>
    </div>
  );
}
