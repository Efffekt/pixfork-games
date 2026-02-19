# Pixfork Games — Website

Official website for [Pixfork Games](https://pixfork.com), a Norwegian indie game studio.

Built with Astro, React, Tailwind CSS, and Framer Motion.

## Development

```bash
npm install
npm run dev        # Start dev server at localhost:4321
npm run build      # Build to ./dist/
npm run preview    # Preview production build
```

## Deployment

Deploys automatically to GitHub Pages via GitHub Actions on push to `main`.

## Tech Stack

- **Astro 5** — static-first framework
- **React 19** — interactive island components
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — animations in React islands
- **TypeScript** — type safety

## Project Structure

```
src/
├── layouts/          BaseLayout (HTML shell, fonts, meta)
├── pages/            All routes (/, /about, /games/*, etc.)
├── components/
│   ├── layout/       Navbar, Footer, MobileMenu
│   ├── ui/           PixelButton, NeonCard, Badge, etc.
│   ├── effects/      BootSequence, PixelParticles, VHS, Glitch
│   └── sections/     Hero, FeaturedGame, GamesShowcase, AboutStudio
├── data/             Game, team, and social link data
├── styles/           Global CSS (design system, keyframes)
└── types/            TypeScript interfaces
```
