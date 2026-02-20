import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'Games', href: '/#games' },
  { label: 'On Tape << Rewind', href: '/games/on-tape-rewind' },
  { label: 'Neon Zone', href: '/games/neon-zone' },
  { label: 'Ascending', href: '/games/ascending' },
  { label: 'About', href: '/about' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'));
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-accent-primary transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-accent-primary transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-accent-primary transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-bg-deep/95 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <nav
            className="flex flex-col items-center justify-center h-full gap-6"
            aria-label="Mobile navigation"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-heading text-sm text-text-primary uppercase tracking-wider hover:text-accent-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              className="mt-4 font-heading text-[10px] text-text-muted uppercase tracking-wider hover:text-accent-primary transition-colors flex items-center gap-2 py-2 px-4"
              onClick={() => {
                const next = !isLight;
                document.documentElement.classList.toggle('light', next);
                localStorage.setItem('theme', next ? 'light' : 'dark');
                setIsLight(next);
                // Update navbar toggle icons
                const sunIcon = document.querySelector('.theme-icon-sun');
                const moonIcon = document.querySelector('.theme-icon-moon');
                sunIcon?.classList.toggle('hidden', next);
                moonIcon?.classList.toggle('hidden', !next);
              }}
            >
              {isLight ? (
                <Moon className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Sun className="w-4 h-4" aria-hidden="true" />
              )}
              {isLight ? 'Dark Mode' : 'Light Mode'}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
