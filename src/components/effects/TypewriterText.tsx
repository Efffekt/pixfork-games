import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  className = '',
  showCursor = true,
  onComplete,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay, text, onComplete]);

  useEffect(() => {
    if (!started || isComplete) return;

    const timer = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
        setDisplayText(text);
        setIsComplete(true);
        clearInterval(timer);
        onComplete?.();
      } else {
        setDisplayText(text.slice(0, indexRef.current));
      }
    }, speed);

    return () => clearInterval(timer);
  }, [started, text, speed, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <span className="inline-block w-2 h-[1em] bg-current ml-0.5 animate-[blink-cursor_1s_step-end_infinite] align-middle" />
      )}
    </span>
  );
}
