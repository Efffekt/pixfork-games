import { useState, useEffect } from 'react';

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
        className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
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
              className="mt-4 font-heading text-[10px] text-text-muted uppercase tracking-wider hover:text-accent-primary transition-colors flex items-center gap-2"
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
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
              {isLight ? 'Dark Mode' : 'Light Mode'}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
