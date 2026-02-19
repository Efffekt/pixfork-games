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
          </nav>
        </div>
      )}
    </>
  );
}
